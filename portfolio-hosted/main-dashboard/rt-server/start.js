import app from "./server.js";
import http from "http"
import  'colors';
import {connectDB} from './db/connect.js'
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' });
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app)

const LaunchRTServerAndDB = async () => {
try {
  await connectDB(process.env.MONGO_URI);
  console.log(`Mongoose connection readyState: ${mongoose.connection.readyState}`.green);
  console.log(`${'   --> RT Server Successfully Connected to MongoDB'.green}`);
  await new Promise ((resolve, reject) => {
    server.listen(PORT, () => {
    console.log(`   --> Main-Dashboard: RT Server is Running on  http://localhost:${PORT}`.green);
    resolve();
}).on('error', (err) => {
  reject(err);
});

  });


} catch (e) {
  console.log(e.message);
  console.log("||| MAIN DASHBOARD: --CAUGHT A CONNECT_DB ERROR OR A SERVER ERROR--|||".red)
}

};


LaunchRTServerAndDB();


