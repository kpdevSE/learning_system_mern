"use client"
import * as React from "react"
import { Eye, Calendar, Clock, BookOpen, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import
{
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect } from "react"
import axios from "axios"

export default function DrawerComponents()
{
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedExam, setSelectedExam] = useState(null)
    const [detailsLoading, setDetailsLoading] = useState(false)
    const [showExamDetails, setShowExamDetails] = useState(false)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    })

    const fetchExams = async (page = 1, limit = 10) =>
    {
        try
        {
            setLoading(true)
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:5000/api/users/allexamsget', {
                params: { page, limit },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (response.data.success)
            {
                console.log('Available exams:', response.data.data.map(exam => ({
                    id: exam._id,
                    title: exam.title
                })));
                setExams(response.data.data)
                setPagination(response.data.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 0
                })
            } else
            {
                console.error('Failed to fetch exams:', response.data.message)
            }
        } catch (error)
        {
            console.error('Error fetching exams:', error.response?.data || error.message)
        } finally
        {
            setLoading(false)
        }
    }

    const fetchExamDetails = async (examId) =>
    {
        if (!examId)
        {
            console.error('No exam ID provided to fetchExamDetails');
            return;
        }

        try
        {
            setDetailsLoading(true);
            const token = localStorage.getItem('token');

            if (!token)
            {
                console.error('No authentication token found');
                return;
            }

            console.log('Fetching exam details for ID:', examId);
            const response = await axios.get(`http://localhost:5000/api/users/detailsexams/${examId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Exam details response:', response.data);

            if (response.data.success)
            {
                setSelectedExam(response.data.data);
                setShowExamDetails(true);
            } else
            {
                console.error('Failed to fetch exam details:', response.data.message || 'Unknown error');
            }
        } catch (error)
        {
            console.error('Error fetching exam details:', error.response?.data || error.message);
            if (error.response?.status === 401)
            {
                console.error('Authentication failed. Please log in again.');
            } else if (error.response?.status === 404)
            {
                console.error('Exam not found');
            }
        } finally
        {
            setDetailsLoading(false);
        }
    };

    const handleCloseDialog = () =>
    {
        setShowExamDetails(false);
        setSelectedExam(null);
    };

    const formatDate = (dateString) =>
    {
        if (!dateString) return 'Not scheduled'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status) =>
    {
        switch (status)
        {
            case 'published': return 'text-green-600 bg-green-100'
            case 'draft': return 'text-yellow-600 bg-yellow-100'
            case 'archived': return 'text-gray-600 bg-gray-100'
            default: return 'text-blue-600 bg-blue-100'
        }
    }

    const ExamList = () => (
        <div className="space-y-3">
            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : exams.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <BookOpen className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>No exams found</p>
                </div>
            ) : (
                exams.map((exam) => (
                    <div key={exam._id} className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{exam.title}</h3>
                                <p className="text-gray-600 text-sm">ID: {exam._id}</p>
                                <p className="text-gray-600 text-sm">{exam.subject}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{exam.duration} minutes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{exam.totalMarks} marks</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(exam.examDate)}</span>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchExamDetails(exam._id)}
                                disabled={detailsLoading}
                                className="flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                {detailsLoading ? 'Loading...' : 'View Details'}
                            </Button>
                        </div>
                    </div>
                ))
            )}

            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-between items-center pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.currentPage || pagination.currentPage <= 1}
                        onClick={() => fetchExams(pagination.currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                        Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.currentPage || pagination.currentPage >= pagination.totalPages}
                        onClick={() => fetchExams(pagination.currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )

    const ExamDetailsDialog = () => (
        <Dialog open={showExamDetails} onOpenChange={handleCloseDialog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Exam Details</DialogTitle>
                    <DialogDescription>
                        Complete information about the selected exam
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {detailsLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : selectedExam ? (
                        <>
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedExam.title}</h2>
                                        <p className="text-gray-600 text-lg">{selectedExam.subject}</p>
                                        <p className="text-gray-500 text-sm mt-1">ID: {selectedExam._id}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Clock className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Duration</p>
                                            <p className="font-semibold">{selectedExam.duration} minutes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Users className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Total Marks</p>
                                            <p className="font-semibold">{selectedExam.totalMarks}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Calendar className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Exam Date</p>
                                            <p className="font-semibold">{formatDate(selectedExam.examDate)}</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedExam.instructions && (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">Instructions</h3>
                                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                            <p className="text-gray-700 leading-relaxed">
                                                {selectedExam.instructions}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">Questions</h3>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {selectedExam.essayQuestions?.length || 0} Questions
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {selectedExam.essayQuestions?.map((question, index) => (
                                            <div key={index} className="border rounded-lg p-5 bg-white shadow-sm">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        Question {index + 1}
                                                    </span>
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        {question.marks} marks
                                                    </span>
                                                </div>
                                                <p className="text-gray-800 text-base leading-relaxed mb-3">
                                                    {question.questionText}
                                                </p>
                                                {question.instructions && (
                                                    <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r">
                                                        <p className="text-sm text-amber-800 italic">
                                                            <strong>Instructions:</strong> {question.instructions}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )) || (
                                                <div className="text-center py-8 text-gray-500">
                                                    <BookOpen className="mx-auto h-12 w-12 mb-2 opacity-50" />
                                                    <p>No questions added yet.</p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>Exam not found</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        className="w-[100px] mx-auto"
                        onClick={() =>
                        {
                            setSelectedExam(null)
                            fetchExams()
                        }}
                    >
                        Exams
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-2xl">
                        <DrawerHeader>
                            <DrawerTitle>My Exams</DrawerTitle>
                            <DrawerDescription>
                                View and manage your created exams
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0 max-h-96 overflow-y-auto">
                            <ExamList />
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

            <ExamDetailsDialog />
        </>
    )
}