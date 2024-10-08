import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchMaterialsData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    totalMaterials: 500,
    lowStockItems: 15,
    overStockItems: 8,
    pendingOrders: 12,
    materialUsage: [
      { name: 'Cement', usage: 1000 },
      { name: 'Steel', usage: 750 },
      { name: 'Bricks', usage: 5000 },
      { name: 'Sand', usage: 2000 },
      { name: 'Gravel', usage: 1500 },
    ],
    inventory: [
      { id: 1, name: 'Cement', quantity: 500, unit: 'bags', reorderLevel: 100 },
      { id: 2, name: 'Steel', quantity: 1000, unit: 'tons', reorderLevel: 200 },
      { id: 3, name: 'Bricks', quantity: 10000, unit: 'pieces', reorderLevel: 2000 },
      { id: 4, name: 'Sand', quantity: 300, unit: 'cubic meters', reorderLevel: 50 },
      { id: 5, name: 'Gravel', quantity: 250, unit: 'cubic meters', reorderLevel: 40 },
    ],
  };
};

const MaterialsDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["materialsData"],
    queryFn: fetchMaterialsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Materials Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.totalMaterials}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.lowStockItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Over Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.overStockItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.pendingOrders}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Material Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.materialUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Reorder Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default MaterialsDashboard;