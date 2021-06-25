import React, { useState, useEffect, useContext, PureComponent  } from 'react';
import { useSelector, useDispatch, connect, ReactReduxContext } from 'react-redux';
import styles from './CountryCompare.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { incrementAsync } from  './countryCompareSlice';
import DatePicker from 'react-datepicker';
import CalendarContainer from 'react-datepicker';




export function CountryCompare(PureComponent) {
  
  const { store } = useContext(ReactReduxContext)
  const { getState, dispatch, subscribe } = store
  const [ storeState, setStoreState ] = useState(getState())
  const [americaData, setAmericaData] = useState([]);
  const [todaysDate, setTodaysDate] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [customDates, setCustomDates] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2020/03/08"));
  const [endDate, setEndDate] = useState(new Date("2021/02/10"));
  

  
  let dataCountry;
  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ display: "none", padding: "16px", background: "#216ba5", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>
            What is your favorite day?
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const formatAmericaData = function (America) {
    console.log(America);
    var formatedAmericaData = America.map(day => ({
      name: day.Date,
      cases: day.Cases
    }));
    console.log(formatedAmericaData);
    setAmericaData(formatedAmericaData);
  }
  
    
  // subscribe
  useEffect(() => subscribe(
    () => setStoreState(getState())
  , []))

  useEffect(() => {
    var allDateRange = {
      'date1': startDate,
      'date2': endDate, 
    }
    setCustomDates(allDateRange);
  }, [startDate, endDate]);

  useEffect(() => {
    //get todays date
    var today = new Date();
    console.log(today);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var date2 = yyyy + "-" + mm + "-" + dd + "T00:00:00Z"
    console.log(date2);

    //get todays date minus 7 days
    var todaysDate = new Date();
    var days = 86400000;
    console.log(todaysDate);
    var weekStart = new Date(todaysDate - (7*days));
    console.log(weekStart);
    var dd1 = String(weekStart.getDate()).padStart(2, '0');
    var mm1 = String(weekStart.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = weekStart.getFullYear();
    var date1 = yyyy1 + "-" + mm1 + "-" + dd1 + "T00:00:00Z"
    console.log(date1);

    var range = {
      'date1': date1,
      'date2': date2, 
    }

    var allDateRange = {
      'date1': "2020-03-01T00:00:00Z",
      'date2': date2, 
    }

    setTodaysDate(range);
    setAllDates(allDateRange);
  },[])

  useEffect(() => {
    if (storeState.counter.cases.length !== 0) {
      
      var formatedAmericaData = storeState.countryCompare.unitedStates.map(day => ({
        name: day.Date,
        cases: day.Cases,
      }))
      console.log(formatedAmericaData);
      setAmericaData(formatedAmericaData);
      
    } 
  }, [storeState.countryCompare.unitedStates])

  function formatXAxis(tickItem) {
    return (tickItem).toString().split('T')[0]
    }
  
  return (
    <div>
      {console.log(todaysDate)}
      <div className={`${styles.graphTitle} pt-5`}>
        <h1>
          United States COVID-19 Cases Over Time
        </h1>
      </div>
      <div className="col-12 d-flex align-center justify-content-around">
        <div className="">
          <button
              className={ `${styles.asyncButton} mt-5 mb-3`}
              onClick={() => dispatch(incrementAsync(todaysDate))}
            >
            Past Week
          </button>
        </div>
        <div className="">
          <button
              className={ `${styles.asyncButton} mt-5 mb-3`}
              onClick={() => dispatch(incrementAsync(allDates))}
            >
            All Time
          </button>
        </div>
        <div className="">
          <div className="d-flex">
            <div className="col-6">
              <button
                className={ `${styles.asyncButton} mt-5 mb-3`}
                onClick={() => dispatch(incrementAsync(customDates))}
              >
              Custom Dates
              </button>
            </div>
            <div className="col-3 pt-5">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarContainer={MyContainer}
              />
            </div>
            <div className="col-3 py-5">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                calendarContainer={MyContainer}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        <ResponsiveContainer width={'100%'} height={300}>
          <LineChart
            width={500}
            height={300}
            data={americaData}
            margin={{
              top: 5,
              right: 60,
              left: 60,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickFormatter={formatXAxis}
              style={{
                fontSize: '1rem',
                fontFamily: 'Times New Roman',
              }}
            />
            <YAxis 
              dataKey="cases"
              domain={['dataMin', 'dataMax']} 
              style={{
                fontSize: '1rem',
                fontFamily: 'Times New Roman',
                type: 'number',
              }}
              type="number"
              tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
            />
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat('en').format(value)}
            />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="cases" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.row}></div>
    </div>
  );
}

export default CountryCompare;