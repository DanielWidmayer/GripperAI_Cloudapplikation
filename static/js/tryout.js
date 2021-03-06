var takeSnapshotUI = createClickFeedbackUI();
var socket = io();
var video;
var width;
var height;
var takePhotoButton;
var toggleFullScreenButton;
var switchCameraButton;
var closeCanvasButton;
var amountOfCameras = 0;
var currentFacingMode = 'environment';
var keepGoing = false;
// get canvas from DOM
var canvasImage = document.getElementById('canvasImage');
var canvasImageCopy = document.getElementById('canvasImageCopy');
var canvasImageContext = canvasImage.getContext('2d');
var canvasImageCopyContext = canvasImageCopy.getContext('2d');

var start = performance.now();
// Websocket Client side
socket.on('connect', function() {
    console.log('Websocket connection has been established');
});
socket.on('disconnect', function(){
    console.log('Websocket connection has been closed');
});
socket.on('my response', function(received){
    var time = performance.now();
    console.log('Receive - Emit: ' + (time-start) + ' ms.');
    received = 'data:image/png;base64,' + received;
    var image = new Image();
    image.onload = function () {
      canvasImage.getContext('2d').drawImage(image, 0, 0, width, height);
    };
    image.src = received;
    var time11 = performance.now();
    console.log('Image received:' + (time11 - time));
    if(keepGoing == true){
        takeSnapshot();
    }
    var time1 = performance.now();
    console.log('Dauer Processing1: ' + (time1 - time11) + ' ms.');
});

document.addEventListener('DOMContentLoaded', function(event) {
    // do some WebRTC checks before creating the interface
    DetectRTC.load(function() {
        // do some checks
        if (DetectRTC.isWebRTCSupported == false) {
            alert('Please use Chrome, Firefox, iOS 11, Android 5 or higher, Safari 11 or higher');
        } else {
            if (DetectRTC.hasWebcam == false) {
                alert('Please install an external webcam device.');
            } else {
                amountOfCameras = DetectRTC.videoInputDevices.length;
                initCameraUI();
                initCameraStream();
            }
        }

        console.log(
            'RTC Debug info: ' +
                '\n OS:                   ' +
                DetectRTC.osName +
                ' ' +
                DetectRTC.osVersion +
                '\n browser:              ' +
                DetectRTC.browser.fullVersion +
                ' ' +
                DetectRTC.browser.name +
                '\n is Mobile Device:     ' +
                DetectRTC.isMobileDevice +
                '\n has webcam:           ' +
                DetectRTC.hasWebcam +
                '\n has permission:       ' +
                DetectRTC.isWebsiteHasWebcamPermission +
                '\n getUserMedia Support: ' +
                DetectRTC.isGetUserMediaSupported +
                '\n isWebRTC Supported:   ' +
                DetectRTC.isWebRTCSupported +
                '\n WebAudio Supported:   ' +
                DetectRTC.isAudioContextSupported +
                '\n is Mobile Device:     ' +
                DetectRTC.isMobileDevice
        );
    });
});

function initCameraUI() {
    video = document.getElementById('video');

    takePhotoButton = document.getElementById('takePhotoButton');
    toggleFullScreenButton = document.getElementById('toggleFullScreenButton');
    switchCameraButton = document.getElementById('switchCameraButton');
    closeCanvasButton = document.getElementById('closeCanvasButton');

    // https://developer.mozilla.org/nl/docs/Web/HTML/Element/button
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role

    takePhotoButton.addEventListener('click', function() {
        keepGoing = true;
        takeSnapshotUI();
        takeSnapshot();
    });

    // -- fullscreen part

    function fullScreenChange() {
        if (screenfull.isFullscreen) {
            toggleFullScreenButton.setAttribute('aria-pressed', true);
        } else {
            toggleFullScreenButton.setAttribute('aria-pressed', false);
        }
    }

    if (screenfull.isEnabled) {
        screenfull.on('change', fullScreenChange);

        toggleFullScreenButton.style.display = 'block';

        // set init values
        fullScreenChange();

        toggleFullScreenButton.addEventListener('click', function() {
            screenfull.toggle(document.getElementById('container')).then(function() {
                console.log('Fullscreen mode: ' + (screenfull.isFullscreen ? 'enabled' : 'disabled'));
            });
        });
    } else {
        console.log("iOS doesn't support fullscreen (yet)");
    }

    // -- switch camera part
    if (amountOfCameras > 1) {
        switchCameraButton.style.display = 'block';

        switchCameraButton.addEventListener('click', function() {
            if (currentFacingMode === 'environment') currentFacingMode = 'user';
            else currentFacingMode = 'environment';

            initCameraStream();
        });
    }

    // Listen for orientation changes to make sure buttons stay at the side of the
    // physical (and virtual) buttons (opposite of camera) most of the layout change is done by CSS media queries
    // https://www.sitepoint.com/introducing-screen-orientation-api/
    // https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
    window.addEventListener(
        'orientationchange',
        function() {
            // iOS doesn't have screen.orientation, so fallback to window.orientation.
            // screen.orientation will
            if (screen.orientation) angle = screen.orientation.angle;
            else angle = window.orientation;

            var guiControls = document.getElementById('gui_controls').classList;
            var vidContainer = document.getElementById('vid_container').classList;

            if (angle == 270 || angle == -90) {
                guiControls.add('left');
                vidContainer.add('left');
            } else {
                if (guiControls.contains('left')) guiControls.remove('left');
                if (vidContainer.contains('left')) vidContainer.remove('left');
            }

            //0   portrait-primary
            //180 portrait-secondary device is down under
            //90  landscape-primary  buttons at the right
            //270 landscape-secondary buttons at the left
        },
        false
    );
}

// https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
function initCameraStream() {
    // stop any active streams in the window
    stopVideoStream();
    // we ask for a square resolution, it will cropped on top (landscape)
    // or cropped at the sides (landscape)
    var size = 1280;

    var constraints = {
        audio: false,
        video: {
            width: { ideal: size },
            height: { ideal: size },
            //width: { min: 1024, ideal: window.innerWidth, max: 1920 },
            //height: { min: 776, ideal: window.innerHeight, max: 1080 },
            facingMode: currentFacingMode
        }
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);

    function handleSuccess(stream) {
        window.stream = stream; // make stream available to browser console
        video.srcObject = stream;

        if (constraints.video.facingMode) {
            if (constraints.video.facingMode === 'environment') {
                switchCameraButton.setAttribute('aria-pressed', true);
            } else {
                switchCameraButton.setAttribute('aria-pressed', false);
            }
        }

        const track = window.stream.getVideoTracks()[0];
        const settings = track.getSettings();
        str = JSON.stringify(settings, null, 4);
        console.log('settings ' + str);

        //return navigator.mediaDevices.enumerateDevices();
    }

    function handleError(error) {
        console.log(error);

        //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        if (error === 'PermissionDeniedError') {
            alert('Permission denied. Please refresh and give permission.');
        }
    }
}

function takeSnapshot() {
    keepGoing = true;
    width = video.videoWidth;
    height = video.videoHeight;
   
    canvasImage.width = width;
    canvasImage.height = height;
    
    canvasImageContext.drawImage(video, 0, 0, width, height);
    
    //let imgData = canvasImageContext.getImageData(0, 0, width, height);    
    //canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = document.createElement('img');
    img.src = canvasImage.toDataURL();
    // Emit picture data to server
    var time2 = performance.now();
    console.log('Emit:'+(time2-start)+'ms');
    socket.emit('my event', {'data': img.src});
    // make canvas visible
    canvasImage.style.display = 'block';
    closeCanvasButton.style.display = 'block';
    // close the Picture
    closeCanvasButton.addEventListener('click', function() {
        canvasImageContext.clearRect(0, 0, canvasImage.width, canvasImage.height);
        closeCanvasButton.style.display = 'none';
        keepGoing = false;
    });
}

// https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
// closure; store this in a variable and call the variable as function
// eg. var takeSnapshotUI = createClickFeedbackUI();
// takeSnapshotUI();

function createClickFeedbackUI() {
    // in order to give feedback that we actually pressed a button.
    // we trigger a almost black overlay
    var overlay = document.getElementById('video_overlay'); //.style.display;

    // sound feedback
    var sndClick = new Howl({ src: ['../../snd/click.mp3'] });

    var overlayVisibility = false;
    var timeOut = 80;

    function setFalseAgain() {
        overlayVisibility = false;
        overlay.style.display = 'none';
    }

    return function() {
        if (overlayVisibility == false) {
            sndClick.play();
            overlayVisibility = false;
            overlay.style.display = 'none';
            setTimeout(setFalseAgain, timeOut);
        }
    };
}
function stopVideoStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    video.pause();
    video.srcObject = null;
}
