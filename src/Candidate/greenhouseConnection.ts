import {dbInterface, Candidate} from './candidate';
import { AxiosResponse } from 'axios';
import 'firebase/firestore';
const axios = require('axios')

const greenhouseAuth = 'NGMyYTQwN2I4OWRjNjhlNzk2NThiNGMyYjMxNmZmNDMtMzo';
const greenhouseUrl = 'https://harvest.greenhouse.io';

async function getGreenhouseData() {
  return axios.get(`${greenhouseUrl}/v1/candidates?per_page=500`, {
    headers: {
      Authorization: greenhouseAuth
    }
  })
}


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