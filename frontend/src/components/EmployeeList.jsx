function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p className="empty-state">No employees added yet.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.employee_id}>
            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button
                className="btn-danger"
                onClick={() => onDelete(emp.employee_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;
