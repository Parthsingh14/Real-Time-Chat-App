import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    { role: "me", message: "Hi.....!!!!" },
    { role: "users", message: "Hi I am Good" },
  ]);

  const [input, setInput] = useState("");
  
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "me", message: input }
    ]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 h-[10%] flex flex-col justify-center">
        <h1 className="ml-6 font-semibold text-xl text-gray-800">Parth</h1>
        <p className="ml-6 text-xs text-gray-500 mt-0.5">XYZ is typing...</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((chat, index) => (
          <div 
            key={index} 
            className={`flex ${chat.role === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                chat.role === 'me'
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
          onKeyPress={handleKeyPress}
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
  );
}

export default App;