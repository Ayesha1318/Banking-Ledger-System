const mongoose = require('mongoose');

function connectToDb(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("server is connected to database")
  })
  .catch((err)=>{
    console.log("Error to connect to db");
    process.exit(1);
  })
}

module.exports = connectToDb;