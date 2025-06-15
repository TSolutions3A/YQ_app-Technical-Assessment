import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 transition ${isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'}`;

  return (
    <div className="w-64 bg-white border-r hidden md:block h-screen fixed">
      <div className="p-4 text-xl font-bold border-b">SaaS App</div>
      <nav className="flex flex-col p-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/reports" className={linkClass}>
          Reports
        </NavLink>
        <NavLink to="/dashboard/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;