import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateSubjectPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subjectName: '',
    mark: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/api/auth/getStudentMark/${id}`)
      .then(response => {
        setFormData({
          subjectName: response.data.subjectName,
          mark: response.data.mark
        });
      })
      .catch(error => {
        console.error('Error fetching subject:', error);
        alert('Could not load subject data.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8081/api/auth/updateSubject/${id}`, formData)
      .then(() => {
        alert('Subject updated successfully!');
        navigate('/'); 
      })
      .catch(error => {
        console.error('Error updating subject:', error);
        alert('Failed to update subject.');
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-primary text-center">Update Subject</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  className="form-control"
                  value={formData.subjectName}
                  onChange={handleChange}
                  required
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
                  required
                  min="0"
                  max="100"
                />
              </div>

              <button type="submit" className="btn btn-success w-100">Update Subject</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubjectPage;
