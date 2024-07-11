let lastResult = null;
let lastOperation = null;
let lastValue = null;
let memory = 0;

function appendNumber(number) {
    document.getElementById('display').value += number;
    clearErrorMessage();
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    if (lastResult !== null) {
        display.value = lastResult + operator;
        lastResult = null;
        lastOperation = operator;
    } else if (display.value !== '' && !isOperator(display.value.slice(-1))) {
        display.value += operator;
        lastOperation = operator;
    }
    lastValue = null;
    clearErrorMessage();
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%', '**'].includes(char);
}

function clearDisplay() {
    document.getElementById('display').value = '';
    lastResult = null;
    lastOperation = null;
    lastValue = null;
    clearErrorMessage();
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const display = document.getElementById('display');
        let currentValue = display.value;

        if (lastResult !== null && lastOperation !== null) {
            if (lastValue === null) {
                lastValue = currentValue.split(lastOperation).pop();
            }
            currentValue = `${lastResult}${lastOperation}${lastValue}`;
        }

        const result = eval(currentValue);
        display.value = result;
        addHistoryEntry(currentValue, result);
        lastResult = result;
        clearErrorMessage();
    } catch (error) {
        showErrorMessage('Erro de Sintaxe');
    }
}

function appendScientificFunction(func) {
    const display = document.getElementById('display');
    let value = display.value;

    try {
        switch(func) {
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
                value = `Math.${func}(${value})`;
                break;
            case 'sqrt':
                value = `Math.sqrt(${value})`;
                break;
            case 'pow':
                value += '**';
                break;
            case 'exp':
                value = `Math.exp(${value})`;
                break;
            case 'pi':
                value += 'Math.PI';
                break;
            case 'mod':
                value += '%';
                break;
            case 'fact':
                value = factorial(parseFloat(value));
                break;
        }

        display.value = value;
        clearErrorMessage();
    } catch (error) {
        showErrorMessage('Erro de Sintaxe');
    }
}

function factorial(n) {
    if (n < 0) return 'Erro';
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
        if (key === 'Enter') {
            calculateResult();
        } else {
            if (key === '*') {
                appendOperator('*');
            } else if (key === '/') {
                appendOperator('/');
            } else {
                appendNumber(key);
            }
        }
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
}

function addHistoryEntry(expression, result) {
    const history = document.getElementById('history');
    const entry = document.createElement('div');
    entry.className = 'history-entry';
    entry.innerHTML = `<span>${expression}</span><span>${result}</span>`;
    history.insertBefore(entry, history.firstChild);
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
}

function clearErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = '';
}

function memoryClear() {
    memory = 0;
    clearErrorMessage();
}

function memoryRecall() {
    document.getElementById('display').value += memory;
    clearErrorMessage();
}

function memoryAdd() {
    try {
        memory += parseFloat(document.getElementById('display').value);
        clearErrorMessage();
    } catch (error) {
        showErrorMessage('Erro ao adicionar à memória');
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(document.getElementById('display').value);
        clearErrorMessage();
    } catch (error) {
        showErrorMessage('Erro ao subtrair da memória');
    }
}
