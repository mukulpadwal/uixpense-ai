import { HandCoins } from "lucide-react";

function NavBar() {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-linear-to-tr from-orange-500 to-pink-600 flex items-center justify-center text-foreground">
            <HandCoins className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-foreground">
            uiXpense<span className="text-foreground/40">-ai</span>
          </span>
        </div>

        <div className="flex justify-center">
          <a href="/chat">
            <button className="glow-btn cursor-pointer border-none inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 transition-all duration-300 text-sm font-medium tracking-wide rounded-none pt-1 pr-5 pb-1 pl-5 relative items-center justify-center group text-foreground bg-black">
              {/* Glow Effects */}
              <div className="glow-btn-overlay" />
              <div className="glow-btn-radial" />

              <span className="relative z-10 flex items-center gap-2">
                CHAT
              </span>
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
