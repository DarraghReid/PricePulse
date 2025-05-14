import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function FileUpload({ setOptimizedPrices }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type !== 'text/csv') {
        alert('Please upload a valid CSV file.');
        setFile(null);
        setLoading(false)
        return;
    }
    setFile(event.target.files[0]);
  };

  // Handle file upload to backend
  const onFileUpload = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    
    <div>
        {loading && (
            <div className="loader">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
            </div>
        )}
        {!loading && (
            <div>
            <h2>Upload Retail Data</h2>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload and Optimize Prices</button>
            </div>
        )}
      {/* <h2>Upload Retail Data</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload and Optimize Prices</button> */}
    </div>
  );
}

export default FileUpload;
