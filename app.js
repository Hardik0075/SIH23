// import express from 'express';
const express = require('express');
const app=express();
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const axios = require('axios');
// import path from 'path';
const path = require('path');
// import fetch from 'node-fetch';
// const axios = require('axios');
// import * as request from 'request';
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const express = require('express');
// const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'));
app.set('view engine', 'pug');
app.set("views",path.join(__dirname,"views"));
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// set mongodb local storage\

mongoose.connect('mongodb://0.0.0.0/SIH', {useNewUrlParser: true});


var conn = mongoose.connection;
// checks database is connected or not
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})


// api connection
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// schema of our collection
const contactSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    unique_id:String,
    pr_name : String,
    project_dis:String,
    tech_name: String,
    theme:String,
    domain:String
  });
  //model using that schema and here data in plural form  used as name of collection
const Contact = mongoose.model('techbag', contactSchema);
app.use(express.json());

app.post("/run",async(req,res)=>{
     
})

app.get('/',(req,res)=>{
    // var parmas={ };
        res.sendFile(path.join(__dirname, '/index.html'));
        // res.render("home");
})

// app.get("/smartauto",async(req,res)=>{
//     const items = await Contact.find(req.query);

//     // const contents = await Contact.find();
//     const numItems = items.length;
//     res.render("add",{items:items,num:numItems});

// })

app.get("/upload",(req,res)=>{
    res.render('index');

})

app.post("/contact",async(req,res)=>{
   
    try{
        const apiKey = 'abc0508769mshb8592cf98146751p191b6fjsnb4a1946ba880';
        const textToCheck = req.body.project_dis;
    
        // Make a POST request to the RapidAPI plagiarism detection service
        const response = await axios.post(
          'https://ai-plagiarism-checker.p.rapidapi.com/api/v2/detect/ai_content',
          {
            content: textToCheck,
          },
          {
            headers: {
              'x-rapidapi-host': 'ai-plagiarism-checker.p.rapidapi.com',
              'x-rapidapi-key': apiKey,
              'content-type': 'application/json',
            },
          }
        );
    
        // Process the response from the external API as needed
        const plagiarismResult = response.data.ai_percentage;
        
        if(plagiarismResult<20){
            var myData = new Contact(req.body);
            myData.save().then(()=>{
             // res.send("data saved");
            //  res.render("show",{title:myData.name,contact:myData.project_dis})
            res.render("uploadproject");
            }).catch(()=>{
             res.send("err occurs");
            });
              
        }
        else{
            res.render("notuploadproject");
        }
    }
    //     res.json({ plagiarismResult });
       catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking for plagiarism' });
      }
})

// sign in page 

app.get("/sign",(req,res)=>{
    res.render("register");
})
app.post("/login",async(req,res)=>{
    const name= req.body.email;
    const password = req.body.password;
    var unique_id = req.body.unique_id;
    unique_id=unique_id.substr(4, 1);
    Contact.findOne({email: name}).then(user=>{
        if(user){
            if(user.password === password){
                var us=user.unique_id; 
                us="S";
                // console.log(us);
                if(unique_id === us){
                    // student 
                res.redirect("/stu");
                // res.render("add",{items:items,num:numItems});
            }
              else if(unique_id === "O"){
                res.redirect("/org");
              }
              else{
                res.send("not found");
              }
            }
            else{
                res.status(401).render("wrongPass");
            }
        }
        else{
            res.status(404).render("usernotfound");
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send("internal error");
    })
})
app.get("/wrong",(req,res)=>{
    res.status(401).render("usernotfound");
})

// about us
app.get("/about",(req,res)=>{
    res.render('about');
})

// profile page
app.get("/profile",async(req,res)=>{
    const email = 'hardiksharma96633@gmail.com';
    const items = await Contact.find();
    
    const numItems = items.length;
    console.log(items);
    res.render("profile",{items:items,num:numItems});

})

app.get("/org",async(req,res)=>{
    const items = await Contact.find();
    const numItems = items.length;
    res.render("org1",{items:items,num:numItems});
})
app.get("/stu",async(req,res)=>{
    const items = await Contact.find();
    const numItems = items.length;
    res.render("stu1",{items:items,num:numItems});
})
// app.get("/uploaddone",(req,res)=>{
//     res.render("notuploadproject");
// })



// app.get("/feed",async(req,res)=>{
//     // const theme = 'Hardware';
//     // const items = await Contact.find({ theme });
//     const items = await Contact.find();
//     const numItems = items.length;
//     res.render("add",{items:items,num:numItems});
//     // console.log(items[0].project_dis);
//     // Contact.findOne({email: "hardiksharma96633@gmail.com"}).then(user=>{
//     //           res.render("profile",{name:user.password,unique_id:user.unique_id,email:user.email,num:"2"});
//     // }).catch(err=>{
//     //     console.log(err);
//     // })
// })

app.get("/filtero",async(req,res)=>{
    // const theme = req.query.theme;
    // const up_theme =theme[0].toUpperCase() +
    // theme.slice(1);
    const items = await Contact.find(req.query);

    // const contents = await Contact.find();
    const numItems = items.length;
    res.render("org1",{items:items,num:numItems});

})


app.get("/filters",async(req,res)=>{
    // const theme = req.query.theme;
    // const up_theme =theme[0].toUpperCase() +
    // theme.slice(1);
    const items = await Contact.find(req.query);

    // const contents = await Contact.find();
    const numItems = items.length;
    res.render("stu1",{items:items,num:numItems});

    // console.log(items[0].project_dis);
    // Contact.findOne({email: "hardiksharma96633@gmail.com"}).then(user=>{
    //           res.render("profile",{name:user.password,unique_id:user.unique_id,email:user.email,num:"2"});
    // }).catch(err=>{
    //     console.log(err);
    // })

    // const filters = req.query;
    // if(filters.length === 0){
    //     const items = await Contact.find();
    // const numItems = items.length;
    // res.render("add",{items:items,num:numItems});
    // }
    // else{
    // const filteredUsers = Contact.filter(user => {
    //   let isValid = true;
    //   for (key in filters) {
    //     console.log(key, user[key], filters[key]);
    //     isValid = isValid && user[key] == filters[key];
    //   }
    //   return isValid;
    // });
    // res.send(filteredUsers);
    // }
// res.send("hello");
// var no = 0;
// for (var key in req.query) { 
//     if(req.query[key]) no++;
// }
// console.log(no);

})
 



app.listen('80',()=>{
    console.log("Server is running on port 3000");
})