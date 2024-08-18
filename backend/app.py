from flask import Flask, request, jsonify
from chatbot import handle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chatbot', methods=['POST'])
def get_chatbot_response():
    data = request.json
    prompt = data.get('prompt')
    return jsonify({'response': handle(prompt)})

app.run(port=8080)