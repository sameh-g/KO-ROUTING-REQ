var express = require('express');
var app = express();
var path = require('path');
var sql = require('mssql');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
// var User   = require('./app/models/user'); // get our mongoose model
var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');
var ActiveDirectory = require('activedirectory');
var ntlm = require('express-ntlm');

app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var user ={Name:'sameh'}
// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

var config = { url: 'ldap://10.0.0.172',
               baseDN: 'dc=ctstest,dc=local'
            }

var ad = new ActiveDirectory(config);
var username = 'sameh.george@ctstest.local';
var password = 'Xyz78901' 

    var dbConfig = {
        server : "SGEORGE-8-8777",
        database : "TRADBPOC",
        user : "sg",
        password : "Xyz@123sameh"
    };


app.use(ntlm({
    domain: 'ctstest',
    domaincontroller: 'ldap://10.0.0.172',
}));

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

// function middleWareAuthentication(req, res, next) {
//      // here we need check for authentication for the middle ware authentication.. 
//        res.redirect("/login");
    
// }
// app.use(middleWareAuthentication);


var userName = process.env['USERPROFILE'].split(path.sep)[2];
var loginId = path.join("domainName",userName);
console.log('loginid**********',loginId);


app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
}); 

app.get('/login', function(req, res) {
    //here should fire a submit button a request with 
    //Username and password then add it to the token value from JWT..
    //if authenticated redired to index page if not show a validation error with invalid username or password.. 

    res.sendFile(path.join(__dirname + '/login.html'));
}); 



app.get('/authenticate', function(req, res) {
    ad.authenticate(username, password, function(err, auth) {
  if (err) {
           res.send('false')
//    res.sendFile(path.join(__dirname + '/login.html'));
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }

  if (auth) {
        //   res.sendFile(path.join(__dirname + '/index.html'));
          res.send('true')
    console.log('Authenticated!');
  }
  else {
    res.send('false')
    console.log('Authentication failed!');
  }
});

 
}); 



app.get('/getValue', function(req, res) {
GetReportedCRMCases(res)
});

    //     // if user is found and password is right so that we authenticating our service now.. 
    //     // create a token
    //     var token = jwt.sign(user, app.get('superSecret'), {
    //        expiresIn : 60*60*24// Expiration Time.. 
    //     });

    //     console.log('**token Value**',token)
    //   // verifies secret and checks exp
    // jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    //   if (err) {
    //     return res.json({ success: false, message: 'Failed to authenticate token.' });    
    //   } else {
    //     console.log(decoded.Name)
    //     // if everything is good, save to request for use in other routes
    //     req.decoded = decoded;    
    //     // next();
    //   }
    // });


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



//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
      res.sendFile(path.join(__dirname + '/404.html'));
});


app.listen(3020, function () {
  console.log('Example app listening on port 3020!');
});