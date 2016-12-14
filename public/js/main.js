/**
 * Created by Shihab Mridha
 * on 13-Dec-16.
 */

(function () {

    $("#the-form").submit(function(e) {
        e.preventDefault();

        // Hide Alert and Image
        $(".the-image").css('display','none');
        $(".the-alert").css('display','none');

        $('.loader').css('display','block');

        var username = $("#username").val();
        // console.log(username);
        $.ajax({
            url: "/index",
            type: "POST",
            dataType: "json",
            data: {
                username: username
            },

            success: function(json) {

                if(json.status == 200){
                    $('.loader').css('display','none');
                    $(".the-image img").attr("src",json.url);
                    $(".fancybox").attr("href",json.url);
                    $(".the-image").css('display','block');
                    $('#submit-btn').removeClass('m-progress');
                }else {
                    $(".the-alert").css('display','block');
                    $('.loader').css('display','none');
                }
            },

            error: function() {
                $(".the-server-alert").css('display','block');
                $('.loader').css('display','none');
            }
        });

    });

    $('#the-single-form').submit(function (e) {
        e.preventDefault();

        // Hide Alert and Image
        $(".the-image").css('display','none');
        $(".the-alert").css('display','none');

        $('.loader').css('display','block');

        var postURL = $("#post-url").val();

        $.ajax({
            url: "/post-image",
            type: "POST",
            dataType: "json",
            data: {
                postURL: postURL
            },

            success: function(json) {

                if(json.status == 200){
                    $('.loader').css('display','none');
                    $(".the-image img").attr("src",json.url);
                    $(".fancybox").attr("href",json.url);
                    $(".the-image").css('display','block');
                    $('#submit-btn').removeClass('m-progress');
                }else {
                    $(".the-alert").css('display','block');
                    $('.loader').css('display','none');
                }
            },

            error: function() {
                $(".the-server-alert").css('display','block');
                $('.loader').css('display','none');
            }
        });

    });

}());