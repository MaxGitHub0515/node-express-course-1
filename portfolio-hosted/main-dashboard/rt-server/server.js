
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
import path from 'path';
import colors from 'colors';
import {connectDB} from './db/connect.js'
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' });
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import hpp from 'hpp';
import { xss } from 'express-xss-sanitizer';
import configedCors from  './config/cors.config.js';
// __dirname is not available in es modules, so derive it
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// full URL of the current module file
const __filename = fileURLToPath(import.meta.url);
// getting absolute path of the dir containing this file.
const __dirname = dirname(__filename);
// Routes
import handleCUIDRoute from './controllers/cuid.controller.js';
import projectRouter from './routes/project.routes.js';
// Mongo Santize
import mongoSanitize from 'express-mongo-sanitize';


// parse JSON request bodies, json body can not be < 10mb
app.use(express.json({ limit: "10mb" }));
// parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// app.use(mongoSanitize()); // causes issues 
// Headers Set by Default 
app.use(helmet());

// CORS configuration
app.use(configedCors());

// Reduce size of response bodies sent to the client
app.use(compression());

// Prevent parameter pollution attacks 
app.use(hpp());

// xss senetizer
app.use(xss());


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


// Routes
app.use('/api/v1/projects', apiLimiter, projectRouter);

// handle cuid routes
// app.get('/main-dashboard/projects/mern/:cuidId/*', handleCUIDRoute);



// --> Static File Serving for Production(loading frontend) <--

console.log(`Current project directory: ${__dirname.blue}`);
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, '..', 'rt-client', 'dist');
  console.log(`Serving static files from: ${clientBuildPath.yellow}`);
// serve static files from the built 
app.use(express.static(clientBuildPath));

// !! CAUSES ISSUES  !!
// serve the main HTML file (SPA fallback) : encountering issue here 
// app.get('*', (req, res) => {
//   res.sendFile(path.join(clientBuildPath, 'index.html'));
// });

}


const PORT = process.env.PORT || 8000;

const LaunchRTServerAndDB = async () => {
try {
  await new Promise ((resolve, reject) => {
    server.listen(PORT, () => {
    console.log(`   --> Main-Dashboard: RT Server is Running on  http://localhost:${PORT}`.green);
    resolve();
}).on('error', (err) => {
  reject(err);
});

  });

  await connectDB(process.env.MONGO_URI);
  console.log(`   --> RT Server Successfully Connected to MongoDB`.green);
 

} catch (e) {
  console.log(e.message);
  console.log("||| MAIN DASHBOARD: --CAUGHT A CONNECT_DB ERROR OR A SERVER ERROR--|||".red)
}

};


LaunchRTServerAndDB();

