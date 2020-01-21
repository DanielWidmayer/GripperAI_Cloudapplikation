from flask import Flask, render_template, request, render_template_string, jsonify
import watershed
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")

cors = CORS(app, resources={r"/*": {"origins": "localhost:5000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods = ["GET"])
def home():
    return render_template("home.html")

@app.route("/gripper")
def gripper():
    return render_template("gripper.html")

@app.route("/grippingpoints")
def grippingpoints():
    return render_template("grippingpoints.html")

@app.route("/grippingpoints/callWatershed", methods=["POST"])
def callFunc():
    image = request.form['image']
    result = watershed.fullDetermination(image)
    return result

@app.route("/about")
def about():
    return render_template("opencvjstest.html")

@app.route("/application")
def application():
    return render_template("index.htm")

@app.route("/live")
def live():
    return "This service is still under construction. Stay tuned!"

if __name__ == "__main__":
    app.run( debug=False, host = "localhost", port = 5000 )