const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const IssuedBook = require('../models/IssuedBookTable');

router.post('/getIssuedBookList', async (req, res) => {
    const prn = req.body.userID;
    console.log("Received PRN:" , prn);

    try {
        const dbConnect = await mongoose.connection.db.collection("issuedbooktables");
        const I_Books = await dbConnect.find({ studentID: prn }).toArray();
        // console.log("RECORD", I_Books);

        if (I_Books.length === 0) {
            return res.json({ success: false, message: "Profile not found" });
        }

        const issuedBooks = I_Books.map(item => {
            const issuedDate = new Date(item.IssuedDate).toISOString().split('T')[0];
            const lastDate = new Date(item.LastDate).toISOString().split('T')[0];
            const fees = calculatePendingFees(item.IssuedDate, item.LastDate);

            mongoose.connection.db.collection("issuedbooktables").updateOne(
                { _id: item._id },
                { $set: { PendingFees: fees } }
            );

            return {
                PRN: item.studentID,
                BookName: item.BookName,
                IssuedDate: issuedDate,
                LastDate: lastDate,
                Fees: fees
            };
        });

        res.json({ issuedBooks });

    } catch (error) {
        console.error("Error fetching issued books:", error);
        res.json({ success: false, message: "An error occurred" });
    }
});

function calculatePendingFees(issuedDate, lastDate) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const lastDateObj = new Date(lastDate);

    const daysOverdue = Math.max(0, Math.floor((currentDate - lastDateObj) / millisecondsPerDay));
    const overdueFees = daysOverdue; 
    return overdueFees;
}

async function updatePendingFees(prn, fees) {
    try {
        await mongoose.connection.db.collection("issuedbooktables").updateMany(
            { studentID: prn },
            { $set: { PendingFees: fees } }
        );
        // console.log("Pending fees updated");
    } catch (error) {
        console.error("Error updating pending fees:", error);
    }
}

router.post('/getAllBooks', async (req, res) => {
    try {
        const dbConnect = mongoose.connection.db.collection("librarybookinfotables");
        const books = await dbConnect.find({}).toArray();

        if (books.length === 0) {
            return res.json({ success: false, message: "No books found" });
        }

        const bookList = books.map(book => ({
            BookID: book.bookid,
            BookName: book.name,
            Author: book.author,
            Topic1: book.topic1,
            Topic2: book.topic2,
            Topic3: book.topic3
        }));

        res.json({ bookList });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred" });
    }
});

module.exports = router;
