
import React, { useState } from 'react';
import { questions, results } from './questions';

function App() {
  const [history, setHistory] = useState([0]);
  const [answers, setAnswers] = useState([]);

  const currentQuestionId = history[history.length - 1];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    // If we are revisiting a question, remove subsequent answers
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

  const renderContent = () => {
    if (typeof currentQuestionId === 'string' && currentQuestionId.startsWith('RESULT_')) {
      const result = results[currentQuestionId];
      return (
        <div>
          <h2>{result.title}</h2>
          <ul>
            {result.criteria.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <button onClick={() => setHistory([0])}>Start Over</button>
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
      <h1>Gifted Pathways</h1>
      {renderContent()}
    </div>
  );
}

export default App;
