import axios from 'axios';

export function fetchCount() {

  let url = `https://api.covid19api.com/summary`;

  let promise = axios.get(url);

  return promise;
  
}
