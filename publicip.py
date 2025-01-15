from flask import Flask, request, jsonify, render_template
import os
import hashlib
import time

DIR_NAME = os.path.dirname(__file__)
app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')	

@app.route('/easy-apply', methods=['GET'])
@app.route('/easy-apply/', methods=['GET'])
def peer():
    return render_template('easy-apply.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'resume' not in request.files and 'cover_letter' not in request.files:
        return jsonify({"error": "Missing file(s)"}), 400

    response = jsonify({"message": "Application uploaded, and emailed successfully"})

    timestamp = str(time.time())
    unique_data = request.remote_addr + timestamp
    request_hash = hashlib.sha256(unique_data.encode()).hexdigest()

    upload_dir = os.path.join(DIR_NAME, 'uploads', request_hash)
    os.makedirs(upload_dir, exist_ok=True)
    
    try:
        resume = request.files['resume']
        resume.save(f"uploads/{request_hash}/{resume.filename}")
        cover_letter = request.files['cover_letter']
        cover_letter.save(f"uploads/{request_hash}/{cover_letter.filename}")
        return response, 200
    except Exception as e: 
        print(e)

    # Save files or process them as needed

    return jsonify({"message": "Files haven't uploaded"}), 400

if __name__ == '__main__':
    app.run(host='192.168.8.13', port=8080, debug=True)