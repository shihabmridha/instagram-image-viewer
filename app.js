/**
 * Created by Shihab Mridha
 * on 05-Dec-16.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    request = require('request');

var app = express();


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

app.get('/', function (req, res) {
    res.render('index',{
        status : 200,
        display: 'none',
        src: ''
    });
});

app.post('/', function (req, res) {
    var username = req.body.username;
    request('https://www.instagram.com/' + username, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var indexOf = body.indexOf("profile_pic_url");
            var url = '';
            for(var i = indexOf+22; i <= body.length; i++){
                if(body[i+1] != ',' ){
                    url += body[i];
                }else{
                    break;
                }
            }

            var temp = url.split("/");
            url = temp[0] + "//" + temp[2] + "/" + temp[3] + "/" + temp[5];

            res.render('index',{
                status : 200,
                display: 'block',
                src: url
            });

        }else{
            res.render('index',{
                status : response.statusCode,
                display: 'none',
                src: ''
            });
        }
    });
});

/**
 * Setup listener port
 */
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function () {
    console.log('Ppp is running on port', app.get('port'));
});