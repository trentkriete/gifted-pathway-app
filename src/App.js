import React, { useState } from 'react';
import './App.css';
import { questions, results } from './questions';
import HomePage from './HomePage';
import PathwayImage from './PathwayImage';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [history, setHistory] = useState([0]);
  const [answers, setAnswers] = useState([]);

  const currentQuestionId = history[history.length - 1];

  const handleStart = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    if (history.length < answers.length + 1) {
        newAnswers.splice(history.length - 1);
    }
    newAnswers.push(answer);
    setAnswers(newAnswers);

    if (typeof answer.next === 'string' && answer.next.startsWith('RESULT_')) {
        setHistory([...history, answer.next]);
    } else {
        setHistory([...history, answer.next]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
  };

  const handleStartOver = () => {
    setQuizStarted(false);
    setHistory([0]);
    setAnswers([]);
  }

  const renderContent = () => {
    if (!quizStarted) {
        return <HomePage onStart={handleStart} />
    }

    if (typeof currentQuestionId === 'string' && currentQuestionId.startsWith('RESULT_')) {
      const result = results[currentQuestionId];
      const pathwayName = currentQuestionId.replace('RESULT_', '');
      return (
        <div>
          <h1>{result.pathway}</h1>
          <PathwayImage pathway={pathwayName} />
          <h2>{result.title}</h2>
          <ul className='result-criteria'>
            {result.criteria.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <div>
            <button onClick={handleStartOver}>Start Over</button>
          </div>
        </div>
      );
    }

    const question = questions.find(q => q.id === currentQuestionId);

    return (
      <div>
        <h2>{question.text}</h2>
        <ul>
          {question.options.map((option, index) => (
            <li key={index} onClick={() => handleAnswer(option)}>
              {option.text}
            </li>
          ))}
        </ul>
        {history.length > 1 && <button onClick={handleBack}>Back</button>}
      </div>
    );
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;