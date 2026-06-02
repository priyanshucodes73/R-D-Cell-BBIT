import React, { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const initialMessages = [
  { text: "Welcome to BBIT R&D Assistant.", sender: "bot" },
  { text: "Ask me about projects, publications, or site features.", sender: "bot" },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMessages(initialMessages);
    }
  }, [open]);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  // AI responder: try server proxy to OpenRouter, otherwise fallback to local rules
  const respondTo = async (text) => {
    setTyping(true);
    // attempt server-side AI proxy
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";
      const r = await fetch(`${apiBase}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (r.ok) {
        const payload = await r.json();
        const reply = payload?.reply || (payload.raw ? JSON.stringify(payload.raw).slice(0, 1000) : "(no reply)");
        setMessages((m) => [...m, { text: reply, sender: "bot" }]);
        setTyping(false);
        return;
      }
      // else fallthrough to local
    } catch (e) {
      // network or server error, fallback to local
      console.warn("AI proxy failed, falling back:", e && e.message ? e.message : e);
    }

    // Local fallback responder
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "I'm here to help — could you rephrase that?";
      if (/hello|hi|hey/.test(lower)) reply = "Hello! How can I assist you today?";
      else if (/project/.test(lower)) reply = "You can view projects on the 'Research Projects' page or add projects via the admin panel.";
      else if (/publication|paper|journal/.test(lower)) reply = "Publications are listed under 'Publications'. Add them via admin to show here.";
      else if (/admin|panel/.test(lower)) reply = "Admin panel is at /admin — sign in with your admin account to manage content.";
      else if (/contact|email/.test(lower)) reply = "You can reach out via the Contact page or use the site email form.";
      setMessages((m) => [...m, { text: reply, sender: "bot" }]);
      setTyping(false);
    }, 700 + Math.random() * 700);
  };

  const handleSend = (value) => {
    if (!value || !value.trim()) return;
    setMessages((m) => [...m, { text: value.trim(), sender: "user" }]);
    setInput("");
    respondTo(value.trim());
  };

  return (
    <div className="fixed z-50 right-6 bottom-6 flex flex-col items-end">
      {/* Chatbot Button */}
      {!open && (
        <button
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-full p-3 shadow-2xl ring-8 ring-yellow-300/50 hover:scale-105 transform transition animate-pulse"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <FaRobot className="w-7 h-7 text-white drop-shadow-md" />
        </button>
      )}

      {/* Chatbot Popup */}
      {open && (
        <div className="w-96 max-w-sm bg-white rounded-2xl shadow-[0_20px_60px_rgba(250,204,21,0.14)] border border-yellow-300 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black flex items-center justify-between px-4 py-3 font-semibold text-lg">
            <div className="flex items-center gap-3">
              <img src="/bbit-logo.png" alt="BBIT" className="w-8 h-8 rounded-md shadow-sm" />
              <div>
                <div className="text-black font-bold">BBIT Assistant</div>
                <div className="text-black text-xs opacity-80">Research & Innovation</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-black text-2xl font-bold focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] bg-repeat px-4 py-3 overflow-y-auto" style={{ minHeight: 320, maxHeight: 420 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="flex items-start mt-1">
                    <FaRobot className="text-yellow-600 w-6 h-6" />
                  </div>
                )}
                <div className={`${msg.sender === 'user' ? 'bg-blue-900 text-white' : 'bg-yellow-50 text-black'} rounded-xl px-3 py-2 text-sm shadow-sm max-w-[76%]`}>{msg.text}</div>
                {msg.sender === 'user' && (
                  <div className="flex items-end mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">U</div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-3 mb-3">
                <FaRobot className="text-yellow-600 w-6 h-6" />
                <div className="bg-yellow-50 rounded-xl px-3 py-2 text-sm text-black shadow-sm">
                  <span className="animate-pulse">Professor is typing</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form
            className="bg-white px-4 py-3 border-t border-yellow-100 flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <input
              type="text"
              className="flex-1 bg-gray-50 rounded-lg px-3 py-2 outline-none text-sm text-gray-800 placeholder-gray-400"
              placeholder="Ask me about projects, publications, or site features..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className={`px-3 py-2 rounded-lg text-white font-semibold ${input.trim() ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-300 cursor-not-allowed'}`}
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
