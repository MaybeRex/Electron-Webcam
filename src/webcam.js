
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

function webcamPlayer(){
    //console.log('inside webcamPlayer');
    var errorCallback = function(err){
        console.log('Rejected', err);
    }

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
      console.log('no camara found'); // fallback.
    }
}



function hasGetUserMedia(){
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
}
