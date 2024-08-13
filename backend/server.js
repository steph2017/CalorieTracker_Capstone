import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({ path: './backend/.env' });

const PORT = process.env.PORT || 10000;
const MONGOURL = process.env.MONGO_URL;
const baseURL = '' //will add once project is successfully deployed
const app = express();

//set up connection and seed data
import seedData from "./data/seeddata.js"; //function to load data
import User from "./models/user.js";
import Log from "./models/log.js";
import Food from "./models/food.js";

await mongoose.connect(MONGOURL);
//seed data
try {
    seedData(User, Food, Log);
} catch (err) {
    console.error(err);
    res.status(500).send('Error seeding data');
}

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public')) // telling express to use the public directory for static files - so index.html, which react renders to, can be found


// Define a route for the root URL
app.get('/', (req, res) => {
    //front end
    res.send("Welcome to your api. Redirect me to the latest log of the last added user",);

});


//Set Up routes
import userRoutes from "./routes/users.js";
app.use("/users", userRoutes);

import logRoutes from "./routes/logs.js";
app.use("/logs", logRoutes);

import foodRoutes from "./routes/foods.js";
app.use("/foods", foodRoutes);

//error handler
app.use((err, req, res, next) => {
    res.status(400).send("Not Found");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// // Start the server (alt once deployed?)
// app.listen(10000, () => {
//     console.log(`Server is running at ${baseURL}`);
// });