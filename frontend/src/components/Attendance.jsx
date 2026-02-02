import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8008";

function Attendance({ employees = [] }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/attendances/`);
      setRecords(response.data);
    } catch (err) {
      setError("Failed to fetch attendance records");
    }
  };

  const markAttendance = async (emp, status) => {
    setLoading(true);
    setError(null);

    try {
      const date = new Date().toISOString().slice(0, 10);
      await axios.post(`${BASE_URL}/api/attendances/mark_attendance/`, {
        employee_id: emp.employee_id,
        date,
        status,
      });
      fetchAttendances();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="mt-3">
      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Employees Section */}
      <h4 className="mb-3">Mark Attendance</h4>

      {employees.length === 0 ? (
        <Alert variant="info">Add employees to mark attendance.</Alert>
      ) : (
        <Row>
          {employees.map((emp) => (
            <Col md={6} lg={4} className="mb-3" key={emp.employee_id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{emp.full_name}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    {emp.employee_id}
                  </Card.Subtitle>

                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      disabled={loading}
                      onClick={() => markAttendance(emp, "Present")}
                    >
                      Present
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      disabled={loading}
                      onClick={() => markAttendance(emp, "Absent")}
                    >
                      Absent
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {/* Attendance Records */}
      {Array.isArray(records) && records.length > 0 && (
        <>
          <h4 className="mt-5 mb-3">Attendance Records</h4>
          <Row>
            {records.map((r, i) => (
              <Col md={6} lg={4} className="mb-3" key={i}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <strong>{r.name}</strong>
                    <div className="text-muted">{r.date}</div>
                    <Badge
                      bg={r.status === "Present" ? "success" : "danger"}
                      className="mt-2"
                    >
                      {r.status}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Attendance;
