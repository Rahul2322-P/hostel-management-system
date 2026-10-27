import React from 'react';

const Dashboard = ({ hostels, backendOnline }) => {
  const totalHostels = hostels.length;
  const totalRooms = hostels.reduce((sum, h) => sum + (Number(h.roomCount) || 0), 0);
  const avgRooms = totalHostels > 0 ? Math.round(totalRooms / totalHostels) : 0;
  const uniqueWardens = new Set(hostels.map((h) => h.wardenName?.trim().toLowerCase()).filter(Boolean)).size;

  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card stat-card bg-primary text-white h-100">
          <div className="card-body d-flex align-items-center justify-content-between p-3">
            <div>
              <p className="text-white-50 text-uppercase fw-semibold mb-1 small">Total Hostels</p>
              <h2 className="display-6 fw-bold mb-0">{totalHostels}</h2>
              <small className="text-white-50">Registered in system</small>
            </div>
            <div className="stat-icon">
              <i className="bi bi-buildings"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card stat-card bg-success text-white h-100">
          <div className="card-body d-flex align-items-center justify-content-between p-3">
            <div>
              <p className="text-white-50 text-uppercase fw-semibold mb-1 small">Total Rooms</p>
              <h2 className="display-6 fw-bold mb-0">{totalRooms}</h2>
              <small className="text-white-50">Overall room capacity</small>
            </div>
            <div className="stat-icon">
              <i className="bi bi-door-open"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card stat-card bg-info text-white h-100">
          <div className="card-body d-flex align-items-center justify-content-between p-3">
            <div>
              <p className="text-white-50 text-uppercase fw-semibold mb-1 small">Avg Rooms/Hostel</p>
              <h2 className="display-6 fw-bold mb-0">{avgRooms}</h2>
              <small className="text-white-50">Capacity density</small>
            </div>
            <div className="stat-icon">
              <i className="bi bi-pie-chart"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card stat-card bg-secondary text-white h-100">
          <div className="card-body d-flex align-items-center justify-content-between p-3">
            <div>
              <p className="text-white-50 text-uppercase fw-semibold mb-1 small">Active Wardens</p>
              <h2 className="display-6 fw-bold mb-0">{uniqueWardens}</h2>
              <small className="text-white-50">Distinct administrators</small>
            </div>
            <div className="stat-icon">
              <i className="bi bi-person-workspace"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
