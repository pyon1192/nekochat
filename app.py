from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai

app = Flask(__name__)
CORS(app)# CORSを設定
openai.api_key = os.environ.get('OPENAI_API_KEY')
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    message = request.get_json().get('message')
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
    )
    return jsonify({'response': response['choices'][0]['message']['content']})

if __name__ == '__main__':
    app.debug=True
    app.run(host='0.0.0.0', port=5503)
