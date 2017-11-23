const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT;
// const Promise = require("bluebird");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();
const app = express();
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URL,{useMongoClient:true},(err)=>{
//     if(err) console.log(err);
//     else console.log("connected to db");
// });

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(require("./routes/index")); 


app.listen(port,()=>{
    console.log("server running");
});

module.exports = app;