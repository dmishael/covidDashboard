import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Summary } from './globalSummary/Summary';
import { CountryCompare } from './countryCompare/CountryCompare';
import {
  incrementAsync,
  // selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const setGlobalData = function (dataGlobal) {
    dispatch(incrementAsync())
    console.log('running')
  }

  useEffect(() => {
    setGlobalData()
  },[])

  return (
    <div>
      <button
          className={`${styles.asyncButton} mt-5 mb-3`}
          onClick={() => dispatch(incrementAsync())}
        >
          Global COVID-19 Data - Updated Every 10 Minutes
        </button>
      <Summary />
      <CountryCompare />
    </div>
  );
}