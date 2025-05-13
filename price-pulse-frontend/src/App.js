import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import PriceOptimization from './components/PriceOptimization';
import './App.css';

function App() {
  const [optimizedPrices, setOptimizedPrices] = useState([]);  // State for holding optimized prices

  return (
    <div className="App">
      <header className="App-header">
        <h1>PricePulse - Price Optimization Dashboard</h1>
        <FileUpload setOptimizedPrices={setOptimizedPrices} />  {/* Passing setOptimizedPrices as a prop */}
        {optimizedPrices.length > 0 && <PriceOptimization optimizedPrices={optimizedPrices} />}  {/* Passing the optimized prices */}
      </header>
    </div>
  );
}

export default App;
// This is the main App component that serves as the entry point for the React application.
// It imports the FileUpload and PriceOptimization components and manages the state for optimized prices.
// The FileUpload component allows users to upload retail data files, and the PriceOptimization component displays the optimized prices.
// The optimized prices are passed as props to the PriceOptimization component for rendering.
// The App component is styled with CSS and includes a header with the title "PricePulse - Price Optimization Dashboard".
// The FileUpload component handles file selection and uploading to the backend, while the PriceOptimization component displays the optimized prices in a list format.
// The optimized prices are displayed in a list format, showing the product name and the new price.
// The App component is styled with CSS and includes a header with the title "PricePulse - Price Optimization Dashboard".
// The FileUpload component handles file selection and uploading to the backend, while the PriceOptimization component displays the optimized prices in a list format.  