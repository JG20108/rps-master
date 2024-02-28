import { useEffect, useRef, useState } from 'react';
import './styles/RulesModal.css';
import PropTypes from 'prop-types';

function RulesModal({ isOpen, onClose, gameMode }) { // Add gameMode to the function parameters
  const modalContentRef = useRef(null);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const handleAnimationEnd = () => {
      setAnimationClass(''); // First, remove the class to reset the animation
      setTimeout(() => setAnimationClass('run-animation'), 10); // Then, re-add the class to restart the animation
    };

    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (modalContent) {
        modalContent.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      setAnimationClass('run-animation');
    } else {
      // Wait for the CSS transition to finish before removing the animation class
      timeoutId = setTimeout(() => {
        setAnimationClass('');
      }, 500); // This delay should match the CSS transition time
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const handleClose = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0; // Reset the scroll to the top immediately
    }
    onClose();
  };

  return (
    <div className={isOpen ? "modal-overlay open" : "modal-overlay"} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={modalContentRef}>
        <div className={`credits-container ${animationClass}`}>
          <h2>{gameMode === 'rps' ? 'Rock Paper Scissors' : 'Rock Paper Scissors Lizard Spock'}</h2>
          <p>Prepare to clash in the ultimate game of wit and strategy, where cosmic forces collide. Here&apos;s how to become a champion:</p>
          <ul>
            <li><span className="rock-text"><strong>Rock</strong></span> crushes <span className="scissors-text"><strong>Scissors</strong></span></li>
            <li><span className="paper-text"><strong>Paper</strong></span> covers <span className="rock-text"><strong>Rock</strong></span></li>
            <li><span className="scissors-text"><strong>Scissors</strong></span> cuts <span className="paper-text"><strong>Paper</strong></span></li>
            {gameMode === 'rpsls' && (
              <>
                <li><span className="lizard-text"><strong>Lizard</strong></span> poisons <span className="spock-text"><strong>Spock</strong></span></li>
                <li><span className="spock-text"><strong>Spock</strong></span> smashes <span className="scissors-text"><strong>Scissors</strong></span></li>
                <li><span className="scissors-text"><strong>Scissors</strong></span> decapitates <span className="lizard-text"><strong>Lizard</strong></span></li>
                <li><span className="lizard-text"><strong>Lizard</strong></span> eats <span className="paper-text"><strong>Paper</strong></span></li>
                <li><span className="paper-text"><strong>Paper</strong></span> disproves <span className="spock-text"><strong>Spock</strong></span></li>
                <li><span className="spock-text"><strong>Spock</strong></span> vaporizes <span className="rock-text"><strong>Rock</strong></span></li>
              </>
            )}
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
  gameMode: PropTypes.string.isRequired, // Add gameMode to propTypes
};

export default RulesModal;