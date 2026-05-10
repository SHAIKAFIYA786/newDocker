require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
    }
}

connectDB();

//GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const db = client.db("apnacollege-db");

        const data = await db
            .collection("users")
            .find({})
            .toArray();

        res.status(200).send(data);

    } catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Internal Server Error"
        });
    }
});

//POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;

        const db = client.db("apnacollege-db");

        const data = await db
            .collection("users")
            .insertOne(userObj);

        console.log(data);

        res.status(201).send({
            message: "User added successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).send({
            error: "Internal Server Error"
        });
    }
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
