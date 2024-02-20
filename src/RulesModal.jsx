import './styles/RulesModal.css'; // Make sure you have this CSS file for modal styles
import PropTypes from 'prop-types';

function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="credits-container">
          <h2>Galactic Battle: Rock Paper Scissors!</h2>
          <p>Prepare to clash in the ultimate game of wit and strategy, where cosmic forces collide. Here&apos;s how to become a Rock Paper Scissors champion:</p>
          <ul>
            <li><span className="rock-text"><strong>Rock</strong></span> crushes <span className="scissors-text"><strong>Scissors</strong></span>: Unleash the mountain&apos;s might to shatter blades!</li>
            <li><span className="paper-text"><strong>Paper</strong></span> covers <span className="rock-text"><strong>Rock</strong></span>: Envelop the stone with the wisdom of ages!</li>
            <li><span className="scissors-text"><strong>Scissors</strong></span> cuts <span className="paper-text"><strong>Paper</strong></span>: Slice through knowledge with the edge of destiny!</li>
          </ul>
          <p>Choose your weapon wisely, as your fate is sealed with your decision. The first to conquer their opponent in three cosmic duels shall be crowned the ruler of the galaxy...</p>
          <h2> May the stars align in your favor!</h2>
        </div>
      </div>
    </div>
  );
}

RulesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RulesModal;