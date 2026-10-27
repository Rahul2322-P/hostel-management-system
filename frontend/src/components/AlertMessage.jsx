import React from 'react';

const AlertMessage = ({ alert, onDismiss }) => {
  if (!alert || !alert.message) return null;

  const isSuccess = alert.type === 'success';
  const isDanger = alert.type === 'danger' || alert.type === 'error';
  const isWarning = alert.type === 'warning';
  const isInfo = alert.type === 'info';

  const alertClass = isSuccess
    ? 'alert-success border-success'
    : isDanger
    ? 'alert-danger border-danger'
    : isWarning
    ? 'alert-warning border-warning'
    : 'alert-info border-info';

  const iconClass = isSuccess
    ? 'bi-check-circle-fill text-success'
    : isDanger
    ? 'bi-exclamation-octagon-fill text-danger'
    : isWarning
    ? 'bi-exclamation-triangle-fill text-warning'
    : 'bi-info-circle-fill text-info';

  return (
    <div
      className={`alert ${alertClass} alert-dismissible fade show d-flex align-items-start gap-2 shadow-sm rounded-3 mb-4`}
      role="alert"
    >
      <i className={`bi ${iconClass} fs-5 flex-shrink-0 mt-1`}></i>
      <div className="flex-grow-1">
        <strong className="d-block">
          {isSuccess ? 'Success!' : isDanger ? 'Error Encountered:' : 'Notification:'}
        </strong>
        <span style={{ wordBreak: 'break-word' }}>{alert.message}</span>
      </div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onDismiss}
      ></button>
    </div>
  );
};

export default AlertMessage;
