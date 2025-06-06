import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Send, X, Users, MessageSquare, BookOpen } from 'lucide-react';
import axios from 'axios';
import LecturerSidebar from '../../Components/LecturerSidebar';

const EmailPage = () =>
{
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: ''
    });
    const [emailStatus, setEmailStatus] = useState('');

    const tabs = ['All', 'Individual', 'Group', 'Class'];

    const students = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@student.university.edu',
            course: 'Computer Science',
            year: '3rd Year',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@student.university.edu',
            course: 'Software Engineering',
            year: '2nd Year',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@student.university.edu',
            course: 'Computer Science',
            year: '3rd Year',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@student.university.edu',
            course: 'Information Technology',
            year: '1st Year',
            status: 'Active'
        }
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEmailSend = async () =>
    {
        setEmailStatus('sending');

        try
        {
            const emailPayload = {
                to: emailData.to,
                subject: emailData.subject,
                message: emailData.message,
                selectedStudents: selectedStudents
            };

            const token = localStorage.getItem('token')

            const response = await axios.post('http://localhost:5000/api/users/sendemail', emailPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if request was successful
            if (response.status === 200 && response.data.success)
            {
                setEmailStatus('success');
                console.log('Email sent successfully:', response.data);

                setTimeout(() =>
                {
                    setShowEmailModal(false);
                    setEmailStatus('');
                    setEmailData({ to: '', subject: '', message: '' });
                    setSelectedStudents([]);
                }, 2000);
            } else
            {
                setEmailStatus('error');
                console.error('Email sending failed:', response.data.message);
            }
        } catch (error)
        {
            console.error('Email send error:', error);
            setEmailStatus('error');

            // Handle different types of errors
            if (error.response)
            {
                // Server responded with error status
                console.error('Server error:', error.response.data);
            } else if (error.request)
            {
                // Request was made but no response received
                console.error('Network error - no response received');
            } else
            {
                // Something else happened
                console.error('Request setup error:', error.message);
            }
        }
    };

    const openEmailModal = (student = null) =>
    {
        if (student)
        {
            setEmailData({
                to: student.email,
                subject: 'Important Update from Dr. Hashini Chamathka',
                message: `Dear ${student.name},\n\nI hope this email finds you well.\n\n\n\nBest regards,\nDr. Hashini Chamathka\nLecturer\nhashini@gmail.com`
            });
            setSelectedStudents([student]);
        } else
        {
            setEmailData({
                to: '',
                subject: 'Important Update from Dr. Hashini Chamathka',
                message: 'Dear Students,\n\nI hope this email finds you well.\n\n\n\nBest regards,\nDr. Hashini Chamathka\nLecturer\nhashini@gmail.com'
            });
            setSelectedStudents([]);
        }
        setShowEmailModal(true);
    };

    const openGroupEmailModal = () =>
    {
        const allEmails = students.map(student => student.email).join(', ');
        setEmailData({
            to: allEmails,
            subject: 'Class Announcement from Dr. Hashini Chamathka',
            message: 'Dear Students,\n\nI hope this email finds you well.\n\n\n\nBest regards,\nDr. Hashini Chamathka\nLecturer\nhashini@gmail.com'
        });
        setSelectedStudents(students);
        setShowEmailModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <LecturerSidebar />
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Student Communications</h1>
                        <p className="text-gray-600 mt-1">Send emails and communicate with your students</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => openEmailModal()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                            <Mail size={16} />
                            Compose Email
                        </button>
                        <button
                            onClick={openGroupEmailModal}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                        >
                            <Users size={16} />
                            Email All Students
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search students by name, email, or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Users className="text-blue-600" size={20} />
                            <div>
                                <p className="text-sm text-blue-600">Total Students</p>
                                <p className="text-2xl font-semibold text-blue-800">{students.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <BookOpen className="text-green-600" size={20} />
                            <div>
                                <p className="text-sm text-green-600">Active Students</p>
                                <p className="text-2xl font-semibold text-green-800">{students.filter(s => s.status === 'Active').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="text-purple-600" size={20} />
                            <div>
                                <p className="text-sm text-purple-600">Courses</p>
                                <p className="text-2xl font-semibold text-purple-800">{new Set(students.map(s => s.course)).size}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Mail className="text-orange-600" size={20} />
                            <div>
                                <p className="text-sm text-orange-600">Recent Emails</p>
                                <p className="text-2xl font-semibold text-orange-800">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student List */}
            <div className="px-6 py-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Students</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{student.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{student.course}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{student.year}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => openEmailModal(student)}
                                                className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                            >
                                                <Mail size={14} />
                                                Email
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Compose Email</h3>
                            <button
                                onClick={() => setShowEmailModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                <textarea
                                    value={emailData.to}
                                    onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                                    placeholder="recipient@example.com"
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                                {selectedStudents.length > 0 && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {selectedStudents.length} recipient(s) selected
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={emailData.subject}
                                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    value={emailData.message}
                                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                                    rows={8}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            {emailStatus && (
                                <div className={`p-3 rounded-lg text-sm ${emailStatus === 'success' ? 'bg-green-100 text-green-700' :
                                    emailStatus === 'error' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                    {emailStatus === 'sending' && 'Sending email...'}
                                    {emailStatus === 'success' && 'Email sent successfully!'}
                                    {emailStatus === 'error' && 'Failed to send email. Please try again.'}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowEmailModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEmailSend}
                                    disabled={emailStatus === 'sending' || !emailData.to.trim() || !emailData.subject.trim()}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={16} />
                                    Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">HC</span>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">Dr. Hashini Chamathka</div>
                        <div className="text-sm text-gray-600">hashini@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPage;