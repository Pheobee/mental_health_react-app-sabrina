import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApptPic from "../img/Calendar-bro.svg";
import "../css/Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([

  //   const stored = localStorage.getItem("appointments");
  // return stored ? JSON.parse(stored) : [];
    { id: 1, name: "Dr. Arlene Lane", specialty: "Licensed Professional Counselor", dateTime: "2024-03-30T14:00:00-05:00" },
    { id: 2, name: "Dr. Sitora Aaron", specialty: "Psychotherapist", dateTime: "2024-04-20T08:00:00-05:00" },
    { id: 3, name: "Dr. Tyler Petrov", specialty: "Clinical Psychologist", dateTime: "2024-05-10T11:00:00-05:00" },
    { id: 4, name: "Dr. Emily Nolan", specialty: "Stress Management Specialist", dateTime: "2024-06-05T15:00:00-05:00" },
    { id: 5, name: "Dr. Michael Scott", specialty: "Anxiety Disorder Counselor", dateTime: "2025-01-22T16:00:00-05:00" },
    { id: 6, name: "Dr. Sarah Smith", specialty: "Couples Counselor", dateTime: "2024-08-22T16:30:00-05:00" },
    { id: 7, name: "Dr. Robert Brown", specialty: "Depression Specialist", dateTime: "2024-09-15T13:00:00-05:00" },
  ]);
  const refreshAppointments = () => {
    const stored = localStorage.getItem("appointments");
    setAppointments(stored ? JSON.parse(stored) : []);
  };
  const navigate = useNavigate();

  const handleCancelAppointment = (appointment) => {
    const appointmentDateTime = new Date(appointment.dateTime);
    const currentTime = new Date();
    const timeDifference = (appointmentDateTime - currentTime) / (1000 * 60 * 60); // in hours

    if (isNaN(appointmentDateTime.getTime())) {
      return alert("Invalid appointment date. Please contact support.");
    }

    const confirmCancel = window.confirm(`Cancel appointment with ${appointment.name}?`);

    if (!confirmCancel) return;

    if (timeDifference < 2) {
      alert("Cannot cancel within 2 hours of appointment. Payment is non-refundable.");
      return;
    }

    setAppointments((prev) => prev.filter((a) => a.id !== appointment.id));
    alert("Appointment cancelled. You can reschedule anytime.");
  };

  return (
    <div className="appointments">

      <div className="apptContent">
        <h3>My Appointments</h3>
        <div className="imageAppt">
        <img src={ApptPic} alt="Appointments Illustration" />
      </div>
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-info">
                  <h4>{appointment.name}</h4>
                  <p>{appointment.specialty}</p>
                  <p>{new Date(appointment.dateTime).toLocaleDateString()}</p>
                  <p>{new Date(appointment.dateTime).toLocaleTimeString()}</p>
                </div>
                <button
                  onClick={() => handleCancelAppointment(appointment)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>

        <div className="appointment-actions">
          <button
            className="book-therapist-button"
            onClick={() => navigate("/book-therapist")}
          >
            Book a Therapist
          </button>
          <button className="view-all-button" onClick={refreshAppointments}>
  View All Appointments
</button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
