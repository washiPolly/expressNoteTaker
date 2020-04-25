// Dependencies
var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');
var express = require("express");
var apiRoutes = require('./routing/api-routes');
var htmlRoutes = require('./routing/html-routes');


var app = express();
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// require('./routing/api-routes')(app);
// require('./routing/html-routes')(app);


var PORT = process.env.PORT || 8081;



//parse applicaiton/x-www0form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//parse applicaiton/json
app.use(bodyParser.json())




// app.get('/', (req, res)=> {
//     res.send('welcome to the development api-server');
//     dbRouter(app,fs);
// });




app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
})