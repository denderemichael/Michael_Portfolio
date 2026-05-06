import { Button } from "@/components/ui/button";
import phoneImg from "@/assets/poultry-hub-phone.jpg";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";

const ProjectCard = ({
  title,
  description,
  view_link,
}: Partial<Project>) => (
  <article className="bg-background rounded-2xl border-2 border-card-outline p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
    <h3 className="text-lg font-bold text-project-title text-center mb-4">{title}</h3>
    <p className="text-sm text-foreground/80 leading-relaxed flex-1">{description}</p>
    <div className="mt-6">
      <Button 
        size="sm" 
        className="rounded-md px-5"
        onClick={() => view_link && window.open(view_link, '_blank')}
      >
        View Project
      </Button>
    </div>
  </article>
);

const FeaturedProjectCard = ({
  title,
  description,
  view_link,
}: Partial<Project>) => (
  <article className="md:col-span-2 bg-background rounded-2xl border-2 border-card-outline p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1">
    <h3 className="text-lg font-bold text-project-title text-center mb-4">
      {title}
    </h3>
    <p className="text-sm text-foreground/80 leading-relaxed flex-1">
      {description}
    </p>
    <div className="mt-6 flex justify-center">
      <Button 
        size="sm" 
        className="rounded-md px-5"
        onClick={() => view_link && window.open(view_link, '_blank')}
      >
        View Project
      </Button>
    </div>
  </article>
);

const MobileProjectCard = ({
  image_url,
  view_link,
}: Partial<Project>) => (
  <div className="flex flex-col items-center justify-center">
    <img
      src={image_url || phoneImg}
      alt="Project preview"
      className="w-48 md:w-56 object-contain"
      loading="lazy"
    />
    <Button 
      size="sm" 
      className="rounded-md px-5 mt-4"
      onClick={() => view_link && window.open(view_link, '_blank')}
    >
      View Project
    </Button>
  </div>
);

const ProjectsSection = () => {
  const { data: projects, isLoading, isError } = useProjects();

  console.log("Frontend Projects Data:", projects);

  if (isLoading) {
    return (
      <section id="projects" className="bg-background py-24 px-6 text-center">
        <p className="text-foreground">Loading projects...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="projects" className="bg-background py-24 px-6 text-center">
        <p className="text-destructive">Error loading projects. Please try again later.</p>
      </section>
    );
  }

  const standardProjects = projects?.filter(p => p.layout === 'standard' || !p.layout) || [];
  const featuredProjects = projects?.filter(p => p.layout === 'featured') || [];
  const mobileProjects = projects?.filter(p => p.layout === 'mobile') || [];

  return (
    <section id="projects" className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-14">
          &lt;Projects/&gt;
        </h2>

        {/* Standard Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {standardProjects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>

        {/* Featured and Mobile Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {featuredProjects.map((p) => (
            <FeaturedProjectCard key={p.id} {...p} />
          ))}
          {mobileProjects.map((p) => (
            <MobileProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
