import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="text-white bg-blue-600 shadow-lg">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">MTA Form Processor</h1>
            <span className="text-sm text-blue-200">Exception Claims</span>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="transition-colors duration-200 hover:text-blue-200"
              >
                Upload Form
              </Link>
              <Link 
                to="/dashboard" 
                className="transition-colors duration-200 hover:text-blue-200"
              >
                Dashboard
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <span className="text-blue-200 text-sm">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 