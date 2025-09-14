import React, { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const initialMessages = [
  { text: "Welcome to BBIT.", sender: "bot" },
  { text: "How can I help you sir!", sender: "bot" },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  return (
    <div className="fixed z-50 right-4 bottom-4 flex flex-col items-end">
      {/* Chatbot Button */}
      {!open && (
        <button
          className="flex items-center bg-yellow-500 hover:bg-yellow-400 text-black rounded-full p-3 shadow-lg focus:outline-none"
          onClick={() => {
            setMessages(initialMessages);
            setOpen(true);
          }}
          aria-label="Open chatbot"
        >
          <FaRobot className="w-7 h-7" />
        </button>
      )}
      {/* Chatbot Popup */}
      {open && (
        <div className="w-80 max-w-xs sm:max-w-sm bg-white rounded-lg shadow-2xl border border-yellow-500 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-yellow-500 text-black flex items-center justify-between px-4 py-2 font-bold text-lg relative">
            <span>Professor</span>
            <button
              className="text-black text-2xl font-bold focus:outline-none absolute right-2 top-1"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div
            className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] bg-repeat px-3 py-2 overflow-y-auto"
            style={{ minHeight: 300, maxHeight: 400 }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className="flex items-start gap-2 mb-2">
                <span className="mt-1">
                  <FaRobot className="text-yellow-500 w-5 h-5" />
                </span>
                <div className="bg-yellow-100 text-black rounded-lg px-3 py-2 text-sm shadow">
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input (enabled) */}
          <form
            className="bg-gray-100 px-3 py-2 border-t border-yellow-200 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                setMessages([...messages, { text: input, sender: "user" }]);
                setInput("");
                setTimeout(() => {
                  if (chatEndRef.current)
                    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              placeholder="Write a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button
              className={`ml-2 text-yellow-500 ${
                input.trim()
                  ? "hover:text-yellow-600 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 21l21-9-21-9v7l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
