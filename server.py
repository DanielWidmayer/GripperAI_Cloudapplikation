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
@app.route("/grippingtypes")
def grippingtypes():
    return render_template("grippingtypes.html")

### ALL ATTEMPTS COLLECTION FOR DOCUMENTATIONAL REASONS ###
@app.route("/attempts")
def attempts():
    return render_template("attempts.html")

#### FIRST ATTEMPT w/ AJAX ###
@app.route("/attempts/firstAjax")
def firstAjax():
    return render_template("firstAjax.html")

@app.route("/attempts/firstAjax/callWatershed", methods=["POST"])
def callFunc():
    image = request.form['image']
    result = watershed.fullDetermination(image)
    return result

### Presentation Case ###
@app.route("/attempts/ajaxmobile")
def ajaxmobile():
    return render_template("ajaxmobile.html")

### SECOND TRY - LIVE BUT JS TOO SLOW ###
@app.route("/attempts/livejs")
def livejs():
    return render_template("opencvjstest.html")

### THIRD TRY - WEBCAMERATEMPLATE ###
@app.route("/attempts/webcamerajs")
def webcamerajs():
    return render_template("webcamjscontours.html")

### WEBSOCKET BLOCK ###
@app.route("/attempts/websocket")
def websocket_test():
    return render_template("websocket.html")

@socketio.on('json')
def handle_json(json):
    app.logger.info('json flask called')
    send(json, json=True)

@socketio.on('my event')
def handle_my_custom_event(json):
    app.logger.info('my event flask called')
    #app.logger.info('Data: \n\n',json, '\n\nBuffer: ', json['data'],' Type: ',type(json['data']))
    #app.logger.info(type(json['data']))
    response = watershed.fullDetermination(json['data'])
    #app.logger.info(type(response))
    emit('my response', response.decode("utf-8"))

# @socketio.on('disconnect', namespace='/test')
# def test_disconnect():
#     print('Client disconnected')


if __name__ == "__main__":
    socketio.run(app, debug = True, host = "localhost", port = 5000)
