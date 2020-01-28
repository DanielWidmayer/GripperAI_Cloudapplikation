from flask import Flask, render_template, request, render_template_string, jsonify
import watershed
from flask_socketio import SocketIO
from flask_talisman import Talisman

app = Flask(__name__, template_folder="templates")
socketio = SocketIO(app)
Talisman(app) #,content_security_policy=None

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

@socketio.on('my event', namespace='/test')
def test_message(message):
    emit('my response', {'data': message['data']})

@socketio.on('my broadcast event', namespace='/test')
def test_message(message):
    emit('my response', {'data': message['data']}, broadcast=True)

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')


if __name__ == "__main__":
    socketio.run(app, debug = True, host = "localhost", port = 5000)
    #app.run(  debug=False, host = "localhost", port = 5000 ) 