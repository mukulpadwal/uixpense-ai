import { ArrowRight } from "lucide-react";
import ChatInterface from "./chat-interface";
import { NavLink } from "react-router";

function Hero() {
  return (
    <section className="w-full px-6 py-12">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[120px] -z-10 bg-orange-600/20" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[100px] -z-10 bg-pink-900/10" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-sm border-foreground/10 bg-foreground/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-stone-400" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-500" />
          </span>
          <span className="text-[10px] font-medium tracking-widest uppercase text-stone-300">
            Generative UI Agent Live
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="md:text-7xl lg:text-8xl leading-[1.1] text-5xl font-semibold text-foreground tracking-tight mb-6">
          Your money has a story.
          <br />
          <span className="gradient-text">Let AI tell it.</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed text-stone-400">
          uiXpense-ai is the autonomous financial agent that transforms natural
          language into database-backed insights. Add expenses, visualize
          trends, and query your wealth simply by talking.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-20">
          <NavLink to="/chat">
            <button
              className="glow-btn cursor-pointer border-none inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 transition-all duration-300 text-sm font-medium tracking-wide rounded-none pt-4 pr-10 pb-4 pl-10 relative items-center justify-center group text-foreground bg-black"
              style={{ width: "auto" }}
            >
              {/* Border Gradients */}
              <div
                className="pointer-events-none absolute left-0 top-[-40px] bottom-[-40px] w-px"
                style={{
                  background:
                    "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) calc(100% - 40px), rgba(255,255,255,0))",
                }}
              />
              <div
                className="pointer-events-none absolute right-0 top-[-40px] bottom-[-40px] w-px"
                style={{
                  background:
                    "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) calc(100% - 40px), rgba(255,255,255,0))",
                }}
              />
              <div
                className="pointer-events-none absolute top-0 left-[-40px] right-[-40px] h-px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) calc(100% - 40px), rgba(255,255,255,0))",
                }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-[-40px] right-[-40px] h-px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) calc(100% - 40px), rgba(255,255,255,0))",
                }}
              />

              {/* Glow Effects */}
              <div className="glow-btn-overlay" />
              <div className="glow-btn-radial" />

              <span className="relative z-10 flex items-center gap-2">
                START YOUR AGENT
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </NavLink>
        </div>

        {/* Chat Interface Mockup */}
        <div className="relative max-w-5xl mx-auto animate-float">
          <ChatInterface />
        </div>
      </div>
    </section>
  );
}

export default Hero;
