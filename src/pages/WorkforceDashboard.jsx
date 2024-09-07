import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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
      <Card>
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
    </Layout>
  );
};

export default WorkforceDashboard;