import React, { useState } from 'react';
import './App.css';
import { questions, results } from './questions';
import HomePage from './HomePage';
import PathwayImage from './PathwayImage';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [history, setHistory] = useState([0]);
  const [answers, setAnswers] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectFollowupQueue, setSubjectFollowupQueue] = useState([]);
  const [strengthAreas, setStrengthAreas] = useState([]);
  const [lastMultiselectId, setLastMultiselectId] = useState(null);
  const [originalSelectedSubjects, setOriginalSelectedSubjects] = useState([]);

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

    // If routing to a Strength result and we haven't recorded strengths yet,
    // infer from the selected subjects of the current multiselect step
    if (typeof answer.next === 'string' && answer.next.startsWith('RESULT_')) {
        if (answer.next.includes('STRENGTH') && strengthAreas.length === 0 && selectedSubjects.length > 0) {
          setStrengthAreas([...selectedSubjects]);
        }
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
    setSelectedSubjects([]);
    setSubjectFollowupQueue([]);
    setStrengthAreas([]);
    setLastMultiselectId(null);
    setOriginalSelectedSubjects([]);
  }

  const renderContent = () => {
    if (!quizStarted) {
        return <HomePage onStart={handleStart} />
    }

    if (typeof currentQuestionId === 'string' && currentQuestionId.startsWith('RESULT_')) {
      const result = results[currentQuestionId];
      const pathwayName = currentQuestionId.replace('RESULT_', '');
      const isStrengthResult = currentQuestionId.includes('STRENGTH');
      const baseTitle = result.title && result.title.includes(':') ? result.title.split(':')[0] : result.title;
      const displayTitle = isStrengthResult && strengthAreas && strengthAreas.length > 0
        ? `${baseTitle}: ${strengthAreas.join(', ')}`
        : result.title;
      return (
        <div>
          <h1>Identification Outcome</h1>
          <div className="result-container">
            <div className="result-left">
              <h2>{displayTitle}</h2>
              <ul className='result-criteria'>
                {result.criteria.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              <div>
                <button onClick={handleStartOver}>Start Over</button>
              </div>
            </div>
            <div className="result-right">
              <PathwayImage pathway={pathwayName} />
            </div>
          </div>
        </div>
      );
    }

    // Handle synthetic subject follow-up questions
    if (typeof currentQuestionId === 'string' && currentQuestionId.startsWith('SUBJ2+|')) {
      const parts = currentQuestionId.split('|');
      const subject = parts[1];
      const onTwoOrMore = parts[2];
      const nextIfNotTwoOrMore = parts[3];
      const multiselectId = parts[4];

      const handleYesTwoOrMore = () => {
        const newStrengths = [...strengthAreas, subject];
        setStrengthAreas(newStrengths);
        if (subjectFollowupQueue.length > 0) {
          const [nextSubject, ...rest] = subjectFollowupQueue;
          setSubjectFollowupQueue(rest);
          setHistory([...history, `SUBJ2+|${nextSubject}|${onTwoOrMore}|${nextIfNotTwoOrMore}|${multiselectId}`]);
        } else {
          setHistory([...history, onTwoOrMore]);
        }
      };

      const handleNoTwoOrMore = () => {
        if (subjectFollowupQueue.length > 0) {
          const [nextSubject, ...rest] = subjectFollowupQueue;
          setSubjectFollowupQueue(rest);
          setHistory([...history, `SUBJ2+|${nextSubject}|${onTwoOrMore}|${nextIfNotTwoOrMore}|${multiselectId}`]);
        } else {
          if (strengthAreas.length > 0) {
            setHistory([...history, onTwoOrMore]);
          } else {
            // After finishing 2+ checks with no strengths found,
            // transition to same-area checks per subject if available
            console.log('No strengths found, checking for same-area checks:', {
              originalSelectedSubjects,
              multiselectId,
              nextIfNotTwoOrMore
            });
            if (originalSelectedSubjects.length > 0 && multiselectId) {
              console.log('Transitioning to AFTER_SUBJ_CHECKS');
              // Pass the originalSelectedSubjects to AFTER_SUBJ_CHECKS as a comma-separated string
              setHistory([...history, `AFTER_SUBJ_CHECKS|${multiselectId}|${originalSelectedSubjects.join(',')}`]);
            } else {
              console.log('Falling back to nextIfNotTwoOrMore:', nextIfNotTwoOrMore);
              setHistory([...history, Number(nextIfNotTwoOrMore)]);
            }
          }
        }
      };

      return (
        <div>
          <h2>Are there two or more achievement scores for {subject}?</h2>
          <ul>
            <li onClick={handleYesTwoOrMore}>Yes</li>
            <li onClick={handleNoTwoOrMore}>No</li>
          </ul>
          {history.length > 1 && <button onClick={handleBack}>Back</button>}
        </div>
      );
    }

    const question = questions.find(q => q.id === currentQuestionId);

    const toggleSubject = (subject) => {
      if (!question || question.type !== 'subject-multiselect') return;
      if (selectedSubjects.includes(subject)) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
      } else {
        setSelectedSubjects([...selectedSubjects, subject]);
      }
    };

    const continueSubjectSelection = () => {
      if (!question || question.type !== 'subject-multiselect') return;
      const onTwoOrMore = question.onTwoOrMore;
      const nextIfNotTwoOrMore = question.nextIfNotTwoOrMore;
      const noAchievementNext = question.noAchievementNext;

      if (selectedSubjects.length === 0) {
        if (noAchievementNext !== undefined && noAchievementNext !== null) {
          setHistory([...history, noAchievementNext]);
        } else {
          setHistory([...history, nextIfNotTwoOrMore]);
        }
        return;
      }

      // Reset accumulated strengths for a fresh evaluation on this multiselect step
      setStrengthAreas([]);
      setLastMultiselectId(currentQuestionId);
      setOriginalSelectedSubjects([...selectedSubjects]); // Store original subjects
      const [first, ...rest] = selectedSubjects;
      setSubjectFollowupQueue(rest);
      setHistory([...history, `SUBJ2+|${first}|${onTwoOrMore}|${nextIfNotTwoOrMore}|${currentQuestionId}`]);
    };

    // Intercept generic same-area questions (21, 115) and replace with per-subject prompt when we have context
    if (question && (question.id === 21 || question.id === 115) && selectedSubjects.length > 0 && lastMultiselectId) {
      const msQuestion = questions.find(q => String(q.id) === String(lastMultiselectId));
      const sameAreaYesResult = msQuestion?.sameAreaYesResult;
      const sameAreaNoResult = msQuestion?.sameAreaNoResult;
      const subjectsToAsk = [...selectedSubjects];
      if (!sameAreaYesResult || !sameAreaNoResult) {
        // fall back to default rendering
      } else {
        const subject = subjectsToAsk.shift();
        const handleYes = () => {
          setStrengthAreas([...strengthAreas, subject]);
          setSelectedSubjects(subjectsToAsk);
          setHistory([...history, sameAreaYesResult]);
        };
        const handleNo = () => {
          setSelectedSubjects(subjectsToAsk);
          if (subjectsToAsk.length > 0) {
            // repeat for next subject
            setHistory([...history, currentQuestionId]);
          } else {
            setHistory([...history, sameAreaNoResult]);
          }
        };
        return (
          <div>
            <h2>Is the Observation score also in {subject}?</h2>
            <ul>
              <li onClick={handleYes}>Yes</li>
              <li onClick={handleNo}>No</li>
            </ul>
            {history.length > 1 && <button onClick={handleBack}>Back</button>}
          </div>
        );
      }
    }

    // Handle placeholder questions that should never be shown directly
    if (question && (question.id === 21 || question.id === 115) && question.text.includes('[SUBJECT]')) {
      // If we reach here without proper context, redirect to the appropriate multiselect question
      // based on the question ID
      if (question.id === 21) {
        // This is for ACCESS GT path - redirect to the ACCESS multiselect
        setHistory([...history, 27]);
        return null;
      } else if (question.id === 115) {
        // This is for HGT path - redirect to the HGT multiselect
        setHistory([...history, 118]);
        return null;
      }
    }

    // After asking 2+ for each subject, if none had 2+, and at least one subject was selected,
    // ask same-area per subject if metadata provided
    if (typeof currentQuestionId === 'string' && currentQuestionId.startsWith('AFTER_SUBJ_CHECKS|')) {
      console.log('AFTER_SUBJ_CHECKS triggered:', currentQuestionId);
      const parts = currentQuestionId.split('|');
      const multiselectId = parts[1];
      const subjectsFromHistory = parts[2] ? parts[2].split(',') : [];

      const question = questions.find(q => String(q.id) === String(multiselectId));
      const sameAreaYesResult = question?.sameAreaYesResult;
      const sameAreaNoResult = question?.sameAreaNoResult;
      const subjectsToAsk = [...subjectsFromHistory]; // Use this internal queue
      console.log('AFTER_SUBJ_CHECKS state:', {
        multiselectId,
        sameAreaYesResult,
        sameAreaNoResult,
        subjectsToAsk,
        selectedSubjects: selectedSubjects // Keep for debugging, but not used for iteration
      });

      if (!sameAreaYesResult || !sameAreaNoResult || subjectsToAsk.length === 0) {
        console.log('AFTER_SUBJ_CHECKS falling back to:', question?.nextIfNotTwoOrMore ?? 0);
        setHistory([...history, Number(question?.nextIfNotTwoOrMore ?? 0)]);
        return null;
      }
      const subject = subjectsToAsk.shift();
      const remainingSubjects = [...subjectsToAsk];
      
      // No longer modifying selectedSubjects here

      const handleYes = () => {
        setStrengthAreas([...strengthAreas, subject]);
        // If there are more subjects to ask about the same area, continue the chain
        if (remainingSubjects.length > 0) {
          setHistory([...history, `AFTER_SUBJ_CHECKS|${multiselectId}|${remainingSubjects.join(',')}`]);
        } else {
          setHistory([...history, sameAreaYesResult]);
        }
      };
      const handleNo = () => {
        if (remainingSubjects.length > 0) {
          setHistory([...history, `AFTER_SUBJ_CHECKS|${multiselectId}|${remainingSubjects.join(',')}`]);
        } else {
          setHistory([...history, sameAreaNoResult]);
        }
      };
      return (
        <div>
          <h2>Is the Observation score also in {subject}?</h2>
          <ul>
            <li onClick={handleYes}>Yes</li>
            <li onClick={handleNo}>No</li>
          </ul>
          {history.length > 1 && <button onClick={handleBack}>Back</button>}
        </div>
      );
    };

    return (
      <div>
        <h2>{question.text}</h2>
        {question.type === 'subject-multiselect' ? (
          <div>
            <ul>
              {question.subjects.map((subject) => (
                <li key={subject} onClick={() => toggleSubject(subject)}>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    readOnly
                  />{' '}
                  {subject}
                </li>
              ))}
            </ul>
            <button onClick={continueSubjectSelection}>Continue</button>
          </div>
        ) : (
          <ul>
            {question.options.map((option, index) => (
              <li key={index} onClick={() => handleAnswer(option)}>
                {option.text}
              </li>
            ))}
          </ul>
        )}
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