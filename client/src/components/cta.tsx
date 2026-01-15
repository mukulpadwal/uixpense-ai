function CTA() {
  return (
    <section className="py-12 sm:py-32 px-6 flex flex-col items-center justify-center text-center">
      <div className="bg-orange-900/10 opacity-30 absolute top-0 right-0 bottom-0 left-0 blur-3xl" />
      <div className="max-w-7xl px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">
          Ready to master your finances?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href="#"
            className="btn-wrapper"
            style={{
              position: "relative",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: "auto",
              height: "auto",
              padding: "0.8rem 1rem",
              backgroundColor: "rgba(0, 0, 0, 0)",
              userSelect: "none",
            }}
          >
            <div className="line horizontal top" />
            <div className="line vertical right" />
            <div className="line horizontal bottom" />
            <div className="line vertical left" />

            <div className="dot top left" />
            <div className="dot top right" />
            <div className="dot bottom right" />
            <div className="dot bottom left" />

            <button className="btn bg-[#000000] px-8 py-3 cursor-pointer">
              <span className="btn-text mr-2">Start Creating</span>
              <svg
                className="btn-svg w-5 h-5 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
