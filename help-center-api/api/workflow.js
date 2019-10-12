const express = require('express');
const router = express.Router();
const Workflow = require('../models/workflowModel')
const Log = require('../models/logModel')

router.get('/', function (req, res) {
  Workflow.find({}, (err, workflow) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(workflow);
      });
})
router.get('/:id', function (req, res) {
  Workflow.findById(req.params.id, (err, workflow) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(workflow);
      });
})

router.post('/', function (req, res) {
  if(req.headers.username)
    {
    let newWorkflow= new Workflow(req.body);
    newWorkflow.modifiedOn=Date.now();
    newWorkflow.createdOn=Date.now();
    newWorkflow.save((err, workflow) => {
    if (err) {
      res.status(500).send(err);
    }
    log(req,"Add",(err)=>{
      if (err) {
        res.status(404).send(err);
      }
      res.status(201).json(workflow);
    })
    
  });
  }
  else 
  res.status(401).json({ message: "Access Denied" });

})

router.put('/:id', function (req, res) {
  if(req.headers.username)
  {
    req.body.modifiedOn=Date.now();
  Workflow.update(
        { _id: req.params.id },
         req.body,
         { new: true },
        (err, workflow) => {
          if (err) {
            res.status(500).send(err);
          }
          log(req,"Update",(err)=>{
            if (err) {
              res.status(404).send(err);
            }
            res.status(201).json({"message": "Workflow updated successfully"});
          })
        }
      );
    }
    else
    res.status(401).json({ message: "Access Denied" });


})

router.delete('/:id', function (req, res) {
   if(req.headers.username)
   {
    Workflow.findOne({ _id: req.params.id }, (err, workflowObj) => {
        if (err) {
          res.status(404).send(err);
        }
        console.log("to delete wf",workflowObj)
        req.body.workflow = workflowObj.workflow;
        workflowObj.remove(()=>{
          log(req,"Delete",(err)=>{
            if (err) {
              res.status(404).send(err);
            }
            res.status(200).json({ message: "Workflow deleted successfully " , workflow:req.body.workflow });
          })
        })
        
        
      });
    }
    else 
      res.status(401).json({ message: "Access Denied" });
})

function log(req,action,cb){
  let log = new Log({
    username: req.headers.username,
    action:action,
    workflow:req.body.workflow
  })
  log.save((err, log) => {
    if (err) {
      cb(err)
    }
    cb()
  });
}
module.exports = router;