import React, { useState } from "react";
import MainStyle from "./chatarea.module.css";
import { SendHorizonal } from "lucide-react";

const Chatarea = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setMessages((prev) => [...prev, { sender: "bot", typing: true }]);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response";

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.typing),
        { sender: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className={MainStyle.main_chat_area}>
      <div className={MainStyle.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${MainStyle.message} ${
              msg.sender === "user" ? MainStyle.userMessage : MainStyle.botMessage
            }`}
          >
            {msg.typing ? (
              <div className={MainStyle.bounce}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className={MainStyle.messageBox}>
        <textarea
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <SendHorizonal className={MainStyle.messageIcon} onClick={sendMessage} />
      </div>
    </main>
  );
};

export default Chatarea;
