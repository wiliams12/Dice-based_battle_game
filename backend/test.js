var express = require('express');
var app = express();

//setting middleware
app.use(express.static('../frontend/static')); //Serves resources from public folder
app.listen(5000);
