import { toast } from "@/components/ui/use-toast";

export const checkProjectFeasibility = async (project) => {
  // This is a mock function. In a real application, you would make an API call to check feasibility.
  return new Promise((resolve) => {
    setTimeout(() => {
      const isFeasible = Math.random() > 0.3; // 70% chance of being feasible
      if (isFeasible) {
        toast({
          title: "Project Feasible",
          description: "The project has been deemed feasible and has been created.",
        });
      } else {
        toast({
          title: "Project Not Feasible",
          description: "The project has been deemed not feasible. Please review and try again.",
          variant: "destructive",
        });
      }
      resolve(isFeasible);
    }, 2000); // Simulate API delay
  });
};

export const createProject = async (project) => {
  // This is a mock function. In a real application, you would make an API call to create the project.
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject = {
        id: Math.floor(Math.random() * 1000),
        name: project.projectName,
        status: "Planning",
        progress: 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      };
      resolve(newProject);
    }, 1000); // Simulate API delay
  });
};