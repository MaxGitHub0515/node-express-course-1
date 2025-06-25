import express from 'express';
import http from 'http';
import path from 'path';
import colors from 'colors'; // Assuming 'colors' package is installed for console output coloring
import dotenv from "dotenv";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import hpp from 'hpp';
import { xss } from 'express-xss-sanitizer';
// Mongo Santize - Re-enable and debug this carefully!
// import mongoSanitize from 'express-mongo-sanitize';

// For ES Modules, __dirname is not globally available. We need to derive it.
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// IMPORTANT: Assuming 'connectDB' is an asynchronous function that establishes
// a database connection and throws an error if it fails.
// Example:
// import mongoose from 'mongoose';
// export const connectDB = async (uri) => {
//   try {
//     await mongoose.connect(uri);
//     // No need to return anything explicitly if it throws on failure
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw new Error('Failed to connect to the database.');
//   }
// };
import { connectDB } from './db/connect.js'; // Ensure this path is correct

const app = express();
const server = http.createServer(app);

// === Middlewares ===
// Parse JSON request bodies (limit increased to 10mb)
app.use(express.json({ limit: "10mb" }));
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Security middlewares
// app.use(mongoSanitize()); // Re-enable this after debugging! It's crucial.
app.use(helmet()); // Sets various HTTP headers for security
app.use(compression()); // Reduces response body size
app.use(hpp()); // Prevents HTTP Parameter Pollution attacks
app.use(xss()); // XSS sanitizer

// API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// === Routes ===
// Example of applying rate limiter and importing a router
// import testRouter from './routes/test.js';
// app.use('/api/v1/projects', apiLimiter, testRouter);


// === Static File Serving for Production ===
console.log(`Current project directory: ${__dirname.red}`);
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, 'portfolio-hosted', 'main-dashboard', 'rt-client', 'dist');
  console.log(`Serving static files from: ${clientBuildPath.yellow}`);

  // Serve the 'dist' folder with Express
  app.use(express.static(clientBuildPath));

  // For any other requests, serve the main HTML file (SPA fallback)
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// === Server & DB Startup Logic ===
const PORT = process.env.PORT || 8000;

/**
 * Launches the RT server and connects to the MongoDB database.
 * This function encapsulates the startup logic with optimized error handling.
 */
const LaunchRTServerAndDB = async () => {
  try {
    // 1. Start the server first
    await new Promise((resolve, reject) => {
      server.listen(PORT, () => {
        console.log(`\t--> Main-Dashboard: RT Server is Running on http://localhost:${PORT}`.green);
        resolve(); // Resolve the promise once the server is listening
      }).on('error', (err) => {
        reject(err); // Reject if there's an error during server startup (e.g., port in use)
      });
    });

    // 2. Attempt to connect to the database ONLY if the server started successfully
    await connectDB(process.env.MONGO_URI);
    // This message will ONLY print if connectDB() resolves successfully.
    // If connectDB() throws an error, execution jumps directly to the catch block.
    console.log(`\t--> RT Server Successfully Connected to MongoDB`.green);

  } catch (e) {
    // Catch any errors from server.listen or connectDB
    console.error(`\n!!! MAIN DASHBOARD: --CAUGHT A SERVER OR DB CONNECTION ERROR-- !!!`.red);
    console.error(`Error details: ${e.message}`.red);
    // Optionally, you might want to exit the process if startup fails critically
    // process.exit(1);
  }
};