import React, { useState } from 'react';
import axios from "axios";
const AddSubjectPage = () => {
  const [formData, setFormData] = useState({
    subjectName: '',
    mark: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/auth/addSubject', formData);
      setFormData({ subjectName: '', mark: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add subject');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center text-primary">Add Subject</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
        
              <div className="mb-3">
                <label className="form-label">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  className="form-control"
                  value={formData.subjectName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mark</label>
                <input
                  type="number"
                  name="mark"
                  className="form-control"
                  value={formData.mark}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Add Subject</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectPage;