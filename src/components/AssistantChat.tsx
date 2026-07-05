import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Trash2, ShieldAlert, AlertTriangle, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "model", 
      content: "Hello! I am your interactive HealthVerse AI medical assistant. I can help answer physiological questions, translate lab terms, or summarize disease courses. How can I support your studies today?" 
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What are early stroke red flags?",
    "Explain LDL vs HDL cholesterol.",
    "Diet tips for high blood pressure",
    "Describe the cardiac cycle simply."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const updatedMessages = [...messages, { role: "user" as const, content: textToSend }];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to consult model.");
      }

      const data = await response.json();
      if (data.reply) {
        setMessages([...updatedMessages, { role: "model", content: data.reply }]);
      } else {
        throw new Error("No model reply returned.");
      }
    } catch (err: any) {
      setMessages([...updatedMessages, { role: "model", content: "⚠️ Connection error. Please ensure the backend is running and your API Key is configured in Settings." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      { 
        role: "model", 
        content: "Chat history cleared. I am ready for any new biological or medical education queries!" 
      }
    ]);
  };

  return (
    <div className="bg-slate-950 border border-white/10 rounded-2xl flex flex-col h-[520px] shadow-2xl overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -z-10"></div>
      
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Clinical Assistant Agent</h4>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono">Gemini-2.5-Flash Powered</span>
          </div>
        </div>

        <button 
          onClick={handleClearChat}
          className="text-slate-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
          title="Clear Chat History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Panel */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10"
      >
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[85%] ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                isUser 
                  ? "bg-emerald-600 text-white rounded-br-none" 
                  : "bg-slate-900 border border-white/5 text-slate-200 rounded-bl-none font-sans"
              }`}>
                {msg.content}
              </div>
              <span className="text-[8px] text-slate-500 font-mono mt-0.5 px-1 uppercase tracking-wider">
                {isUser ? "You" : "HealthVerse AI"}
              </span>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-1.5 items-center bg-slate-900/40 border border-white/5 p-3 rounded-xl max-w-xs text-xs text-slate-400 font-mono">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
            <span className="ml-1">Model is synthesizing...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts tray (only visible when chat is empty or short) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 shrink-0 border-t border-white/5 bg-slate-950 flex flex-wrap gap-1.5">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="text-[10px] bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-300 px-2 py-1 rounded-lg border border-white/5 transition-all text-slate-400 font-medium"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Form Footer */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }}
        className="p-3 border-t border-white/10 bg-slate-950 shrink-0 flex gap-2"
      >
        <input
          type="text"
          placeholder="Ask anything (e.g., Explain diabetes symptoms...)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={!userInput.trim() || loading}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-all shadow-md flex items-center justify-center shrink-0 disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
