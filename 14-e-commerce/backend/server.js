

import express from "express";
import dotenv from "dotenv";
import "colors";
import {connectDB} from "./lib/db.js"
// 3:36
const app = express();
dotenv.config({path: ".env.local"})

// Routes imports 
import authRoutes from "./routes/auth.route.js";

// default middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/auth", authRoutes);
// app.use("api/v1/", )
// app.use("api/v1/", )
// app.use("api/v1/", )

const PORT = process.env.PORT || 8001;

const Start = (() => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    connectDB();

})();


