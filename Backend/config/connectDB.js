const mongoose = require("mongoose");


async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection
        connection.on("connected", ()=>{
            console.log("Connected to Mongoose database successfully...");
        })
        connection.on("error",(error)=>{
            console.log("Something went wrong in database connection..", error);
        })
    } catch (error) {
        console.log("something went wrong "+ error);
    }
}

module.exports = connectDB;