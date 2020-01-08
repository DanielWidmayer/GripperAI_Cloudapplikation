function openCvReady() {
    cv['onRuntimeInitialized'] = () => {
        let streaming = false;

        let startAndStop = document.getElementById('startAndStop');

        let video = document.getElementById('inputVideo');
        let canvasFrame = document.getElementById('canvasTransfer');
        let context = canvasFrame.getContext('2d');
        let canvasFrame2 = document.getElementById('canvasDisplay');
        let context2 = canvasFrame2.getContext('2d');
        let canvasFrame3 = document.getElementById('canvasStep');
        let context3 = canvasFrame2.getContext('2d');
        let canvasFrame4 = document.getElementById('canvasStep2');
        let context4 = canvasFrame2.getContext('2d');
        let canvasFrame5 = document.getElementById('canvasStep3');
        let context5 = canvasFrame2.getContext('2d');
        const FPS = 30;

        document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
        startAndStop.removeAttribute('disabled');

        function startCamera() {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (err) {
                    console.log('Error: ' + err);
                });
        }

        function stopCamera() {
            video.pause();
            video.srcObject = null;
        }
        function fullProcessing() {
            const iterations = 3; //iteration defines number of repeats for morphological operations

            let imgData = context.getImageData(0, 0, video.width, video.height);
            let src = cv.matFromImageData(imgData);
            let dst = cv.matFromImageData(imgData);
            let dest = cv.matFromImageData(imgData);
            let surebg = cv.matFromImageData(imgData);
            let surefg = cv.matFromImageData(imgData);
            let sureFg = cv.matFromImageData(imgData);
            let unknown = cv.matFromImageData(imgData);
            let markers = cv.matFromImageData(imgData);

            let kernel = new cv.Mat();
            function processVideo() {
                // get context / video
                let begin = Date.now();
                context.drawImage(video, 0, 0, video.width, video.height);
                src.data.set(context.getImageData(0, 0, video.width, video.height).data);
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

                for (let i = 0; i < markers.rows; i++) {
                    for (let j = 0; j < markers.cols; j++) {
                        markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1;
                        if (unknown.ucharPtr(i, j)[0] == 255) {
                            markers.intPtr(i, j)[0] = 0;
                        }
                    }
                }
                //cv.watershed()
                if (video.srcObject != null) {
                    cv.imshow('canvasDisplay', markers);
                    cv.imshow('canvasStep', surebg);
                    cv.imshow('canvasStep2', surefg);

                    cv.imshow('canvasStep3', unknown);
                }
                // schedule next one.
                let delay = 1000 / FPS - (Date.now() - begin);
                setTimeout(processVideo, delay+500);
            }
            processVideo();
        }
        /*$(document).ready(function() {
            startCamera();
        });*/

        function onVideoStarted() {
            streaming = true;
            startAndStop.innerText = 'Stop';
        }

        function onVideoStopped() {
            streaming = false;
            context.clearRect(0, 0, video.width, video.height);
            context2.clearRect(0, 0, video.width, video.height);
            startAndStop.innerText = 'Start';
        }

        startAndStop.addEventListener('click', () => {
            if (!streaming) {
                startCamera();
                onVideoStarted();
                fullProcessing();
            } else {
                stopCamera();
                onVideoStopped();
            }
        });
    };
}
