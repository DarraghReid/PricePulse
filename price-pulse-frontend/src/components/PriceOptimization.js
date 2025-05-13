import React from 'react';

function PriceOptimization({ optimizedPrices }) {
  return (
    <div>
      <h2>Optimized Prices</h2>
      <ul>
        {optimizedPrices.map((price, index) => (
          <li key={index}>
            Product: {price.product} - New Price: ${price.newPrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceOptimization;
