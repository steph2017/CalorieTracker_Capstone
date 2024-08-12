import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 10000;
const MONGOURL = process.env.MONGOURL;
const app = express();

app.use(cors());
app.use(express.json());



// start the Express server
mongoose.connect(MONGOURL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error)
})