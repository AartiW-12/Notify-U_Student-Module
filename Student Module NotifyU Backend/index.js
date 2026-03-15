const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001;
const cors = require('cors')
const mongoDB = require('./ConnectionDB');
require("dotenv").config();

mongoDB();
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', require('./Routes/LoginStudents'));
app.use('/api', require('./Routes/TPO_Dept'));
app.use('/api', require('./Routes/StudentProfile'));
app.use('/api', require('./Routes/IssuedBook'));
app.use('/api', require('./Routes/Attendance'));
app.use('/api', require('./Routes/SeatingArrangement'));
app.use('/api', require('./Routes/EventList'));
app.use('/api', require('./Routes/uploadPDF'));
app.use('/api', require('./Routes/HomeTimeTable'));
app.use('/api', require('./Routes/Threshold_Attendance'));
// app.use('/api',require('./'))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})