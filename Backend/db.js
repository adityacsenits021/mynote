// getting-started.js
const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/mynote?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
 
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
      console.log("Welcome to mongodb");
    })
}

module.exports=connectToMongo;
