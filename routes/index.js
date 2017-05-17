/**
 * Created by Shihab Mridha
 * on 13-Dec-16.
 */

var express = require('express'),
    request = require('request');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index');
});

router.post('/index', function (req, res) {

    var username = req.body.username;
    
    request('https://www.instagram.com/' + username, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var indexOf = body.indexOf("profile_pic_url_hd");
            var url = '';
            for(var i = indexOf+22; i <= body.length; i++){
                if(body[i+1] != ',' ){
                    url += body[i];
                }else{
                    break;
                }
            }

            console.log("Profile: " + url);
            var temp = url.split("/");
            url = temp[0] + "//" + temp[2] + "/" + temp[3] + "/" + temp[5];

            res.contentType('json');
            res.send({
                status: response.statusCode,
                url: url
            });

        }else{
            res.send({
                status: response.statusCode
            });
        }
    });
});

module.exports = router;
