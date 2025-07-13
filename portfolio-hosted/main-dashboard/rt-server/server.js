
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
import Redis from 'ioredis';
import compression from 'compression';
import hpp from 'hpp';
import { xss } from 'express-xss-sanitizer';
import configedCors from  './config/cors.config.js';
import cookieParser from 'cookie-parser';
// __dirname is not available in es modules, so derive it
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// full URL of the current module file
const __filename = fileURLToPath(import.meta.url);
// getting absolute path of the dir containing this file.
const __dirname = dirname(__filename);
// Routes
// import handleCUIDRoute from './controllers/cuid.controller.js';
import projectRouter from './routes/project.routes.js';
//
import userRouter from "./routes/auth.routes.js"
// import middleware like for visitor
import visitorRouter from "./routes/visitor.routes.js"
// Mongo Santize
import mongoSanitize from 'express-mongo-sanitize';

// middleware
import protectRoute from './middleware/protectRoute.js';

// parse JSON request bodies, json body can not be < 10mb
app.use(express.json({ limit: "10mb" }));
// parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// (When hosted on the web) Trust proxy to get real client IP behind proxies like CloudFlare  proxy server
app.set('trust proxy', true);

// app.use(mongoSanitize()); // causes issues 
// Headers Set by Default 
app.use(helmet());

// cookie parser - parse the incoming cookies from req.cookies
app.use(cookieParser())
// CORS configuration
app.use(configedCors());

// Reduce size of response bodies sent to the client
app.use(compression());

// Prevent parameter pollution attacks 
app.use(hpp());

// xss senetizer
app.use(xss());

// API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Redis Client Setup & Connection
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

// Redis Client Event Listeners
redisClient.on('connect', () =>  console.log('   --> Redis Client: Connected to Redis!'.green));
redisClient.on('error', (err) => console.error('   --> Redis Client: Error connecting to Redis:', err.message.red));
redisClient.on('ready', () => {  console.log('   --> Redis Client: Ready to accept commands.'.blue)});


// Routes
app.use('/api/v1/projects', apiLimiter, projectRouter);
app.use('/api/v1/visitors', visitorRouter);
app.use('/api/v1/auth', apiLimiter, userRouter);
app.use('/api/v1/cpanel', protectRoute, adminCheck)

// handle cuid routes
// app.get('/main-dashboard/projects/mern/:cuidId/*', handleCUIDRoute);


// --> Static File Serving for Production(loading frontend) <--

console.log(`Current project directory: ${__dirname.blue}`);
console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);
// change to  NODE_ENV === "production" !!!
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, '..', 'rt-client', 'dist');
  console.log(`Serving static files from: ${clientBuildPath.yellow}`);
// serve static files from the built   
app.use(express.static(clientBuildPath));
/*
there is a problem with express 5+, it's using path-to-regexp library, and they changed the rules.
Instead of using:
.get('/**', xxxx) / .get('/*', xxxx)
Use this workaround:
.get('/*\w', xxxx)
*/

app.get('/.*\w', (req, res, next) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
  next()
});  

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

