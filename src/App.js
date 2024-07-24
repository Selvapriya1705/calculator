import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [currentValue, setCurrentValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleNumberClick = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };
    
    const handleOperatorClick = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (currentValue == null) {
            setCurrentValue(inputValue);
        } else if (operator) {
            const result = performOperation(currentValue, inputValue, operator);
            setDisplay(String(result));
            setCurrentValue(result);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const performOperation = (value1, value2, operation) => {
        switch (operation) {
            case '+':
                return value1 + value2;
            case '-':
                return value1 - value2;
            case '*':
                return value1 * value2;
            case '/':
                return value1 / value2;
            default:
                return value2;
        }
    };

    const handleEqualsClick = () => {
        const inputValue = parseFloat(display);

        if (currentValue == null) {
            return;
        } else if (operator) {
            const result = performOperation(currentValue, inputValue, operator);
            setDisplay(String(result));
            setCurrentValue(null);
            setOperator(null);
            setWaitingForOperand(true);
        }
    };

    const handleClearClick = () => {
        setDisplay('0');
        setCurrentValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    return (
        <div className="calculator">
            <div className="display">{display}</div>
            <div className="keypad">
                <button onClick={() => handleNumberClick(7)}>7</button>
                <button onClick={() => handleNumberClick(8)}>8</button>
                <button onClick={() => handleNumberClick(9)}>9</button>
                <button onClick={() => handleOperatorClick('/')}>/</button>

                <button onClick={() => handleNumberClick(4)}>4</button>
                <button onClick={() => handleNumberClick(5)}>5</button>
                <button onClick={() => handleNumberClick(6)}>6</button>
                <button onClick={() => handleOperatorClick('*')}></button>

                <button onClick={() => handleNumberClick(1)}>1</button>
                <button onClick={() => handleNumberClick(2)}>2</button>
                <button onClick={() => handleNumberClick(3)}>3</button>
                <button onClick={() => handleOperatorClick('-')}>-</button>

                <button onClick={() => handleNumberClick(0)}>0</button>
                <button onClick={() => handleOperatorClick('.')}>.</button>
                <button onClick={handleEqualsClick}>=</button>
                <button onClick={() => handleOperatorClick('+')}>+</button>

                <button onClick={handleClearClick} className="clear">AC</button>
            </div>
        </div>
    );
};

export default Calculator;