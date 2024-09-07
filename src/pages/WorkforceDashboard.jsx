import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchWorkforceData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    totalEmployees: 250,
    activeOnSite: 180,
    onLeave: 15,
    unassigned: 55,
    workforceDistribution: [
      { name: 'Laborers', value: 150 },
      { name: 'Engineers', value: 50 },
      { name: 'Managers', value: 30 },
      { name: 'Admin', value: 20 },
    ],
    skilledWorkers: [
      { id: 1, name: 'John Doe', skill: 'Electrician', experience: '10 years', currentProject: 'City Center Complex' },
      { id: 2, name: 'Jane Smith', skill: 'Plumber', experience: '8 years', currentProject: 'Riverside Apartments' },
      { id: 3, name: 'Mike Johnson', skill: 'Carpenter', experience: '12 years', currentProject: 'Tech Park Phase II' },
      { id: 4, name: 'Emily Brown', skill: 'Welder', experience: '6 years', currentProject: 'City Center Complex' },
      { id: 5, name: 'David Lee', skill: 'HVAC Technician', experience: '9 years', currentProject: 'Unassigned' },
    ],
    contractors: [
      { id: 1, name: 'ABC Construction', specialty: 'Concrete Work', ongoingProjects: 2 },
      { id: 2, name: 'XYZ Electrical', specialty: 'Electrical Systems', ongoingProjects: 1 },
      { id: 3, name: 'Best Plumbing Co.', specialty: 'Plumbing', ongoingProjects: 3 },
      { id: 4, name: 'Skyline Roofing', specialty: 'Roofing', ongoingProjects: 1 },
      { id: 5, name: 'Green Landscaping', specialty: 'Landscaping', ongoingProjects: 2 },
    ],
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const WorkforceDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["workforceData"],
    queryFn: fetchWorkforceData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Workforce Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.totalEmployees}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active On-Site</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.activeOnSite}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.onLeave}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unassigned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.unassigned}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Workforce Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.workforceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.workforceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Skilled Workers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Current Project</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.skilledWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>{worker.name}</TableCell>
                  <TableCell>{worker.skill}</TableCell>
                  <TableCell>{worker.experience}</TableCell>
                  <TableCell>{worker.currentProject}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contractors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Ongoing Projects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.contractors.map((contractor) => (
                <TableRow key={contractor.id}>
                  <TableCell>{contractor.name}</TableCell>
                  <TableCell>{contractor.specialty}</TableCell>
                  <TableCell>{contractor.ongoingProjects}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default WorkforceDashboard;