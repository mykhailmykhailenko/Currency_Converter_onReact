import React, { useEffect, useReducer, useState } from 'react';
import styles from './CurrencyConverter.module.css';
import { getData } from '../../api';

const reducer = (state, action) => {
    switch (action.type) {
        case 'INPUT CHANGED' :
            const {value, name} = action;
            return {
                ...state,
                [name] : value
            }
        default:
            return state
    }
}

const CurrencyConverter = () => {

    const [result, setResult] = useState('');
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);

    const [state, dispatch] = useReducer(reducer, {
        cashAmount: '',
        currencyInput: 'USD',
        currencyOutput: 'UAH'
    })

    useEffect(() => {
        getData()
        .then(data => setData(data))
        .catch(err => setErr(err))
    }, [])

    const changeHandler = ({target: {value, name}}) => {
        const action = {
            value,
            name,
            type: 'INPUT CHANGED'
        }
        dispatch(action)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const action = {
            value: '',
            name: 'cashAmount',
            type: 'INPUT CHANGED'
        }
        dispatch(action)
    }

    const getResultOfCalculating = () => {
        let inputRate
        let outputRate
        data.forEach((el) => {
            if (currencyInput === 'UAH') {
                inputRate = 1
            }
            if (currencyOutput === 'UAH') {
                outputRate = 1
            }
            if (el.cc === currencyInput) {
                inputRate = el.rate
            }
            if (el.cc === currencyOutput) {
                outputRate = el.rate
            }
        })
        if(Number.isNaN(Number(cashAmount))) {
            return setResult('Amount must be a number')
        }
        let calculatedResult =  (Number(cashAmount) * inputRate / outputRate).toFixed(2);
        setResult(calculatedResult)
    }

    const sortSelect = () => {
        const newArr = data.map(el => [el.cc]);
        newArr.push('UAH');
        return newArr.sort().map((el) => <option>{el}</option>)
    }

    const {cashAmount, currencyInput, currencyOutput} = state;

    return (
        <section className={styles.center}>
            {err && <div>{err.message}</div>}
            <form onSubmit={submitHandler} className = {styles.wrapper}>

                <div className={styles.container}>
                    <input name="cashAmount"
                    type="text"
                    placeholder="Amount of cash"
                    value={cashAmount}
                    onChange={changeHandler}
                    className={styles.amountInput}
                    autoComplete="off"/>

                    <select name="currencyInput"
                    className={styles.currencySelect}
                    value={currencyInput}
                    onChange={changeHandler}>
                    {sortSelect()}
                    </select>
                </div>

                <div className={styles.container}>
                    <input name="cashResult"
                    type="text"
                    placeholder="Result"
                    value={result}
                    onChange={changeHandler}
                    className={styles.amountInput}
                    autoComplete="off"/>

                    <select name="currencyOutput"
                    className={styles.currencySelect}
                    value={currencyOutput}
                    onChange={changeHandler}>
                    {sortSelect()}
                    </select>
                </div>

                <button type='submit' onClick={getResultOfCalculating} className={styles.btn}>Calculate</button>
            </form>
        </section>
    );
}

export default CurrencyConverter;