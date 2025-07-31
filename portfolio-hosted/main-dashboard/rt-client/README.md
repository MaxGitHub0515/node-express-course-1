# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```





<!-- Some notes -->

Query params for main-dashboard sample
 - (likely to make it a default page ) - /main-dashboard/projects
  - /main-dashboard/projects?stack=mern (filter by mern stack)(default page 1)
  - /main-dashboard/projects?search=messera - (search projects)(default page 1)
  - /main-dashboard/projects?search=messera&stack=mern&page=2 (all combined)


  <!-- notes -->

  Common practice is not to include page=1 in the url as a default one or when moving back to the first page
  as follows
  /main-dashboard/projects?search=messera&stack=mevn (no page=1)
  /main-dashboard/projects?search=messera&stack=mevn&page=2


  Both Search and stack filtering ux
  - when a user types in search bar and can either pick or write yourself ommiting the suggestons, url becames for isntance as follows
  /main-dashboard/projects?search=messera&stack=mevn (default page 1)
  - if user only selects a stack filter (with no typing in search bar)
  /main-dashboard/projects?stack=mevn


  
---------------------------------------------
Here is more realistic scenarion and correction for the (Both Search and stack filtering ux)

Serach bar with autocomplete (project name plus stack shown) 
(show the stack on ui then use in ?stack=mern to distinguish the stack)
Clicking a suggestion sets both search (project name) and stack in the URL/query and filters results accordingly.

Stack filter dropdown
 - User can pick a stack e.g mevn 
 - filters the project by stuck only 
 - can be used independetly or combined with search 

--------------------------------------------------------------




My Note - 
 project name plus stack shown on the ui to distinguish in case of 2 same project names but with different stack - um, if mongodb was switched to postgres is not abig deal, but in cases like same up but built with another stack - if adding backend with django though does not sound realistic as i would not rewrite the same project but in different programming language, so better to simply  below the project desription add like dedicated section of how i have done the sb matter with posgress replacing mongodb


Summerized:
To avoid confusion when multiple projects share the same name but use different stacks, the UI should clearly show both the project name and the stack used. For example, if a project initially used MongoDB and was later updated to use PostgreSQL, that change isn’t significant enough to treat it as a different project—but it’s still worth noting.

In more substantial cases—like if the same app were built with a completely different backend stack (e.g., switching from Node.js to Django)—it's better not to treat it as a separate project either, though it’s unlikely I’d rebuild the exact same app in another language just for that reason.

Recommended Approach:
Instead of duplicating projects, include a dedicated section below the project description to outline key differences or updates in the tech stack. For example, I’d note how I replaced MongoDB with PostgreSQL and what changes were involved.



modifty and summerize it better !! 
dont forget about asisnging a unique id to every project but it will be displayed only if i leave the filtering or search and click o nthe proejct then the id will be added in the url from the db
recap of mongodb operators
https://www.mongodb.com/docs/manual/reference/operator/query/
for creating special ids for projects either use existing _id or cuid
when found and clicked 
example of a url 
/main-dashboard/projects/clw9twz9h0000kx3g6h6m6y48
--
By default, your project list shows only MERN projects (because of default filter stack=mern), but your URL is clean as /main-dashboard/projects (hiding ?stack=mern&page=1 since page=1 is default).

When the user clicks on a specific project from this MERN list, the URL for that project should be simply:
/main-dashboard/projects/clw9twz9h0000kx3g6h6m6y48
This URL does NOT include any search or stack filters because the project detail page is independent — it's just showing details of that one project.

Since the user initially saw only MERN projects, this project is naturally from that filtered list. You don't need to "carry over" the stack filter in the URL here, which keeps URLs cleaner and more user-friendly.
When user clicks a project from these filtered/searched lists, two options:
Easier
/main-dashboard/projects/clw9twz9h0000kx3g6h6m6y48

Harder but better
/main-dashboard/projects/clw9twz9h0000kx3g6h6m6y48?search=messera&stack=mern&page=2

--

and think about mongodb inejction- sanatize if adding mongodb quieres 
last changed : 3:00 am
