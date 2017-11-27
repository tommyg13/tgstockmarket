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

// remove stock from db
router.delete("/remove/:id",(req,res)=>{
    Stock.findByIdAndRemove(req.params.id).exec();
    //emit message to connected clients
    Stock.find({})
        .then(response=>{
            req.app.io.emit("stocks",response);  
            res.send(req.params.id);
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
     axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?limit=800&api_key=${process.env.QUANDL_KEY}`)
          .then(response=>{
              let newStock = new Stock;
              const { data, name, id, dataset_code} = response.data.dataset;
                Stock.findOne({stockID:id})
                    .then(exists=>{
                        if(exists) {
                            // handle duplicate stock
                            res.status(400).json({ error:"stock already exists"});             
                        } else {
                            newStock.stockData = data;
                              newStock.stockName = name;
                              newStock.stockID   = id;
                              newStock.code  = dataset_code;
                              newStock.save(err=>{
                                  if(err) {
                                      //handle db errors
                                    res.status(500).json({ error:"error saving to database"});
                                  } else {
                                      //send stocks
                                      res.status(200).json({data:newStock});
                                      //send stocks to all connected clients
                                    Stock.find({}).then(dataset=>{
                                        return req.app.io.emit("stocks",dataset);
                                    });                                       
                                  }
                          });                            
                        }
                    });
          })
          .catch(err=>res.status(404).json({ error:"Incorrect or not existing stock code" }));
    }
});


module.exports = router;