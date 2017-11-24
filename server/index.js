const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT;
const http = require("http");
const Stock = require("./models/stocks");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGOLAB_URI,{useMongoClient:true},(err)=>{
    if(err) console.log(err);
    else console.log("connected to db");
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/index")); 

app.io = io;
// io.on("connection", socket => {
//   console.log("New client connected");
//   setInterval(renderData,300);
//   function renderData() {
//     Stock.find({})
//         .then(stocks=>{
//             socket.emit("stocks",stocks);
//         })
//   }
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });
// io.on("connection", socket => {
//   console.log("New client connected");
//   setInterval(renderData,300);
//   function renderData() {
//     Stock.find({})
//         .then(stocks=>{
//             socket.emit("stocks",stocks);
//         })
//   }
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

server.listen(port,()=>{
    console.log("server running");
});

module.exports = server;