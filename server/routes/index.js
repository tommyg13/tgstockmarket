const express       = require("express"),
      path          = require("path"),
      router        = express.Router();

router.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, '../../client/build/'));
});

module.exports = router;