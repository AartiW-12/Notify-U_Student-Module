const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/studentLogin', async (req, res) => {
    
    const prn = req.body.userName;
    const pass = req.body.password;
    // console.log("Request Received: " , req.body);
    try {
        const ConnectDB = await mongoose.connection.db.collection("LoginTB");
        const studentData = await ConnectDB.find({ Username : prn }).toArray();

        const username = studentData.map(item => item.Username).toString();
        const password = studentData.map(item => item.Password).toString();
        
        // console.log(prn , username);
        // console.log(pass, password);
        if(prn === username && pass === password )
        {
            res.json({success : true});
        }
        else
        {
            res.json({success : false , message : "Profile not found"});
        }
    } catch (error) {
        // console.log(error)
        res.send({ success: false })

    }
})


module.exports = router;