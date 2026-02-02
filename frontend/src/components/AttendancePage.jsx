import React, { useState, useEffect } from "react";
import axios from "axios";
import Attendance from "./Attendance";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8008";

const AttendancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/api/employees/`);
      setEmployees(response.data); // ✅ ONLY data
      
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <header className="content-header">
        <h1>Attendance Management</h1>
        <p>Mark and view attendance records</p>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div className="card">
          <Attendance employees={employees} />
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
