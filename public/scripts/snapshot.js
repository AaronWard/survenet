var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
    
/**
 * Initialise element variabls
 */
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

/**
 * get user media (type of browser window)
 */
vendURL = window.URL || window.webkitURL;
navigator.getUserMedia =    navigator.getUserMedia ||
                            navigator.oGetUserMedia ||
                            navigator.msGetUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia;

if(navigator.getUserMedia){
    navigator.getUserMedia({video: true}, streamCam, throwErr);
}

/**
 * Run camera
 * @param {*} stream 
 */
function streamCam(stream){
    video.src = window.URL.createObjectURL(stream);
    video.play();
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
}

/**
 * Throw error is permissions/CORS error
 * @param {*} e 
 */
function throwErr(e){
    alert(e.name);
}

function capture() {    
    context.drawImage(video, 0, 0, 2200, 1500, 0, 0, 600, 480);
    var responseData = null;    
    var canvasObj = document.getElementById("canvas");
    img = canvasObj.toDataURL();

    /**
     * Post to the model API using base64 encoding
     * of image from canvas
     */
    $.ajax({
        type: "POST",
        url:  "https://model-serve.herokuapp.com/model",
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentType : 'application/json',
        dataType : 'json',
        data: img,
        success: function(responseData){
            console.log('successful post to model api');
            $('h3').text('Emotion Detected: '+responseData);                    
        }   
    })
    //When succesffuly posted, print response to screen
    .done(function(responseData){
        $('h3').text('Emotion Detected: '+responseData);        
        console.log("DONE : " + responseData);
    })
    //Log an err
    .fail(function(xhr, textStatus, errorThrown) {
        if(errorThrown){
            console.log(errorThrown)
            }
    });
}
