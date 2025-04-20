import React, { useState } from "react";
import "../css/DoctorDashboard.css";
import user5 from '../img/doctor3.jpg';
import SimplePeer from "simple-peer";
import { useRef } from "react";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Arlene Lane", specialty: "Depression", date: "March 30th, 2024", time: "2:00 PM EST" },
    { id: 2, patient: "Sitora Aaron", specialty: "Psychotherapy", date: "April 20th, 2024", time: "8:00 AM EST" },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, time: "10:00", date: "12/05/2024", patientName: "Nick Johnson", status: "Ongoing" },
  ]);

  const [profile, setProfile] = useState({
    name: "Dr. Johnny Whiteman",
    specialty: "Clinical Psychologist",
    phone: "+998 99 123 45 67",
    email: "dr.johnny@example.com"
  });
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [stream, setStream] = useState(null);
  
  const userVideo = useRef();
  const doctorVideo = useRef();
  const peerRef = useRef();
  
  const startVideoCall = async () => {
    setVideoCallActive(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (userVideo.current) userVideo.current.srcObject = mediaStream;
  
      // Mock peer creation — replace with real socket signaling later
      const peer = new SimplePeer({ initiator: true, trickle: false, stream: mediaStream });
  
      peer.on("stream", (remoteStream) => {
        if (doctorVideo.current) doctorVideo.current.srcObject = remoteStream;
      });
  
      peerRef.current = peer;
  
    } catch (err) {
      console.error("Failed to start video call:", err);
      alert("Could not access webcam or microphone.");
    }
  };
  
  const endVideoCall = () => {
    setVideoCallActive(false);
    peerRef.current?.destroy();
    stream?.getTracks().forEach(track => track.stop());
  };
  const [editing, setEditing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleCancelAppointment = (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (confirmCancel) {
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
      alert("Appointment has been cancelled.");
    }
  };

  const handleChatSend = () => {
    if (!chatMessage.trim()) return;
    setMessages([...messages, { from: "You", text: chatMessage }]);
    setChatMessage("");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <h2>Welcome back, {profile.name}!</h2>
      </header>

      <div className="dashboard-content">
        {/* Profile */}
        <div className="profile-section">
          <img src={user5} alt="Doctor" className="profile-image" />
          {!editing ? (
            <>
              <h3>{profile.name}</h3>
              <p>{profile.specialty}</p>
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <button onClick={() => setEditing(true)} className="edit-button">Edit Profile</button>
            </>
          ) : (
            <div className="edit-profile-form">
              <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
              <input type="text" name="specialty" value={profile.specialty} onChange={handleProfileChange} />
              <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
              <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} />
              <button onClick={() => setEditing(false)}>Save</button>
            </div>
          )}
          <div className="action-buttons">
          <button className="videochat-button" onClick={startVideoCall}>Start Video Call</button>
          <button className="call-button" onClick={endVideoCall}>End Call</button>
          </div>
        </div>

        {/* Appointments */}
        <div className="schedule-section">
          <h3>Today's Appointments</h3>
          {appointments.map(appt => (
            <div key={appt.id} className="appointment-card">
              <p><strong>{appt.patient}</strong> | {appt.specialty}</p>
              <p>{appt.date} | {appt.time}</p>
              <button onClick={() => handleCancelAppointment(appt.id)} className="cancel-button">Cancel</button>
            </div>
          ))}
          <button className="view-all-button">View All Appointments</button>
        </div>

        {/* Live Chat */}
        <div className="calendar-section">
          <h3>Live Chat</h3>
          <div className="chat-box">
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className="chat-message"><strong>{msg.from}:</strong> {msg.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleChatSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
      {videoCallActive && (
  <div className="video-call-container">
    <h3>Live Video Call</h3>
    <div className="video-wrapper">
      <video ref={userVideo} autoPlay playsInline muted className="video-frame" />
      <video ref={doctorVideo} autoPlay playsInline className="video-frame" />
    </div>
  </div>
)}

      {/* Upcoming Table */}
      <div className="table-section">
        <h3>Upcoming Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Time</th><th>Date</th><th>Patient</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(slot => (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>{slot.time}</td>
                <td>{slot.date}</td>
                <td>{slot.patientName}</td>
                <td>{slot.status}</td>
                <td><button className="view-button">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
