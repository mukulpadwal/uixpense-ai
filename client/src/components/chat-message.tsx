import type { StreamMessage } from "@/types";

function ChatMessage({ message }: { message: StreamMessage }) {
  if (message.type === "user") {
    return (
      <div key={message.id} className={`flex justify-end`}>
        <div
          className={`max-w-xs sm:max-w-md lg:max-w-2xl px-6 py-4 rounded-2xl border backdrop-blur-sm bg-orange-600 text-white border-orange-500/40 rounded-tr-sm`}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            {message.payload.text}
          </p>
        </div>
      </div>
    );
  }

  if (message.type === "ai") {
    return (
      <div key={message.id} className={`flex justify-start`}>
        <div
          className={`max-w-xs sm:max-w-md lg:max-w-2xl px-6 py-4 rounded-2xl border backdrop-blur-sm bg-white/10 text-stone-100 border-white/15 rounded-tl-sm`}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            {message.payload.text}
          </p>
        </div>
      </div>
    );
  }
}

export default ChatMessage;