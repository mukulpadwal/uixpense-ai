import type React from "react";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(userQuery: string) {
    await fetchEventSource("http://localhost:8080/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userQuery }),

      onmessage(event) {
        console.log("eventName", event.event);
        console.log("eventData", event.data);
      },
    });
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput("");
    setIsLoading(true);

    try {
      sendMessage(input);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-background text-foreground grid grid-rows-[auto_1fr_auto]">
      <div className="border-b border-white/10 bg-linear-to-b from-background via-background/80 to-transparent backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex flex-col items-center">
            <h1 className="font-semibold bg-linear-to-r from-foreground via-stone-200 to-stone-400 bg-clip-text text-transparent">
              uiXpense.ai
            </h1>
            <p className="hidden sm:block text-xs text-stone-500">
              Autonomous financial agent
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-32 space-y-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl bg-linear-to-br from-orange-600/30 to-pink-600/20 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-5xl">💰</span>
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-semibold">
                  <span className="bg-linear-to-r from-white via-stone-300 to-orange-400 bg-clip-text text-transparent">
                    What would you like to know?
                  </span>
                </h2>
                <p className="text-stone-400 text-lg">
                  Ask me about expenses, trends, budgets, or insights.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-2xl px-6 py-4 rounded-2xl border backdrop-blur-sm ${
                    message.role === "user"
                      ? "bg-orange-600 text-white border-orange-500/40 rounded-tr-sm"
                      : "bg-white/10 text-stone-100 border-white/15 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">
                    {message.content}
                  </p>
                  <p className="text-xs mt-3 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/15 rounded-2xl px-6 py-4">
                <span className="text-xs text-stone-400">Thinking…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-foreground/10 bg-background backdrop-blur-xl">
        <form
          onSubmit={handleSendMessage}
          className="max-w-7xl mx-auto p-4 sm:p-8"
        >
          <div className="flex gap-3 items-end">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your expenses..."
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl px-6 py-4 font-semibold disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
