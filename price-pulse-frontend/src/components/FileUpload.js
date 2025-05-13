import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ setOptimizedPrices }) {
  const [file, setFile] = useState(null);

  // Handle file selection
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload to backend
  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/optimize-prices', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOptimizedPrices(response.data.optimizedPrices);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div>
      <h2>Upload Retail Data</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload and Optimize Prices</button>
    </div>
  );
}

export default FileUpload;
