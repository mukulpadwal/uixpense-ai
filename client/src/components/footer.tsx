function Footer() {
  return (
    <footer className="text-foreground w-full">
      <div
        className="text-center w-full mb-12"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent, black 0%, black 55%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 0%, black 55%, transparent)",
        }}
      >
        <h1 className="text-[12vw] leading-[0.8] select-none font-bold text-stone-800 tracking-tighter mix-blend-screen scale-y-110">
          uiXpense-ai
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
