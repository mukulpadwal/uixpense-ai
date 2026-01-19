import { Terminal, User, HandCoins } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChartData, StreamMessage } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ExpenseChart from "./expense-chart";

function ChatMessage({ message }: { message: StreamMessage }) {
  if (message.type === "user") {
    return (
      <div className="flex justify-end my-4 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex flex-row-reverse items-start gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[65%]">
          <div className="shrink-0 mt-1">
            <div className="p-2 rounded-full bg-orange-500/20 border border-orange-500/30">
              <User className="w-4 h-4 text-orange-400" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="px-5 py-3 rounded-3xl rounded-tr-sm bg-linear-to-br from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-950/20 border border-orange-400/20">
              <p className="text-sm sm:text-base leading-relaxed font-medium">
                {message.payload.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "ai") {
    return (
      <div className="flex justify-start my-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[65%]">
          <div className="shrink-0 mt-1">
            <div className="p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <HandCoins className="w-4 h-4 text-orange-400" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="px-5 py-3 rounded-3xl rounded-tl-sm bg-white/5 backdrop-blur-md text-stone-100 border border-white/10 shadow-xl">
              <p className="text-sm sm:text-base leading-relaxed tracking-wide">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: (props) => (
                      <table
                        className="overflow-x-auto w-full border border-foreground/10 border-collapse"
                        {...props}
                      />
                    ),
                    th: (props) => (
                      <th
                        className="border border-foreground/10 px-3 py-2 text-left"
                        {...props}
                      />
                    ),
                    td: (props) => (
                      <td
                        className="border border-foreground/10 px-3 py-2"
                        {...props}
                      />
                    ),
                  }}
                >
                  {message.payload.text}
                </Markdown>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "toolCall:start") {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value={message.payload.name}>
          <AccordionTrigger className="hover:no-underline cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-stone-800/80 border border-white/10">
                <Terminal className="w-3.5 h-3.5 text-orange-500  " />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-stone-500">
                Agent Step
              </span>
              <span className="text-xs font-medium text-stone-300 truncate font-mono">
                {message.payload.name}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full flex justify-start my-2 px-12">
              <div className="w-full flex items-start gap-3 px-4 py-3 rounded-xl border bg-stone-900/40 border-white/5 backdrop-blur-md group transition-all hover:border-white/10 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="w-full flex flex-col gap-1.5">
                  {message.payload.args &&
                    Object.keys(message.payload.args).length > 0 && (
                      <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/5">
                        <pre className="text-[11px] font-mono text-stone-400 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                          {JSON.stringify(message.payload.args, null, 2)}
                        </pre>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (message.type === "tool") {
    return (
      <>
        <Accordion type="single" collapsible>
          <AccordionItem value={message.payload.name}>
            <AccordionTrigger className="hover:no-underline cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-stone-800/80 border border-white/10">
                  <Terminal className="w-3.5 h-3.5 text-orange-500  " />
                </div>
                <span className="text-xs uppercase tracking-wider font-bold text-stone-500">
                  Agent Step Result
                </span>
                <span className="text-xs font-medium text-stone-300 truncate font-mono">
                  {message.payload.name}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex justify-start my-2 px-12">
                <div className="w-full flex items-start gap-3 px-4 py-3 rounded-xl border bg-stone-900/40 border-white/5 backdrop-blur-md group transition-all hover:border-white/10 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="w-full flex flex-col gap-1.5">
                    {message.payload.result && (
                      <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/5">
                        <pre className="text-[11px] font-mono text-stone-400 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                          {JSON.stringify(message.payload.result, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {message.payload.name === "generate_expense_chart" && (
          <ExpenseChart
            chartData={message.payload.result?.chartData as ChartData[]}
            labelKey={message.payload.result?.labelKey as string}
          />
        )}
      </>
    );
  }
}

export default ChatMessage;
