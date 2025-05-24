import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "../css/MoodTracker.css";

const formatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric"
});

const MoodTrackerVisualization = ({ moodLogs }) => {
  // take only the last 7 logs, sorted by date descending
  const bars = useMemo(() => {
    return [...moodLogs]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7)
      .map(log => {
        const count = log.mood ? log.mood.split(", ").length : 0;
        return {
          date: log.date,
          label: formatter.format(new Date(log.date)),
          count,
          high: count > 3
        };
      });
  }, [moodLogs]);

  return (
    <section className="chart-section">
      <h3>Mood Tracker</h3>
      <p className="MoodHeadline">
        Logging your emotions daily helps to better manage your life.
      </p>

      <div className="chart">
        {bars.map(({ date, label, count, high }) => (
          <div
            key={date}
            className={`bar ${high ? "bar--high" : "bar--low"}`}
            style={{ "--bar-height": `${count * 15}px` }}
          >
            <span className="bar-label">{count}</span>
            <span className="dateOfBar">{label}</span>
          </div>
        ))}
      </div>

      <p className="overviewMood">Your recent mood logs overview</p>
    </section>
  );
};

MoodTrackerVisualization.propTypes = {
  moodLogs: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      mood: PropTypes.string
    })
  ).isRequired
};

export default React.memo(MoodTrackerVisualization);
