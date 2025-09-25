
/*  
    Originally planned to use an _apps folder as a monorepo for multiple projects,
    but simplified the architecture by deploying each application separately on Render.
    
*/
 // TODO: Move this file out of this directory, and change its import accordingly;  its placement is temporary here
// TODO: I should simplify by combimg all the data including meta data in one single object look at data.ts it also has cuid etc - convert into one!!

type ProjectUrl = {
  _chat_url?: string;
  _ecommerce_url?: string;
  _bookstore_url?: string;
};

const ProjectsUrl: ProjectUrl[] = [
  { _chat_url: "https://one3-chat-app.onrender.com" },
  { _ecommerce_url: "https://one4-e-commerce.onrender.com" },
  { _bookstore_url: "https://one2-book-store.onrender.com" },
];
export default ProjectsUrl;