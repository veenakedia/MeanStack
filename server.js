var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app=express();
//set view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//this is to render html
app.engine('html',require('ejs').renderFile);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//this is to let server know to use client folder which has angular file
app.use(express.static(path.join(__dirname, 'client')));

//set routes path
app.use('/',index);
app.use('/api/v1',todos);

app.listen(3000, function(){
    console.log('server started on 3000');
})