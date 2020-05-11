const express = require("express");
const apiRoutes = require('./routing/api-routes');
const htmlRoutes = require('./routing/html-routes');

//initialize the app and create port
const app = express();
const PORT = process.env.PORT || 8081;

//Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//start port on server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
})