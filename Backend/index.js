const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./config/connectDB");
const cookieParser = require('cookie-parser');

const router = require('./routes/index');

// Use cors middleware with credentials enabled
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // Include credentials like cookies in requests if needed
}));

// Use express.json middleware to parse JSON bodies
app.use(express.json());

// Use cookieParser middleware to parse cookies
app.use(cookieParser());

// Basic route for testing
app.get("/", (req, res) => {
    res.json({
        msg: "server chalu hai puneet.."
    });
});

// API endpoints
app.use('/api', router);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server successfully started on port " + PORT);
    });
});
