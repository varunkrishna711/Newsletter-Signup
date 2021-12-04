const bodyParser = require("body-parser");
const express = require("express");
// const request = require("request");
const https = require("https");

const app = express();

// to get the CSS present in the files correctly, add a static function of express so that all static files get modified on the screen
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(firstName,lastName,email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/881954da82"; //audience id

    const options = {
        method: "POST",
        auth: "varun123:30bec8b90693c7c898c72bbb22720263-us20"
    }

    const request = https.request(url,options, function(response){
        if(response.statusCode === 200)
            res.sendFile(__dirname+"/success.html");
        else  
            res.sendFile(__dirname+"/failure.html");

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(3000, function(){
    console.log("Server is running at port 3000");
})


// 30bec8b90693c7c898c72bbb22720263-us20   API key

// 881954da82  Audience ID