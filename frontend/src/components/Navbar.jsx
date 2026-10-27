import React from 'react';

const Navbar = ({ totalHostels, onRefresh, loading }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3">
      <div className="container-fluid px-4">
        {/* Brand Name & Icon */}
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4" href="#">
          <span className="badge bg-white text-primary rounded-circle p-2 d-inline-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
            <i className="bi bi-buildings-fill fs-5"></i>
          </span>
          <span>Hostel Management System</span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Right-aligned Student Details & Quick Controls */}
          <div className="ms-auto d-flex flex-wrap align-items-center gap-2 mt-3 mt-lg-0">
            {/* Student Exam Metadata Badge */}
            <div className="brand-badge text-white px-3 py-1 rounded-pill d-flex align-items-center gap-2">
              <i className="bi bi-person-badge-fill text-warning"></i>
              <span><strong>Student:</strong> P Rahul</span>
              <span className="text-white-50">|</span>
              <span><strong>ID:</strong> P2400032050</span>
              <span className="text-white-50">|</span>
              <span className="badge bg-warning text-dark px-2">Sec S05</span>
            </div>

            {/* Refresh Button */}
            <button
              className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 rounded-pill px-3"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh hostel records"
            >
              <i className={`bi bi-arrow-clockwise ${loading ? 'spin' : ''}`}></i>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
