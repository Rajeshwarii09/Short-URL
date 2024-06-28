const express = require("express");
const path = require("path");
const staticRoute= require('./routes/')

const mongoose = require("mongoose");
const {connectToMongoDB} = require("./connect");
const urlRoute = require('./routes/url');

const URL = require("./models/url");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/url", urlRoute);
app.use('/' , staticRoute)
const PORT = 8001;


// app.get('/:shortId',(req,res)=>{
//     const shortId = req.params.shortId;
//     await URL.findOneAndUpdate({
//         shortId
//     }, {$push:{
//         visitHistory : Date.now();
//     }})
// })

mongoose.connect("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"));
  
    app.set("view engine","ejs");
    app.set('view',path.resolve("./views"));

app.get("/test", async (req,res)=>{
    const allUrls= await URL.findOneAndDelete({});
    return res.render('home',
       { urls: allUrls,
       }
    )
    });

app.use ("/url", urlRoute);


app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry= await URL.findOneAndUpdate({shortId},{$push:{
        visitHistory: Date.now(),
    },
}
    );
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server started at PORT`));

