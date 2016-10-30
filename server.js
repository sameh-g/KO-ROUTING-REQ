var express = require('express');
var app = express();
var path = require('path');
var sql = require('mssql');

    var dbConfig = {
        server : "SGEORGE-8-8777",
        database : "TRADBPOC",
        user : "sg",
        password : "Xyz@123sameh"
    };


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
GetReportedCRMCases(res)
});


function GetReportedCRMCases(res) {
    var Conn = new sql.Connection(dbConfig);
    var req = new sql.Request(Conn);
    
    Conn.connect(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            req.query("select * from ReportedCRMCases", function(err, recordset) {
                if (err) {
                    console.log(err);
                } else {
               console.log(recordset);
               res.send(recordset);
                }
                Conn.close();
            })
        }
    })
}



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});