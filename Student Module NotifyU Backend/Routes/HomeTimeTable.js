const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/Home_Time_Table', async (req, res) => {
    try
    {
        const ConnectDB = await mongoose.connection.db.collection("Lecture_Time_Table");
        const data = await ConnectDB.find({ Year : "Final Year" });

        const arr = await data.toArray();
        const file = arr.map(doc => doc.TimeTable);
        // console.log(file);

        res.json(file);
    }
    catch (err)
    {
        res.json(false);
    }

});

module.exports = router;