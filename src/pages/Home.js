import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({ subjectName: '', mark: '' });
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/auth/getStudentsMarks')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8081/api/auth/deleteStudentMark/${id}`)
                .then(() => setData(prev => prev.filter(subject => subject.ID !== id)))
                .catch(error => {
                    console.error("Error deleting subject:", error);
                    alert("Failed to delete subject.");
                });
        }
    };

    const handleEditClick = (student) => {
        setEditingStudent(student.ID);
        setFormData({ subjectName: student.subjectName, mark: student.mark });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/auth/updateSubject/${editingStudent}`, formData)
        .then(response => {
            setData(prev =>
                prev.map(student =>
                    student.ID === editingStudent
                        ? { ...student, ...formData }
                        : student
                )
            );
            setEditingStudent(null);
            setUpdateError('');
        })
        .catch(error => {
            const msg = error.response?.data?.message || "Failed to update subject.";
            setUpdateError(msg);
            console.error("Error updating subject:", error);
        });
};

    return (
        <div className="'d-flex vh-100  bg-primary justify-content-center align-items-center " >
            <div className="w-70 bg-white mt-5 rounded p-5">
                <h2 className="text-center">Student subjects</h2>
                <Link to="/addSubject" className="btn btn-sm btn-primary mx-2">add</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject Name</th>
                            <th>mark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, item) => (
                            <tr key={item}>
                                <td>{student.ID}</td>
                                <td>{student.subjectName}</td>
                                <td>{student.mark}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary mx-2"
                                        onClick={() => handleEditClick(student)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.ID)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingStudent && (
                    <form onSubmit={handleUpdateSubmit} className="mt-4">
                        <h4>Update Subject</h4>
                        {updateError && (
                            <div className="alert alert-danger" role="alert">
                                {updateError}
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Subject Name</label>
                            <input
                                type="text"
                                name="subjectName"
                                className="form-control"
                                value={formData.subjectName}
                                onChange={handleUpdateChange}
                               
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mark</label>
                            <input
                                type="text"
                                name="mark"
                                className="form-control"
                                value={formData.mark}
                                onChange={handleUpdateChange}
                               
                            />
                        </div>
                        <button type="submit" className="btn btn-success mx-2">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingStudent(null)}>Cancel</button>
                    </form>
                )}

            </div>
        </div>
    );
}

export default Home;