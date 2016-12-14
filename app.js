/**
 * Created by Shihab Mridha
 * on 05-Dec-16.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

var app = express();

/**
 * Routes;
 */
var profile = require('./routes/index');
var postImg = require('./routes/postimage');

/**
 * View Engine
 */
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

/**
 * Body-parser Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/**
 * Set static path
 */
app.use(express.static(path.join(__dirname,'public')));

/**
 * Use routes
 */
app.use('/',profile);
app.use('/',postImg);

/**
 * Setup listener port
 */
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function () {
    console.log('App is running on port', app.get('port'));
});