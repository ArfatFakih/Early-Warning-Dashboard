const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected")
    } catch (error) {
        console.log("Mongoodb Connection failed",error);
        process.exit(1);
    }
}

module.exports = connectDb;