const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.post('/get_All_Events', async (req, res) => {
    try {
        const connectionDB = mongoose.connection.db.collection("EventInfoTable");
        const Events = await connectionDB.find({}, { 
            projection: { 
                _id: 0, 
                EventName: 1, 
                StartFromTime: 1, 
                EndAtTime: 1,
                Description: 1
            }
        }).toArray();
        
        const events = Events.map(event => [
            event.EventName,
            parseInt(event.StartFromTime),
            parseInt(event.EndAtTime),
            event.Description || "No description available" 
        ]);

        res.json(events);
    }
    catch(error) {
        res.json(false);
    }
});
module.exports = router;