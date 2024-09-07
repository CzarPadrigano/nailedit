import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchEquipmentData = async () => {
  // This is a mock function. In a real application, you would fetch data from an API.
  return {
    totalEquipment: 50,
    inUse: 35,
    underMaintenance: 10,
    idle: 5,
    equipmentUtilization: [
      { name: 'Excavators', utilization: 80 },
      { name: 'Cranes', utilization: 70 },
      { name: 'Bulldozers', utilization: 60 },
      { name: 'Loaders', utilization: 75 },
      { name: 'Trucks', utilization: 85 },
    ],
    equipmentDetails: [
      { id: 1, name: 'Excavator XL2000', status: 'In Use', lastMaintenance: '2023-12-15', nextMaintenance: '2024-03-15' },
      { id: 2, name: 'Crane HC100', status: 'Idle', lastMaintenance: '2024-01-10', nextMaintenance: '2024-04-10' },
      { id: 3, name: 'Bulldozer D9', status: 'Under Maintenance', lastMaintenance: '2024-02-20', nextMaintenance: '2024-05-20' },
      { id: 4, name: 'Loader L120', status: 'In Use', lastMaintenance: '2023-11-30', nextMaintenance: '2024-02-28' },
      { id: 5, name: 'Dump Truck DT400', status: 'In Use', lastMaintenance: '2024-01-25', nextMaintenance: '2024-04-25' },
    ],
  };
};

const EquipmentDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["equipmentData"],
    queryFn: fetchEquipmentData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Equipment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.totalEquipment}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Use</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.inUse}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Under Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.underMaintenance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Idle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.idle}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Equipment Utilization (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.equipmentUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="utilization" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Equipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Next Maintenance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.equipmentDetails.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell>{equipment.name}</TableCell>
                  <TableCell>{equipment.status}</TableCell>
                  <TableCell>{equipment.lastMaintenance}</TableCell>
                  <TableCell>{equipment.nextMaintenance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default EquipmentDashboard;