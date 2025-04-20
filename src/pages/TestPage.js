import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import testData from '../testQuestions.json';
import '../css/TestPage.css';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const TestPage = () => {
  const { testType } = useParams();
  const test = testData[testType];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!test || !test.questions || test.questions.length === 0) {
    return <div>Invalid or empty test. Please try again.</div>;
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: Number(e.target.value)
    });
  };

  const analyzeResults = (testType, totalScore, questions) => {
    const totalWeightedScore = questions.reduce((total, q) => {
      const answerValue = answers[q.id] || 0;
      return total + answerValue * (q.weight || 1);
    }, 0);
    
    let analysisText = "";
  
    switch (testType) {
      case "depression":
      case "anxiety":
      case "adhd":
      case "stress":
        if (totalWeightedScore <= 5) {
          analysisText = "Minimal symptoms. Keep practicing good mental habits.";
        } else if (totalWeightedScore <= 10) {
          analysisText = "Moderate symptoms. Consider trying some self-help resources.";
        } else {
          analysisText = "High symptom level. It may be beneficial to speak with a professional.";
        }
        break;
      case "esteem":
        if (totalWeightedScore <= 3) {
          analysisText = "Healthy self-esteem.";
        } else if (totalWeightedScore <= 6) {
          analysisText = "Some concerns with confidence and worth.";
        } else {
          analysisText = "Low self-esteem indicators. A conversation with a therapist could help.";
        }
        break;
      case "sleep":
        if (totalWeightedScore <= 2) {
          analysisText = "Good sleep habits.";
        } else if (totalWeightedScore <= 5) {
          analysisText = "Some signs of sleep disruption.";
        } else {
          analysisText = "Poor sleep quality. Consider evaluating sleep hygiene.";
        }
        break;
      case "social":
        if (totalWeightedScore <= 2) {
          analysisText = "Comfortable in social situations.";
        } else if (totalWeightedScore <= 4) {
          analysisText = "Mild social discomfort.";
        } else {
          analysisText = "Likely social anxiety. Consider speaking with a counselor.";
        }
        break;
      default:
        analysisText = "Thanks for completing the test.";
    }
  
    return { totalWeightedScore, analysisText };
  };

  const handleNext = (skip = false) => {
    if (!skip && answers[currentQuestion.id] === undefined) {
      alert("Please select an answer or click 'Skip' to move on.");
      return;
    }
  
    const updatedAnswers = {
      ...answers,
      ...(skip ? { [currentQuestion.id]: 0 } : {})
    };
  
    setAnswers(updatedAnswers);
  
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalScore = Object.values(updatedAnswers).reduce((a, b) => a + b, 0);
      const { totalWeightedScore, analysisText } = analyzeResults(testType, totalScore, test.questions);
      setResult({
        totalWeightedScore,
        analysisText
      });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="test-page">
      <h1>{test.title}</h1>

      {!result ? (
        <div className="question-section">
          <p>Question {currentQuestionIndex + 1} of {test.questions.length}</p>
  <h2>{currentQuestion.text}</h2>
  <form>
    {currentQuestion.options.map((option, idx) => (
      <div key={idx} className="option">
        <input
          type="radio"
          id={`q${currentQuestion.id}_option${idx}`}
          name={`question_${currentQuestion.id}`}
          value={option.value}
          checked={answers[currentQuestion.id] === option.value}
          onChange={handleOptionChange}
        />
        <label htmlFor={`q${currentQuestion.id}_option${idx}`}>
          {option.label}
        </label>
      </div>
    ))}
  </form>
  <div className="question-buttons">
    <button onClick={() => handleNext(false)}>
      {currentQuestionIndex === test.questions.length - 1 ? "Submit" : "Next"}
    </button>
    <button onClick={() => handleNext(true)} className="skip-btn">
      Skip
    </button>
  </div>
        </div>
      ) : (
        <div className="result-section">
          <p><strong>Your total score:</strong> {result.totalWeightedScore}</p>
          <p>{result.analysisText}</p>

          {/* Pie Chart */}
          <div style={{ maxWidth: "400px", margin: "1rem auto" }}>
            <Pie
              data={{
                labels: ["Answered", "Remaining"],
                datasets: [{
                  data: [Object.keys(answers).length, test.questions.length - Object.keys(answers).length],
                  backgroundColor: ["#FE828C", "#ddd"],
                  borderColor: "#fff",
                  borderWidth: 2
                }]
              }}
              options={{
                plugins: {
                  legend: {
                    position: "bottom"
                  }
                }
              }}
            />
          </div>

          {result.totalWeightedScore > 10 && (
            <p>
              <strong>Tip:</strong> Consider <Link to="/book-therapist">booking an appointment</Link>.
            </p>
          )}

          <button onClick={handleRestart}>Restart Test</button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
