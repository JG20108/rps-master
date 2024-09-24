import './styles/ConfirmationModal.css'; // Assume you will create a corresponding CSS file

function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  return (
    <div className={`confirmation-modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="confirmation-modal">
        <p style={{ color: '#333' }}>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;