import React, { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";

const initialMessages = [
  { text: "Welcome to BBIT R&D Assistant.", sender: "bot" },
  { text: "Ask me about projects, publications, or site features.", sender: "bot" },
];

const quickPrompts = [
  "What projects are currently featured?",
  "Tell me about admissions and registration.",
  "How do I contact the admin team?",
  "What research areas does BBIT focus on?",
];

const STORAGE_KEY = "bbit_chatbot_messages";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [providerStatus, setProviderStatus] = useState('unknown'); // unknown|ok|missing|error
  const [lastFailed, setLastFailed] = useState(null);
  const chatEndRef = useRef(null);
  const loadingTimerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed);
          return;
        }
      }
    } catch (error) {
      // ignore storage issues
    }

    if (open) {
      setMessages(initialMessages);
    }
  }, [open]);

  useEffect(() => {
    try {
      if (messages.length) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (error) {
      // ignore storage issues
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearInterval(loadingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (open) setPanelVisible(true);
    else {
      // delay hiding to allow close animation
      const t = setTimeout(() => setPanelVisible(false), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  useEffect(() => {
    // poll AI health endpoint
    let mounted = true;
    const check = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
        const r = await fetch(`${apiBase}/api/ai/health`, { cache: 'no-store' })
        if (!mounted) return
        if (!r.ok) {
          setProviderStatus('error')
          return
        }
        const data = await r.json()
        if (data && data.hasKey) setProviderStatus('ok')
        else setProviderStatus('missing')
      } catch (e) {
        setProviderStatus('error')
      }
    }
    check()
    const id = setInterval(check, 30000)
    return () => { mounted = false; clearInterval(id) }
  }, [])

  const toApiHistory = (items) =>
    items
      .filter((item) => item.sender === "user" || item.sender === "bot")
      .slice(-8)
      .map((item) => ({ role: item.sender === "user" ? "user" : "assistant", content: item.text }));

  const pushBotReply = (reply) => {
    if (loadingTimerRef.current) {
      clearInterval(loadingTimerRef.current);
    }

    setMessages((current) => [...current, { text: "", sender: "bot", streaming: true }]);

    const characters = Array.from(reply || "");
    let index = 0;
    loadingTimerRef.current = setInterval(() => {
      index += 1;
      const visibleText = characters.slice(0, index).join("");

      setMessages((current) => {
        const next = [...current];
        for (let i = next.length - 1; i >= 0; i -= 1) {
          if (next[i].sender === "bot" && next[i].streaming) {
            next[i] = { ...next[i], text: visibleText };
            break;
          }
        }
        return next;
      });

      if (index >= characters.length) {
        clearInterval(loadingTimerRef.current);
        loadingTimerRef.current = null;
        setMessages((current) =>
          current.map((item) => (item.sender === "bot" && item.streaming ? { ...item, streaming: false } : item))
        );
        setTyping(false);
      }
    }, 14);
  };

  const respondTo = async (text) => {
    setTyping(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const history = toApiHistory(messages);
      const response = await fetch(`${apiBase}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (response.ok) {
        const payload = await response.json();
        const reply = payload?.reply || (payload.raw ? JSON.stringify(payload.raw).slice(0, 1000) : "(no reply)");
        pushBotReply(reply);
        setProviderStatus('ok')
        setLastFailed(null)
        return;
      } else {
        // Try to parse provider error, but do not show raw JSON to users.
        let parsed = null;
        try {
          parsed = await response.json();
        } catch (e) {
          try {
            parsed = await response.text();
          } catch (e2) {
            parsed = null;
          }
        }
        console.error("AI provider returned non-OK", response.status, parsed);

        // Show concise, friendly message and fall back to helpful canned reply.
        pushBotReply("AI is temporarily unavailable — showing a helpful fallback reply.");
        setProviderStatus('error')
        setLastFailed({ message: text })

        // Immediately provide a helpful fallback reply based on the user's input.
        const lower = String(text || "").toLowerCase();
        let fallback = "I'm here to help — could you rephrase that?";
        if (/hello|hi|hey/.test(lower)) fallback = "Hello! How can I assist you today?";
        else if (/project/.test(lower)) fallback = "You can view projects on the Research Projects page or add projects via the admin panel.";
        else if (/publication|paper|journal/.test(lower)) fallback = "Publications are listed under Publications. Add them via admin to show here.";
        else if (/admin|panel/.test(lower)) fallback = "Admin panel is at /admin — sign in with your admin account to manage content.";
        else if (/contact|email/.test(lower)) fallback = "You can reach out via the Contact page or use the site email form.";

        setTimeout(() => pushBotReply(fallback), 500 + Math.random() * 300);
        return;
      }
    } catch (error) {
      console.warn("AI proxy failed, falling back:", error && error.message ? error.message : error);
      setProviderStatus('error')
      setLastFailed({ message: text })
    }

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "I'm here to help — could you rephrase that?";
      if (/hello|hi|hey/.test(lower)) reply = "Hello! How can I assist you today?";
      else if (/project/.test(lower)) reply = "You can view projects on the Research Projects page or add projects via the admin panel.";
      else if (/publication|paper|journal/.test(lower)) reply = "Publications are listed under Publications. Add them via admin to show here.";
      else if (/admin|panel/.test(lower)) reply = "Admin panel is at /admin — sign in with your admin account to manage content.";
      else if (/contact|email/.test(lower)) reply = "You can reach out via the Contact page or use the site email form.";
      pushBotReply(reply);
    }, 700 + Math.random() * 700);
  };

  const handleSend = (value) => {
    if (!value || !value.trim()) return;
    setMessages((current) => [...current, { text: value.trim(), sender: "user" }]);
    setInput("");
    respondTo(value.trim());
  };

  return (
    <div className="fixed z-60 right-4 bottom-28 md:bottom-6 flex flex-col items-end">
      {!open && (
        <div className="relative flex items-center justify-end">
          <button
            className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-full p-3 shadow-2xl hover:scale-105 transform transition-all duration-200"
            onClick={() => setOpen(true)}
            aria-label="Open AI chat"
          >
            {/* provider status badge */}
            <span className={`absolute -top-2 -left-2 rounded-full w-3 h-3 ${providerStatus === 'ok' ? 'bg-emerald-400' : providerStatus === 'missing' ? 'bg-yellow-400' : providerStatus === 'error' ? 'bg-red-500' : 'bg-gray-300'} shadow-sm`} />
            <div className="absolute -top-12 right-0 hidden sm:flex items-center">
              <div className="bg-white/90 text-xs text-slate-800 font-semibold px-3 py-1 rounded-full shadow-sm transform transition-all duration-200 opacity-0 group-hover:opacity-100">
                AI Chat
              </div>
            </div>

            <span className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 blur-lg"></span>
            <span className="absolute -inset-1 rounded-full opacity-30 animate-ping" style={{ animationDuration: '1.8s' }} />
            <FaRobot className="w-7 h-7 text-white drop-shadow-md relative z-10" />
          </button>
        </div>
      )}

      {panelVisible && (
        <div className={`w-96 max-w-sm bg-white rounded-2xl shadow-[0_20px_60px_rgba(250,204,21,0.14)] border border-yellow-300 flex flex-col overflow-hidden transform transition-all duration-220 ${open ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black flex items-center justify-between px-4 py-3 font-semibold text-lg">
            <div className="flex items-center gap-3">
              <img
                src="/bbit-logo.png"
                alt="BBIT"
                className="w-10 h-10 rounded-md shadow-sm object-cover"
                onError={(e) => {
                  try {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <rect width="48" height="48" rx="8" fill="#0B63C6" />
                        <text x="50%" y="55%" font-size="18" fill="white" text-anchor="middle" font-family="Arial" font-weight="700">BBIT</text>
                      </svg>`);
                  } catch (err) {
                    // ignore
                  }
                }}
              />
              <div>
                <div className="text-black font-bold">BBIT Assistant</div>
                <div className="text-black text-xs opacity-80">Research & Innovation</div>
              </div>
            </div>
            <button
              className="text-black text-2xl font-bold focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] bg-repeat px-4 py-3 overflow-y-auto" style={{ minHeight: 320, maxHeight: 420 }}>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors"
                  onClick={() => handleSend(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "bot" && (
                  <div className="flex items-start mt-1">
                    <FaRobot className="text-yellow-600 w-6 h-6" />
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm max-w-[76%] break-words whitespace-pre-wrap ${msg.sender === "user" ? "bg-blue-900 text-white" : "bg-yellow-50 text-black"}`}>
                  {msg.text}
                </div>
                {msg.sender === "user" && (
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
            <div className="flex items-center gap-2">
              {lastFailed && (
                <button
                  type="button"
                  onClick={() => {
                    // retry last failed message
                    if (lastFailed?.message) {
                      // show the message again and reattempt
                      setMessages((c) => [...c, { text: lastFailed.message, sender: 'user' }]);
                      respondTo(lastFailed.message);
                      setLastFailed(null);
                    }
                  }}
                  className="text-sm px-3 py-2 rounded-lg border border-yellow-300 text-yellow-800 bg-yellow-100 hover:bg-yellow-200"
                >
                  Retry
                </button>
              )}
              <button
                className={`px-3 py-2 rounded-lg text-white font-semibold ${input.trim() ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-300 cursor-not-allowed"}`}
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
