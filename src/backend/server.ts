import {dbInterface, Candidate} from './candidate';
import { AxiosResponse } from 'axios';
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3001;

const greenhouseAuth = '';
const greenhouseUrl = 'https://harvest.greenhouse.io';


async function getGreenhouseData() {
  return axios.get(`${greenhouseUrl}/v1/candidates?per_page=500`, {
    headers: {
      Authorization: greenhouseAuth
    }
  })
}

// async function iterateData(getGreenhouseData, item){
 
 
 
// }

  

export function main(start: string = 'string'): Promise<AxiosResponse<any>> {
  console.log(`main: ${start}`);
  return getGreenhouseData();
}


main('Go!!').then(data => {
  console.log('data received');
  const db: dbInterface = {
    saveCandidate(candidate: Candidate): boolean {
      console.log(`${candidate.first_name} ${candidate.last_name}`);
      return true;
    }
  };
  const core = data['data'];
  for (let dataKey in core) {
    const candidate = core[dataKey];
    db.saveCandidate(candidate);
  }
  console.log('DONE');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})