import { HomeIcon, BarChartIcon, PackageIcon, UsersIcon, DollarSignIcon, TruckIcon, ShieldIcon } from "lucide-react";
import Index from "./pages/Index.jsx";

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
  },
  {
    title: "Materials Management",
    to: "/materials",
    icon: <PackageIcon className="h-4 w-4" />,
  },
  {
    title: "Workforce Management",
    to: "/workforce",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Financial Management",
    to: "/finance",
    icon: <DollarSignIcon className="h-4 w-4" />,
  },
  {
    title: "Equipment Management",
    to: "/equipment",
    icon: <TruckIcon className="h-4 w-4" />,
  },
  {
    title: "Safety & Compliance",
    to: "/safety",
    icon: <ShieldIcon className="h-4 w-4" />,
  },
];