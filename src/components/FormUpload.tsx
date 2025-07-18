import { useState, useRef } from 'react';
import type { DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'processed' | 'error';
  extractedData?: any;
}

const FormUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or image file (JPEG, PNG, JPG)');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // Simulate form data extraction
      await simulateDataExtraction(file);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateDataExtraction = async (file: File) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock extracted data - in real app, this would come from OCR/API
    const mockData = {
      claimantName: 'John Doe',
      claimNumber: 'CLM-2024-001',
      incidentDate: '2024-01-15',
      incidentLocation: 'Grand Central Terminal',
      description: 'Slipped on wet floor near escalator',
      amount: '$500.00',
      contactInfo: {
        phone: '(555) 123-4567',
        email: 'john.doe@email.com',
        address: '123 Main St, New York, NY 10001'
      }
    };

    setExtractedData(mockData);
  };

  const handleSubmit = () => {
    if (!extractedData) return;

    // Save to localStorage for demo purposes
    // In real app, this would be sent to your backend
    const formData: FormData = {
      id: Date.now().toString(),
      fileName: uploadedFile?.name || 'Unknown',
      uploadDate: new Date().toISOString(),
      status: 'processed',
      extractedData
    };

    const existingData = JSON.parse(localStorage.getItem('mtaForms') || '[]');
    existingData.push(formData);
    localStorage.setItem('mtaForms', JSON.stringify(existingData));

    alert('Form processed successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Upload MTA Exception Form
        </h2>
        <p className="text-gray-600 text-lg">
          Upload your completed form and we'll extract the information automatically
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              isDragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="text-6xl text-gray-400">📄</div>
              <h3 className="text-xl font-semibold text-gray-700">
                Drop your form here
              </h3>
              <p className="text-gray-500">
                or click to browse files
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {uploadedFile && (
            <div className="bg-white p-4 rounded-lg shadow border">
              <h4 className="font-semibold text-gray-800 mb-2">Uploaded File:</h4>
              <p className="text-gray-600">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">
                Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-blue-800">Processing form data...</span>
              </div>
            </div>
          )}
        </div>

        {/* Extracted Data Preview */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Extracted Information
          </h3>
          
          {extractedData ? (
            <div className="bg-white p-6 rounded-lg shadow border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claimant Name</label>
                  <p className="text-gray-900">{extractedData.claimantName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claim Number</label>
                  <p className="text-gray-900">{extractedData.claimNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Incident Date</label>
                  <p className="text-gray-900">{extractedData.incidentDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="text-gray-900">{extractedData.amount}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">{extractedData.incidentLocation}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{extractedData.description}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Contact Information</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <p><span className="font-medium">Phone:</span> {extractedData.contactInfo.phone}</p>
                  <p><span className="font-medium">Email:</span> {extractedData.contactInfo.email}</p>
                  <p><span className="font-medium">Address:</span> {extractedData.contactInfo.address}</p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
              >
                Submit Form Data
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="text-4xl text-gray-400 mb-4">📋</div>
              <p className="text-gray-600">
                Upload a form to see extracted information here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormUpload; 