"use client"
import * as React from "react"
import { Eye, Calendar, Clock, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    const [viewMode, setViewMode] = useState('list')
    const [pagination, setPagination] = useState({})

    const fetchExams = async (page = 1, limit = 10) =>
    {
        try
        {
            setLoading(true)
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:5000/api/users/getexams', {
                params: { page, limit },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (response.data.success)
            {
                setExams(response.data.data)
                setPagination(response.data.pagination)
                console.log(response.data.data)
            }
        } catch (error)
        {
            console.error('Error fetching exams:', error)
        } finally
        {
            setLoading(false)
        }
    }

    const fetchExamDetails = async (examId) =>
    {
        try
        {
            setLoading(true)
            const response = await axios.get(`http://localhost:5000/api/users/exams/${examId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success)
            {
                setSelectedExam(response.data.data)
                setViewMode('details')
            }
        } catch (error)
        {
            console.error('Error fetching exam details:', error)
        } finally
        {
            setLoading(false)
        }
    }

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
                                <p className="text-gray-600 text-sm">{exam.subject}</p>
                            </div>
                            {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                                {exam.status}
                            </span> */}
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
                                className="flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                View Details
                            </Button>
                        </div>
                    </div>
                ))
            )}

            {pagination.totalPages > 1 && (
                <div className="flex justify-between items-center pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={pagination.currentPage <= 1}
                        onClick={() => fetchExams(pagination.currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={pagination.currentPage >= pagination.totalPages}
                        onClick={() => fetchExams(pagination.currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )

    const ExamDetails = () => (
        <div className="space-y-6">
            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : selectedExam ? (
                <>
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold">{selectedExam.title}</h2>
                                <p className="text-gray-600">{selectedExam.subject}</p>
                            </div>
                            {/* <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedExam.status)}`}>
                                {selectedExam.status}
                            </span> */}
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Duration</p>
                                    <p className="font-medium">{selectedExam.duration} minutes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Total Marks</p>
                                    <p className="font-medium">{selectedExam.totalMarks}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <Calendar className="h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Exam Date</p>
                                    <p className="font-medium">{formatDate(selectedExam.examDate)}</p>
                                </div>
                            </div>
                        </div>

                        {selectedExam.instructions && (
                            <div>
                                <h3 className="font-semibold mb-2">Instructions</h3>
                                <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                                    {selectedExam.instructions}
                                </p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-semibold mb-3">Questions ({selectedExam.essayQuestions?.length || 0})</h3>
                            <div className="space-y-3">
                                {selectedExam.essayQuestions?.map((question, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-medium text-blue-600">
                                                Question {index + 1}
                                            </span>
                                            <span className="text-sm font-medium text-green-600">
                                                {question.marks} marks
                                            </span>
                                        </div>
                                        <p className="text-gray-800">{question.questionText}</p>
                                        {question.instructions && (
                                            <p className="text-sm text-gray-600 mt-2 italic">
                                                {question.instructions}
                                            </p>
                                        )}
                                    </div>
                                )) || <p className="text-gray-500">No questions added yet.</p>}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() =>
                        {
                            setViewMode('list')
                            setSelectedExam(null)
                        }}
                        className="w-full"
                    >
                        ← Back to Exams
                    </Button>
                </>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>Exam not found</p>
                </div>
            )}
        </div>
    )

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    className="w-[100px] mx-auto"
                    onClick={() =>
                    {
                        setViewMode('list')
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
                        <DrawerTitle>
                            {viewMode === 'list' ? 'My Exams' : 'Exam Details'}
                        </DrawerTitle>
                        <DrawerDescription>
                            {viewMode === 'list'
                                ? 'View and manage your created exams'
                                : 'Detailed view of the selected exam'
                            }
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 max-h-96 overflow-y-auto">
                        {viewMode === 'list' ? <ExamList /> : <ExamDetails />}
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}