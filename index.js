const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var userIsAuth = false;

app.use(bodyParser.urlencoded({ extended: true }));   

function userCheck(req, res, next){                     //1st runs the middleware
const password = req.body["password"];
  if(password==="rdb_31"){
    userIsAuth=true;
  }
  next();
}

app.use(userCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/check", function(req, res) {
  if(userIsAuth){
    res.sendFile(__dirname + "/secret.html")
  }
  else{
    res.sendFile(__dirname + "/index.html")
  }
});

app.listen(3000, ()=> {
  console.log("Server has started on port 3000");
});