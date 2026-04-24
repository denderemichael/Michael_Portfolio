import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-section-blue flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-3xl w-full text-center fade-in-up">
        <p className="text-base sm:text-lg font-semibold text-foreground mb-3">
          Web &amp; Mobile Developer
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
          Michael Dendere
        </h1>
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-10">
          I'm a Full-Stack Developer passionate about building products that create meaningful
          interactions between businesses and users. I enjoy working across frontend and backend
          to turn ideas into seamless digital experiences, seeing every feature as a conversation
          between a product and its buyer. I love combining technology, creativity, and human
          connection to build solutions that truly communicate.
        </p>
        <Button
          size="lg"
          onClick={scrollToAbout}
          className="rounded-md px-8 py-6 text-base"
        >
          View My Work
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
