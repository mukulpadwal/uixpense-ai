import { BarChart2, Check, MessageSquare, Shield } from "lucide-react";

function Features() {
  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Built on the LangChain Engine.
            </h2>
            <p className="leading-relaxed text-lg mb-8 text-stone-400">
              Traditional finance apps require manual entry. uixpense-ai uses
              LangGraph to orchestrate complex reasoning. It understands
              context, remembers recurring bills, and proactively warns you
              about anomalies.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-stone-300">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                  <Check className="w-3 h-3 text-orange-400" />
                </div>
                <span>Natural Language Transaction Entry</span>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                  <Check className="w-3 h-3 text-orange-400" />
                </div>
                <span>Automated Database Sync via SQL Agents</span>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                  <Check className="w-3 h-3 text-orange-400" />
                </div>
                <span>Generative UI Components on demand</span>
              </li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="border-gradient rounded-xl bg-foreground/2 p-6 sm:h-64 flex flex-col justify-between gap-2 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-lg border flex items-center justify-center bg-stone-900 border-white/10">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Chat to Track</h3>
                <p className="text-sm text-stone-500">
                  "Spent 50 on dinner." The agent parses, categorizes, and logs
                  it instantly.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border-gradient rounded-xl bg-foreground/2 p-6 sm:h-64 flex flex-col justify-between gap-2 translate-y-8 hover:translate-y-7 transition-transform duration-300">
              <div className="w-10 h-10 rounded-lg border flex items-center justify-center bg-stone-900 border-white/10">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Visual Insights</h3>
                <p className="text-sm text-stone-500">
                  Ask "Where did my money go?" and get a dynamic interactive
                  chart response.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Security Card */}
          <div className="border-gradient col-span-1 bg-[#0A0A0A] rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors" />
            <Shield className="w-8 h-8 mb-6 text-orange-400" />
            <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-sm text-stone-500">
              Your data is stored in an encrypted database with Row Level
              Security.
            </p>
          </div>

          {/* Tech Card */}
          <div className="border-gradient col-span-1 md:col-span-2 bg-[#0A0A0A] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Powered by LLMs</h3>
              <p className="text-sm text-stone-500">
                Utilizing state-of-the-art models to interpret complex financial
                queries. It's not just a tracker; it's a financial analyst in
                your pocket.
              </p>
            </div>
            <div className="flex-1 w-full border rounded-lg p-4 font-mono text-[10px] bg-black/50 border-white/10 text-stone-400">
              <div className="flex gap-2 mb-2">
                <span className="text-pink-400">user</span>: "Analyze Q3
                spending"
              </div>
              <div className="flex gap-2">
                <span className="text-pink-400">agent</span>:{" "}
                <span className="text-stone-500">Executing SQL...</span>
              </div>
              <div className="mt-2 text-stone-300">
                SELECT sum(amount), category FROM expenses WHERE quarter = 3
                GROUP BY category;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
