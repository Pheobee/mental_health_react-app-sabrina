import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MoodTracker.css";
import MoodTrackerVisualization from "./MoodTrackerVisualization";
import moodsSwingsPic from "../img/Mental health-amico.png"
import { Link } from 'react-router-dom';

const moods = [
  "Anxious", "Happy", "Irritated", "Depressed", "Energetic", "Sad", "Disappointed", "Confused",
  "Self-critical", "Overwhelmed", "Calm", "Stressed", "Mood swings", "Feeling guilty", "Excited",
  "Content", "Lonely", "Motivated", "Hopeful", "Angry", "Optimistic", "Fearful", "Nostalgic",
  "Grateful", "Bored", "Relieved", "Surprised", "Tired", "Embarrassed", "Peaceful", "Jealous",
  "Proud", "Loved", "Confident"
];

const positiveMoods = [
  "Happy", "Energetic", "Calm", "Excited", "Content", "Motivated", "Hopeful", "Optimistic",
  "Grateful", "Relieved", "Surprised", "Proud", "Loved", "Confident", "Peaceful"
];

const negativeMoods = [
  "Anxious", "Irritated", "Depressed", "Sad", "Disappointed", "Confused", "Self-critical",
  "Overwhelmed", "Stressed", "Mood swings", "Feeling guilty", "Angry", "Fearful", "Nostalgic",
  "Bored", "Tired", "Embarrassed", "Jealous", "Lonely"
];
const MoodTracker = () => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [moodLogs, setMoodLogs] = useState([]);
  const [summary, setSummary] = useState({ positive: 0, negative: 0 });
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = 1;

  const fetchMoodLogs = async () => {
    try {
      const response = await axios.get(`/api/MoodLogs/${userId}`);
      setMoodLogs(response.data);
      calculateMoodSummary(response.data);
    } catch (error) {
      console.error("Error fetching mood logs:", error);
    }
  };

  const calculateMoodSummary = (logs) => {
    let pos = 0;
    let neg = 0;
    logs.forEach(log => {
      const moodArray = log.moods?.split(", ") || [];
      moodArray.forEach(m => {
        if (positiveMoods.includes(m)) pos++;
        else if (negativeMoods.includes(m)) neg++;
      });
    });
    setSummary({ positive: pos, negative: neg });
  };

  useEffect(() => {
    fetchMoodLogs();
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const handleSubmitMoodLog = async () => {
      if (selectedMoods.length === 0) {
        setFeedbackMsg("Please select at least one mood.");
        return;
      }
    
      setIsSubmitting(true);
      setFeedbackMsg("");
    
      try {
        const moodLog = {
          userId,
          mood: selectedMoods.join(", "),  // ✅ Fix here
          date: new Date().toISOString(),
        };
    
        await axios.post("/api/MoodLogs", moodLog);
        setSelectedMoods([]);
        setFeedbackMsg("Mood log submitted successfully!");
        fetchMoodLogs();
      } catch (error) {
        console.error("Error submitting mood log:", error.response?.data || error.message);
        setFeedbackMsg("Failed to submit mood log.");
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setFeedbackMsg(""), 4000);
      }
  };

  return (
    <div className="mood-tracker">
      <div className="chart-container">
        <MoodTrackerVisualization moodLogs={moodLogs} />
      </div>


      <div className="log-section">
        <h3>How are you feeling today?</h3>
        <div className="mood-buttons">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`mood-button ${selectedMoods.includes(mood) ? "selected" : ""}`}
              onClick={() => handleMoodSelect(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        <button
          className="submitMoodLog"
          onClick={handleSubmitMoodLog}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging..." : "Submit Log"}
        </button>
        {feedbackMsg && <p className="feedback-message">{feedbackMsg}</p>}
      </div>
      
      <div className="extra-resources-box">
      <div className="mood-summary">
          <h4>Emotional Summary</h4>
          <p>Positive Moods: <strong>{summary.positive}</strong></p>
          <p>Negative Moods: <strong>{summary.negative}</strong></p>
        </div>
      <div className="resource-article">
        <img src={moodsSwingsPic} alt="Mood Swings" />
        <div>
          <h4>Understanding Mood Swings</h4>
          <p>Discover how to recognize emotional patterns and build better emotional awareness.</p>
          <Link to="/resources/mood-swings" className="read-more-btn">
            Read More
          </Link>
        </div>
    </div>
</div>
    </div>
  );
};

export default MoodTracker;
