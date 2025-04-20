import React, { useState, useEffect } from "react";
import "../css/UserSettings.css";
import defaultAvatar from "../img/Robot face-cuate.png";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    notifications: true,
    darkMode: false,
    profileImage: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSave = () => {
    // Save full settings to a dedicated profile
    localStorage.setItem("userProfile", JSON.stringify(userData));

    // Sync name & image to 'user' object
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const updatedUser = {
      ...currentUser,
      name: userData.name || currentUser?.name || "User",
      profileImage: userData.profileImage || currentUser?.profileImage || ""
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Your profile settings have been saved!");
    navigate("/userDashboard");
  };

  const handleCancel = () => {
    navigate("/userDashboard");
  };

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    const user = JSON.parse(localStorage.getItem("user"));

    setUserData({
      name: savedProfile?.name || user?.name || "",
      email: savedProfile?.email || user?.email || "",
      phone: savedProfile?.phone || "",
      bio: savedProfile?.bio || "",
      notifications: savedProfile?.notifications ?? true,
      darkMode: savedProfile?.darkMode ?? false,
      profileImage: savedProfile?.profileImage || user?.profileImage || ""
    });
  }, []);

  return (
    <div className="user-settings">
      <h2>Edit Your Profile</h2>
      <div className="settings-form">
        <div className="profile-pic-preview">
          <img
            src={userData.profileImage || defaultAvatar}
            alt="Profile"
            className="profile-pic-preview-img"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <label>
          Name:
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={userData.phone} onChange={handleChange} />
        </label>
        <label>
          Bio:
          <textarea name="bio" rows={3} value={userData.bio} onChange={handleChange} />
        </label>

        <div className="toggles">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={userData.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={userData.darkMode}
              onChange={handleChange}
            />
            Enable Dark Mode
          </label>
        </div>

        <div className="settings-buttons">
          <button onClick={handleSave}>Save Settings</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
