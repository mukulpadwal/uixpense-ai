import { Info, Sparkles, User } from "lucide-react";

function ChatInterface() {
  return (
    <div className="rounded-xl border bg-[#0A0A0A] shadow-2xl overflow-hidden relative border-white/10">
      {/* Browser Header */}
      <div className="h-10 border-b flex items-center px-4 gap-2 border-white/5 bg-black/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500/20 border border-pink-500/50" />
        </div>
        <div className="ml-4 px-3 py-1 rounded text-[10px] text-stone-500 font-mono bg-white/5">
          agent.uixpense.ai
        </div>
      </div>

      {/* Split Layout */}
      <div className="grid md:grid-cols-12 h-[500px]">
        {/* Chat Sidebar */}
        <div className="md:col-span-4 border-r bg-[#050505] p-4 flex flex-col border-white/5">
          <div className="flex-1 space-y-4 overflow-hidden">
            {/* Message 1 - User */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-stone-800">
                <User className="w-4 h-4 text-stone-400" />
              </div>
              <div className="rounded-lg rounded-tl-none p-3 text-xs leading-relaxed border bg-stone-900 text-stone-300 border-white/5">
                Spent $45 at Starbucks and $120 for groceries at Whole Foods.
                Categorize them.
              </div>
            </div>

            {/* Message 1 - AI Response */}
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-orange-600">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-lg rounded-tr-none p-3 text-xs leading-relaxed border border-orange-500/20 bg-orange-900/20 text-orange-100">
                Done. Added to database:
                <br />• <span className="font-semibold text-white">
                  Coffee
                </span>{" "}
                ($45)
                <br />•{" "}
                <span className="font-semibold text-white">Groceries</span>{" "}
                ($120)
                <br />
                Your monthly food budget is now at 65%.
              </div>
            </div>

            {/* Message 2 - User */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-stone-800">
                <User className="w-4 h-4 text-stone-400" />
              </div>
              <div className="rounded-lg rounded-tl-none p-3 text-xs leading-relaxed border bg-stone-900 text-stone-300 border-white/5">
                Show me my spending trend for the last 6 months.
              </div>
            </div>

            {/* Message 2 - AI Response */}
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-orange-600">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-lg rounded-tr-none p-3 text-xs leading-relaxed border border-orange-500/20 bg-orange-900/20 text-orange-100">
                Generating visualization...{" "}
                <span className="inline-block w-1 h-1 rounded-full animate-pulse bg-orange-400" />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Ask your agent..."
              className="w-full border rounded-lg pl-4 pr-10 py-3 text-xs placeholder-stone-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 bg-stone-900/50 border-white/10 text-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4-4 4" />
                <path d="M12 16V8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="hidden md:block md:col-span-8 bg-[#080808] p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[16px_16px] opacity-50" />

          {/* Dashboard Header */}
          <div className="flex justify-between items-end mb-8 relative z-10">
            <div>
              <h3 className="text-sm font-medium flex items-center gap-1 text-stone-400">
                Total Monthly Spend <Info className="w-3.5 h-3.5" />
              </h3>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-semibold text-white">
                  $4,250.00
                </span>
                <span className="text-xs font-medium px-1.5 py-0.5 rounded text-stone-400 bg-stone-400/10">
                  +12% vs last month
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md border text-[10px] bg-white/5 border-white/10 text-stone-400 hover:bg-white/10">
                Export CSV
              </button>
              <button className="px-3 py-1.5 rounded-md text-[10px] font-medium hover:bg-orange-500 shadow-[0_0_15px_rgba(79,70,229,0.4)] bg-orange-600 text-white">
                AI Forecast
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-64 w-full border-b border-l mb-6 flex items-end gap-2 px-2 pb-0 z-10 border-white/10">
            <div className="flex-1 rounded-t-sm h-[40%] hover:bg-orange-500/80 transition-colors group relative bg-stone-800/50">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                $1.2k
              </div>
            </div>
            <div className="flex-1 rounded-t-sm h-[65%] hover:bg-orange-500/80 transition-colors group relative bg-stone-800/50">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                $2.1k
              </div>
            </div>
            <div className="flex-1 rounded-t-sm h-[35%] hover:bg-orange-500/80 transition-colors group relative bg-stone-800/50">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                $0.9k
              </div>
            </div>
            <div className="flex-1 rounded-t-sm h-[85%] hover:bg-orange-500/80 transition-colors group relative bg-stone-800/50">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                $3.4k
              </div>
            </div>
            <div className="flex-1 rounded-t-sm h-[55%] hover:bg-orange-500/80 transition-colors group relative bg-stone-800/50">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                $1.8k
              </div>
            </div>
            <div className="flex-1 bg-linear-to-t from-orange-600/20 to-orange-500 rounded-t-sm h-[75%] relative shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-400">
                $4.2k
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 gap-4 z-10 relative">
            <div className="border-gradient rounded-lg p-3 bg-white/2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-stone-500">Dining</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-stone-600"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
              </div>
              <div className="h-1 rounded-full overflow-hidden mb-1 bg-stone-800">
                <div className="h-full w-[60%] bg-orange-500" />
              </div>
              <div className="text-xs font-medium text-stone-300">$450</div>
            </div>

            <div className="border-gradient rounded-lg p-3 bg-white/2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-stone-500">Transport</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-stone-600"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className="h-1 rounded-full overflow-hidden mb-1 bg-stone-800">
                <div className="h-full w-[30%] bg-pink-500" />
              </div>
              <div className="text-xs font-medium text-stone-300">$210</div>
            </div>

            <div className="border-gradient rounded-lg p-3 bg-white/2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-stone-500">Utilities</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-stone-600"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </div>
              <div className="h-1 rounded-full overflow-hidden mb-1 bg-stone-800">
                <div className="h-full w-[80%] bg-stone-500" />
              </div>
              <div className="text-xs font-medium text-stone-300">$890</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
