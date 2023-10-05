const express = require("express");
const app = express();
const path = require('path');
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/contact', {useNewUrlParser: true});


var conn = mongoose.connection;
// checks database is connected or not
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

var bodyParser = require('body-parser')

app.set("view engine","pug");
// app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));
// app.use(express.static(path.join(__dirname,'css')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// api integration
const qs = require('querystring');
const http = require('https');

const options = {
	method: 'POST',
	hostname: 'plagiarism-source-checker-with-links.p.rapidapi.com',
	port: null,
	path: '/data',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'abc0508769mshb8592cf98146751p191b6fjsnb4a1946ba880',
		'X-RapidAPI-Host': 'plagiarism-source-checker-with-links.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(qs.stringify({
  text: 'BMI is very useful to know about your body.'
}));
req.end();




// schema of our collection
const contactSchema = new mongoose.Schema({
    name: String,
    contact: String,
    mesg: String
  });
  //model using that schema and here data in plural form  used as name of collection
  const Contact = mongoose.model('data', contactSchema);
//   var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get("/",(req,res)=>{
   var parmas={ };
    res.render('index',parmas);
})

// send dataa to mongodb

app.post("/contact",(req,res)=>{
    console.log(req.body);
   var myData = new Contact(req.body);
   myData.save().then(()=>{
    // res.send("data saved");
    res.render("show",{title:myData.name,contact:myData.contact,mesg:myData.mesg})
   }).catch(()=>{
    res.send("err occurs");
   });
})

// to retrive data
app.get("/fetch",(req,res)=>{
  Contact.find({}).then(data=>{
   if(data){
    // let company = data.map((data)=>{
    //     // return {name: data.name,contact:data.contact};

    //     return data.name
         
    //  } ); 
    // res.render("show",{title:company,contact:company.contact})
    res.send(data);
   }
   else{
    res.status(404).json({
        error : 'not found'
    });
   }
  }).catch(err=>{console.log(error)})


})

//to update data
app.put("/update/:id/:name",(req,res)=>{
   console.log(req.params.id);

    
    Contact.findByIdAndUpdate({_id:req.params.id}, 
        { $set:{name: req.params.name,
                contact:"u",
                mesg:"why"

         }}).then(data=>{
        res.send(data);
    })
    .catch((err)=>{console.log(err)})
})

app.get("/new",(req,res)=>{
    res.render("update")
})
app.post("/update/:id",(req,res)=>{
    res.send(req.body.name);

   const id= "64e46fe05c60b2177a49259a" ;
    Contact.findByIdAndUpdate({_id:req.params.id}, 
        { $set:{name: req.body.name,
                contact:"u",
                mesg:"why"

         }}).then(data=>{
        res.send(data);
    })
    .catch((err)=>{console.log(err)})
})



//delete data using id
app.delete('/delete/:id', (req , res) =>  {
     const id = req.params.id;
     Contact.findByIdAndDelete({"_id":id}).then((data) =>{
        if(!data){
            res.status(404).send("not found");
        }
        else{
        res.send(data);}
        }).catch((err)=>{
            console.log(err);
        });

    })

    app.use(express.json());

app.get("/all",(req,res)=>{
    Contact.find({"_id":"64e7089ee849b6f8a80e4741"}).then((data)=>{
        res.json(data);
    });
    
})
app.listen(80,()=>{
    console.log("run");
})