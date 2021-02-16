export interface Candidate {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }
  export interface dbInterface {
    saveCandidate(candidate: Candidate): boolean;
  }