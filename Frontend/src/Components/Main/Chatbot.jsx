import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaWindowMinimize,
} from "react-icons/fa";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Quick suggestion buttons
  const suggestions = [
    { text: "What is Hajj?", query: "What is Hajj?" },
    { text: "What is Umrah?", query: "What is Umrah?" },
    { text: "Steps of Hajj", query: "Tell me the steps of Hajj" },
    { text: "Steps of Umrah", query: "Tell me the steps of Umrah" },
    { text: "Importance of Hajj", query: "What is the importance of Hajj?" },
  ];

  // Dummy bot responses
  const getBotResponse = (msg) => {
    const message = msg.toLowerCase();
    if (
      message.includes("hajj") &&
      (message.includes("what") || message.includes("meaning"))
    ) {
      return "Hajj is the annual pilgrimage to Makkah. It is the fifth pillar of Islam and mandatory for capable Muslims at least once in their lifetime.";
    } else if (
      message.includes("umrah") &&
      (message.includes("what") || message.includes("meaning"))
    ) {
      return "Umrah is a voluntary pilgrimage to Makkah that can be performed any time of year. It holds great spiritual significance.";
    } else if (message.includes("steps of hajj")) {
      return "Steps of Hajj: 1) Ihram, 2) Tawaf, 3) Sa'i, 4) Arafat, 5) Muzdalifah, 6) Rami, 7) Qurbani, 8) Hair shaving, 9) Tawaf al-Ifadah.";
    } else if (message.includes("steps of umrah")) {
      return "Steps of Umrah: 1) Enter Ihram, 2) Tawaf (7 circles), 3) Sa'i (7 rounds), 4) Shave/trim hair.";
    } else if (message.includes("importance of hajj")) {
      return "Importance of Hajj: Fulfills 5th pillar, erases sins, shows Muslim unity, teaches patience, offers spiritual renewal.";
    } else {
      return "Thank you for your question. For detailed info about Hajj & Umrah, consult official religious sources. Anything specific you want to know?";
    }
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isBotTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Load saved messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setMessages(JSON.parse(saved));
      setShowSuggestions(false);
    } else {
      setMessages([
        {
          id: Date.now(),
          text: "Assalamu Alaikum! I can help you with Hajj and Umrah.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, []);

  // Save chat
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Send a message
  const sendMessage = (text) => {
    if (!text.trim() || isBotTyping) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);
    setIsBotTyping(true);

    setTimeout(
      () => {
        const botMessage = {
          id: Date.now() + 1,
          text: getBotResponse(text),
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsBotTyping(false);

        setTimeout(() => {
          if (isOpen) {
            inputRef.current?.focus();
          }
        }, 100);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleSend = () => sendMessage(inputValue);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleSuggestionClick = (query) => sendMessage(query);

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Assalamu Alaikum! I can help you with Hajj and Umrah.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setShowSuggestions(true);
    localStorage.removeItem("chatMessages");

    setTimeout(() => {
      if (isOpen) {
        inputRef.current?.focus();
      }
    }, 100);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 translate-y-12 pointer-events-none"
        }`}
      >
        <div className="absolute bottom-16 right-0 w-[380px] sm:w-[400px] h-[600px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-800">
          {/* Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-pink-500 rounded-full p-2">
                <FaRobot className="text-white text-sm" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  Hajj & Umrah Assistant
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-gray-400 hover:text-white transition-colors text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                title="New chat"
              >
                New
              </button>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaWindowMinimize />
              </button>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages Area - FORCED SCROLLING with !important */}
          <div
            ref={messagesContainerRef}
            className="flex-1 p-4 space-y-4 bg-gray-900"
            style={{
              overflowY: "auto !important",
              overflowX: "hidden !important",
              minHeight: "0",
              position: "relative",
              maxHeight: "calc(100% - 120px)",
              scrollBehavior: "smooth",
            }}
            onWheel={(e) => {
              // Ensure scrolling works
              e.stopPropagation();
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-md ${
                    msg.sender === "user"
                      ? "bg-pink-500 text-white rounded-br-sm"
                      : "bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700"
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <span
                    className={`text-[10px] mt-1 block ${
                      msg.sender === "user" ? "text-pink-100" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isBotTyping && (
              <div className="flex justify-start animate-fadeInUp">
                <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 border border-gray-700">
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick suggestions */}
            {showSuggestions && messages.length === 1 && !isBotTyping && (
              <div className="mt-4 animate-fadeInUp">
                <p className="text-gray-400 text-xs mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(s.query)}
                      className="bg-gray-800 hover:bg-gray-700 text-pink-400 text-xs px-3 py-1.5 rounded-full border border-gray-700 transition-colors cursor-pointer"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-gray-800 p-3 border-t border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Hajj or Umrah..."
                disabled={isBotTyping}
                className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isBotTyping}
                className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors cursor-pointer"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer ${
          isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      >
        <FaRobot size={24} />
      </button>

      {/* Global styles with HIGHER SPECIFICITY to override any conflicts */}
      <style>{`
        /* Force scroll on chatbot messages container */
        .fixed.bottom-6.right-6.z-50 .flex-1.p-4.space-y-4.bg-gray-900 {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          scrollbar-width: thin !important;
          scrollbar-color: #ff4d8d #374151 !important;
        }
        
        /* Custom scrollbar styling */
        .fixed.bottom-6.right-6.z-50 .flex-1.p-4.space-y-4.bg-gray-900::-webkit-scrollbar {
          width: 6px !important;
        }
        
        .fixed.bottom-6.right-6.z-50 .flex-1.p-4.space-y-4.bg-gray-900::-webkit-scrollbar-track {
          background: #374151 !important;
          border-radius: 10px !important;
        }
        
        .fixed.bottom-6.right-6.z-50 .flex-1.p-4.space-y-4.bg-gray-900::-webkit-scrollbar-thumb {
          background: #ff4d8d !important;
          border-radius: 10px !important;
        }
        
        .fixed.bottom-6.right-6.z-50 .flex-1.p-4.space-y-4.bg-gray-900::-webkit-scrollbar-thumb:hover {
          background: #ff6ba3 !important;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce {
          animation: bounce 1.4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Chatbot;
