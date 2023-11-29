import React, {useEffect, useState} from 'react';
import { getData } from '../../api';
import styles from './Header.module.css';

const Header = () => {
    const [data, setData] = useState([]);

    const showCurrentCourse = () => {
        const currentCourse = data.map((el) => {
            if(el.cc === 'USD' || el.cc === 'EUR' || el.cc === 'GBP' || el.cc === 'PLN') {
                return <div key={el.cc}>{el.cc} - {(el.rate).toFixed(2)}</div>
            }
        })
        return currentCourse;
    }

    useEffect(() => {
        getData()
        .then(data => setData(data))
    }, [])

    return (
        <div className={styles.container}>
            {showCurrentCourse()}
        </div>
    );
}

export default Header;
