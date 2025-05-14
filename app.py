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
        original_price = row['price']  # Assuming 'price' column exists in the CSV
        new_price = original_price * 0.9  # 10% discount for example
        optimized_prices.append({
            'product': row['product'],
            'price': original_price,  # Sending the original price
            'newPrice': new_price  # Sending the optimized price
        })

    return jsonify({'optimizedPrices': optimized_prices})

if __name__ == '__main__':
    app.run(debug=True)
