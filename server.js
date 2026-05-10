const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb+srv://Shaik_Afiya:Afiya0786%40@cluster0.n29rwa0.mongodb.net/apnacollege-db";
const client = new MongoClient(MONGO_URL);

let db;

// connect once
async function connectDB() {
    await client.connect();
    db = client.db("apnacollege-db");
    console.log("MongoDB connected");
}

connectDB();

// GET all users
app.get("/getUsers", async (req, res) => {
    const data = await db.collection("users").find({}).toArray();
    res.send(data);
});

// POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    const result = await db.collection("users").insertOne(userObj);
    res.send(result);
});

// start server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
