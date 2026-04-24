import { Button } from "@/components/ui/button";
import phoneImg from "@/assets/poultry-hub-phone.jpg";

const projects = [
  {
    title: "AI Note Taking App",
    description:
      "is a smart web application that helps users create, organize, and manage notes with AI assistance. It enables real-time editing, summarization, and intelligent search to improve productivity and learning.",
  },
  {
    title: "Wifi Token System",
    description:
      "is a web-based platform that allows users to purchase internet access through tokens. It helps businesses manage network usage, control user access, and provide secure, time-based WiFi connectivity.",
  },
  {
    title: "Rubble Reuse",
    description:
      "is a construction marketplace app that helps people buy and sell reusable building materials. It reduces construction waste, saves costs, and promotes sustainable building by giving materials a second life.",
  },
];

const ProjectCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <article className="bg-background rounded-2xl border-2 border-card-outline p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
    <h3 className="text-lg font-bold text-project-title text-center mb-4">{title}</h3>
    <p className="text-sm text-foreground/80 leading-relaxed flex-1">{description}</p>
    <div className="mt-6">
      <Button size="sm" className="rounded-md px-5">
        View Project
      </Button>
    </div>
  </article>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-14">
          &lt;Projects/&gt;
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <article className="md:col-span-2 bg-background rounded-2xl border-2 border-card-outline p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
            <h3 className="text-lg font-bold text-project-title text-center mb-4">
              Whatsapp-Business call center system
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed flex-1">
              is a web-based platform that helps businesses manage customer conversations through
              WhatsApp. It allows multiple agents to handle chats, organize customer requests, and
              improve communication efficiency from a centralized dashboard.
            </p>
            <div className="mt-6 flex justify-center">
              <Button size="sm" className="rounded-md px-5">
                View Project
              </Button>
            </div>
          </article>

          <div className="flex flex-col items-center justify-center">
            <img
              src={phoneImg}
              alt="Poultry Hub mobile app preview"
              className="w-48 md:w-56 object-contain"
              loading="lazy"
            />
            <Button size="sm" className="rounded-md px-5 mt-4">
              View Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
