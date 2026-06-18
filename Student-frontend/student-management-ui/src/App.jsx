// ===============================
// App.jsx — Student Management System (redesigned UI only)
// All state, handlers, API calls, and class names preserved.
// ===============================
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// ===============================
// BADGE COLOR MAP BY DEPARTMENT
// ===============================
const deptBadge = (dept) => {
  const d = (dept || "").toLowerCase();
  if (d.includes("computer") || d.includes("cs")) return "badge-cs";
  if (d.includes("electron")) return "badge-ec";
  if (d.includes("mechanical")) return "badge-me";
  if (d.includes("civil")) return "badge-ci";
  return "badge-def";
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("") || "?";

// ===============================
// ICONS (inline SVG)
// ===============================
const Icon = {
  sun: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  plus: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  edit: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  trash: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  ),
  user: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  mail: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  building: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M3 9h6" />
      <path d="M3 15h6" />
      <path d="M15 9h2" />
      <path d="M15 13h2" />
      <path d="M15 17h2" />
    </svg>
  ),
  book: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  search: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  students: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  dept: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  chart: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  download: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
};

// ===============================
// MAIN APP COMPONENT
// ===============================
function App() {
  // ---- STATE (unchanged) ----
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [courseIds, setCourseIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  // ---- SYNC DARK CLASS ON <body> ----
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    setIsLoggedIn(!!token);
  }, []);

  // ---- LOAD STUDENTS FROM API ----
  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://localhost:7152/api/Students");

      const data = await response.json();

      console.log(data);

      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---- LOGIN HANDLER (unchanged) ----
  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Email or Password");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ---- ADD STUDENT ----
  const addStudent = async () => {
    if (name.trim() === "") {
      alert("Name is required");
      return;
    }
    if (email.trim() === "") {
      alert("Email is required");
      return;
    }
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }
    if (department.trim() === "") {
      alert("Department is required");
      return;
    }

    await fetch("https://localhost:7152/api/Students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, department, courseIds }),
    });

    clearForm();
    loadStudents();
    toast.success("✅ Student added successfully!");
    setMessage("✅ Student Added Successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  // ---- UPDATE STUDENT ----
  const updateStudent = async () => {
    if (name.trim() === "") {
      alert("Name is required");
      return;
    }
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    await fetch(`https://localhost:7152/api/Students/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        name,
        email,
        department,
        courseIds,
      }),
    });
    clearForm();
    loadStudents();
    toast.success("✅Student updated successfully!");
    setMessage("✅ Student Updated Successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  // ---- DELETE STUDENT ----
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    await fetch(`https://localhost:7152/api/Students/${id}`, {
      method: "DELETE",
    });
    loadStudents();
    toast.success("✅ Student Deleted Successfully");
    setMessage("✅ Student Deleted Successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  // ---- EDIT: LOAD INTO FORM ----
  const editStudent = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setEmail(student.email);
    setDepartment(student.department);
    setCourseIds(student.courses ? student.courses.map((c) => c.id) : []);
  };

  // ---- CLEAR FORM ----
  const clearForm = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setDepartment("");
    setCourseIds([]);
  };

  // ---- FILTERED LIST ----
  const filtered = students
    .filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.department.toLowerCase().includes(search.toLowerCase()) ||
        String(s.courseId || "").includes(search.toLowerCase());
      const matchesDepartment =
        departmentFilter === "" || s.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

  // ---- PAGINATION ----
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const totalPages = Math.max(1, Math.ceil(filtered.length / studentsPerPage));
  const currentStudents = filtered.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  // ---- EXPORT CSV ----
  const exportCSV = () => {
    const headers = ["Id", "Name", "Email", "Department", "CourseId"];
    const rows = students.map((s) => [
      s.id,
      s.name,
      s.email,
      s.department,
      s.courseId.join(", "),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ---- DEPARTMENT STATS ----
  const departmentCounts = students.reduce((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: "Students",
        data: Object.values(departmentCounts),
        backgroundColor: [
          "#6366f1",
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderRadius: 8,
        maxBarThickness: 48,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6b7280" } },
      y: {
        grid: { color: "rgba(99,102,241,0.08)" },
        ticks: { color: "#6b7280", precision: 0 },
      },
    },
  };

  // ===============================
  // LOGIN VIEW
  // ===============================
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  // ===============================
  // MAIN DASHBOARD
  // ===============================
  return (
    <div className="sms-root">
      <div className="sms-wrap">
        {/* ---- TOP BAR ---- */}
        <header className="sms-topbar">
          <div className="sms-brand">
            <div className="sms-logo">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="sms-title">
                Edu<span>Manage</span> · Student Dashboard
              </div>
              <div className="sms-subtitle">
                Manage students, courses & departments
              </div>
            </div>
          </div>

          <div className="sms-nav-right">
            <button
              className="sms-toggle"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="sms-toggle-track">
                <span className={`sms-toggle-knob ${dark ? "on" : ""}`} />
              </span>
              {dark ? Icon.sun : Icon.moon}
              {dark ? "Light" : "Dark"}
            </button>

            <div className="sms-profile">
              <div className="sms-avatar">AD</div>
              <div>
                <div className="sms-profile-name">Admin</div>
                <div className="sms-profile-role">Administrator</div>
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </header>

        {/* SUCCESS MESSAGE */}
        {message && <div className="sms-message">{message}</div>}

        {/* ---- DASHBOARD STATS ---- */}
        <section className="sms-stats">
          <div className="sms-stat">
            <div className="sms-stat-icon">{Icon.students}</div>
            <div className="sms-stat-label">Total Students</div>
            <div className="sms-stat-value">{students.length}</div>
          </div>
          <div className="sms-stat">
            <div className="sms-stat-icon">{Icon.building}</div>
            <div className="sms-stat-label">IT</div>
            <div className="sms-stat-value">
              {
                students.filter((s) =>
                  s.department.toLowerCase().includes("it"),
                ).length
              }
            </div>
          </div>
          <div className="sms-stat">
            <div className="sms-stat-icon">{Icon.book}</div>
            <div className="sms-stat-label">CSE</div>
            <div className="sms-stat-value">
              {
                students.filter((s) =>
                  s.department.toLowerCase().includes("cse"),
                ).length
              }
            </div>
          </div>
          <div className="sms-stat">
            <div className="sms-stat-icon">{Icon.dept}</div>
            <div className="sms-stat-label">Departments</div>
            <div className="sms-stat-value">
              {Object.keys(departmentCounts).length}
            </div>
          </div>
        </section>

        {/* ---- FORM CARD ---- */}
        <section className="sms-card">
          <div className="sms-form-title">
            <span className="sms-form-icon">
              {editingId ? Icon.edit : Icon.plus}
            </span>
            {editingId ? "Update student" : "Add a new student"}
          </div>

          <div className="sms-form-grid">
            <div className="sms-input-wrap">
              <span className="sms-input-icon">{Icon.user}</span>
              <input
                className="sms-input"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="sms-input-wrap">
              <span className="sms-input-icon">{Icon.mail}</span>
              <input
                className="sms-input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="sms-input-wrap">
              <span className="sms-input-icon">{Icon.building}</span>
              <input
                className="sms-input"
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div className="sms-input-wrap">
              <span className="sms-input-icon">{Icon.book}</span>
              <select
                className="sms-input"
                value={courseIds[0] || ""}
                onChange={(e) => setCourseIds([Number(e.target.value)])}
              >
                <option value="">Select Course</option>
                <option value="1">Python Full Stack</option>
                <option value="2">Java Full Stack</option>
                <option value="3">Dot Net Full Stack</option>
                <option value="4">MERN Stack</option>
              </select>
            </div>
          </div>

          <div className="sms-form-actions">
            <button
              className="sms-btn-add"
              onClick={editingId ? updateStudent : addStudent}
            >
              {editingId ? Icon.edit : Icon.plus}
              {editingId ? "Update student" : "Add student"}
            </button>
            {editingId && (
              <button className="sms-btn-cancel" onClick={clearForm}>
                Cancel
              </button>
            )}
          </div>
        </section>

        {/* ---- CHART ---- */}
        <section className="sms-chart-card">
          <h3>Department-wise Students</h3>
          <div className="sms-chart-wrap">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </section>

        {/* ---- TOOLBAR ---- */}
        <section className="sms-card" style={{ padding: 18 }}>
          <div className="sms-toolbar">
            <div className="sms-search-wrap">
              <span className="sms-search-icon">{Icon.search}</span>
              <input
                className="sms-search"
                type="text"
                placeholder="Search by name, department or course id…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="sms-input"
              style={{
                paddingLeft: 14,
                backgroundPosition: "right 14px center",
              }}
            >
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="Java Full Stack">Java Full Stack</option>
              <option value="Python Full Stack">Python Full Stack</option>
            </select>

            <div className="sms-actions-row">
              <button
                className={`sms-chip-btn ${sortOrder === "asc" ? "is-active" : ""}`}
                onClick={() => setSortOrder("asc")}
              >
                Sort A–Z
              </button>
              <button
                className={`sms-chip-btn ${sortOrder === "desc" ? "is-active" : ""}`}
                onClick={() => setSortOrder("desc")}
              >
                Sort Z–A
              </button>
              <button className="sms-chip-btn" onClick={exportCSV}>
                {Icon.download} Export CSV
              </button>
            </div>
          </div>

          <div className="sms-result-count" style={{ marginTop: 10 }}>
            Showing {filtered.length} student{filtered.length === 1 ? "" : "s"}
          </div>
        </section>

        {/* ---- TABLE ---- */}
        <section className="sms-table-card">
          {loading ? (
            <div className="sms-loading">
              <span className="sms-spinner" /> Loading students…
            </div>
          ) : (
            <div className="sms-table-scroll">
              <table className="sms-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="sms-empty">
                          <div className="sms-empty-icon">{Icon.students}</div>
                          <div className="sms-empty-title">
                            No students found
                          </div>
                          <div>
                            Try adjusting your search or add a new student
                            above.
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentStudents.map((student, i) => (
                      <tr key={student.id}>
                        <td className="muted">
                          {(currentPage - 1) * studentsPerPage + i + 1}
                        </td>
                        <td
                          className="name"
                          onClick={() =>
                            alert(
                              `Name: ${student.name}\nEmail: ${student.email}\nDepartment: ${student.department}`,
                            )
                          }
                        >
                          <div className="sms-cell-user">
                            <div className="sms-cell-avatar">
                              {initials(student.name)}
                            </div>
                            {student.name}
                          </div>
                        </td>
                        <td className="email">{student.email}</td>
                        <td>
                          <span
                            className={`sms-badge ${deptBadge(student.department)}`}
                          >
                            {student.department}
                          </span>
                        </td>
                        <td className="muted">
                          {student.courses && student.courses.length > 0
                            ? student.courses
                                .map((c) => c.courseName)
                                .join(", ")
                            : "No Course Assigned"}
                        </td>
                        <td>
                          <div className="sms-actions">
                            <button
                              className="sms-btn-view"
                              onClick={() => setSelectedStudent(student)}
                            >
                              View
                            </button>
                            <button
                              className="sms-btn-edit"
                              onClick={() => editStudent(student)}
                            >
                              {Icon.edit} Edit
                            </button>
                            <button
                              className="sms-btn-del"
                              onClick={() => deleteStudent(student.id)}
                            >
                              {Icon.trash} Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINATION */}
          <div className="sms-pagination">
            <div className="sms-page-info">
              Total Records: <b>{students.length}</b>
            </div>
            <div className="sms-page-controls">
              <button
                className="sms-page-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <span className="sms-page-info">
                Page <b>{currentPage}</b> of <b>{totalPages}</b>
              </span>
              <button
                className="sms-page-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ---- VIEW STUDENT MODAL ---- */}
      {selectedStudent && (
        <div
          className="sms-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <div className="sms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sms-modal-header">
              <h3>Student Profile</h3>
              <div className="sms-modal-avatar">
                {initials(selectedStudent.name)}
              </div>
            </div>
            <div className="sms-modal-body">
              <div className="sms-modal-name">{selectedStudent.name}</div>
              <div className="sms-modal-email">{selectedStudent.email}</div>

              <div className="sms-detail-row">
                <span className="sms-detail-label">Department</span>
                <span className="sms-detail-value">
                  <span
                    className={`sms-badge ${deptBadge(selectedStudent.department)}`}
                  >
                    {selectedStudent.department}
                  </span>
                </span>
              </div>
              <div className="sms-detail-row">
                <span className="sms-detail-label">Course</span>
                <span className="sms-detail-value">
                  {selectedStudent.courseId === 1
                    ? "Python Full Stack"
                    : selectedStudent.courseId === 2
                      ? "Java Full Stack"
                      : "—"}
                </span>
              </div>
              <div className="sms-detail-row">
                <span className="sms-detail-label">Student ID</span>
                <span className="sms-detail-value">#{selectedStudent.id}</span>
              </div>
            </div>
            <div className="sms-modal-footer">
              <button
                className="sms-btn-cancel"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme={dark ? "dark" : "light"}
      />
    </div>
  );
}

export default App;
