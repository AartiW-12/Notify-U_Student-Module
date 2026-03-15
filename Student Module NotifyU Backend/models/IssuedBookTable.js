const mongoose = require('mongoose');
const {Schema} = mongoose;

const IssuedBookSchema = new Schema(
    {
        PRN:{
            type:String
        },
        BookName:{
            type:String
        },
        IssuedDate:{
            type:Date
        },
        LastDate:{
            type:Date
        },
        PendingFess:{
            type:Number
        }

    }
);

module.exports = mongoose.model("IssuedBookTable",IssuedBookSchema);