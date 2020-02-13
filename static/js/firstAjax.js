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
    console.log('wurde ausgeführt');
    $.post('/attempts/firstAjax/callWatershed', { image: img.src }, function (result) {
        //console.log('wurde ausgeführt');
        result = 'data:image/png;base64,' + result;
        var newCanvas = document.getElementById('Watershed');
        var newImg = new Image(canvas.width, canvas.height);
        newImg.onload = function () {
            newCanvas.getContext('2d').drawImage(newImg,0,0, canvas.width/2.1, canvas.height/3.2);
        };
        newImg.src = result;
    });
    //}, 3);
    //getPoints();
    //websocketio flask schafft evtl bis zu 30 frames, erste Lsg waterhed in js
}
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}
window.addEventListener('load', startup, false);

//function doFunction() {}

//document.getElementById('snap').addEventListener('click', doFunction, false);

$(document).ready(function () {
    $('#snap').on('click', getPoints);
});
