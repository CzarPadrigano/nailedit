import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fetchSafetyData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    incidentsFreedays: 365,
    safetyTrainingCompliance: 95,
    openSafetyIssues: 3,
    resolvedSafetyIssues: 27,
    incidentsOverTime: [
      { month: 'Jan', incidents: 2 },
      { month: 'Feb', incidents: 1 },
      { month: 'Mar', incidents: 0 },
      { month: 'Apr', incidents: 1 },
      { month: 'May', incidents: 0 },
      { month: 'Jun', incidents: 0 },
    ],
  };
};

const SafetyDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["safetyData"],
    queryFn: fetchSafetyData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Safety Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Incident-Free Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.incidentsFreedays}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safety Training Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.safetyTrainingCompliance}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Safety Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.openSafetyIssues}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved Safety Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.resolvedSafetyIssues}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Incidents Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.incidentsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="incidents" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SafetyDashboard;