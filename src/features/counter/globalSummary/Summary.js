import React, { useState, useEffect, useContext, PureComponent  } from 'react';
import { useSelector, useDispatch, connect, ReactReduxContext } from 'react-redux';
import styles from './Summary.module.css';


export function Summary() {
  
  const [incrementAmount, setIncrementAmount] = useState('1');

  const incrementValue = Number(incrementAmount) || 0;
  const { store } = useContext(ReactReduxContext)
  const { getState, dispatch, subscribe } = store
  const [ storeState, setStoreState ] = useState(getState())
  const [globalDataSummary, setGlobalSummaryData] = useState([]);
  let dataGlobal;
  
  const setGlobalData = function (dataGlobal) {
    console.log(dataGlobal);
    setGlobalSummaryData(dataGlobal);
  }
  
    
  // subscribe only once
  useEffect(() => subscribe(
    () => setStoreState(getState())
  , []))

  useEffect(() => {
    if (storeState.counter.cases.length !== 0) {
      console.log('run');
      console.log(storeState.counter.cases.Global.NewConfirmed);
      dataGlobal = {
        TotalRecovered: storeState.counter.cases.Global.TotalRecovered,
        NewRecovered: storeState.counter.cases.Global.NewRecovered,
        TotalDeaths: storeState.counter.cases.Global.TotalDeaths,
        NewDeaths: storeState.counter.cases.Global.NewDeaths,
        TotalConfirmed: storeState.counter.cases.Global.TotalConfirmed,
        NewConfirmed: storeState.counter.cases.Global.NewConfirmed,
      }; 
      setGlobalData(dataGlobal);
    } 
      // setGlobalData();
  }, [storeState.counter.cases])
  
  return (
    <div>
      {console.log(dataGlobal)}
      <div className={styles.row}>
        {
          globalDataSummary.NewConfirmed ? (
            <table>
                <tr>
                  <th>New Confirmed</th>
                  <td>{globalDataSummary.NewConfirmed.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Total Confirmed</th>
                  <td>{globalDataSummary.TotalConfirmed.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>New Recovered</th>
                  <td>{globalDataSummary.NewRecovered.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Total Recovered</th>
                  <td>{globalDataSummary.TotalRecovered.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>New Deaths</th>
                  <td>{globalDataSummary.NewDeaths.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Total Deaths</th>
                  <td>{globalDataSummary.TotalDeaths.toLocaleString()}</td>
                </tr>
            </table>
          ) : (
            ''
          )
        }
      </div>
    </div>
  );
}

export default Summary;