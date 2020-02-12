from flask import Flask, render_template, request, render_template_string, jsonify
import watershed
from flask_socketio import SocketIO, send, emit
import logging
#from flask_talisman import Talisman

app = Flask(__name__, template_folder="templates")
socketio = SocketIO(app)
#Talisman(app, content_security_policy=None)

### HOME / INDEX SITE ###
@app.route("/", methods = ["GET"])
def home():
    return render_template("home.html")

### DIASHOW OF GRIPPING TYPES ###
@app.route("/gripper")
def gripper():
    return render_template("gripper.html")

#### FIRST ATTEMPT w/ AJAX ###
@app.route("/grippingpoints")
def grippingpoints():
    return render_template("grippingpoints.html")

@app.route("/grippingpoints/callWatershed", methods=["POST"])
def callFunc():
    image = request.form['image']
    result = watershed.fullDetermination(image)
    return result

### Presentation Case ###
@app.route("/ajaxmobile")
def ajaxmobile():
    return render_template("ajaxmobile.html")

### SECOND TRY - LIVE BUT JS TOO SLOW ###
@app.route("/about")
def about():
    return render_template("opencvjstest.html")

### THIRD TRY - WEBCAMERATEMPLATE ###
@app.route("/application")
def application():
    return render_template("index.htm")

### WEBSOCKET BLOCK ###
@app.route("/websocket")
def websocket_test():
    return render_template("websocket.html")

# @socketio.on('my event', namespace='/websocket')
# def handle_event(json):
#     print('received json: ', + str(json))

@socketio.on('message')
def handle_message(message):
    app.logger.info('message flask called')
    send(message)

@socketio.on('json')
def handle_json(json):
    app.logger.info('json flask called')
    send(json, json=True)

@socketio.on('my event')
def handle_my_custom_event(json):
    app.logger.info('my event flask called')
    app.logger.info(json)
    app.logger.info(type(json))
    json = watershed.fullDetermination(json)
    emit('my response', json)

# @socketio.on('my broadcast event', namespace='/test')
# def test_message(message):
#     emit('my response', {'data': message['data']}, broadcast=True)

# @socketio.on('connect', namespace='/test')
# def test_connect():
#     emit('my response', {'data': 'Connected'})

# @socketio.on('disconnect', namespace='/test')
# def test_disconnect():
#     print('Client disconnected')


if __name__ == "__main__":
    socketio.run(app, debug = True, host = "localhost", port = 5000)
