$(document).ready(function(){
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    socket.on('my response', function(msg) {
        $('#log').append('<p>Received: ' + msg.data + '</p>');
    });
    $('form#emit').submit(function(event) {
        socket.emit('my event', {data: $('#emit_data').val()});
        return false;
    });
    $('form#broadcast').submit(function(event) {
        socket.emit('my broadcast event', {data: $('#broadcast_data').val()});
        return false;
    });
});
// var wsUri = 'wss://echo.websocket.org/';
//     var output;

//     function init() {
//         output = document.getElementById('output');
//         testWebSocket();
//     }

//     function testWebSocket() {
//         websocket = new WebSocket(wsUri);
//         websocket.onopen = function(evt) {
//             onOpen(evt);
//         };
//         websocket.onclose = function(evt) {
//             onClose(evt);
//         };
//         websocket.onmessage = function(evt) {
//             onMessage(evt);
//         };
//         websocket.onerror = function(evt) {
//             onError(evt);
//         };
//     }

//     function onOpen(evt) {
//         writeToScreen('CONNECTED');
//     }

//     function onClose(evt) {
//         writeToScreen('DISCONNECTED');
//     }

//     function onMessage(evt) {
//         writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
//     }

//     function onError(evt) {
//         writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
//     }

//     function doSend(message) {
//         writeToScreen('SENT: ' + message);
//         websocket.send(message);
//     }

//     function writeToScreen(message) {
//         var pre = document.createElement('p');
//         pre.style.wordWrap = 'break-word';
//         pre.innerHTML = message;
//         output.appendChild(pre);
//     }

//     window.addEventListener('load', init, false);