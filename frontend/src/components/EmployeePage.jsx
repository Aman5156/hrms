import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/employees/`);
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeAdded = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const handleEmployeeDelete = async (employeeId) => {
    try {
      await axios.delete(`${BASE_URL}/api/employees/${employeeId}/`);
      setEmployees((prev) =>
        prev.filter((emp) => emp.employee_id !== employeeId)
      );
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mt-4">Employee Management</h2>
          <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
            Add Employee
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddEmployee onEmployeeAdded={(employee) => {
                handleEmployeeAdded(employee);
                setShowModal(false);
              }} />
            </Modal.Body>
          </Modal>

          {loading && <p>Loading employees...</p>}

          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <EmployeeList
              employees={employees}
              onDelete={handleEmployeeDelete}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeePage;
