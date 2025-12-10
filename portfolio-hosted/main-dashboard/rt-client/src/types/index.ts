
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

export interface ProjectFormValues {
  name: string;
  description: string;
  imageUrl: string;
  fileUpload: FileList | null;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  image: string; // Stored Final Image URL
}