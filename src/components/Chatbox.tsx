import React, { useState } from "react";
import axios from "axios";

const LANG_GRAPH_API_KEY = import.meta.env.VITE_LANGGRAPH;

const ChatBox = () => {
  const [messages, setMessages] = useState([]); // Array of { sender, text }
  const [input, setInput] = useState("");
  const threadId = "YOUR_THREAD_ID"; // You may create a thread at component mount

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Update UI with user's message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      // Call the thread run endpoint to process the user message
      const response = await axios.post(
        `https://carbon-factibility-chatbot-d6e49c66104958488e99a1a84cb05b9a.us.langgraph.app/threads/${threadId}/runs`,
        { input: input }, // adjust payload structure as required by your API
        { headers: { "X-Api-Key": LANG_GRAPH_API_KEY } }
      );

      const assistantReply = response.data?.reply || "No response";
      // Append assistant's reply to messages
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: assistantReply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "Sorry, something went wrong." },
      ]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
