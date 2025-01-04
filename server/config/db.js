const mongoose = require("mongoose");

const connectdDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
        });
        console.log("Mongodb connected");

    }catch(error){
        console.log("connection error:", error.message);
        process.exit(1);

    }
}

module.exports =connectdDB;