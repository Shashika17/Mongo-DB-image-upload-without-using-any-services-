const express = require('express');
const multer = require('multer');
const imagecol = require('./models/users.js');
const app = express();
const port = 3000;
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//---check ------
app.get('/',(req,res)=>{
    res.send("Hello World!");
});

//uploade image to monogodb data base
app.post('/upload',upload.single('image'), async (req, res) => {
    try{
    const blob = req.file.buffer;
    const data =
    {
        name : req.body.name,
        image : blob
    }
    const userdata = await imagecol.insertMany(data);
    console.log(userdata);
    if(userdata){
    res.status(200).send('File Uploaded successfully!');
    }
    else
    {
       res.send('error'); 
    }
       }
    catch
    {
       res.send("Internal Server Error")
    }
});

//retrive image from mongodb database
app.post('/image', async (req,res) => {
   try{ 
    const existingUser =await imagecol.findOne({name: req.body.name });
    console.log (existingUser.image);
    if (existingUser && existingUser.image) {
        // Send the image as a response
        res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
        res.send(existingUser.image);
    } else {
        res.status(404).send('Image not found');
    }
} catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
}
});



//---------------------------defines port-------------------
app.listen(port,() => 
{
    console.log("server is running");
});
//----------------------------------------------------------