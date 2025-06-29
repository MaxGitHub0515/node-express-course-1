{
  "version": 2,
  "builds": [
    // --- Backend Build (Your Backbone App) ---
    {
      "src": "main-dashboard/rt-server/server.js", // Path from portfolio-hosted root
      "use": "@vercel/node"
    },
    // --- Frontend Builds (for each of your 3 apps) ---
    {
      "src": "_apps/12-book-store/frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "_apps/12-book-store/frontend/dist"
      }
    },
    {
      "src": "_apps/13-chat-app/frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "_apps/13-chat-app/frontend/dist"
      }
    },
    {
      "src": "_apps/14-e-commerce/frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "_apps/14-e-commerce/frontend/dist"
      }
    }
  ],
  "routes": [
    // --- API Route (Shared Backend) ---
    // This must come first to catch API calls before any frontend routes.
    {
      "src": "/api/(.*)",
      "dest": "main-dashboard/rt-server/server.js" // Route to your backend function
    },

    // --- Frontend Routing for Each App ---
    // IMPORTANT: The path in 'src' here MUST match the 'base' config in the respective Vite app.

    // 12-book-store App
    {
      "src": "/main-dashboard/projects/mern/12-book-store/(.*)",
      "dest": "_apps/12-book-store/frontend/dist/$1" // Serve from book-store frontend's dist
    },
    // 13-chat-app App
    {
      "src": "/main-dashboard/projects/mern/13-chat-app/(.*)",
      "dest": "_apps/13-chat-app/frontend/dist/$1" // Serve from chat-app frontend's dist
    },
    // 14-e-commerce App
    {
      "src": "/main-dashboard/projects/mern/14-e-commerce/(.*)",
      "dest": "_apps/14-e-commerce/frontend/dist/$1" // Serve from e-commerce frontend's dist
    },

    // --- OPTIONAL: Fallback for root or a specific "main" app ---
    // If you have a primary app that should load at yourdomain.com/
    // Example: if your 12-book-store app is the main one for the root.
    // This MUST be the last route.
    // If you don't have a root app, remove this.
    // {
    //   "src": "/(.*)",
    //   "dest": "_apps/12-book-store/frontend/dist/$1" // Or your portfolio homepage
    // }

     // 2. Dynamic route for your frontend apps using CUIDs
    // This route captures the CUID and sends it to your backend
    // The `[^/]+` captures any characters that are NOT a slash,
    // ensuring it's a single segment (your CUID).
    // The second `(.*)` captures the rest of the path within the app.
    {
      "src": "/main-dashboard/projects/mern/([^/]+)/(.*)",
      "dest": "main-dashboard/rt-server/server.js"
    },

       // 3. Optional: A catch-all route if you have a main dashboard/landing page
    // For example, if you want yourdomain.com/main-dashboard/ to go to a specific static index.html
    // Or if you have a main static site at the root. Be careful with order!
    // If your main dashboard is a frontend built like the others:
    {
      "src": "/main-dashboard/(.*)",
      "dest": "_apps/main-dashboard/frontend/dist/$1" // Assuming you have a main dashboard frontend
    },
    // 4. IMPORTANT: Fallback for root path (if any) or 404 for unmatched
    // This is often last to ensure other routes have a chance to match
    {
      "src": "/(.*)",
      "dest": "main-dashboard/rt-server/server.js" // Catch-all sends everything else to backend
    }
    // REDIRECT FROM MYDOMAIN.COM TO MYDOMAIN.COM/MAIN-DASHBOARD WHENEVER SOMEONE HITS MYDOMAIN.COM
    /* {
      "src": "/", // Matches requests to the root domain (e.g., yourdomain.com)
      "status": 308, // HTTP status code for Permanent Redirect. 307 is Temporary.
      "headers": {
        "Location": "/main-dashboard" // The URL path to redirect to
      }
    

  ]
    // testing vercel.json locally 
    npm i -g vercel
    vercel dev

  */
}