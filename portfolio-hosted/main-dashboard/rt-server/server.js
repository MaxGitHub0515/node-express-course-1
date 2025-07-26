
import express from 'express';
const app = express();
import path from 'path';
import colors from 'colors';
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
// verify cookie http only
import verifyAuthRouter from "./routes/authVerify.routes.js"
// Mongo Santize
import mongoSanitize from 'express-mongo-sanitize';

// middleware from utils
import protectRoute from './middleware/protectRoute.js';
import adminOnly from './middleware/roleCheck.js';
// CORS configuration
app.use(configedCors());

// parse JSON request bodies, json body can not be < 10mb
app.use(express.json({ limit: "10mb" }));
// parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// (When hosted on the web) Trust proxy to get real client IP behind proxies like CloudFlare  proxy server
app.set('trust proxy', 2);
// mongo sanatize
// app.use(mongoSanitize({ allowDots: true, replaceWith: '_' }));
// app.use(mongoSanitize()); // causes issues 

// app.use((req, res, next) => {
//  if(req.query) {
//   req._sanitizeQuery = mongoSanitize.sanitize(req.query) // santize manually instead of middleware's default mutation
//  };
//  next()

// });


// Headers Set by Default 
app.use(helmet({
    contentSecurityPolicy: false, // diasble default CSP middleware
}));
// to be better added as a middleware in seperate file
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://vo.vercel-scripts.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  })
);


// cookie parser - parse the incoming cookies from req.cookies
app.use(cookieParser())

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
app.use('/api/v1/visitors', protectRoute, adminOnly, visitorRouter);
app.use('/api/v1/auth', apiLimiter, userRouter);
app.use('/api/v1/auth/verify', protectRoute, verifyAuthRouter)
// app.use('/api/v1/logs')
// app.use('/api/v1/cpanel', protectRoute, adminCheck)

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

// for now
// app.use('/assets', express.static(path.join(clientBuildPath, 'assets')));


/*
there is a problem with express 5+, it's using path-to-regexp library, and they changed the rules.
Instead of using:
.get('/**', xxxx) / .get('/*', xxxx)
Use this workaround:
.get('/*\w', xxxx)
*/

app.get(/(.*)/, (req, res, next) => {
  const tryPath = path.join(clientBuildPath, 'index.html');
  console.log(`Serving index.html fallback for: ${req.url.blue} from ${tryPath.cyan}`);
  res.sendFile(tryPath, (err) => {
     if(err) {
      console.error(`Error sending index.html: `, err.message);
      res.status(500).send('Error serving application.');
     }
  });
  


});  

}

export default app;
