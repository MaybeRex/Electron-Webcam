'use strict';

var remote = require('remote');

let videoSource = [];
let videoIndex = 0;
let videoSourceLength = 0;

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
    const close = document.querySelector('#closeButton');
    const theatre = document.querySelector('#theatreMode');
    const toggle = document.querySelector('#toggleVideoSource');
    const window = remote.getCurrentWindow();

    toggle.addEventListener(
        'click',
        function(e){
            videoIndex++;
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

            for (let i = 0; i != sourceInfos.length; ++i){
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
    const video = document.querySelector('#liveVideo');
    video.src = window.URL.createObjectURL(stream);
}

function playVideo(){

    videoIndex = videoIndex % videoSourceLength;
    console.log('current video source :',videoSource[videoIndex]);
    const constraints = {
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
