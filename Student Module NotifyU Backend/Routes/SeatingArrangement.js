const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/getSeatingArrangement', async (req, res) => {
    const prn = req.body.userID;
    // console.log("Seating Arrangement ", req.body);
    try {
        const profiledata = await mongoose.connection.db.collection("SeatingArrangementTable");
        const records = await profiledata.find({ PRN: prn }).toArray();

        if (records.length === 0) {
            return res.json({ success: false, message: "Profile not found" });
        }

        const dataArray = records.map(record => [
            record.Date ? new Date(record.Date).toISOString().split('T')[0] : "N/A",
            record["CourseName"],
            record["CourseCode"],
            record["BlockNo"],
            record["BenchNo"]
        ]);

        res.json(dataArray);

    } catch (error) {
        // console.log(error);
        res.json({ success: false });
    }
});
module.exports = router;