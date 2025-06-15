import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6">
      <div>Welcome back 👋</div>
      <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
    </div>
  );
}
