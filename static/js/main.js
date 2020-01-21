/*

>> kasperkamperman.com - 2018-04-18
>> https://www.kasperkamperman.com/blog/camera-template/

*/
// import {watershed, } from opencv

function openCvReady() {
    cv['onRuntimeInitialized'] = () => {
        var takeSnapshotUI = createClickFeedbackUI();

        var video;
        var takePhotoButton;
        var toggleFullScreenButton;
        var switchCameraButton;
        var closeCanvasButton;
        var amountOfCameras = 0;
        var currentFacingMode = 'environment';


        // do some WebRTC checks before creating the interface
        DetectRTC.load(function () {
            // do some checks
            if (DetectRTC.isWebRTCSupported == false) {
                alert(
                    'Please use Chrome, Firefox, iOS 11, Android 5 or higher, Safari 11 or higher',
                );
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
                DetectRTC.isMobileDevice,
            );
        });


        function initCameraUI() {
            video = document.getElementById('video');

            takePhotoButton = document.getElementById('takePhotoButton');
            toggleFullScreenButton = document.getElementById('toggleFullScreenButton');
            switchCameraButton = document.getElementById('switchCameraButton');
            closeCanvasButton = document.getElementById('closeCanvasButton');

            // https://developer.mozilla.org/nl/docs/Web/HTML/Element/button
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role

            takePhotoButton.addEventListener('click', function () {
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

                toggleFullScreenButton.addEventListener('click', function () {
                    screenfull.toggle(document.getElementById('container')).then(function () {
                        console.log(
                            'Fullscreen mode: ' +
                            (screenfull.isFullscreen ? 'enabled' : 'disabled'),
                        );
                    });
                });
            } else {
                console.log("iOS doesn't support fullscreen (yet)");
            }

            // -- switch camera part
            if (amountOfCameras > 1) {
                switchCameraButton.style.display = 'block';

                switchCameraButton.addEventListener('click', function () {
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
                function () {
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
                false,
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
                    facingMode: currentFacingMode,
                },
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
            // if you'd like to show the canvas add it to the DOM
            var start = performance.now();

            var canvasImage = document.getElementById('canvasImage');
            var canvasImageContext = canvasImage.getContext('2d');
            var width = video.videoWidth;
            var height = video.videoHeight;
            canvasImage.width = width;
            canvasImage.height = height;
            canvasImageContext.drawImage(video, 0, 0, width, height);
            let imgData = canvasImageContext.getImageData(0, 0, width, height);
            canvasImage.style.display = 'block';
            fullProcessing(imgData);
            var time1 = performance.now();
            console.log('Dauer draw: ' + (time1 - start) + ' ms.');
            var time2 = performance.now();
            console.log('Dauer getData: ' + (time2 - time1) + ' ms.');
            // polyfil if needed https://github.com/blueimp/JavaScript-Canvas-to-Blob
            var time3 = performance.now();
            console.log('Dauer Processing: ' + (time3 - time2) + ' ms.');
            closeCanvasButton.style.display = 'block';
            closeCanvasButton.addEventListener('click', function () {
                canvasImageContext.clearRect(0, 0, canvasImage.width, canvasImage.height);
                closeCanvasButton.style.display = 'none';
            });

            // https://developers.google.com/web/fundamentals/primers/promises
            // https://stackoverflow.com/questions/42458849/access-blob-value-outside-of-canvas-toblob-async-function
            function getCanvasBlob(canvasImage) {
                return new Promise(function (resolve, reject) {
                    canvasImage.toBlob(function (blob) {
                        resolve(blob);
                    }, 'image/jpeg');
                });
            }

            // some API's (like Azure Custom Vision) need a blob with image data
            getCanvasBlob(canvasImage).then(function (blob) {
                // do something with the image blob
            });
            var time4 = performance.now();
            console.log('Dauer Rest: ' + (time4 - time3) + ' ms.');
        }



        function fullProcessing(imgData) {
            var start = performance.now();

            const iterations = 5; //iteration defines number of repeats for morphological operations

            let src = cv.matFromImageData(imgData);
            let dst = cv.matFromImageData(imgData);
            let dest = cv.matFromImageData(imgData);
            let surebg = cv.matFromImageData(imgData);
            let surefg = cv.matFromImageData(imgData);
            let unknown = cv.matFromImageData(imgData);
            let markers = new cv.Mat();
            console.log('Reihen: ' + src.rows + '  Zeilen: ' + src.cols);
            let newSize = new cv.Size(Math.round(src.cols / 2), Math.round(src.rows / 2));
            // get context / video
            cv.resize(src, src, newSize);
            console.log('Reihen: ' + src.rows + '  Zeilen: ' + src.cols);
            var tim1 = performance.now();
            console.log('Dauer Vars: ' + (tim1 - start) + ' ms.');
            let kernel = new cv.Mat();
            // calculate treshold
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            let otsu = cv.THRESH_OTSU + cv.THRESH_BINARY_INV;
            cv.threshold(dst, dest, 0, 255, otsu);
            // do morphological opening & closing
            let ksize = new cv.Size(3, 3);
            kernel = cv.getStructuringElement(cv.MORPH_RECT, ksize);
            let anchor = new cv.Point(-1, -1);
            cv.morphologyEx(dest, dst, cv.MORPH_CLOSE, kernel, anchor, iterations);
            cv.morphologyEx(dst, dest, cv.MORPH_OPEN, kernel, anchor, iterations);
            // get sure background
            cv.dilate(dest, surebg, kernel, anchor, iterations);
            cv.distanceTransform(dst, dest, cv.DIST_L2, 5);
            cv.normalize(dest, dest, 1, 0, cv.NORM_INF);
            // get sure foreground
            cv.threshold(dest, surefg, 0.3, 255, cv.THRESH_BINARY);
            surefg.convertTo(surefg, cv.CV_8U, 1, 0);
            cv.subtract(surebg, surefg, unknown);

            cv.connectedComponents(surefg, markers);
            var tim2 = performance.now();
            console.log('Dauer Preprocessing: ' + (tim2 - tim1) + ' ms.');
            console.log('Reihen: ' + markers.rows + '  Zeilen: ' + markers.cols + '  Loops: ' + (markers.rows * markers.cols));
            for (let i = 0, k = markers.rows; i < k; i++) {
                for (let j = 0, l = markers.cols; j < l; j++) {
                    markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1;
                    if (unknown.ucharPtr(i, j)[0] == 255) {
                        markers.intPtr(i, j)[0] = 0;
                    }
                }
            }
            var tim3 = performance.now();
            console.log('Dauer marker: ' + (tim3 - tim2) + ' ms.');

            cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
            var tim31 = performance.now();

            console.log('Dauer cvt: ' + (tim31 - tim3) + ' ms.');

            cv.watershed(src, markers);
            var tim32 = performance.now();
            console.log('Dauer watershed: ' + (tim32 - tim31) + ' ms.');
            // draw barriers
            for (let i = 1; i < markers.rows - 1; i++) {
                for (let j = 1; j < markers.cols - 1; j++) {
                    if (markers.intPtr(i, j)[0] == -1) {
                        // let xMax, xMin, yMax, yMin;
                        // if (xMax < i) {
                        //     xMax[0] = i;
                        //     xMax[1] = j;
                        // }
                        // else if (xMin > i) {
                        //     xMin[0] = i;
                        //     xMin[1] = j;
                        // }
                        // if (yMax < j) {
                        //     yMax[0] = i;
                        //     yMax[0] = j;
                        // }
                        // else if (yMin > j) {
                        //     yMin[0] = i;
                        //     yMin[0] = j;
                        // }
                        src.ucharPtr(i, j)[0] = 255; // R
                        src.ucharPtr(i, j)[1] = 0; // G
                        src.ucharPtr(i, j)[2] = 0; // B
                    }
                }
            }
            // math.intersect(xMin, xMax, yMin, yMax);
            var tim4 = performance.now();
            console.log('Dauer barriers: ' + (tim4 - tim3) + ' ms.');
            cv.imshow('canvasImage', src);
            //return markers;
            var tim5 = performance.now();
            console.log('Dauer show: ' + (tim5 - tim4) + ' ms.');
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
            var sndClick = new Howl({ src: ['snd/click.mp3'] });

            var overlayVisibility = false;
            var timeOut = 80;

            function setFalseAgain() {
                overlayVisibility = false;
                overlay.style.display = 'none';
            }

            return function () {
                if (overlayVisibility == false) {
                    sndClick.play();
                    overlayVisibility = true;
                    overlay.style.display = 'block';
                    setTimeout(setFalseAgain, timeOut);
                }
            };
        }
        function stopVideoStream() {
            if (window.stream) {
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            video.pause();
            video.srcObject = null;
        }
    };
}