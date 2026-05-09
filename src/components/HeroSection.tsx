import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "";

const HeroSection = () => {
  const [config, setConfig] = useState({
    hero_title: "Michael Dendere",
    hero_subtitle: "Web & Mobile Developer",
    hero_description: "I'm a Full-Stack Developer passionate about building products that create meaningful interactions between businesses and users. I enjoy working across frontend and backend to turn ideas into seamless digital experiences, seeing every feature as a conversation between a product and its buyer. I love combining technology, creativity, and human connection to build solutions that truly communicate.",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/config`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hero_title) {
          setConfig({
            hero_title: data.hero_title,
            hero_subtitle: data.hero_subtitle || config.hero_subtitle,
            hero_description: data.hero_description || config.hero_description,
          });
        }
      })
      .catch((err) => console.error("Error fetching hero config:", err));
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-section-blue flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-3xl w-full text-center fade-in-up">
        <p className="text-base sm:text-lg font-semibold text-foreground mb-3 uppercase tracking-widest">
          {config.hero_subtitle}
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
          {config.hero_title}
        </h1>
        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-10">
          {config.hero_description}
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
