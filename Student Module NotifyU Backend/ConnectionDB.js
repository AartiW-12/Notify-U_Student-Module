require("dotenv").config();
const mongoose = require('mongoose');
const mongoURI_1 = process.env.MONGO_URI_ATLAS;
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI_1);

        console.log('Connected to MongoDB');
        const studentData = await mongoose.connection.db.collection("LoginTB").find({ }).toArray();
    } catch (err) {
        console.error('Error:', err);
    } 
};




module.exports = mongoDB;