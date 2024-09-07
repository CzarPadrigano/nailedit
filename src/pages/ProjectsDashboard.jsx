import React, { useState } from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProjectList from "@/components/ProjectList";
import NewProjectForm from "@/components/NewProjectForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { checkProjectFeasibility, createProject } from "@/utils/projectUtils";

const fetchProjectsData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    totalProjects: 10,
    ongoingProjects: 5,
    completedProjects: 3,
    delayedProjects: 2,
    projectsPerformance: [
      { name: 'Project A', progress: 75 },
      { name: 'Project B', progress: 50 },
      { name: 'Project C', progress: 90 },
      { name: 'Project D', progress: 30 },
      { name: 'Project E', progress: 60 },
    ],
    projects: [
      { id: 1, name: "City Center Complex", status: "In Progress", progress: 65, dueDate: "2024-12-31" },
      { id: 2, name: "Riverside Apartments", status: "Planning", progress: 20, dueDate: "2025-06-30" },
      { id: 3, name: "Tech Park Phase II", status: "On Hold", progress: 40, dueDate: "2024-09-15" },
    ],
  };
};

const ProjectsDashboard = () => {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projectsData"],
    queryFn: fetchProjectsData,
  });

  const handleNewProject = async (projectData) => {
    const isFeasible = await checkProjectFeasibility(projectData);
    if (isFeasible) {
      const newProject = await createProject(projectData);
      // In a real application, you would update the server data here
      // For now, we'll just refetch the data to simulate an update
      refetch();
    }
    setIsNewProjectDialogOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects Dashboard</h1>
        <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <NewProjectForm onSubmit={handleNewProject} onCancel={() => setIsNewProjectDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.totalProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.ongoingProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.completedProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delayed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.delayedProjects}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.projectsPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectList projects={data.projects} />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ProjectsDashboard;