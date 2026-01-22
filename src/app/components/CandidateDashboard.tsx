import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Clock, CheckCircle, XCircle, LogOut, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock candidate data
  const candidate = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    position: 'Senior Software Engineer',
    applicationDate: '2026-01-10',
    status: 'Under Review',
  };

  const applications = [
    {
      id: 1,
      position: 'Senior Software Engineer',
      department: 'Engineering',
      appliedDate: '2026-01-10',
      status: 'Under Review',
      statusColor: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Veridia</h1>
                <p className="text-sm text-gray-600">Candidate Portal</p>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {candidate.name}!</h2>
          <p className="text-emerald-50">
            Track your application status and manage your profile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.position}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'applications'
                      ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Applications
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Application Status Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">Application Status</h4>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          <Clock className="w-3 h-3 mr-1" />
                          {candidate.status}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Application Submitted</p>
                            <p className="text-sm text-gray-600">{candidate.applicationDate}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Under Review</p>
                            <p className="text-sm text-gray-600">In progress</p>
                          </div>
                          <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-3 opacity-50">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Interview Scheduled</p>
                            <p className="text-sm text-gray-600">Pending</p>
                          </div>
                          <div className="w-5 h-5"></div>
                        </div>
                        <div className="flex items-center gap-3 opacity-50">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Final Decision</p>
                            <p className="text-sm text-gray-600">Pending</p>
                          </div>
                          <div className="w-5 h-5"></div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Summary */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                        Profile Summary
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Position</p>
                          <p className="font-medium text-gray-900">{candidate.position}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Application Date</p>
                          <p className="font-medium text-gray-900">{candidate.applicationDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Status</p>
                          <Badge className="bg-blue-100 text-blue-700 mt-1">{candidate.status}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Next Steps</h4>
                      <p className="text-gray-700 mb-4">
                        Our HR team is currently reviewing your application. You can expect to hear from us within 5-7 business days.
                      </p>
                      <p className="text-sm text-gray-600">
                        In the meantime, feel free to update your profile or check back for any updates to your application status.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'applications' && (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{app.position}</h4>
                            <p className="text-gray-600">{app.department}</p>
                          </div>
                          <Badge className={app.statusColor}>{app.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Applied: {app.appliedDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
