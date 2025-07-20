import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'processed' | 'error';
  extractedData?: any;
<<<<<<< HEAD
=======
  // Add all the Exception Claim Form fields
  passNumber?: string;
  title?: string;
  employeeName?: string;
  rdos?: string;
  actualOTDate?: string;
  div?: string;
  jobIdentification?: string;
  runNo?: string;
  exceptionTimeFromHH?: string;
  exceptionTimeFromMM?: string;
  exceptionTimeToHH?: string;
  exceptionTimeToMM?: string;
  overtimeHH?: string;
  overtimeMM?: string;
  bonusHH?: string;
  bonusMM?: string;
  niteDiffHH?: string;
  niteDiffMM?: string;
  taJobNo?: string;
  oto?: string;
  otoAmountSaved?: string;
  enteredInUTS?: string;
  comments?: string;
  supervisorName?: string;
  supervisorPassNo?: string;
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
}

const Dashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)

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

<<<<<<< HEAD
=======
  const handleViewForm = (form: FormData) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
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
<<<<<<< HEAD
                    Claimant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
=======
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pass Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TA Job No.
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
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
<<<<<<< HEAD
                        {form.extractedData?.claimantName || 'N/A'}
=======
                        {form.employeeName || 'N/A'}
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
<<<<<<< HEAD
                        {form.extractedData?.claimNumber || 'N/A'}
=======
                        {form.passNumber || 'N/A'}
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
<<<<<<< HEAD
                        {form.extractedData?.amount || 'N/A'}
=======
                        {form.taJobNo || 'N/A'}
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
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
<<<<<<< HEAD
                        onClick={() => {
                          // In a real app, this would open a detailed view
                          alert('View details for: ' + form.fileName);
                        }}
=======
                        onClick={() => handleViewForm(form)}
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
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
<<<<<<< HEAD
                <div className="text-2xl text-yellow-600">💰</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Total Claims</div>
                <div className="text-2xl font-semibold text-gray-900">
                  ${forms.reduce((sum, form) => {
                    const amount = form.extractedData?.amount?.replace(/[^0-9.]/g, '') || '0';
                    return sum + parseFloat(amount);
                  }, 0).toLocaleString()}
=======
                <div className="text-2xl text-yellow-600">⏳</div>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Pending</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {forms.filter(f => f.status === 'pending').length}
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

      {/* Detailed View Modal */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Form Details</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mt-1">File: {selectedForm.fileName}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Employee Information */}
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-3 border-b pb-1">Employee Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pass Number</label>
                    <p className="text-gray-900">{selectedForm.passNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-gray-900">{selectedForm.title || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                    <p className="text-gray-900">{selectedForm.employeeName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">RDOS</label>
                    <p className="text-gray-900">{selectedForm.rdos || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Actual OT Date</label>
                    <p className="text-gray-900">{selectedForm.actualOTDate || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">DIV</label>
                    <p className="text-gray-900">{selectedForm.div || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-3 border-b pb-1">Job Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Job Identification</label>
                    <p className="text-gray-900">{selectedForm.jobIdentification || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Run No.</label>
                    <p className="text-gray-900">{selectedForm.runNo || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">TA Job No.</label>
                    <p className="text-gray-900">{selectedForm.taJobNo || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Time & Pay Information */}
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-3 border-b pb-1">Time & Pay Information</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Exception From</label>
                    <p className="text-gray-900">{selectedForm.exceptionTimeFromHH || 'N/A'}:{selectedForm.exceptionTimeFromMM || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Exception To</label>
                    <p className="text-gray-900">{selectedForm.exceptionTimeToHH || 'N/A'}:{selectedForm.exceptionTimeToMM || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Overtime</label>
                    <p className="text-gray-900">{selectedForm.overtimeHH || 'N/A'}:{selectedForm.overtimeMM || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bonus</label>
                    <p className="text-gray-900">{selectedForm.bonusHH || 'N/A'}:{selectedForm.bonusMM || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nite Diff</label>
                    <p className="text-gray-900">{selectedForm.niteDiffHH || 'N/A'}:{selectedForm.niteDiffMM || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* OTO & UTS */}
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-3 border-b pb-1">OTO & UTS</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OTO?</label>
                    <p className="text-gray-900">{selectedForm.oto || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OTO Amount Saved</label>
                    <p className="text-gray-900">{selectedForm.otoAmountSaved || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Entered in UTS?</label>
                    <p className="text-gray-900">{selectedForm.enteredInUTS || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Comments & Supervisor */}
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-3 border-b pb-1">Comments & Supervisor</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comments</label>
                    <p className="text-gray-900">{selectedForm.comments || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Supervisor Name</label>
                      <p className="text-gray-900">{selectedForm.supervisorName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Supervisor Pass No.</label>
                      <p className="text-gray-900">{selectedForm.supervisorPassNo || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
>>>>>>> 3857917 (Initial commit: MTA Form Processor with updated logo styling)
    </div>
  );
};

export default Dashboard; 