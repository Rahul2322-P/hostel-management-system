import React, { useState } from 'react';

const HostelList = ({ hostels, loading, onRequestDelete, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter hostels based on search query
  const filteredHostels = hostels.filter((hostel) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = hostel.hostelName?.toLowerCase().includes(term);
    const locMatch = hostel.location?.toLowerCase().includes(term);
    const wardenMatch = hostel.wardenName?.toLowerCase().includes(term);
    const idMatch = String(hostel.id || '').includes(term);
    return nameMatch || locMatch || wardenMatch || idMatch;
  });

  return (
    <div className="card custom-card">
      {/* Header with Title and Search/Refresh controls */}
      <div className="card-header card-header-custom">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-list-check text-primary fs-5"></i>
            <span className="fs-5">Registered Hostels</span>
            <span className="badge bg-primary rounded-pill ms-1">{hostels.length}</span>
          </div>

          <div className="d-flex gap-2">
            <div className="input-group input-group-sm" style={{ maxWidth: '240px' }}>
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search hostels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading || hostels.length === 0}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary border-start-0"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>

            <button
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Records"
            >
              <i className={`bi bi-arrow-clockwise ${loading ? 'spin' : ''}`}></i>
              <span className="d-none d-sm-inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card-body p-0">
        {/* Loading Spinner State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading hostels...</span>
            </div>
            <p className="text-muted mt-2 mb-0">Fetching hostel records from API...</p>
          </div>
        )}

        {/* Empty State when no hostels exist */}
        {!loading && hostels.length === 0 && (
          <div className="p-4">
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-building-slash"></i>
              </div>
              <h4 className="fw-bold text-secondary">No Hostels Registered Yet</h4>
              <p className="text-muted mb-3 mx-auto" style={{ maxWidth: '420px' }}>
                There are currently no hostel records in the database. Use the <strong>Add New Hostel</strong> form on the left to register your first hostel.
              </p>
            </div>
          </div>
        )}

        {/* Empty Search Filter State */}
        {!loading && hostels.length > 0 && filteredHostels.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-search text-muted fs-1 mb-2 d-block"></i>
            <h5 className="text-secondary">No matching hostels found</h5>
            <p className="text-muted small">No records matched your search query "{searchTerm}".</p>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          </div>
        )}

        {/* Table View (Desktop & Tablet) */}
        {!loading && filteredHostels.length > 0 && (
          <>
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover table-custom align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '80px' }}>ID</th>
                    <th scope="col">Hostel Name</th>
                    <th scope="col">Location</th>
                    <th scope="col" className="text-center" style={{ width: '120px' }}>Rooms</th>
                    <th scope="col">Warden</th>
                    <th scope="col" className="text-end" style={{ width: '110px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHostels.map((hostel) => (
                    <tr key={hostel.id}>
                      <td>
                        <span className="badge-id">#{hostel.id}</span>
                      </td>
                      <td>
                        <div className="fw-semibold text-dark d-flex align-items-center gap-2">
                          <i className="bi bi-building text-primary"></i>
                          <span>{hostel.hostelName}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-secondary small d-flex align-items-center gap-1">
                          <i className="bi bi-geo-alt text-danger"></i>
                          {hostel.location}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-light text-dark border px-2 py-1">
                          <i className="bi bi-door-closed text-muted me-1"></i>
                          {hostel.roomCount}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark small d-flex align-items-center gap-1">
                          <i className="bi bi-person-circle text-secondary"></i>
                          {hostel.wardenName}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-action d-inline-flex align-items-center gap-1"
                          onClick={() => onRequestDelete(hostel)}
                          title={`Delete ${hostel.hostelName}`}
                        >
                          <i className="bi bi-trash3-fill"></i>
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive Card Layout (Mobile) */}
            <div className="d-md-none p-3">
              <div className="row g-3">
                {filteredHostels.map((hostel) => (
                  <div className="col-12" key={hostel.id}>
                    <div className="card border p-3 rounded-3 shadow-sm bg-white">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold mb-0 text-primary d-flex align-items-center gap-1">
                          <i className="bi bi-building"></i>
                          {hostel.hostelName}
                        </h6>
                        <span className="badge-id">ID: #{hostel.id}</span>
                      </div>
                      <div className="small text-muted mb-2">
                        <div className="d-flex align-items-center gap-1 mb-1">
                          <i className="bi bi-geo-alt text-danger"></i>
                          <strong>Location:</strong> {hostel.location}
                        </div>
                        <div className="d-flex align-items-center gap-1 mb-1">
                          <i className="bi bi-door-closed text-info"></i>
                          <strong>Rooms:</strong> {hostel.roomCount}
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-person-circle text-secondary"></i>
                          <strong>Warden:</strong> {hostel.wardenName}
                        </div>
                      </div>
                      <div className="pt-2 border-top text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                          onClick={() => onRequestDelete(hostel)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HostelList;
