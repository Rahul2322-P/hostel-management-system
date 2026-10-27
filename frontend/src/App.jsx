import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import HostelForm from './components/HostelForm';
import HostelList from './components/HostelList';
import DeleteModal from './components/DeleteModal';
import AlertMessage from './components/AlertMessage';
import hostelService from './services/hostelService';

// Sample preview data for Phase 1 UI testing when backend is not yet started
const DEMO_HOSTELS = [
  {
    id: 101,
    hostelName: 'Gargi Bhavan (Girls Hostel)',
    location: 'North Campus, Sector 4',
    roomCount: 150,
    wardenName: 'Dr. Sunita Rao',
  },
  {
    id: 102,
    hostelName: 'Kaveri Residency (Boys Hostel)',
    location: 'South Campus, Block B',
    roomCount: 220,
    wardenName: 'Prof. K. V. Sharma',
  },
  {
    id: 103,
    hostelName: 'Himalaya Executive Hostel',
    location: 'East Campus, Academic Zone',
    roomCount: 85,
    wardenName: 'Dr. Ramesh Kumar',
  },
];

function App() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [hostelToDelete, setHostelToDelete] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Fetch hostels from backend REST API
  const fetchHostels = useCallback(async (isSilent = false) => {
    if (demoMode) return;

    if (!isSilent) setLoading(true);
    try {
      const data = await hostelService.getAllHostels();
      setHostels(Array.isArray(data) ? data : []);
      setBackendOnline(true);
      if (!isSilent) {
        // Clear old connection errors if connection restored
        if (alert?.type === 'danger' && alert?.message?.includes('Cannot connect')) {
          setAlert(null);
        }
      }
    } catch (err) {
      setBackendOnline(false);
      if (!isSilent) {
        setAlert({
          type: 'danger',
          message: err.message || 'Failed to fetch hostels from backend.',
        });
      }
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [demoMode, alert]);

  // Initial load on component mount
  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  // Handle adding a new hostel
  const handleAddHostel = async (formData) => {
    setSubmitting(true);
    setAlert(null);

    // If running in demo mode for Phase 1 UI testing
    if (demoMode) {
      setTimeout(() => {
        const newRecord = {
          id: Math.floor(100 + Math.random() * 900),
          ...formData,
        };
        setHostels((prev) => [newRecord, ...prev]);
        setSubmitting(false);
        setAlert({
          type: 'success',
          message: `Hostel "${newRecord.hostelName}" registered successfully with generated ID #${newRecord.id} (Demo Mode).`,
        });
      }, 500);
      return true;
    }

    try {
      const createdRecord = await hostelService.createHostel(formData);
      setAlert({
        type: 'success',
        message: `Hostel "${createdRecord.hostelName}" registered successfully with generated ID #${createdRecord.id}!`,
      });
      // Refresh list to display new record
      await fetchHostels(true);
      return true;
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Failed to create hostel record.',
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Open delete confirmation modal
  const handleRequestDelete = (hostel) => {
    setHostelToDelete(hostel);
  };

  // Confirm delete action
  const handleConfirmDelete = async (id) => {
    setDeleting(true);
    setAlert(null);

    if (demoMode) {
      setTimeout(() => {
        setHostels((prev) => prev.filter((h) => h.id !== id));
        setDeleting(false);
        setHostelToDelete(null);
        setAlert({
          type: 'success',
          message: `Hostel #${id} was deleted successfully (Demo Mode).`,
        });
      }, 400);
      return;
    }

    try {
      await hostelService.deleteHostel(id);
      setAlert({
        type: 'success',
        message: `Hostel #${id} has been permanently deleted.`,
      });
      setHostelToDelete(null);
      // Refresh list
      await fetchHostels(true);
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || `Failed to delete hostel #${id}.`,
      });
      setHostelToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  // Toggle demo mode for Phase 1 verification before Phase 2 backend is running
  const toggleDemoMode = () => {
    if (!demoMode) {
      setDemoMode(true);
      setHostels(DEMO_HOSTELS);
      setAlert({
        type: 'info',
        message: 'Loaded Phase 1 Preview Demo Data. You can test UI cards, validation, adding, and deleting without the backend running!',
      });
    } else {
      setDemoMode(false);
      setHostels([]);
      setAlert(null);
      fetchHostels();
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 1. Header Navigation Bar */}
      <Navbar
        totalHostels={hostels.length}
        onRefresh={() => fetchHostels(false)}
        loading={loading}
      />

      {/* Main Content Container */}
      <main className="container-fluid px-4 py-4 flex-grow-1">
        {/* Banner Alert Messages */}
        <AlertMessage alert={alert} onDismiss={() => setAlert(null)} />

        {/* Phase 1 Helper Notice & Demo Toggle */}
        <div className="card border-0 bg-white shadow-sm p-3 mb-4 rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <span className={`badge ${backendOnline ? 'bg-success' : demoMode ? 'bg-info' : 'bg-secondary'} p-2 px-3 fs-6 rounded-pill d-flex align-items-center gap-2`}>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              <span>{backendOnline ? 'Backend Online (Port 8081)' : demoMode ? 'UI Demo Mode Active' : 'Backend Offline (Phase 1 Mode)'}</span>
            </span>
            <small className="text-muted d-none d-lg-inline">
              {backendOnline
                ? 'Connected to Spring Boot API at http://localhost:8081/api/hostels.'
                : 'In Phase 1, the backend is not yet started. Form validation & UI can be tested right now.'}
            </small>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className={`btn btn-sm ${demoMode ? 'btn-outline-danger' : 'btn-outline-primary'} rounded-pill px-3 d-flex align-items-center gap-1`}
              onClick={toggleDemoMode}
            >
              <i className={`bi ${demoMode ? 'bi-x-circle' : 'bi-eye-fill'}`}></i>
              <span>{demoMode ? 'Exit Demo Preview' : 'Load Demo Hostels (Phase 1 Test)'}</span>
            </button>
          </div>
        </div>

        {/* 2. Dashboard Statistics Summary */}
        <Dashboard hostels={hostels} backendOnline={backendOnline} />

        {/* 3 & 4. Main Two-Column Layout (Form on Left, Hostels List on Right) */}
        <div className="row g-4">
          {/* Add Hostel Form Column */}
          <div className="col-12 col-lg-5 col-xl-4">
            <HostelForm onAddHostel={handleAddHostel} submitting={submitting} />
          </div>

          {/* View Hostels Records Column */}
          <div className="col-12 col-lg-7 col-xl-8">
            <HostelList
              hostels={hostels}
              loading={loading}
              onRequestDelete={handleRequestDelete}
              onRefresh={() => fetchHostels(false)}
            />
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        hostel={hostelToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setHostelToDelete(null)}
        deleting={deleting}
      />

      {/* Footer with Student Academic Details */}
      <footer className="py-3 px-4 text-center text-muted small">
        <div className="container-fluid">
          <span>
            <strong>Hostel Management System</strong> &bull; Developed by{' '}
            <strong className="text-dark">P Rahul</strong> (Student ID:{' '}
            <strong className="text-dark">P2400032050</strong>, Section:{' '}
            <strong className="text-dark">S05</strong>) &bull; College Exam Project
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
