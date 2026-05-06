import { useEffect, useState } from "react";

const AboutSection = () => {
  const [about, setAbout] = useState({
    bio: "I'm a Full Stack Developer who believes great software starts with understanding people. My passion for social interaction fuels how I design and build digital products every project I create focuses on creating a natural conversation between a user and a product.\n\nI approach development beyond writing code. I study how users think, interact, and experience technology, then transform those insights into intuitive, user-friendly applications that solve real problems.\n\nWorking across both frontend and backend allows me to connect design, logic, and functionality into one seamless experience. I enjoy building systems that are not only technically strong but also human-centered.\n\nI am highly adaptive to modern technologies, especially AI driven solutions, and continuously explore how artificial intelligence can enhance user interaction, automation, and product intelligence.\n\nFor me, development is more than building applications it's about creating meaningful digital experiences that people enjoy using."
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.bio) {
          setAbout({ bio: data.bio });
        }
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <section
      id="about"
      className="bg-section-blue min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-3xl mx-auto text-center fade-in-up">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          &lt;About Me/&gt;
        </h2>
        <div className="space-y-4 text-foreground/85 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {about.bio}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
