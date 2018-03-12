const express = require('express');
const app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var routes = require('./routes');
var path = require("path");
const models = require('./models');

const env = nunjucks.configure('views', {noCache: true});
// app.set('views', __dirname+'/public/views');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

console.log('pwd', __dirname)
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'views')))

models.db.sync({force:true})
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));

app.use('/', routes)