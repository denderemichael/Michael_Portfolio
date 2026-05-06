import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const { data: projects, refetch } = useProjects();
  const [loading, setLoading] = useState(true);
  
  const [hero, setHero] = useState({ title: "", subtitle: "" });
  const [about, setAbout] = useState({ bio: "" });
  const [newProject, setNewProject] = useState({ 
    title: "", 
    description: "", 
    layout: "standard",
    view_link: "" 
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      } else {
        setSession(session);
        fetchData();
      }
      setLoading(false);
    });
  }, [navigate]);

  const fetchData = async () => {
    try {
      // Fetch Hero Config
      const configRes = await fetch("http://localhost:5000/api/config");
      const configData = await configRes.json();
      setHero({ 
        title: configData.hero_title || "", 
        subtitle: configData.hero_subtitle || "",
        description: configData.hero_description || "" 
      });
      
      // Fetch About content
      const aboutRes = await fetch("http://localhost:5000/api/about");
      const aboutData = await aboutRes.json();
      setAbout({ bio: aboutData.bio || "" });
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleUpdateHero = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "hero_title", value: hero.title }),
    });
    await fetch("http://localhost:5000/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "hero_subtitle", value: hero.subtitle }),
    });
    await fetch("http://localhost:5000/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "hero_description", value: hero.description }),
    });
    toast.success("Hero section updated!");
  };

  const handleUpdateAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    toast.success("About section updated!");
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        toast.success("Project added successfully!");
        setNewProject({ title: "", description: "", layout: "standard", view_link: "" });
        refetch();
      } else {
        toast.error("Failed to add project");
      }
    } catch (err) {
      toast.error("Error connecting to backend");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Project deleted!");
        refetch();
      }
    } catch (err) {
      toast.error("Error deleting project");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center p-10 text-center text-foreground font-medium italic">Loading Dashboard...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">&lt;Admin Dashboard/&gt;</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/'}>View Site</Button>
            <Button variant="destructive" onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>
        
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-card-outline/10 p-1 rounded-xl">
            <TabsTrigger value="projects" className="rounded-lg">Projects</TabsTrigger>
            <TabsTrigger value="hero" className="rounded-lg">Hero Section</TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg">About & Bio</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-2 border-card-outline bg-background/50">
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <Input placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} required />
                    <Input placeholder="Vercel URL" value={newProject.view_link} onChange={(e) => setNewProject({...newProject, view_link: e.target.value})} />
                    <Textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} required />
                    <select className="w-full h-10 px-3 py-2 rounded-md border-2 border-card-outline bg-background" value={newProject.layout} onChange={(e) => setNewProject({...newProject, layout: e.target.value})}>
                      <option value="standard">Standard Grid</option>
                      <option value="featured">Featured (Wide)</option>
                      <option value="mobile">Mobile Preview</option>
                    </select>
                    <Button type="submit" className="w-full">Upload Project</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-2 border-card-outline bg-background/50">
                <CardHeader><CardTitle>Live Projects ({projects?.length || 0})</CardTitle></CardHeader>
                <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                  {projects?.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border-2 border-card-outline/50 rounded-xl bg-background">
                      <h3 className="font-bold truncate mr-2">{project.title}</h3>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <Card className="border-2 border-card-outline bg-background/50 max-w-2xl mx-auto">
              <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateHero} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Main Title</label>
                    <Input placeholder="Main Title" value={hero.title} onChange={(e) => setHero({...hero, title: e.target.value})} className="bg-background border-card-outline" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subtitle</label>
                    <Input placeholder="Subtitle" value={hero.subtitle} onChange={(e) => setHero({...hero, subtitle: e.target.value})} className="bg-background border-card-outline" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hero Description</label>
                    <Textarea placeholder="Hero Description" value={hero.description} onChange={(e) => setHero({...hero, description: e.target.value})} className="bg-background border-card-outline min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
             <Card className="border-2 border-card-outline bg-background/50 max-w-2xl mx-auto">
              <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateAbout} className="space-y-4">
                  <Textarea placeholder="Biography" value={about.bio} onChange={(e) => setAbout({...about, bio: e.target.value})} className="min-h-[200px]" />
                  <Button type="submit" className="w-full">Save Bio</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
