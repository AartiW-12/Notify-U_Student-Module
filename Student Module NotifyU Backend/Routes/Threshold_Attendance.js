const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/get_Threshold_Attendane', async (req, res) => {
    try
    {
        const ConnectDB = await mongoose.connection.db.collection("Threshold_Attendance");
        const studentData = await ConnectDB.find({  }).toArray();

        const threshold = studentData.map(doc => doc.Threshold_value_attendance);

        // console.log(threshold);
        res.json(threshold);
    }
    catch(err){
        res.json({ success : false })

    }

});

module.exports = router;