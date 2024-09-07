import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fetchFinanceData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    totalBudget: 10000000,
    spent: 6500000,
    remaining: 3500000,
    overBudget: 0,
    monthlyExpenses: [
      { name: 'Jan', amount: 500000 },
      { name: 'Feb', amount: 750000 },
      { name: 'Mar', amount: 1000000 },
      { name: 'Apr', amount: 1250000 },
      { name: 'May', amount: 1500000 },
      { name: 'Jun', amount: 1500000 },
    ],
  };
};

const FinanceDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["financeData"],
    queryFn: fetchFinanceData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(data.totalBudget / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(data.spent / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(data.remaining / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Over Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(data.overBudget / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default FinanceDashboard;