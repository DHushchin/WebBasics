from flask import Flask, jsonify, render_template, request, url_for
from ratelimit import limits
from mailer import Mailer
from os import environ


app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():  # put application's code here
    return render_template("index.html")

@app.route('/about')
def about():  # put application's code here
    return render_template("about.html")

@app.route('/catalog')
def catalog():  # put application's code here
    return render_template("catalog.html")

@app.route('/contacts')
def contacts():  # put application's code here
    return render_template("contacts.html")

@app.route('/sign_up')
def sign_up():  # put application's code here
    return render_template("sign_up.html")

@limits(calls=15, period=900)
@app.route('/mail', methods=['GET', 'POST'])
def mail():    
    if request.method == 'GET':
        message = {'greeting': 'Hello from Flask!'}
        return jsonify(message)
    if request.method == 'POST':
        mailer = Mailer(request.get_json())
        return jsonify(mailer.send_email()), 200


if __name__ == '__main__':
    app.run(debug=False)
