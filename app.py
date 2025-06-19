# Import necessary libraries
from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import os
from flask_cors import CORS

# Create Flask app instance
# static_folder='build': tells Flask to serve React's built files from the 'build' directory
# static_url_path='': serves static files from root URL instead of /static/
app = Flask(__name__, static_folder='build', static_url_path='')

# Enable Cross-Origin Resource Sharing (CORS) so the frontend can make requests to the backend
CORS(app)

# Define the API endpoint for optimizing prices
@app.route('/optimize-prices', methods=['POST'])
def optimize_prices():
    # Ensure a file is included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Read the uploaded CSV file using pandas
    data = pd.read_csv(file)

    # Apply a simple 10% discount to each price
    optimized_prices = []
    for _, row in data.iterrows():
        original_price = row['price']
        new_price = original_price * 0.9
        optimized_prices.append({
            'product': row['product'],
            'price': original_price,
            'newPrice': new_price
        })

    # Return the result as JSON
    return jsonify({'optimizedPrices': optimized_prices})

# Serve the React frontend from the 'build' directory
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    """
    This function serves the React frontend files.
    - If the path matches an existing file in /build (like JS or CSS), serve it.
    - Otherwise, serve index.html to support React Router client-side routing.
    """
    full_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Run the Flask app when this file is executed directly
if __name__ == '__main__':
    # Use environment variable for PORT, default to 5000
    port = int(os.environ.get("PORT", 5000))
    
    # Enable debug mode based on FLASK_DEBUG environment variable
    debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() == "true"

    # Start the Flask server
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
