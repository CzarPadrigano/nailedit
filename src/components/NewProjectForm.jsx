import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const NewProjectForm = ({ onSubmit, onCancel }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName || !projectDescription || !budget) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ projectName, projectDescription, budget: parseFloat(budget) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
      </div>
      <div>
        <Label htmlFor="projectDescription">Project Description</Label>
        <Textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Enter project description"
        />
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter project budget"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
};

export default NewProjectForm;