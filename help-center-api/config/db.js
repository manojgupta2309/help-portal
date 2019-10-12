const mongoose = require('mongoose');

const connectionString = `some connection string`;
const connector = mongoose.connect(connectionString)

module.exports = {
    init:()=>{
        
        connector.then(
            () => {
              console.log("Database connection established!");
            },
            err => {
              console.log("Error connecting Database  due to: ", err);
            }
          );
        
         
    }
}
