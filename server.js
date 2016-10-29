var express = require('express');
var app = express();
var path = require('path');

//Server data 
app.use("/app", express.static(__dirname + '/app'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/components", express.static(__dirname + '/components'));
app.use("/about-page", express.static(__dirname + '/about-page'));
app.use("/conformity-cr", express.static(__dirname + '/conformity-cr'));
app.use("/ContactUs-page", express.static(__dirname + '/ContactUs-page'));
app.use("/home-page", express.static(__dirname + '/home-page'));
app.use("/nav-bar", express.static(__dirname + '/nav-bar'));
app.use("/Navigation-page", express.static(__dirname + '/Navigation-page'));
app.use("/Test-cr", express.static(__dirname + '/Test-cr'));



app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
}); 



app.get('/getValue', function(req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});