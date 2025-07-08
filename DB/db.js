const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()
const url =  process.env.MONGO_URL

// const connection = mongoose.connect(url).then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.log("❌ DB error:", err));

const connection = ()=>{
    mongoose.connect(url).then(()=> console.log("MOngoDB COnnect"))
    .catch((err)=>console.log("DB Error:",err));
}
module.exports = connection
