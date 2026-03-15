const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.post('/getProfile', async (req, res) => {
    const prn = req.body.userID;

    try {
        const collection = mongoose.connection.db.collection("ProfileTable");

        const profile = await collection.findOne(
            { PRN: prn },
            { projection: { _id: 0 } }
        );

        if (!profile) {
            return res.json({ success: false, message: "Profile not found" });
        }

        const output = [
            profile.Name,
            profile.Branch,
            profile.Div,
            profile.Class,
            profile.skills || []
        ];

        res.json(output);

    } catch (error) {
        // console.log(error);
        res.json({ success: false });
    }
});



router.post('/updateProfile', async (req, res) => {
    const { userID, skills } = req.body;

    try {
        const collection = mongoose.connection.db.collection("ProfileTable");

        await collection.updateOne(
            { PRN: userID },
            { $set: { skills: skills } }
        );

        res.json({ success: true });

    } catch (error) {
        // console.log(error);
        res.json({ success: false });
    }
});



router.post('/deleteSkill', async (req, res) => {
    try {
        // console.log(req.body);
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false });
    }
})
module.exports = router;