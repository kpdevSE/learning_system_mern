import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PlusCircle, Eye, Edit, Trash2, BookOpen, Users, CheckCircle } from 'lucide-react';
import AdminSidebar from '@/pages/Admin/Components/AdminSidebar';
import LecturerSidebar from '../../Components/LecturerSidebar';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export default function ExamManagementSystem() 
{
    const [exams, setExams] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [currentExam, setCurrentExam] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Create Exam Dialog State
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [examTitle, setExamTitle] = useState('');
    const [examDescription, setExamDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
    });

    // View Exam Dialog State
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    // Marking Dialog State
    const [markingDialogOpen, setMarkingDialogOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // Fetch exams on component mount
    useEffect(() =>
    {
        fetchExams();
    }, []);

    // Fetch exams
    const fetchExams = async () =>
    {
        try
        {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/getallexams`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExams(response.data.data || []);
            setError(null);
        } catch (err)
        {
            console.error('Error fetching exams:', err);
            setError(err.response?.data?.message || 'Failed to fetch exams');
            toast.error(err.response?.data?.message || 'Failed to fetch exams');
        } finally
        {
            setLoading(false);
        }
    };

    // Add Question to Exam
    const addQuestion = () =>
    {
        if (currentQuestion.question.trim())
        {
            setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
            setCurrentQuestion({
                question: '',
                type: 'multiple-choice',
                options: ['', '', '', ''],
                correctAnswer: 0,
                points: 1
            });
        }
    };

    // Create Exam
    const createExam = async () =>
    {
        if (examTitle.trim() && questions.length > 0)
        {
            try
            {
                setLoading(true);
                const token = localStorage.getItem('token');
                const examData = {
                    title: examTitle,
                    description: examDescription,
                    questions: questions,
                    course: "65f1a2b3c4d5e6f7g8h9i0j1", // Replace with actual course ID
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + 7200000).toISOString(),
                    duration: 120
                };

                const response = await axios.post(`${API_URL}/saveexams`, examData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (response.data.success)
                {
                    setExams([...exams, response.data.data]);
                    // Reset form
                    setExamTitle('');
                    setExamDescription('');
                    setQuestions([]);
                    setCreateDialogOpen(false);
                    toast.success('Exam created successfully');
                } else
                {
                    throw new Error(response.data.message || 'Failed to create exam');
                }
            } catch (err)
            {
                console.error('Error creating exam:', err);
                toast.error(err.response?.data?.message || err.message || 'Failed to create exam');
            } finally
            {
                setLoading(false);
            }
        }
    };

    // Mark Submission
    const markSubmission = (submissionId, score) =>
    {
        setSubmissions(submissions.map(sub =>
            sub.id === submissionId
                ? { ...sub, score: score, status: 'graded' }
                : sub
        ));
        setMarkingDialogOpen(false);
    };

    // Auto-calculate score for multiple choice
    const calculateAutoScore = (submission) =>
    {
        const exam = exams.find(e => e.id === submission.examId);
        if (!exam) return 0;

        let score = 0;
        exam.questions.forEach((question, index) =>
        {
            if (question.type === 'multiple-choice')
            {
                if (parseInt(submission.answers[index]) === question.correctAnswer)
                {
                    score += question.points;
                }
            }
        });
        return score;
    };

    // Delete Exam
    const handleDeleteExam = async (examId) =>
    {
        if (window.confirm('Are you sure you want to delete this exam?'))
        {
            try
            {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${API_URL}/deleteexams`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { examId } // Send examId in request body
                });

                if (response.data.success)
                {
                    setExams(exams.filter(exam => exam._id !== examId));
                    toast.success('Exam deleted successfully');
                } else
                {
                    throw new Error(response.data.message || 'Failed to delete exam');
                }
            } catch (err)
            {
                console.error('Error deleting exam:', err);
                toast.error(err.response?.data?.message || err.message || 'Failed to delete exam');
            } finally
            {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <LecturerSidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Exam Management System</h1>
                            <p className="mt-2 text-gray-600">Create and manage exams for your students</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
                                Loading...
                            </div>
                        )}

                        <Tabs defaultValue="exams" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="exams" className="text-base">Exams</TabsTrigger>
                                <TabsTrigger value="submissions" className="text-base">Submissions</TabsTrigger>
                            </TabsList>

                            {/* Exams Tab */}
                            <TabsContent value="exams" className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold text-gray-900">Available Exams</h2>
                                    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button >
                                                <PlusCircle className="w-5 h-5 mr-2" />
                                                Create New Exam
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">Create New Exam</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-6 py-4">
                                                <div className="grid grid-cols-1 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="title" className="text-base">Exam Title</Label>
                                                        <Input
                                                            id="title"
                                                            value={examTitle}
                                                            onChange={(e) => setExamTitle(e.target.value)}
                                                            placeholder="Enter exam title"
                                                            className="h-11"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="description" className="text-base">Description</Label>
                                                        <Textarea
                                                            id="description"
                                                            value={examDescription}
                                                            onChange={(e) => setExamDescription(e.target.value)}
                                                            placeholder="Enter exam description"
                                                            className="min-h-[100px]"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Add Question Section */}
                                                <div className="border rounded-lg p-6 space-y-6 bg-gray-50">
                                                    <h3 className="text-lg font-semibold">Add Question</h3>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label className="text-base">Question</Label>
                                                            <Textarea
                                                                value={currentQuestion.question}
                                                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                                                                placeholder="Enter your question"
                                                                className="min-h-[80px]"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <Label className="text-base">Question Type</Label>
                                                                <select
                                                                    className="w-full p-2.5 border rounded-md bg-white"
                                                                    value={currentQuestion.type}
                                                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
                                                                >
                                                                    <option value="multiple-choice">Multiple Choice</option>
                                                                    <option value="essay">Essay</option>
                                                                    <option value="short-answer">Short Answer</option>
                                                                </select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-base">Points</Label>
                                                                <Input
                                                                    type="number"
                                                                    value={currentQuestion.points}
                                                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 1 })}
                                                                    min="1"
                                                                    className="h-11"
                                                                />
                                                            </div>
                                                        </div>

                                                        {currentQuestion.type === 'multiple-choice' && (
                                                            <div className="space-y-4">
                                                                <Label className="text-base">Options</Label>
                                                                {currentQuestion.options.map((option, index) => (
                                                                    <div key={index} className="flex items-center gap-3">
                                                                        <Input
                                                                            value={option}
                                                                            onChange={(e) =>
                                                                            {
                                                                                const newOptions = [...currentQuestion.options];
                                                                                newOptions[index] = e.target.value;
                                                                                setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                                                            }}
                                                                            placeholder={`Option ${index + 1}`}
                                                                            className="h-11"
                                                                        />
                                                                        <div className="flex items-center gap-2">
                                                                            <input
                                                                                type="radio"
                                                                                name="correct"
                                                                                checked={currentQuestion.correctAnswer === index}
                                                                                onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                                                                                className="w-4 h-4"
                                                                            />
                                                                            <Label className="text-sm text-gray-600">Correct</Label>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <Button
                                                            onClick={addQuestion}
                                                            variant="outline"
                                                            className="w-full h-11"
                                                        >
                                                            Add Question
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Questions List */}
                                                {questions.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-lg font-semibold">Questions ({questions.length})</h3>
                                                        <div className="space-y-3">
                                                            {questions.map((q, index) => (
                                                                <Card key={q.id} className="p-4 hover:shadow-md transition-shadow">
                                                                    <div className="flex justify-between items-start">
                                                                        <div className="space-y-2">
                                                                            <p className="font-medium text-gray-900">Q{index + 1}: {q.question}</p>
                                                                            <div className="flex gap-2">
                                                                                <Badge variant="secondary">{q.type}</Badge>
                                                                                <Badge variant="outline">{q.points} pts</Badge>
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => setQuestions(questions.filter(qu => qu.id !== q.id))}
                                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </Button>
                                                                    </div>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <DialogFooter className="gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setCreateDialogOpen(false)}
                                                    className="h-11"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={createExam}
                                                    disabled={!examTitle.trim() || questions.length === 0}
                                                    className="h-11 bg-blue-600 hover:bg-blue-700"
                                                >
                                                    Create Exam
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {exams.map((exam) => (
                                        <Card key={exam._id} className="hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-xl">
                                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                                    {exam.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <p className="text-gray-600">{exam.description}</p>
                                                <div className="flex justify-between text-sm text-gray-500">
                                                    <span>{exam.questions.length} questions</span>
                                                    <span>{exam.totalPoints} points</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Dialog open={viewDialogOpen && currentExam?._id === exam._id} onOpenChange={setViewDialogOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setCurrentExam(exam)}
                                                                className="w-full"
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Exam
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-2xl">{exam.title}</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="space-y-6 py-4">
                                                                <p className="text-gray-600">{exam.description}</p>
                                                                <div className="space-y-4">
                                                                    {exam.questions.map((question, index) => (
                                                                        <Card key={question.id} className="p-4">
                                                                            <div className="space-y-3">
                                                                                <div className="flex justify-between items-start">
                                                                                    <p className="font-medium text-gray-900">Q{index + 1}: {question.question}</p>
                                                                                    <Badge className="ml-2">{question.points} pts</Badge>
                                                                                </div>
                                                                                {question.type === 'multiple-choice' && (
                                                                                    <div className="ml-4 space-y-2">
                                                                                        {question.options.map((option, optIndex) => (
                                                                                            <div key={optIndex} className="flex items-center gap-2">
                                                                                                <div className={`w-3 h-3 rounded-full border-2 ${question.correctAnswer === optIndex
                                                                                                    ? 'bg-green-500 border-green-500'
                                                                                                    : 'border-gray-300'
                                                                                                    }`} />
                                                                                                <span className={question.correctAnswer === optIndex ? 'text-green-600 font-medium' : 'text-gray-600'}>
                                                                                                    {option}
                                                                                                </span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </Card>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteExam(exam._id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Submissions Tab */}
                            <TabsContent value="submissions" className="space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Student Submissions</h2>
                                <div className="grid gap-4">
                                    {submissions.map((submission) =>
                                    {
                                        const exam = exams.find(e => e.id === submission.examId);
                                        return (
                                            <Card key={submission.id} className="hover:shadow-md transition-shadow">
                                                <CardContent className="p-6">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-2">
                                                            <h3 className="font-semibold text-lg">{submission.studentName}</h3>
                                                            <p className="text-gray-600">{exam?.title}</p>
                                                            <div className="flex gap-2">
                                                                <Badge variant={submission.status === 'graded' ? 'default' : 'secondary'}>
                                                                    {submission.status}
                                                                </Badge>
                                                                {submission.score !== null && (
                                                                    <Badge variant="outline">
                                                                        {submission.score}/{submission.totalPoints} points
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-500">Submitted: {submission.submittedAt}</p>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                            {
                                                                setSelectedSubmission(submission);
                                                                setMarkingDialogOpen(true);
                                                            }}
                                                            className="h-9"
                                                        >
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            {submission.status === 'graded' ? 'Edit Grade' : 'Grade'}
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Marking Dialog */}
                        <Dialog open={markingDialogOpen} onOpenChange={setMarkingDialogOpen}>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">Grade Submission</DialogTitle>
                                </DialogHeader>
                                {selectedSubmission && (
                                    <div className="space-y-6 py-4">
                                        <div className="flex justify-between items-center">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">{selectedSubmission.studentName}</h3>
                                                <p className="text-sm text-gray-500">Total Points: {selectedSubmission.totalPoints}</p>
                                            </div>
                                            <Badge variant="outline" className="text-base">
                                                {selectedSubmission.status}
                                            </Badge>
                                        </div>

                                        {(() =>
                                        {
                                            const exam = exams.find(e => e.id === selectedSubmission.examId);
                                            const autoScore = calculateAutoScore(selectedSubmission);
                                            return (
                                                <div className="space-y-4">
                                                    <p className="text-sm text-gray-600">Auto-calculated score: {autoScore} points</p>
                                                    <div className="flex gap-3">
                                                        <Button
                                                            onClick={() => markSubmission(selectedSubmission.id, autoScore)}
                                                            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            Accept Auto Grade ({autoScore} pts)
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => markSubmission(selectedSubmission.id, selectedSubmission.totalPoints)}
                                                            className="flex-1 h-11"
                                                        >
                                                            Full Marks ({selectedSubmission.totalPoints} pts)
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

