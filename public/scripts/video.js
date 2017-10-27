(function(){
    var video = getElementById('video')
    var canvas = getElementById('canvas')
    var context = canvas.getContext('2d')

    vendURL = window.URL || window.webkitURL;

    navigator.getUserMedia =    navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia;


    if(navigator.getUserMedia){
        navigator.getUserMedia({video: true}, stream, throwErr);
    }

    function stream(stream){
        video.src = window.URL.createObjectURL(stream);
    }
    function throwErr(e){
        alert(e.name);
    }

    function button(){
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        canvas.drawImage(video, 0, 0);

    }

})();