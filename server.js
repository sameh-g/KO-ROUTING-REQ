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

app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var user ={Name:'sameh'}
// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

// app.post('/login',
//   passport.authenticate('WindowsAuthentication', {
//     successRedirect: '/loginSuccess',
//     failureRedirect: '/loginFailure'
//   })
// );

// app.get('/loginFailure', function(req, res, next) {
//   res.send('Failed to authenticate');
// });

// app.get('/loginSuccess', function(req, res, next) {
//   res.send('Successfully authenticated');
// });


// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });

// passport.use(new WindowsStrategy({
//     integrated: true 
// }, function(profile,done) {
//     var user = {
//         id: profile.id,
//     };
//     done(null, user);
// }));

// app.all("*", passport.authenticate("WindowsAuthentication"), function (request,response,next){
//     next();
// });


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


var userName = process.env['USERPROFILE'].split(path.sep)[2];
var loginId = path.join("domainName",userName);
console.log('loginid**********',loginId);

app.get('/authenticate', function(req, res) {
          res.send("authenticate with "+loginId);
}); 
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
}); 



app.get('/getValue', function(req, res) {

        // if user is found and password is right so that we authenticating our service now.. 
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
           expiresIn : 60*60*24// Expiration Time.. 
        });

        console.log('**token Value**',token)
      // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        console.log(decoded.Name)
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        // next();
      }
    });


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



//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
      res.sendFile(path.join(__dirname + '/404.html'));
});


app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});