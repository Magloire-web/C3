"use strict";
const display = document.getElementById('display');
const buttons = document.getElementById('buttons');
const timeDisplay = document.getElementById('timeDisplay');
const modeToggle = document.getElementById('modeToggle');
const brand = document.createElement('div');
brand.textContent = 'OTTOU MBAZOA';
brand.style.textAlign = 'center';
brand.style.fontWeight = 'bold';
brand.style.marginBottom = '10px';
document.body.insertBefore(brand, document.body.firstChild);
let isScientificMode = false;
function updateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();
function createButtons() {
    buttons.innerHTML = '';
    const basicButtons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C', '⌫' // Clear button and Backspace button
    ];
    const scientificButtons = [
        'x^y', '!', '√', 'mod',
        'bin', 'hex', 'dec', 'exp',
        'log', 'sin', 'cos', 'tan'
    ];
    const currentButtons = isScientificMode ? basicButtons.concat(scientificButtons) : basicButtons;
    currentButtons.forEach((label) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => handleButtonClick(label));
        buttons.appendChild(button);
    });
}
function handleButtonClick(label) {
    if (label === '=') {
        try {
            display.textContent = eval(display.textContent || '0');
        }
        catch (_a) {
            display.textContent = 'Error';
        }
    }
    else if (label === 'C') {
        clearDisplay();
    }
    else if (label === '⌫') {
        backspaceDisplay();
    }
    else if (label === 'x^y') {
        display.textContent += '**';
    }
    else if (label === '!') {
        const num = parseInt(display.textContent || '0', 10);
        display.textContent = factorial(num).toString();
    }
    else if (label === '√') {
        display.textContent = Math.sqrt(parseFloat(display.textContent || '0')).toString();
    }
    else if (['sin', 'cos', 'tan', 'log', 'exp'].indexOf(label) !== -1) {
        const num = parseFloat(display.textContent || '0');
        const func = Math[label];
        if (typeof func === 'function') {
            display.textContent = func(num).toString();
        }
    }
    else if (label === 'bin') {
        display.textContent = parseInt(display.textContent || '0').toString(2);
    }
    else if (label === 'hex') {
        display.textContent = parseInt(display.textContent || '0').toString(16).toUpperCase();
    }
    else if (label === 'dec') {
        display.textContent = parseInt(display.textContent || '0', 2).toString();
    }
    else {
        display.textContent += label;
    }
}
function clearDisplay() {
    if (display) {
        display.textContent = '';
    }
}
function backspaceDisplay() {
    if (display && display.textContent) {
        display.textContent = display.textContent.slice(0, -1);
    }
}
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
modeToggle.addEventListener('click', () => {
    isScientificMode = !isScientificMode;
    modeToggle.textContent = isScientificMode ? 'Mode Normal' : 'Mode Scientifique';
    createButtons();
});
createButtons();
