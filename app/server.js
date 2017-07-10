var express = require('express');
var app = express();
var root = process.cwd();
//var favicon = require('serve-favicon');
//var path = require('path');


app.use(express.static('html'));
//app.use(favicon(path.join(__dirname, 'html', 'images', 'favicon.ico')));


//your routes here
/*app.get('/login', function (req, res) {
    res.sendFile('html/login/index.html', {root});
});

app.get('/signup', function (req, res) {
    res.sendFile('html/login/index.html', {root});
});
*/

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
