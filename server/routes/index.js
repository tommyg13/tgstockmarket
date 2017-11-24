const express       = require("express"),
      path          = require("path"),
      axios         = require("axios"),
      Stock         = require("../models/stocks"),
      router        = express.Router();

//render the react bundle for all routes
router.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, '../../client/build/'));
});

// get all stocks from db
router.post("/fetcStocks",(req,res)=>{
    Stock.find({})
        .then(response=>{
            res.status(200).json({stocks:response});            
        });
});

// handle add new stock
router.post("/addNew",(req,res)=>{
    const { stock } = req.body;
    // send error message if the stock name is empty
    if(!stock) {
        res.status(400).json({error:"Can't be blank"});
    } else {
        //send request to quandl with requested stock
            let today = (new Date).toLocaleDateString().split("/");
            let formattedDate = today[2]+"-"+today[0]+"-"+today[1];
            let url=`https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?api_key=${process.env.QUANDL_KEY}`;
            console.log(url);
     axios.get()
          .then(response=>{
              let newStock = new Stock;
              const { data, name, id} = response.data.dataset;
                Stock.findOne({stockID:id})
                    .then(exists=>{
                        if(exists) {
                            // handle duplicate stock
                            res.status(400).json({ error:"stock already exists"});             
                        } else {
                            newStock.stockData = data;
                              newStock.stockName = name;
                              newStock.stockID   = id;
                              newStock.save(err=>{
                                  if(err) {
                                      //handle db errors
                                    res.status(500).json({ error:"error saving to database"});
                                  } else {
                                      //send stocks
                                      res.status(200).json({data:newStock.stockData});
                                      //send stocks to all connected clients
                                    Stock.find({}).then(dataset=>req.app.io.emit("stocks",dataset));                                       
                                  }
                          });                            
                        }
                    });
          })
          .catch(err=>res.status(404).json({ error:err.response.data.quandl_error.message }));
    }
});


module.exports = router;