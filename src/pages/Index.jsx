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

  const moduleImages = {
    projects: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwcHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
    materials: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwbWF0ZXJpYWxzfGVufDB8fDB8fHww",
    workforce: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww",
    finance: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    equipment: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uc3RydWN0aW9uJTIwZXF1aXBtZW50fGVufDB8fDB8fHww",
    safety: "https://images.unsplash.com/photo-1519753960728-3c8e2d7c5b5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmZXR5JTIwaGFyZCUyMGhhdHxlbnwwfHwwfHx8MA%3D%3D"
  };

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
        {Object.entries(moduleImages).map(([name, image]) => (
          <Link key={name} to={`/${name}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{name.charAt(0).toUpperCase() + name.slice(1)} Management</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-4" />
                <p>View {name} dashboard</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Index;