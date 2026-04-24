const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-section-blue min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-3xl mx-auto text-center fade-in-up">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          &lt;About Me/&gt;
        </h2>
        <div className="space-y-4 text-foreground/85 text-sm sm:text-base leading-relaxed">
          <p>
            I'm a Full Stack Developer who believes great software starts with understanding
            people. My passion for social interaction fuels how I design and build digital
            products — every project I create focuses on creating a natural conversation between
            a user and a product.
          </p>
          <p>
            I approach development beyond writing code. I study how users think, interact, and
            experience technology, then transform those insights into intuitive, user-friendly
            applications that solve real problems.
          </p>
          <p>
            Working across both frontend and backend allows me to connect design, logic, and
            functionality into one seamless experience. I enjoy building systems that are not
            only technically strong but also human-centered.
          </p>
          <p>
            I am highly adaptive to modern technologies, especially AI driven solutions, and
            continuously explore how artificial intelligence can enhance user interaction,
            automation, and product intelligence.
          </p>
          <p>
            For me, development is more than building applications — it's about creating
            meaningful digital experiences that people enjoy using.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
