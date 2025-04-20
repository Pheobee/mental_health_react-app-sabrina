import React, { useState, useEffect } from "react";
import "../css/TherapistBookingSystem.css";
import { Link } from 'react-router-dom';
import '../css/Header.css';
import logo from '../img/logo.jpg'
import user1 from '../img/doctor1.jpg'
import user2 from '../img/doctor2.jpg'
import user3 from '../img/doctor3.jpg'
import user4 from '../img/doctor4.jpg'
import user5 from '../img/doctor5.jpg'
import user6 from '../img/doctor6.jpg'
import axios from "axios";

const TherapistBookingSystem = () => {
  const [showToast, setShowToast] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [therapistsData, setTherapistsData] = useState([
    {
      id: 1,
      name: "Dr. Tyler Petrov",
      specialty: "Clinical Psychologist",
      price: 20,
      city: "Tashkent",
      district: "Mirzo Ulugbek",
      image: user1,
      about: "Dr. Tyler Petrov is a seasoned clinical psychologist with over a decade of experience in assisting individuals overcome a wide range of psychological challenges. He is dedicated to fostering a safe and supportive environment where clients feel empowered to confront their issues and develop meaningful coping strategies.",
      experience: "Dr. Petrov has specialized in cognitive-behavioral therapy (CBT) and mindfulness techniques for over 10 years. His expertise also includes working with patients suffering from anxiety, depression, and trauma-related disorders, helping them build resilience and a positive outlook on life"
    },
    {
      id: 2,
      name: "Dr. Arlene Lane",
      specialty: "Anxiety Disorder Specialist",
      price: 30,
      city: "Tashkent",
      district: "Chilanzar",
      image: user5,
      about: "Dr. Arlene Lane has spent her career helping clients navigate personal and emotional challenges to enhance their mental well-being. She focuses on providing individualized care and ensuring that her clients feel heard and understood as they work towards a healthier, more balanced life.",
      experience: "With 8 years of experience in family counseling and relationship therapy, Dr. Lane has worked extensively with individuals and families facing difficult transitions. She employs evidence-based methods to guide her clients toward improved communication, stronger relationships, and overall emotional health"
    },
    {
      id: 3,
      name: "Dr. John Smith",
      specialty: "Couples Counseling",
      price: 50,
      city: "Tashkent",
      district: "Yashnabad",
      image: user3,
      about: "Dr. John Smith specializes in helping couples rebuild trust, improve communication, and strengthen their relationships. His approach focuses on creating a safe space for partners to express their feelings and work together to resolve conflicts effectively",
      experience: "With over 12 years of experience in relationship and couples counseling, Dr. Smith has guided countless couples through challenges such as infidelity, financial stress, and parenting disagreements. He integrates therapeutic techniques that foster empathy and mutual respect between partners"
    },
    {
      id: 4,
      name: "Dr. Emily Nolan",
      specialty: "Stress Management Specialist",
      price: 25,
      city: "Tashkent",
      district: "Shaykhontohur",
      image: user4,
      about: "Dr. Emily Nolan is an expert in stress management techniques, helping clients achieve a healthier work-life balance. Her compassionate and practical approach equips individuals with tools to identify stressors and adopt strategies for lasting peace of mind",
      experience: "Dr. Nolan has over 7 years of experience providing stress management training to individuals and groups. Her expertise includes time management, relaxation techniques, and behavioral changes, helping clients lead more productive and fulfilling lives."
    },
    {
      id: 5,
      name: "Dr. Robert Brown",
      specialty: "Depression Specialist",
      price: 40,
      city: "Tashkent",
      district: "Yunusabad",
      image: user2,
      about: "Dr. Robert Brown is deeply committed to helping clients overcome depression and regain hope in their lives. His empathetic and results-driven approach allows clients to navigate their emotions and develop effective coping mechanisms",
      experience: "With 15 years of experience in depression therapy, Dr. Brown specializes in mindfulness-based approaches and evidence-backed treatments. He has supported countless clients in their journey toward improved mental health and emotional resilience"
    }
  ]);
  const [therapists, setTherapists] = useState(therapistsData);
  
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [filters, setFilters] = useState({
    city: "Tashkent",
    district: "",
    specialty: "",
  });

  const handleSearchClick = async () => {
    const keyword = searchKeyword.toLowerCase().trim();

    const filtered = therapistsData.filter((t) => {
      const matchesKeyword =
        t.name.toLowerCase().includes(keyword) ||
        t.specialty.toLowerCase().includes(keyword);
  
      const matchesCity = filters.city === "" || t.city === filters.city;
      const matchesDistrict = filters.district === "" || t.district === filters.district;
      const matchesSpecialty =
        filters.specialty === "" || t.specialty.includes(filters.specialty);
  
      return matchesKeyword && matchesCity && matchesDistrict && matchesSpecialty;
    });
  
    setTherapists(filtered);
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("About");

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTherapistClick = (therapist) => {
    setSelectedTherapist(therapist);
  };

  const handleBookAppointment = () => {
    if (!selectedTherapist || !selectedDate || !selectedTime) {
      alert("Please select a date and time slot.");
      return;
    }
  
    const newAppointment = {
      id: Date.now(),
      name: selectedTherapist.name,
      specialty: selectedTherapist.specialty,
      dateTime: `${selectedDate}T${selectedTime}:00`,
    };
  
    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    localStorage.setItem("appointments", JSON.stringify([...existing, newAppointment]));
  
    setSelectedTherapist(null);
    setSelectedDate("");
    setSelectedTime("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="therapist-booking-system">
 
      {/* Sidebar Filter Section */}
      <div className="filter-section">
  <h3>Filter therapists</h3>
  <input
    type="text"
    placeholder="Search by name or keyword"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
  />
  <h4>City</h4>
  <select name="city" value={filters.city} onChange={handleFilterChange}>
    <option value="Tashkent">Tashkent</option>
  </select>
  <h4>District</h4>
  <select name="district" value={filters.district} onChange={handleFilterChange}>
  <option value="">All</option>
  <option value="Chilanzar">Chilanzar</option>
  <option value="Yunusabad">Yunusabad</option>
  <option value="Shaykhontohur">Shaykhontohur</option>
  <option value="Mirzo Ulugbek">Mirzo Ulugbek</option>
  <option value="Yashnabad">Yashnabad</option>
</select>
  <h4>Specialty</h4>
  <select name="specialty" value={filters.specialty} onChange={handleFilterChange}>
    <option value="">All</option>
    <option value="Couples Counseling">Couples Counseling</option>
    <option value="Anxiety Disorder">Anxiety Disorder</option>
    <option value="Depression">Depression</option>
    <option value="Eating Disorders">Eating Disorders</option>
    <option value="Bipolar Disorders">Bipolar Disorders</option>
  </select>
  
  {/* Search Button */}
  <button onClick={handleSearchClick} className="search-button">
    Search
  </button>
  <button
  className="search-button"
  onClick={() => {
    setTherapists(therapistsData);
    setFilters({ city: "Tashkent", district: "", specialty: "" });
    setSearchKeyword("");
  }}
>
  Reset Filters
</button>
</div>

      {/* Therapists List */}
      <div className="therapists-list">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className={`therapist-card ${selectedTherapist?.id === therapist.id ? 'selected' : ''}`}
            onClick={() => handleTherapistClick(therapist)}
          >
            <img src={therapist.image} alt={therapist.name} />
            <h4>{therapist.name}</h4>
            <p>{therapist.specialty}</p>
            <p>${therapist.price}/hour</p>
          </div>
        ))}
      </div>

      {/* Therapist Details */}
      {selectedTherapist && (
        <div className="therapist-details">
          <img src={selectedTherapist.image} alt={selectedTherapist.name} />
          <h3>{selectedTherapist.name} | {selectedTherapist.specialty}</h3>
          <div className="tab-buttons">
            {["About", "Schedules", "Experience", "Review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "active-tab" : ""}
              >
                {tab}
              </button>
            ))}
          </div>
            {activeTab === "About" && <p className="detailSec">{selectedTherapist.about}</p>}
            {activeTab === "Schedules" && (
  <div className="booking-calendar">
    <label>Select a Date:</label>
    <input
      type="date"
      min={new Date().toISOString().split("T")[0]}
      max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
      value={selectedDate}
      onChange={(e) => {
        setSelectedDate(e.target.value);
        setSelectedTime(""); // reset time on new date
      }}
    />

    {selectedDate && (
      <>
        <label>Select a Time:</label>
        <div className="time-slots">
          {["10:00", "11:00", "13:00", "14:00", "15:00"].map((slot) => {
            const dateTime = `${selectedDate}T${slot}:00`;
            const isBooked = JSON.parse(localStorage.getItem("appointments") || "[]")
              .some(appt =>
                appt.name === selectedTherapist.name &&
                appt.dateTime.startsWith(selectedDate) &&
                appt.dateTime.includes(slot)
              );

            return (
              <button
                key={slot}
                disabled={isBooked}
                className={`time-slot-btn ${selectedTime === slot ? "selected" : ""}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot} {isBooked ? " (Booked)" : ""}
              </button>
            );
          })}
        </div>
      </>
    )}
  </div>
)}

            {activeTab === "Experience" && <p className="detailSec">{selectedTherapist.experience}</p>}
            {activeTab === "Review" && <p className="detailSec">Reviews will go here...</p>}
            <button onClick={handleBookAppointment} className="bookAppt">Book an appointment</button>
        </div>
      )}
      {showToast && (
  <div className="booking-toast">Appointment booked successfully!</div>
)}
    </div>
  );
};

export default TherapistBookingSystem;
