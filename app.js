//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.First_Name;
  var lastName = req.body.Last_Name;
  var email = req.body.Email;

  var data = {
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

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/b1b24e10ba",
    method: "POST",
    headers: {
      "Authorization": "Ehis b44161bb83e03fca5b6e8475fa697107-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    };
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server Started At Port 3000");
});

//API key
//b44161bb83e03fca5b6e8475fa697107-us4


//List id
//b1b24e10ba
