import React, { useState, useRef, useEffect } from "react";
import "../css/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newMessages = [...messages, { role: "user", content: trimmedInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("https://localhost:7203/api/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: trimmedInput })
      });

      const data = await response.json();
      const botMessage = data?.reply || "No response received.";

      setMessages((prev) => [...prev, { role: "bot", content: botMessage }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Failed to get response. Please try again." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <button
          className="chatbot-icon"
          onClick={toggleChat}
          aria-label="Open Chat"
          type="button"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-popup" role="dialog" aria-modal="true">
          <div className="chatbot-header">
            <h4>Chatbot Assistant</h4>
            <button
              className="close-button"
              onClick={toggleChat}
              aria-label="Close Chat"
              type="button"
            >
              ✖
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Type your message"
            />
            <button onClick={handleSendMessage} type="button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
