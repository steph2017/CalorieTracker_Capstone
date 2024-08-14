import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Log from "../models/log.js";
import Food from "../models/food.js";
import User from "../models/user.js";

//Express body parser
router.use(express.urlencoded({ extended: true }));

//POST
router.post("/added", async (req, res) => {
    try {
        const { userid, logdate, foodids } = req.body;
        const newFoodids = foodids.split(',');
        const numFoodids = newFoodids.map(id => Number(id));

        const logCount = await Log.countDocuments({});

        const newLog = new Log({
            id: logCount + 1,
            user_id: Number(userid),
            date: logdate,
            food_ids: numFoodids

        });

        // get all food and user info from db
        const foods = await Food.find({});
        const users = await User.find({});

        //Call the calculation method i made to populate the rest of the boecjt properties (tCals, etc.)
        await newLog.calcMacros(foods, users);

        await newLog.save();

        res.send(newLog);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating new log" });
    }
});

//POST expanded logs
router.get("/expand", async (req, res) => {
    try {
        const logs = await Log.find();

        // query food schema for each log and insert the Food object by id
        const populatedLogs = await Promise.all(logs.map(async (log) => {
            const foods = await Food.find({ id: { $in: log.food_ids } });

            return {
                ...log._doc,
                food_ids: foods
            };
        }));

        res.json(populatedLogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//get route via search query
router.get("/", async (req, res) => {
    try {
        if (req.query.id) {
            const result = await Log.findOne({ id: Number(req.query.id) });
            if (result) res.send(result);
            else res.status(404).send("Not found");
        }
        else {
            const logs = await Log.find();
            res.json(logs);
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//get route via path params
router.get("/:id", async (req, res) => {
    try {
        const result = await Log.findOne({ id: Number(req.params.id) });
        result ? res.json(result) : res.status(404).send("Not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});


//DELETE route 
router.delete("/:id/delete", async (req, res) => {
    try {
        const result = await Log.findOneAndDelete({ id: Number(req.params.id) });

        result ? res.json(result) : res.status(404).send("Food not found");
    } catch (error) {
        res.status(500).send("Server error");
    }
});


//PATCH route
router.patch("/:id/edit", async (req, res) => {
    //instead of multiple db calls, complie all potential updates to an object and query that
    const updatedFields = {};

    if (req.query.user_id) updatedFields.user_id = Number(req.query.user_id);
    if (req.query.date) updatedFields.date = req.query.date;
    if (req.query.food_ids) updatedFields.food_ids = req.query.food_ids.map(id => Number(id));
    console.log(updatedFields.food_ids);

    try {
        const result = await Log.findOneAndUpdate(
            { id: Number(req.params.id) },
            { $set: updatedFields },
            { new: true } // return the updated document not the old one
        );

        //filling in the rest of the fields - get all food and user info from db
        const foods = await Food.find({});
        const users = await User.find({});

        //Call the calculation method i made 
        await result.calcMacros(foods, users);

        res.setHeader('Content-Type', 'text/plain');
        result ? res.json(result) : res.status(404).send("Log not found");
    } catch (error) {
        res.status(500).send("Server error");
    }

});

//error handler
router.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

export default router;