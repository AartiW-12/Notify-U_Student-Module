const mongoose = require('mongoose');
const mongoURI_1 = "mongodb+srv://NotifyU:NotifyU123@cluster0.k4dsap2.mongodb.net/CollegeDB";

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