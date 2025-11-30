
export type User = {
  _id: string;
  username: string;
  email: string;
};

export interface VisitData {
  month: string;
  visits: number;
}