const constraints = {
    audio: false,
    video: true
};

function startup() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(console.error);
}

function getPoints() {
    //setTimeout(() => {
    var canvas = document.getElementById('Screenshot');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = document.createElement('img');
    img.src = canvas.toDataURL();
    //console.log(img.src);
    $.post('http://localhost:5000/grippingpoints/callWatershed', { image: img.src }, function(result) {
        //console.log('wurde ausgeführt');
        result = 'data:image/png;base64,' + result;
        var newCanvas = document.getElementById('Watershed');
        var newContext = newCanvas.getContext('2d');
        var newImg = new Image();
        newImg.onload = function() {
            newContext.drawImage(newImg, 0, 0, canvas.height / 1.63, canvas.width / 4.3);
        };
        newImg.src = result;
    });
    //}, 3);
    //getPoints();
    //websocketio flask schafft evtl bis zu 30 frames, erste Lsg waterhed in js
}

window.addEventListener('load', startup, false);

//function doFunction() {}

//document.getElementById('snap').addEventListener('click', doFunction, false);

$(document).ready(function() {
    $('#snap').on('click', getPoints);
});
