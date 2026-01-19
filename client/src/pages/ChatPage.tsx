import type React from "react";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Loader2, HandCoins } from "lucide-react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import type { StreamMessage } from "@/types";
import { ChatMessage } from "@/components";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(userQuery: string) {
    await fetchEventSource(import.meta.env.VITE_BACKEND_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userQuery }),

      onmessage(event) {
        const parsedData = JSON.parse(event.data) as StreamMessage;

        if (parsedData.type === "ai") {
          setMessages((prevMessages) => {
            const lastMessage = prevMessages.at(-1);

            if (lastMessage && lastMessage.type === "ai") {
              const clonedMessages = [...prevMessages];

              clonedMessages[clonedMessages.length - 1] = {
                ...lastMessage,
                payload: {
                  text: lastMessage.payload.text + parsedData.payload.text,
                },
              };

              return clonedMessages;
            } else {
              return [
                ...prevMessages,
                {
                  id: Date.now().toString(),
                  type: "ai",
                  payload: parsedData.payload,
                },
              ];
            }
          });
        } else if (parsedData.type === "toolCall:start") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now().toString(),
              type: "toolCall:start",
              payload: parsedData.payload,
            },
          ]);
        } else if (parsedData.type === "tool") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now().toString(),
              type: "tool",
              payload: parsedData.payload,
            },
          ]);
        }
      },
    });
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        type: "user",
        payload: {
          text: input,
        },
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      sendMessage(input);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          type: "ai",
          payload: {
            text: "Something went wrong. Please try again later.",
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-background text-foreground grid grid-rows-[auto_1fr_auto]">
      <div className="border-b">
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
        {}
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl bg-linear-to-br from-orange-600/30 to-pink-600/20 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                  <HandCoins className="h-10 w-10" />
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl sm:text-5xl font-semibold">
                  <span className="bg-linear-to-r from-white via-stone-300 to-orange-400 bg-clip-text text-transparent">
                    What would you like to know?
                  </span>
                </h2>
                <p className="text-stone-400 text-sm sm:text-lg">
                  Ask me about expenses, trends, budgets, or insights.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="pb-2">
                <ChatMessage message={message} />
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
              placeholder="Ask anything about your expenses..."
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white rounded-2xl p-4 font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
