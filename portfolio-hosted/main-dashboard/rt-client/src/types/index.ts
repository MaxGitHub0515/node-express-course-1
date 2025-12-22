
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
  projectLocUrl: string,
  stack: string[],
  fileUpload: FileList | null;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  image: string; // Stored Final Image URL
  projectLocUrl: string;
  slug: string;
  // IMPORTANT: Since we use .populate('stack'), this is an array of OBJECTS, not strings!
  stack: StackOption[];
}

export interface StackOption {
  _id: string,
  name: string
}

export interface SearchBarProps {
    stackOptions: StackOption[]; 
    activeStack: string[];      
    onStackChange: (stack: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export interface ContactFormValues {
    email: string;
    subject: string;
    message: string;
}
