const mongoose = require("mongoose");

let stocksSchme = mongoose.Schema({
    stockData: Array,
    stockID:  {type:String},
    stockName: String
});

module.exports = mongoose.model('Stock', stocksSchme);