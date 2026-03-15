const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/PDFupload' ,upload.single("pdf"), async (req, res) => {
    // console.log(req.file);

    
    res.send("File uploaded successfully");
});

module.exports = router;