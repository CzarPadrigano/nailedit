import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";

const fetchDashboardData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    projectsCount: 5,
    materialsLowStock: 3,
    workforceUtilization: 85,
    budgetUtilization: 70,
    equipmentMaintenance: 2,
    safetyIncidents: 0,
  };
};

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const chartData = [
    { name: 'Projects', value: data.projectsCount },
    { name: 'Low Stock', value: data.materialsLowStock },
    { name: 'Workforce %', value: data.workforceUtilization },
    { name: 'Budget %', value: data.budgetUtilization },
    { name: 'Maintenance', value: data.equipmentMaintenance },
    { name: 'Incidents', value: data.safetyIncidents },
  ];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Nailed It!</h1>
      <p className="text-xl text-center mb-8">Your one-stop solution for construction management</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Object.entries(data).map(([key, value]) => (
          <Card key={key} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'projects', image: '/images/projects.jpg' },
          { name: 'materials', image: '/images/materials.jpg' },
          { name: 'workforce', image: '/images/workforce.jpg' },
          { name: 'finance', image: '/images/finance.jpg' },
          { name: 'equipment', image: '/images/equipment.jpg' },
          { name: 'safety', image: '/images/safety.jpg' }
        ].map((module) => (
          <Link key={module.name} to={`/${module.name}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{module.name.charAt(0).toUpperCase() + module.name.slice(1)} Management</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={module.image} alt={module.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <p>View {module.name} dashboard</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Index;