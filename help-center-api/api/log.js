const express = require('express');
const router = express.Router();
const Log = require('../models/logModel')

router.get('/', function (req, res) {
  if(req.headers.username)
  {
  Log.find({}, (err, log) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(log);
      });
  }else 
  res.status(401).json({ message: "Access Denied" });

})
router.delete('/:id', function (req, res) {
  if(req.headers.username)
  {
    Log.remove({ _id: req.params.id }, (err, logObj) => {
       if (err) {
         res.status(404).send(err);
       }
       res.status(200).json({"message":"Log deleted successfully"});
     });
   }
   else 
     res.status(401).json({ message: "Access Denied" });
})





module.exports = router;