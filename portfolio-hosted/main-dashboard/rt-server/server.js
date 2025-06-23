
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

import dotenv from "dotenv"
dotenv.config({ path: '.env.local' });

server.listen(PORT, () => {
  console.log(`RT Server is running on port ${process.env.PORT}`);
 
});



