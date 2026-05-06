import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/projects`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};
