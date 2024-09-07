import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProjectCard = ({ project }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>
        <Progress value={project.progress} className="w-full" />
        <p className="text-sm text-gray-500 mt-2">Progress: {project.progress}%</p>
        <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;