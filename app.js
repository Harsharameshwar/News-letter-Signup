const express = require("express");

const https = require("https");

const bodyparser = require("body-parser");

const request = require("request");

const app = express();

app.use(express.static("public"));


app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
  const first_name = req.body.firstname
  const sec_name = req.body.secondname
  const email = req.body.emailaddress
  const passwd = req.body.password
  // console.log(firs_tname);
  // console.log(sec_name);
  // console.log(email);
  // console.log(passwd);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:first_name,
          LNAME:sec_name,
          PASSWORD:passwd
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/bc0f1cee73"

  const options = {
    method:"post",
    auth:"harsha:8c593846888507de29e9ad53670cbd2c-us5"
  }

  const request = https.request(url,options,function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
      console.log(response.statusCode);
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
   console.log("Server listening on port 3000!");
});

// 8c593846888507de29e9ad53670cbd2c-us5
