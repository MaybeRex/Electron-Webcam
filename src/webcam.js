var remote = require('remote');

window.onload=function(e){
    init();
    webcamPlayer();
}

function init(){
    if (hasGetUserMedia()){
        console.log('Ready to start!');
    }else{
        alert('getUserMedia() is not supported in your browser');
    }

}

document.querySelector('#closeButton').addEventListener(
    'click',
    function (e) {
        console.log('div clicked');
        var window = remote.getCurrentWindow();
        window.close();
    }
);

function webcamPlayer(){
    //console.log('inside webcamPlayer');
    var errorCallback = function(err){
        console.log('Something broke...', err);
    }
    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    var video = document.querySelector('#liveVideo');

    if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(
            {
                audio: false,
                video:
                {
                    mandatory: {
                        minWidth: 1280,
                        minHeight: 720
                    }
                }
            },
            function(stream) {
                video.src = window.URL.createObjectURL(stream);
            },
            errorCallback
        );
    } else {
      video.src = 'somevideo.webm'; // fallback.
    }
}



function hasGetUserMedia(){
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
}
