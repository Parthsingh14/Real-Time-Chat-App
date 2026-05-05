import { useEffect, useRef, useState } from "react";
import connectWS from "./ws";

function App() {
  const [userName, setUserName] = useState("");
  const [tempName, setTempName] = useState("");
  const [popup, setPopUp] = useState(true);

  const [messages, setMessages] = useState([
    { role: "me", message: "Hi.....!!!!" },
    { role: "users", message: "Hi I am Good" },
  ]);

  const [input, setInput] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = connectWS();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "me", message: input }]);
    setInput("");
  };

  const handleStartChat = () => {
    if (!tempName.trim()) return;
    setUserName(tempName);
    setPopUp(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
    {!popup && (
      <div className="h-screen w-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 h-[10%] flex flex-col justify-center">
        <h1 className="ml-6 font-semibold text-xl text-gray-800">{userName}</h1>
        <p className="ml-6 text-xs text-gray-500 mt-0.5">XYZ is typing...</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.role === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                chat.role === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 h-[10%] flex items-center gap-2 p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 h-full resize-none px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 text-gray-800 text-sm"
          rows="1"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
    )}

    {popup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px]">
            <h2 className="text-lg font-semibold mb-3">Enter Username</h2>

            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Your name..."
              className="w-full border px-3 py-2 rounded mb-4 outline-none"
            />

            <button
              onClick={handleStartChat}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default App;
