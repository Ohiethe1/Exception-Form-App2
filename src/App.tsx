import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FormUpload from './components/FormUpload';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
<<<<<<< HEAD
=======
import AuditTrail from './components/AuditTrail';
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-8">
                  <FormUpload />
                </main>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-8">
                  <Dashboard />
                </main>
              </div>
            </ProtectedRoute>
          } />
<<<<<<< HEAD
=======
          <Route path="/audit-trail" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-8">
                  <AuditTrail />
                </main>
              </div>
            </ProtectedRoute>
          } />
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
