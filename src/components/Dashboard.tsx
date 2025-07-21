import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'processed' | 'error';
  extractedData?: any;
  // Add all the Exception Claim Form fields
  passNumber?: string;
  title?: string;
  employeeName?: string;
  rdos?: string;
  actualOTDate?: string;
  div?: string;
  exceptionCode?: string;
  location?: string;
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
}

const Dashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleViewForm = (form: FormData) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  // Calculate total overtime hours
  const calculateTotalOvertime = () => {
    const processedForms = forms.filter(form => form.status === 'processed');
    let totalHours = 0;
    let totalMinutes = 0;

    processedForms.forEach(form => {
      const hours = parseInt(form.overtimeHH || '0');
      const minutes = parseInt(form.overtimeMM || '0');
      totalHours += hours;
      totalMinutes += minutes;
    });

    // Convert excess minutes to hours
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return { hours: totalHours, minutes: totalMinutes };
  };

  // Calculate total unique job numbers
  const calculateTotalJobNumbers = () => {
    const processedForms = forms.filter(form => form.status === 'processed');
    const uniqueJobNumbers = new Set();
    
    processedForms.forEach(form => {
      if (form.taJobNo) {
        uniqueJobNumbers.add(form.taJobNo);
      }
    });

    return uniqueJobNumbers.size;
  };

  // Calculate total job numbers (including duplicates)
  const calculateTotalJobNumbersCount = () => {
    const processedForms = forms.filter(form => form.status === 'processed');
    return processedForms.filter(form => form.taJobNo).length;
  };

  // Find most relevant job position
  const findMostRelevantJobPosition = () => {
    const processedForms = forms.filter(form => form.status === 'processed');
    const jobPositionCounts: { [key: string]: number } = {};
    
    processedForms.forEach(form => {
      if (form.title) {
        jobPositionCounts[form.title] = (jobPositionCounts[form.title] || 0) + 1;
      }
    });

    if (Object.keys(jobPositionCounts).length === 0) {
      return { position: 'N/A', count: 0 };
    }

    const mostRelevant = Object.entries(jobPositionCounts).reduce((a, b) => 
      jobPositionCounts[a[0]] > jobPositionCounts[b[0]] ? a : b
    );

    return { position: mostRelevant[0], count: mostRelevant[1] };
  };

  // Find most relevant location
  const findMostRelevantLocation = () => {
    const processedForms = forms.filter(form => form.status === 'processed');
    const locationCounts: { [key: string]: number } = {};
    
    processedForms.forEach(form => {
      if (form.location) {
        locationCounts[form.location] = (locationCounts[form.location] || 0) + 1;
      }
    });

    if (Object.keys(locationCounts).length === 0) {
      return { location: 'N/A', count: 0 };
    }

    const mostRelevant = Object.entries(locationCounts).reduce((a, b) => 
      locationCounts[a[0]] > locationCounts[b[0]] ? a : b
    );

    return { location: mostRelevant[0], count: mostRelevant[1] };
  };

  const totalOvertime = calculateTotalOvertime();
  const totalJobNumbers = calculateTotalJobNumbers();
  const totalJobNumbersCount = calculateTotalJobNumbersCount();
  const mostRelevantJob = findMostRelevantJobPosition();
  const mostRelevantLocation = findMostRelevantLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">MTA Forms Dashboard</h1>
      </div>

      {/* Tracker Section */}
      {forms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Total Forms</div>
                <div className="text-2xl font-bold text-gray-900">{forms.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Total Overtime</div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalOvertime.hours}h {totalOvertime.minutes}m
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Total Job Numbers</div>
                <div className="text-2xl font-bold text-gray-900">{totalJobNumbersCount}</div>
                <div className="text-xs text-gray-400 font-medium mt-1">
                  {totalJobNumbers} unique
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Most Relevant Position</div>
                <div className="text-lg font-bold text-gray-900 truncate">
                  {mostRelevantJob.position}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">
                  {mostRelevantJob.count} forms
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Most Relevant Location</div>
                <div className="text-lg font-bold text-gray-900 truncate">
                  {mostRelevantLocation.location}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">
                  {mostRelevantLocation.count} forms
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {forms.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No forms uploaded yet</h3>
          <p className="text-gray-500 mb-8 text-lg">Upload your first exception claim form to get started</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg"
          >
            Upload Form
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">Uploaded Forms ({forms.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{form.fileName}</div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{formatDate(form.uploadDate)}</div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(form.status)}`}>
                        {form.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewForm(form)}
                        className="text-blue-600 hover:text-blue-900 font-semibold transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed View Modal */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Form Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">File Name</label>
                      <p className="text-gray-900">{selectedForm.fileName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Upload Date</label>
                      <p className="text-gray-900">{formatDate(selectedForm.uploadDate)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedForm.status)}`}>
                        {selectedForm.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Employee Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">Employee Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Pass Number</label>
                      <p className="text-gray-900">{selectedForm.passNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Title</label>
                      <p className="text-gray-900">{selectedForm.title || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Employee Name</label>
                      <p className="text-gray-900">{selectedForm.employeeName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">RDOS</label>
                      <p className="text-gray-900">{selectedForm.rdos || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Job Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">Job Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Actual OT Date</label>
                      <p className="text-gray-900">{selectedForm.actualOTDate || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">DIV</label>
                      <p className="text-gray-900">{selectedForm.div || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Exception Code</label>
                      <p className="text-gray-900">{selectedForm.exceptionCode || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Location</label>
                      <p className="text-gray-900">{selectedForm.location || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Run No</label>
                      <p className="text-gray-900">{selectedForm.runNo || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Time Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">Time Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Exception Time From</label>
                      <p className="text-gray-900">
                        {selectedForm.exceptionTimeFromHH && selectedForm.exceptionTimeFromMM 
                          ? `${selectedForm.exceptionTimeFromHH}:${selectedForm.exceptionTimeFromMM}`
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Exception Time To</label>
                      <p className="text-gray-900">
                        {selectedForm.exceptionTimeToHH && selectedForm.exceptionTimeToMM 
                          ? `${selectedForm.exceptionTimeToHH}:${selectedForm.exceptionTimeToMM}`
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Overtime</label>
                      <p className="text-gray-900">
                        {selectedForm.overtimeHH && selectedForm.overtimeMM 
                          ? `${selectedForm.overtimeHH}:${selectedForm.overtimeMM}`
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Bonus</label>
                      <p className="text-gray-900">
                        {selectedForm.bonusHH && selectedForm.bonusMM 
                          ? `${selectedForm.bonusHH}:${selectedForm.bonusMM}`
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Nite Diff</label>
                      <p className="text-gray-900">
                        {selectedForm.niteDiffHH && selectedForm.niteDiffMM 
                          ? `${selectedForm.niteDiffHH}:${selectedForm.niteDiffMM}`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">Additional Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">TA Job No</label>
                      <p className="text-gray-900">{selectedForm.taJobNo || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">OTO</label>
                      <p className="text-gray-900">{selectedForm.oto || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">OTO Amount Saved</label>
                      <p className="text-gray-900">{selectedForm.otoAmountSaved || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Entered in UTS</label>
                      <p className="text-gray-900">{selectedForm.enteredInUTS || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Supervisor Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">Supervisor Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Supervisor Name</label>
                      <p className="text-gray-900">{selectedForm.supervisorName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Supervisor Pass No</label>
                      <p className="text-gray-900">{selectedForm.supervisorPassNo || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {selectedForm.comments && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 text-lg border-b pb-2 mb-3">Comments</h4>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedForm.comments}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 