import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EmployeePage from "./components/EmployeePage";
import AttendancePage from "./components/AttendancePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h4 className="mb-4">HRMS Lite</h4>
          <nav className="nav flex-column">
            <NavLink className="nav-link" to="/">Dashboard</NavLink>
            <NavLink className="nav-link" to="/employees">Employees</NavLink>
            <NavLink className="nav-link" to="/attendance">Attendance</NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
