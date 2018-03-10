const express = require('express');
const app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var routes = require('./routes');
var path = require("path")

const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

console.log('pwd', __dirname)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, function() {
    console.log('listening')
})

app.use('/', routes)