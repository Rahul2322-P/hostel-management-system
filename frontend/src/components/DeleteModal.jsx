import React from 'react';

const DeleteModal = ({ hostel, onConfirm, onCancel, deleting }) => {
  if (!hostel) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}
      ></div>

      {/* Modal Dialog */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '14px' }}>
            {/* Modal Header */}
            <div className="modal-header bg-danger text-white border-0" style={{ borderTopLeftRadius: '14px', borderTopRightRadius: '14px' }}>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-triangle-fill fs-4"></i>
                <h5 className="modal-title fw-bold mb-0">Confirm Hostel Deletion</h5>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onCancel}
                disabled={deleting}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              <p className="lead fs-6 mb-3">
                Are you sure you want to permanently delete the following hostel record?
              </p>

              <div className="card bg-light border p-3 rounded-3 mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Hostel ID:</span>
                  <span className="badge bg-secondary font-monospace">#{hostel.id}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Hostel Name:</span>
                  <strong className="text-dark">{hostel.hostelName}</strong>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Location:</span>
                  <span className="text-dark">{hostel.location}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Room Count:</span>
                  <span className="text-dark">{hostel.roomCount} rooms</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Warden:</span>
                  <span className="text-dark">{hostel.wardenName}</span>
                </div>
              </div>

              <div className="alert alert-warning d-flex align-items-center gap-2 py-2 px-3 small mb-0">
                <i className="bi bi-info-circle-fill fs-5"></i>
                <span>This operation cannot be reversed once confirmed.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-0 bg-light p-3" style={{ borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px' }}>
              <button
                type="button"
                className="btn btn-secondary px-3"
                onClick={onCancel}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger px-4 d-flex align-items-center gap-2"
                onClick={() => onConfirm(hostel.id)}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash3-fill"></i>
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
