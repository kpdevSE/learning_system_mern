import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, FileText, Calendar, BarChart3, Bot, Eye, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Assessments()
{
    const [filter, setFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [assessments, setAssessments] = useState([]);

    useEffect(() =>
    {
        const fetchAssessments = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/getassessments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setAssessments(response.data.assessments);
                setIsLoading(false);
            } catch (error)
            {
                console.error('Failed to fetch assessments', error);
                setIsLoading(false);
            }
        };

        fetchAssessments();
    }, []);

    // Filter assessments based on selected filter
    const filteredAssessments = assessments.filter(assessment =>
    {
        if (filter === "all") return true;
        return assessment.status === filter;
    });

    // Calculate stats
    const totalAssessments = assessments.length;
    const upcomingCount = assessments.filter(a => a.status === "upcoming").length;
    const pendingCount = assessments.filter(a => a.status === "pending").length;
    const completedCount = assessments.filter(a => a.status === "completed").length;
    const draftCount = assessments.filter(a => a.status === "draft").length;

    // Format date helper
    const formatDate = (dateString) =>
    {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Status badge renderer
    const renderStatusBadge = (status) =>
    {
        switch (status)
        {
            case "completed":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" /> Completed
                    </Badge>
                );
            case "pending":
                return (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <Clock className="w-3 h-3 mr-1" /> Pending
                    </Badge>
                );
            case "upcoming":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <Calendar className="w-3 h-3 mr-1" /> Upcoming
                    </Badge>
                );
            case "draft":
                return (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        <FileText className="w-3 h-3 mr-1" /> Draft
                    </Badge>
                );
            default:
                return null;
        }
    };

    // Type badge renderer
    const renderTypeBadge = (type) =>
    {
        const typeColors = {
            exam: "bg-red-50 text-red-700 border-red-200",
            quiz: "bg-blue-50 text-blue-700 border-blue-200",
            assignment: "bg-green-50 text-green-700 border-green-200",
            project: "bg-purple-50 text-purple-700 border-purple-200"
        };

        return (
            <Badge variant="outline" className={typeColors[type] || "bg-gray-50 text-gray-700"}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
        );
    };

    const [selectedPdf, setSelectedPdf] = useState(null);
    const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);

    // Function to handle PDF viewing
    const handleViewPdf = (assessment) =>
    {
        setSelectedPdf(assessment);
        setIsPdfDialogOpen(true);
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />

            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
                        <p className="text-muted-foreground">Track and manage all your academic assessments</p>
                    </div>
                    <Button>
                        <FileText className="mr-2 h-4 w-4" /> Download Report
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalAssessments}</div>
                            <p className="text-xs text-muted-foreground">All assessments</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{upcomingCount}</div>
                            <p className="text-xs text-muted-foreground">Due soon</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
                            <p className="text-xs text-muted-foreground">Awaiting submission</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                            <p className="text-xs text-muted-foreground">Finished</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Assessment List</CardTitle>
                                <CardDescription>View and manage your assignments, quizzes, and exams</CardDescription>
                                <div className="flex space-x-2 mt-4">
                                    <Button
                                        variant={filter === "all" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("all")}
                                    >
                                        All ({totalAssessments})
                                    </Button>
                                    <Button
                                        variant={filter === "upcoming" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("upcoming")}
                                    >
                                        Upcoming ({upcomingCount})
                                    </Button>
                                    <Button
                                        variant={filter === "pending" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("pending")}
                                    >
                                        Pending ({pendingCount})
                                    </Button>
                                    <Button
                                        variant={filter === "completed" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("completed")}
                                    >
                                        Completed ({completedCount})
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                                            <p className="text-muted-foreground">Loading assessments...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Assessment</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Due Date</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Progress</TableHead>
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredAssessments.map((assessment) => (
                                                    <TableRow key={assessment._id}>
                                                        <TableCell>
                                                            <div className="flex items-center space-x-2">
                                                                <div>
                                                                    <div className="font-medium flex items-center">
                                                                        {assessment.title}
                                                                        {assessment.aiGenerated && (
                                                                            <Bot className="w-4 h-4 ml-2 text-blue-500" title="AI Generated" />
                                                                        )}
                                                                    </div>
                                                                    {assessment.content && (
                                                                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                                            {assessment.content.substring(0, 50)}...
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{renderTypeBadge(assessment.type)}</TableCell>
                                                        <TableCell>{formatDate(assessment.dueDate)}</TableCell>
                                                        <TableCell>{renderStatusBadge(assessment.status)}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center space-x-2">
                                                                <Progress
                                                                    value={assessment.submissionCount && assessment.totalStudents ?
                                                                        (assessment.submissionCount / assessment.totalStudents) * 100 : 0}
                                                                    className="w-16"
                                                                />
                                                                <span className="text-xs text-muted-foreground">
                                                                    {assessment.submissionCount || 0}/{assessment.totalStudents || 0}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center gap-2 justify-end">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleViewPdf(assessment)}
                                                                    disabled={!assessment.pdfFile?.fileUrl}
                                                                >
                                                                    <Eye className="w-4 h-4 mr-1" />
                                                                    View
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {filteredAssessments.length === 0 && !isLoading && (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center py-8">
                                                            <div className="flex flex-col items-center space-y-2">
                                                                <FileText className="w-12 h-12 text-muted-foreground/50" />
                                                                <p className="text-muted-foreground">
                                                                    {filter === "all" ? "No assessments found" : `No ${filter} assessments`}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>

                                        {/* PDF Viewer Dialog */}
                                        <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle className="flex items-center gap-2">
                                                        <FileText className="w-5 h-5" />
                                                        {selectedPdf?.title || 'Assessment PDF'}
                                                    </DialogTitle>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span>File: {selectedPdf?.pdfFile?.fileName}</span>
                                                        <span>Type: {selectedPdf?.type}</span>
                                                        <span>Due: {selectedPdf?.dueDate ? formatDate(selectedPdf.dueDate) : 'N/A'}</span>
                                                    </div>
                                                </DialogHeader>

                                                <div className="py-6">
                                                    <div className="text-center space-y-4">
                                                        <FileText className="w-16 h-16 text-muted-foreground mx-auto" />
                                                        <div>
                                                            <h3 className="font-medium mb-2">PDF Document</h3>
                                                            <p className="text-sm text-muted-foreground mb-4">
                                                                Click the buttons below to view or download the PDF
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-center gap-3">


                                                            <Button

                                                                asChild
                                                            >
                                                                <a
                                                                    href={selectedPdf?.pdfFile?.fileUrl}
                                                                    download={selectedPdf?.pdfFile?.fileName}
                                                                >
                                                                    <Download className="w-4 h-4 mr-2" />
                                                                    Download
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Draft Assessments</span>
                                    <Badge variant="outline">{draftCount}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">AI Generated</span>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                        {assessments.filter(a => a.aiGenerated).length}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Average Score</span>
                                    <Badge variant="outline">
                                        {assessments.length > 0 ?
                                            Math.round(assessments.reduce((acc, a) => acc + (a.averageScore || 0), 0) / assessments.length)
                                            : 0}%
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Resources</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="mr-2 h-4 w-4" /> Study Materials
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Clock className="mr-2 h-4 w-4" /> Past Papers
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <BarChart3 className="mr-2 h-4 w-4" /> Performance Analytics
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}