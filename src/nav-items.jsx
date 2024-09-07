import { HomeIcon, BarChartIcon, PackageIcon, UsersIcon, DollarSignIcon, TruckIcon, ShieldIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ProjectsDashboard from "./pages/ProjectsDashboard.jsx";
import MaterialsDashboard from "./pages/MaterialsDashboard.jsx";
import WorkforceDashboard from "./pages/WorkforceDashboard.jsx";
import FinanceDashboard from "./pages/FinanceDashboard.jsx";
import EquipmentDashboard from "./pages/EquipmentDashboard.jsx";
import SafetyDashboard from "./pages/SafetyDashboard.jsx";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Project Management",
    to: "/projects",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <ProjectsDashboard />,
  },
  {
    title: "Materials Management",
    to: "/materials",
    icon: <PackageIcon className="h-4 w-4" />,
    page: <MaterialsDashboard />,
  },
  {
    title: "Workforce Management",
    to: "/workforce",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <WorkforceDashboard />,
  },
  {
    title: "Financial Management",
    to: "/finance",
    icon: <DollarSignIcon className="h-4 w-4" />,
    page: <FinanceDashboard />,
  },
  {
    title: "Equipment Management",
    to: "/equipment",
    icon: <TruckIcon className="h-4 w-4" />,
    page: <EquipmentDashboard />,
  },
  {
    title: "Safety & Compliance",
    to: "/safety",
    icon: <ShieldIcon className="h-4 w-4" />,
    page: <SafetyDashboard />,
  },
];