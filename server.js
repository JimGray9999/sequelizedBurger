// required npm packages
var express = require('express');
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express(); // create an app instance of express.js

// set handlebars as the engine, main as the default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static content for the app from the "public" directory in the application directory.
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// allow for the method override
app.use(methodOverride("_method"));

// sync to db and create connection to port
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Shhh, listening on port " + PORT);
    console.log("navigate to http://localhost:" + PORT);
  });
});
