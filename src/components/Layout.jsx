import { navItems } from "@/nav-items";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Nailed It!</h1>
        </div>
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
      <div className="fixed bottom-4 left-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Layout;