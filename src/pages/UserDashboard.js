import React, { useState, useEffect } from "react";
import MoodTracker from "../components/MoodTracker";
import SelfHelpResources from "../components/SelfHelpResources";
import Appointments from "../components/Appointments";
import Chatbot from "../components/Chatbot";
import SelfAssessmentTests from "../pages/SelfAssessmentTests";
import UserSettings from "../components/UserSettings";
import "../css/UserDashboard.css";
import defaultAvatar from "../img/Robot face-cuate.png";
import welcomePic from "../img/Welcome-cuate.png";

const TABS = {
  HOME: "Home",
  MOOD: "Mood Tracker",
  APPOINTMENTS: "Appointments",
  RESOURCES: "Resources Library",
  SELF_TESTS: "Self Assessment",
  SETTINGS: "Settings",
  CRISIS: "Crisis Support"
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load current user on mount & when tab changes to SETTINGS or HOME
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    setCurrentUser({
      ...storedUser,
      ...storedProfile,
    });
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.MOOD:
        return <MoodTracker />;
      case TABS.APPOINTMENTS:
        return <Appointments />;
      case TABS.RESOURCES:
        return <SelfHelpResources />;
      case TABS.SELF_TESTS:
        return <SelfAssessmentTests />;
      case TABS.SETTINGS:
        return <UserSettings />;
      case TABS.CRISIS:
        return (
          <div className="crisis-support">
            <h2>Need Immediate Help?</h2>
            <p>If you’re in danger or need urgent mental health support, please use the resources below.</p>
            <ul>
              <li><strong>Emergency Hotline:</strong> 100 or your local emergency number</li>
              <li><strong>Mental Health Hotline:</strong> +998-71-123-4567 (24/7 Support)</li>
              <li><strong>Nearest Clinic Locator:</strong> <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Find Clinics</a></li>
            </ul>
            <button className="urgent-chat">Start Emergency Chat</button>
          </div>
        );
      case TABS.HOME:
      default:
        return (
          <div className="dashboard-home">
            <h2>Welcome to Your Dashboard, {currentUser?.name || "User"}!</h2>
            <p>Use the sidebar to navigate through the tools designed for your mental well-being.</p>
            <img src={welcomePic} alt="Welcome" />
          </div>
        );
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="user-dashboard">
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-user">
          <img
            src={currentUser?.profileImage || defaultAvatar}
            alt="User"
            className="profile-pic"
          />
          <div className="user-info">
            <span>{currentUser?.name || "User"}</span>
            <p>Active</p>
          </div>
        </div>
        <nav>
          <ul>
            {Object.entries(TABS).map(([key, label]) => (
              <li key={key}>
                <button
                  className={`sidebar-button ${activeTab === label ? "active" : ""}`}
                  onClick={() => setActiveTab(label)}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button className="sidebar-button" onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderTabContent()}
      </main>

      <Chatbot />
    </div>
  );
};

export default UserDashboard;
