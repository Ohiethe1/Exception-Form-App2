import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'processed' | 'error';
  extractedData?: any;
}

const Dashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load forms from localStorage
    const storedForms = JSON.parse(localStorage.getItem('mtaForms') || '[]');
    setForms(storedForms);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Form Dashboard
          </h2>
          <p className="text-gray-600">
            View all processed MTA exception forms
          </p>
        </div>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Upload New Form
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-400 mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No forms processed yet
          </h3>
          <p className="text-gray-500 mb-6">
            Upload your first MTA exception form to get started
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Upload Form
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Processed Forms ({forms.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claimant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {form.fileName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {form.extractedData?.claimantName || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {form.extractedData?.claimNumber || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {form.extractedData?.amount || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(form.uploadDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(form.status)}`}>
                        {form.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          // In a real app, this would open a detailed view
                          alert('View details for: ' + form.fileName);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          // In a real app, this would download the form
                          alert('Download: ' + form.fileName);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {forms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-blue-600">📄</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Total Forms</div>
                <div className="text-2xl font-semibold text-gray-900">{forms.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-green-600">✅</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Processed</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {forms.filter(f => f.status === 'processed').length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl text-yellow-600">💰</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Total Claims</div>
                <div className="text-2xl font-semibold text-gray-900">
                  ${forms.reduce((sum, form) => {
                    const amount = form.extractedData?.amount?.replace(/[^0-9.]/g, '') || '0';
                    return sum + parseFloat(amount);
                  }, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 