import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DEMO_BSCI_ID = '12345678';
const DEMO_PASSWORD = 'password123';

const Login = () => {
  const [bsciId, setBsciId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock credentials check
    if (bsciId === DEMO_BSCI_ID && password === DEMO_PASSWORD) {
      const userData = {
        id: bsciId,
        name: 'MTA Admin',
        bsciId: bsciId,
        role: 'admin'
      };
      login('mock-jwt-token-123', userData);
      navigate('/');
    } else {
      setError(`Invalid credentials. Use BSCI ID: ${DEMO_BSCI_ID} / Password: ${DEMO_PASSWORD}`);
    }
    setIsLoading(false);
  };

  // Only allow numbers in BSCI ID field
  const handleBsciIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setBsciId(value);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            MTA Exception Claims Form Processor
          </h2>
          <p className="text-gray-600">
            Sign in to access the exception claims system
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="bsciId" className="block text-sm font-medium text-gray-700">
                BSCI ID
              </label>
              <div className="mt-1">
                <input
                  id="bsciId"
                  name="bsciId"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  value={bsciId}
                  onChange={handleBsciIdChange}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your BSCI ID"
                  autoComplete="username"
                  maxLength={16}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 border border-red-200 rounded-md bg-red-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Demo Credentials</span>
              </div>
            </div>

            <div className="p-4 mt-6 rounded-md bg-gray-50">
              <p className="mb-2 text-sm text-gray-600">
                Use these credentials to sign in:
              </p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">BSCI ID:</span> {DEMO_BSCI_ID}</p>
                <p><span className="font-medium">Password:</span> {DEMO_PASSWORD}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 