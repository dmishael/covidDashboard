// A mock function to mimic making an async request for data

import axios from 'axios';

export function fetchAmericaData(todaysDate, weekStartDate) {

  console.log(todaysDate);
  console.log(weekStartDate);
  let url = `https://api.covid19api.com/total/country/united-states/status/confirmed?from=${weekStartDate}&to=${todaysDate}`;
  console.log(url);

  let promise = axios.get(url);

  return promise;
  
}