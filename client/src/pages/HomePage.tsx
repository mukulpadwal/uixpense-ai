import { CTA, Features, Footer, Hero, NavBar } from "@/components";

function HomePage() {
  return (
    <main className="relative min-h-screen">
      <NavBar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}

export default HomePage;
