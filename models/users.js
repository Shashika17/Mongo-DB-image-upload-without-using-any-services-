const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://shashigakavinda:NissanGTR@cluster0.jukvicp.mongodb.net/?retryWrites=true&w=majority");

connect.then(()=>{
    console.log("\x1b[32m%s\x1b[0m", "Database connected Successfully");
})
.catch(()=>{
    console.log("\x1b[31m%s\x1b[0m","Database cannot be connected");
});

const ImageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true
    }
});

const imagecollection =new mongoose.model("newimages",ImageSchema);
module.exports=imagecollection;