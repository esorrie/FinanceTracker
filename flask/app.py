from flask import Flask, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

@app.route('/api')
def get_data():
    app.logger.info("Received request for /api")
    try:
        data = {"message": "Hello from Flask!"}
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.logger.info("Starting Flask app")
    app.run(host='0.0.0.0', port=5002, debug=True)