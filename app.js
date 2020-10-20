//Jaydeep-shelake:<Pass@123>@cluster0.dvyoz.mongodb.net/Project 1?retryWrites=true&w=majority
 const express = require('express');
 const mongoose = require('mongoose');
 const Url = require('./modles/url');
 const port = process.env.PORT || 3000;
 const app = express();
 const path = require('path');
 const views = path.join(__dirname,'./views');
const uri = process.env.MONGODB_URI  ||'mongodb://localhost:27017/urlshortner'

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('connected to database...'))

 app.set('view engine','ejs');
 app.set('views',views);
 app.use(express.urlencoded({extended:false}));
app.get('/', async(req,res)=>{
  const shortUrls= await Url.find()
  res.render('index',{shortUrls:shortUrls});
});

app.post('/shorturl',async(req,res)=>{
   await Url.create({fullUrl:req.body.fullurl}) // fullurl is name set from index.ejs of input
   res.redirect('/')
});

app.get('/:shortUrl',async(req,res)=>{
 const shortUrl= await Url.findOne({shortUrl:req.params.shortUrl});
 if(shortUrl==null) return res.sendStatus(404);

 shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.fullUrl);
});

 app.listen(port,()=>{
 console.log(`your application is running at http://localhost:${port}`);
 });