const express = require("express");
const bodyParser = require("body-parser");
const db =  require("./config/db");
const workflow =  require("./api/workflow");
const log =  require("./api/log");
const auth = require('./api/auth')
const app = express();
const cors = require('cors')
const port = 3500;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
db.init();
app.use('/api/workflow',workflow)
app.use('/api/logs',log)
app.use('/api/auth',auth);
app.get('/test',(req,res)=>{
    res.send("Test")
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});