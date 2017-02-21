/**
 * Created by Shihab Mridha
 * on 13-Dec-16.
 */

var express = require('express'),
    request = require('request');
var router = express.Router();


router.get('/post-image', function (req, res) {
    res.render('post-image');
});

router.post('/post-image', function (req, res) {

    var postURL = req.body.postURL;

    // Check if link or post ID

    if(!postURL.match('http')){
        postURL = 'https://www.instagram.com/p/' + postURL;
    }

    request(postURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var indexOf = body.indexOf("display_src");
            var url = '';
            for(var i = indexOf+15; i <= body.length; i++){
                if(body[i+1] != ',' ){
                    url += body[i];
                }else{
                    break;
                }
            }

            console.log(url);

            var temp = url.split("/");
            url = temp[0] + "//" + temp[2] + "/" + temp[3] + "/" + temp[5] + "/" + temp[6] + "/" + temp[7];
            console.log(url);
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