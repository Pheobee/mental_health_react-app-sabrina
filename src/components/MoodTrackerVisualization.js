import React from "react";
import "../css/MoodTracker.css";

const MoodTrackerVisualization = ({ moodLogs }) => {
  return (
    <div className="chart-section">
      <h3>Mood Tracker</h3>
      <p className="MoodHeadline">
        Logging your emotions daily helps to better manage your life.
      </p>
      <div className="chart">
      {moodLogs.slice(0, 7).map((log, index) => {
  const moodArray = log.mood?.split(", ") || [];
  const moodCount = moodArray.length;

  return (
    <div
  key={index}
  className="bar"
  style={{
    height: `${moodCount * 15}px`,
    backgroundColor: moodCount > 3 ? "#FE828C" : "#666"
  }}
>
  <span className="bar-label">{moodCount}</span>
  <span className="dateOfBar">{new Date(log.date).toLocaleDateString()}</span>
</div>
  );
})}
      </div>
      <p className="overviewMood">Your recent mood logs overview</p>
    </div>
  );
};

export default MoodTrackerVisualization;
