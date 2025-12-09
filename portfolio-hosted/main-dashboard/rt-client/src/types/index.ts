
export type User = {
  _id: string;
  username: string;
  email: string;
};

export interface VisitData {
  year: number;
  month: string;
  visits: number;
}


export interface AuthFormValues {
  username: string;
  email: string;
  pwd: string;
  confirmPwd?: string; 
}