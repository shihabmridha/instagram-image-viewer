/**
 * Created by Shihab Mridha
 * on 13-Dec-16.
 */

const express = require('express');
const request = require('request');
const jsdom = require("jsdom");
const router = express.Router();
const { JSDOM } = jsdom;


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
            const dom = (new JSDOM(body)).window;
            const imageUrl = dom.document.querySelector("meta[property='og:image']").getAttribute("content");

            res.send({ status: response.statusCode, url: imageUrl });

        } else {
            res.send({ status: response.statusCode });
        }
    });

});


module.exports = router;
