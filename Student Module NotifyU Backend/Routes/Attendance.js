const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/getSubAttendance', async (req, res) => {
    const userId = req.body.userID;

    try {
        const profiledata = await mongoose.connection.db.collection("AttendenceTable");
        const profile = await profiledata.find({ PRN: userId }).toArray();

        if (profile.length === 0) {
            return res.json({ success: false, message: "Profile not found" });
        }

        const attendanceData = profile.flatMap(doc =>
            doc.Attendance.map(course => [
                course['Course Name'],
                parseInt(course.Attendance) 
            ])
        );

        res.json(attendanceData);

    } catch (error) {
        // console.log(error);
        res.json({ success: false });
    }
});
module.exports = router;