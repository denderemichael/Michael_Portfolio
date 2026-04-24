const groups = [
  {
    title: "<Front-end/>",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js"],
  },
  {
    title: "<Back-end/>",
    items: ["Node.js", "Express.js", "REST API Development", "MongoDB", "Supabase"],
  },
  {
    title: "<Tools/>",
    items: ["Git & GitHub", "VS Code", "Vercel", "Firebase"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-background border-t-2 border-border py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-14">
          &lt;Core Skills/&gt;
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {groups.map((g) => (
            <div
              key={g.title}
              className="bg-background rounded-2xl border-2 border-card-outline p-8 flex flex-col items-center"
            >
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-semibold mb-8">
                {g.title}
              </span>
              <ul className="space-y-2 text-foreground/85 self-start pl-4 list-disc marker:text-foreground">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
