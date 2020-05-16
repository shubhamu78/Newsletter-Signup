const express = require('express');
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});


app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data ={
        members : [
            {
                email_address:email,
                status : "subscribed",
                merge_fields :{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };

    var json = JSON.stringify(data);

    var options = {
        url:"https://us18.api.mailchimp.com/3.0/lists/list_unique_id",
        method:"Post",
        headers:{
            "Authorization":"any_string api_key"
        },
        body : json
    };
   
    request(options,function(error,response,body){
        if(error){
            res.send("Oops Error :(");
        }
        else{
            if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
         
            }
        }

    });
    
});

app.listen(3000,function(){
    console.log("Success");

});


