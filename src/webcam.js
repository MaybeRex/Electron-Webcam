//Webcam Video Player
//Mario Solorzano

var remote = require('remote');

var videoSource = [];
var videoIndex = 0;
var videoSourceLength = 0;

window.onload=function(e){
    init();
    controls();
    webcamPrep();
}

function init(){
    if (hasGetUserMedia()){
        console.log('Ready to start!');
    }else{
        alert('getUserMedia() is not supported in your browser');
    }

}

function controls(){
    var close = document.querySelector('#closeButton');
    var theatre = document.querySelector('#theatreMode');
    var toggle = document.querySelector('#toggleVideoSource');
    var window = remote.getCurrentWindow();

    toggle.addEventListener(
        'click',
        function(e){
            videoIndex++;
            //console.log(videoIndex % 2);
            playVideo();
        }
    )

    close.addEventListener(
        'click',
        function(e){
            window.close();
        }
    );

    theatreMode.addEventListener(
        'click',
        function(e){
            var window = remote.getCurrentWindow();
            if (!window.isFullScreen()){
                window.setResizable(true);
                window.setFullScreen(true);
            }else{
                window.setFullScreen(false);
                window.setResizable(false);
            }
        }
    );
}

function webcamPrep(){
    MediaStreamTrack.getSources(
        function(sourceInfos){
            var tempVideoIndex = 0;

            for (var i = 0; i != sourceInfos.length; ++i){
                //console.log(sourceInfos[i]);
                if (sourceInfos[i].kind === 'video') {
                    //console.log('video source found: ', sourceInfos);
                    videoSource[tempVideoIndex] = sourceInfos[i];
                    videoSourceLength++;
                    tempVideoIndex++;

                }
            }
            playVideo();
        }
    );
}

function errorCallback(err){
    console.log('Rejected', err);
}

function successCallback(stream){
    var video = document.querySelector('#liveVideo');
    video.src = window.URL.createObjectURL(stream);
}

function playVideo(){

    videoIndex = videoIndex % videoSourceLength;
    console.log('current video source :',videoSource[videoIndex]);
    var constraints = {
        audio: false,
        video: {
            mandatory: {
                minWidth: 1280,
                minHeight: 720,
                sourceId:videoSource[videoIndex].id
            }
        }
    }


    navigator.webkitGetUserMedia(
        constraints,
        successCallback,
        errorCallback
    );

}



function hasGetUserMedia(){
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
}
