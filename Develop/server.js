// Dependencies
var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8081;

//parse applicaiton/x-www0form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse applicaiton/json
app.use(bodyParser.json())


require('./routing/api-routes.js')(app,fs);
require('./routing/html-routes.js')(app);

app.get('/', (req, res)=> {
    res.send('welcome to the development api-server');
    dbRouter(app,fs);
});




app.listen(PORT, function(){
    console.log("App listeningon PORT: " + PORT);
})