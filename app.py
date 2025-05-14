from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to PricePulse!"

@app.route('/optimize-prices', methods=['POST'])
def optimize_prices():
    # Check if a file is included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Read the uploaded CSV file
    data = pd.read_csv(file)

    # Simple price optimization: apply a 10% discount
    optimized_prices = []
    for _, row in data.iterrows():
        new_price = row['price'] * 0.9  # Basic price optimization logic
        optimized_prices.append({'product': row['product'], 'newPrice': new_price})

    return jsonify({'optimizedPrices': optimized_prices})

if __name__ == '__main__':
    app.run(debug=True)
