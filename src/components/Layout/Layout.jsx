import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                TodoApp
              </Link>
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="nav-link"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="nav-link"
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;