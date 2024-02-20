import { useState, useEffect } from 'react';
import './App.css';
import logo from '/assets/images/logo.svg';
import iconRock from '/assets/images/icon-rock.svg';
import iconPaper from '/assets/images/icon-paper.svg';
import iconScissors from '/assets/images/icon-scissors.svg';

function App() {
  const [score, setScore] = useState(() => parseInt(localStorage.getItem('rpsScore'), 10) || 0);
  const [result, setResult] = useState('');

  useEffect(() => {
    localStorage.setItem('rpsScore', score);
  }, [score]);

  function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function playRound(playerSelection) {
    const computerSelection = computerPlay();
    if (playerSelection === computerSelection) {
      setResult(`It's a draw!`);
      return;
    } 

    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    if (computerSelection === winConditions[playerSelection]) {
      setScore(score + 1);
      setResult('You win!');
    } else {
      setScore(score - 1);
      setResult('You lose!');
    }
  }

  function resetScore() {
    setScore(0);
    localStorage.removeItem('rpsScore');
  }


  return (
    <>
      <header>
        <img src={logo} alt="Rock Paper Scissors" />
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
          {result && <p>{result}</p>}
        </section>
      </main>

      <footer>
        <button className="rules">Rules</button>
      </footer>

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
        Coded by <a href="#">José Guillén</a>.
      </div>
    </>
  );
}

export default App;