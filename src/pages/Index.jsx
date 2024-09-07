import Layout from "@/components/Layout";
import ProjectList from "@/components/ProjectList";
import { useQuery } from "@tanstack/react-query";

const fetchProjects = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return [
    { id: 1, name: "City Center Complex", status: "In Progress", progress: 65, dueDate: "2024-12-31" },
    { id: 2, name: "Riverside Apartments", status: "Planning", progress: 20, dueDate: "2025-06-30" },
    { id: 3, name: "Tech Park Phase II", status: "On Hold", progress: 40, dueDate: "2024-09-15" },
  ];
};

const Index = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
      <ProjectList projects={projects} />
    </Layout>
  );
};

export default Index;