import express from "express";
const router = express.Router();
import User from "../models/user.js";
import Log from "../models/log.js";

//set up body parser from express
router.use(express.urlencoded({ extended: true }));

//POST route - maybe needs refactoring
router.post("/add", async (req, res) => {
    try {
        const { username, photo_url, dailycal, gCarbs, gProtein, gFat } = req.body;

        //getting a count of total users in the db to start in order to then assign a user id:
        const userCount = await User.countDocuments({});

        // Creating documents follows a syntax similar to classes.
        const newUser = new User({
            id: userCount + 1,
            username: username,
            photo_url: photo_url,
            tarCals: Number(dailycal),
            tarCarbs: Number(gCarbs),
            tarProtein: Number(gProtein),
            tarFat: Number(gFat),
        });

        // get all log info from db
        const logs = await Log.find({});

        //Call the calculation method i made in user schema
        await newUser.findLogs(logs);

        await newUser.save();

        res.json(newUser);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating new user" });
    }
});

//GET route via search query
router.get("/", async (req, res) => {
    try {
        if (req.query.id) {
            const result = await User.findOne({ id: Number(req.query.id) });
            if (result) res.json(result);
            else res.status(404).send("Not found");
        }
        else {
            const users = await User.find();
            res.json(users);
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//GET route via path params
router.get("/:id", async (req, res) => {
    try {
        const result = await User.findOne({ id: Number(req.params.id) });
        result ? res.json(result) : res.status(404).send("Not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//DELETE route 
router.delete("/:id/delete", async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ id: Number(req.params.id) });

        res.setHeader('Content-Type', 'text/plain');
        result ? res.json(result) : res.status(404).send("User not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});


//PATCH route
router.patch("/:id/edit", async (req, res) => {
    //instead of multiple db calls, complie all potential updates to an object and query that
    const updatedFields = {};

    if (req.query.username) updatedFields.username = req.query.username;
    if (req.query.photo_url) updatedFields.photo_url = req.query.photo_url;
    if (req.query.tarCals) updatedFields.tarCals = Number(req.query.tarCals);
    if (req.query.tarCarbs) updatedFields.tarCarbs = Number(req.query.tarCarbs);
    if (req.query.tarProtein) updatedFields.tarProtein = Number(req.query.tarProtein);
    if (req.query.tarFat) updatedFields.tarFat = Number(req.query.tarFat);

    try {
        const result = await User.findOneAndUpdate(
            { id: Number(req.params.id) },
            { $set: updatedFields },
            { new: true } // return the updated document not the old one
        );

        //filling in the rest of the fields - get all food and user info from db
        const logs = await Log.find({});

        //Call the calculation method i made 
        await result.findLogs(logs);

        res.setHeader('Content-Type', 'text/plain');
        result ? res.json(result) : res.status(404).send("User not found");
    } catch (error) {
        res.status(500).send("Server error");
    }

});


// error handler
router.use((err, req, res, next) => {
    res.status(400).send("Not Found");
});

export default router;