import { useState, useEffect } from 'react';
import './styles/App.css';
import iconRock from '/assets/images/icon-rock.svg';
import iconPaper from '/assets/images/icon-paper.svg';
import iconScissors from '/assets/images/icon-scissors.svg';
import RulesModal from './RulesModal'; // Import the modal component

function App() {
  const [score, setScore] = useState(() => parseInt(localStorage.getItem('rpsScore'), 10) || 0);
  const [result, setResult] = useState('Select a choice!');
  const [computerChoice, setComputerChoice] = useState(''); // State to hold the computer's choice
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    localStorage.setItem('rpsScore', score);
  }, [score]);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
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
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    if (computerSelection === winConditions[playerSelection]) {
      setScore(score + 1);
      setResult(`You win! The computer chose ${computerSelection}.`);
    } else {
      setScore(score - 1);
      setResult(`You lose! The computer chose ${computerSelection}.`);
    }
  }

  function resetScore() {
    setScore(0);
    setResult('Select a choice!');
    setComputerChoice(''); // Reset the computer's choice
    localStorage.removeItem('rpsScore');
  }

  return (
    <>
      <header>
        <h1 className="logo-text">Rock Paper Scissors</h1>
        <div className="score-board">
          <span>Score</span>
          <div className="score">{score}</div>
          <button className="reset" onClick={resetScore}>Reset</button>
        </div>
      </header>

      <main>
        <section className="choices">
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
        </section>
        <section className="result">
          <p>{result}</p>
          {computerChoice && (
            <div className={`choice-button ${computerChoice} computer-choice`}>
              <div className="inner" style={{ width: '50px', height: '50px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                <img src={computerChoice === 'rock' ? iconRock : computerChoice === 'paper' ? iconPaper : iconScissors} alt={`Computer chose ${computerChoice}`} style={{ width: '30px', height: '30px' }} />
              </div>
            </div>
          )}
        </section>
      </main>

      <footer>
        <button className="rules" onClick={toggleModal}>Rules</button>
      </footer>
      <RulesModal isOpen={isModalOpen} onClose={toggleModal} />

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
        Coded by <a href="#">José Guillén</a>.
      </div>
    </>
  );
}

export default App;