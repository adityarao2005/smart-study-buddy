from flask import Flask, request, jsonify
from chatbot import handle
from flask_cors import CORS
from chatbot import generate_flashcards

app = Flask(__name__)
CORS(app)

@app.route('/chatbot', methods=['POST'])
def get_chatbot_response():
    data = request.json
    prompt = data.get('prompt')
    return jsonify({'response': handle(prompt)})


@app.route('/api/upload', methods=['POST'])
def upload_file():
    file = request.json.get('material')
    if file:
        flashcards = generate_flashcards(file)
        return jsonify({"flashcards": flashcards})
    return jsonify({"error": "File upload failed"}), 500

app.run(port=8000)