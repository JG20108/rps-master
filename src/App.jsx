import { useState, useEffect } from 'react';
import './styles/App.css';
import iconRock from '/assets/images/icon-rock.svg';
import iconPaper from '/assets/images/icon-paper.svg';
import iconScissors from '/assets/images/icon-scissors.svg';
import iconLizard from '/assets/images/icon-lizard.svg';
import iconSpock from '/assets/images/icon-spock.svg';
import RulesModal from './RulesModal';
import ConfirmationModal from './ConfirmationModal';

function App() {
  const [score, setScore] = useState(() => parseInt(localStorage.getItem('rpsScore'), 10) || 0);
  const [result, setResult] = useState('Select a choice!');
  const [computerChoice, setComputerChoice] = useState(''); // State to hold the computer's choice
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [gameMode, setGameMode] = useState('rps'); // 'rps' for Rock, Paper, Scissors, 'rpsls' for the new mode

  useEffect(() => {
    localStorage.setItem('rpsScore', score);
  }, [score]);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function toggleGameMode() {
    const newGameModeName = gameMode === 'rps' ? 'Lizard Rock Paper Scissors Spock' : 'Rock Paper Scissors';
    setConfirmationMessage(`Do you wish to change game mode to '${newGameModeName}'? This will reset your current score.`);
    setIsConfirmationModalOpen(true);
  }

  function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    if (gameMode === 'rpsls') {
      choices = [...choices, 'lizard', 'spock'];
    }
    const choice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(choice); // Set the computer's choice
    return choice;
  }

  function playRound(playerSelection) {
    const computerSelection = computerPlay();
    if (playerSelection === computerSelection) {
      setResult(`It's a draw! The computer also chose ${computerSelection}.`);
      return;
    } 

    const winConditions = {
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['spock', 'paper'],
      spock: ['scissors', 'rock'],
    };

    if (winConditions[playerSelection].includes(computerSelection)) {
      setScore(score + 1);
      setResult(`You win! The computer chose ${computerSelection}.`);
    } else {
      setScore(score - 1);
      setResult(`You lose! The computer chose ${computerSelection}.`);
    }
  }

  function resetGame() {
    setScore(0); // Reset score
    setResult('Select a choice!'); // Reset result message
    setComputerChoice(''); // Clear computer's choice
    localStorage.setItem('rpsScore', 0); // Reset score in localStorage
    setIsConfirmationModalOpen(false); // Close the modal after confirming
  }

  function handleGameModeChangeConfirm() {
    setGameMode(gameMode === 'rps' ? 'rpsls' : 'rps');
    setScore(0); // Reset score
    setResult('Select a choice!'); // Clear result message
    setComputerChoice(''); // Clear computer's choice to hide the image
    setIsConfirmationModalOpen(false); // Close the modal after confirming
  }

  return (
    <>
      <header>
        <h1 className="logo-text">Rock Paper Scissors</h1>
        <div className="score-board">
          <span>Score</span>
          <div className="score">{score}</div>
          <button className="reset" onClick={() => {
            setConfirmationMessage('Do you wish to reset the score?');
            setIsConfirmationModalOpen(true);
          }}>Reset</button>
        </div>
      </header>
      <button className="game-mode-toggle" onClick={toggleGameMode}>
        Switch Mode
      </button>
      <main className={`game-mode-${gameMode}`}>
        <section className={`choices ${gameMode === 'rpsls' ? 'game-mode-rpsls' : ''}`}>
          <button id="rock" className="choice-button rock" onClick={() => playRound('rock')}>
            <div className="inner">
              <img src={iconRock} alt="Rock" />
            </div>
          </button>
          <button id="paper" className="choice-button paper" onClick={() => playRound('paper')}>
            <div className="inner">
              <img src={iconPaper} alt="Paper" />
            </div>
          </button>
          <button id="scissors" className="choice-button scissors" onClick={() => playRound('scissors')}>
            <div className="inner">
              <img src={iconScissors} alt="Scissors" />
            </div>
          </button>
          {gameMode === 'rpsls' && (
            <>
              <button id="lizard" className={`choice-button lizard ${gameMode === 'rpsls' ? 'show' : ''}`} onClick={() => playRound('lizard')}>
                <div className="inner">
                  <img src={iconLizard} alt="Lizard" />
                </div>
              </button>
              <button id="spock" className={`choice-button spock ${gameMode === 'rpsls' ? 'show' : ''}`} onClick={() => playRound('spock')}>
                <div className="inner">
                  <img src={iconSpock} alt="Spock" />
                </div>
              </button>
            </>
          )}
        </section>
        <section className="result">
          <p>{result}</p>
          <div className='comp-choice'>
          {computerChoice && (
            <div className={`computer-choice-button ${computerChoice}`}>
              <div className="inner">
                <img src={computerChoice === 'rock' ? iconRock : computerChoice === 'paper' ? iconPaper : computerChoice === 'scissors' ? iconScissors : computerChoice === 'lizard' ? iconLizard : iconSpock} alt={`Computer chose ${computerChoice}`} />
              </div>
            </div>
          )}
          </div>
        </section>
      </main>

      <footer>
        <button className="rules" onClick={toggleModal}>Rules</button>
      </footer>
      <RulesModal isOpen={isModalOpen} onClose={toggleModal} gameMode={gameMode} />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message={confirmationMessage}
        onConfirm={() => {
          if (confirmationMessage.includes('reset the score')) {
            resetGame();
          } else {
            handleGameModeChangeConfirm();
          }
        }}
        onCancel={() => setIsConfirmationModalOpen(false)}
      />

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
        Coded by <a href="https://portfolio-theta-gold-13.vercel.app" target="_blank">José Guillén</a>.
      </div>
    </>
  );
}

export default App;