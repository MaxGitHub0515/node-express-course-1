
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
import path from 'path';
import colors from 'colors';
import {connectDB} from './db/connect.js'
import dotenv from "dotenv"
import { connect } from 'http2';
dotenv.config({ path: '.env.local' });

const LaunchRTServerAndDB = async () => {
try {
  server.listen(PORT, () => {
  console.log(`   --> Main-Dashboard: RT Server is Running on Port ${process.env.PORT}`.green);
  });
  await connectDB(process.env.MONGO_URI);
  if(connectDB) {
    return console.log(`   --> RT Server Successfully Connected to MongoDB`.green);
  }

} catch (e) {
  console.log(e.message);
  console.log("||| MAIN DASHBOARD: --CAUGHT A CONNECT_DB ERROR OR A SERVER ERROR--|||".red)
}

}


LaunchRTServerAndDB();