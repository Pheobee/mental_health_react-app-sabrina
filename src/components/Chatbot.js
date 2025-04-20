
// import React, { useState } from "react";
import "../css/Chatbot.css";
import React, { useState, useRef, useEffect } from "react";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { role: "user", content: userInput }];
      setMessages(newMessages);
  
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=AIzaSyDvQANVOSuaZvwjDYcA-cXnUkJO41awY1I`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              prompt: {
                messages: [
                  { author: "user", content: userInput }
                ]
              },
              temperature: 0.7
            })
          }
        );
  
        const data = await response.json();
        const botMessage = data?.candidates?.[0]?.content || "No response";
  
        setMessages([...newMessages, { role: "bot", content: botMessage }]);
      } catch (error) {
        console.error("Chatbot error:", error);
        setMessages([
          ...newMessages,
          { role: "bot", content: "Failed to get response. Please try again." },
        ]);
      }
  
      setUserInput("");
    }
  };
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      {!isOpen && <div className="chatbot-icon" onClick={toggleChat}>💬</div>}

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>Chatbot Assistant</h4>
            <button className="close-button" onClick={toggleChat}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>{msg.content}</div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
    
  );
};

export default Chatbot;