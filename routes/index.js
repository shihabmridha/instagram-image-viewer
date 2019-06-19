/**
 * Created by Shihab Mridha
 * on 13-Dec-16.
 */

const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.post('/index', function (req, res) {

    var username = req.body.username;
    
    request('https://www.instagram.com/' + username, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const indexOf = body.indexOf("profile_pic_url_hd");
            const len = body.length;
            let url = '';
            for(let i = indexOf + 21; i <= len; i++){
                if (body[i] === '"') break;
                url += body[i];
            }

            res.send({ status: response.statusCode, url: url });

        }else{
            res.send({ status: response.statusCode });
        }
    });
});

module.exports = router;
