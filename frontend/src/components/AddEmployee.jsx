import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/employees/`, formData);
      onEmployeeAdded(response.data);
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
      console.log(err.response?.data)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Employee ID:</label>
          <input
            className="form-input"
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            placeholder="Enter Employee ID"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Full Name:</label>
          <input
            className="form-input"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Department:</label>
          <input
            className="form-input"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter Department"
            required
          />
        </div>
        <button className="btn btn-success" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
  );
};

export default AddEmployee;
