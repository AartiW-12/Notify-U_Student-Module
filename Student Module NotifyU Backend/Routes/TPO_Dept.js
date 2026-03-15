const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/companyMatchingSkill', async (req, res) => {
    try {
        const studentSkills = req.body.skills || [];

        const dbConnect = mongoose.connection.db.collection("TPO_Department");
        const companies = await dbConnect.find({}).toArray();

        const result = companies.map(company => {

            const companySkills = company.SkillSet.map(s => Object.values(s)[0].toLowerCase());
            const studentSkillsLower = studentSkills.map(s => s.toLowerCase());

            const matchCount = companySkills.filter(s => studentSkillsLower.includes(s)).length;
            const matchPercent = companySkills.length > 0
                ? Math.round((matchCount / companySkills.length) * 100)
                : 0;

            const driveDate = company.ArrivingDate
                ? new Date(company.ArrivingDate).toISOString().split('T')[0]
                : "TBD";

            return [
                company.companyName,
                driveDate,                                        
                matchPercent,
                company.Description || "No description available"
            ];
        });

        res.json(result);

    } catch (error) {
        // console.error(error);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;