import React from 'react';
import { Upload, Archive, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface DocumentItemProps {
  title: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function DocumentItem({ title, status }: DocumentItemProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
      <span className="text-sm font-medium text-gray-900">{title}</span>
      <div className="flex items-center space-x-4">
        {getStatusBadge()}
        <button className="text-blue-600 hover:text-blue-700">
          <Archive className="w-5 h-5" />
        </button>
        <button className="text-blue-600 hover:text-blue-700">
          <Eye className="w-5 h-5" />
        </button>
        <button className="inline-flex items-center px-3 py-1.5 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50">
          <Upload className="w-4 h-4 mr-1" />
          Upload File
        </button>
      </div>
    </div>
  );
}