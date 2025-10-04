import React, { useState } from 'react';
import { listAPI } from '../services/api';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only CSV, XLS, XLSX allowed.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      await listAPI.uploadFile(formData);
      setSuccess('File uploaded and distributed successfully');
      setFile(null);
      onUpload();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload CSV/XLSX File</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
