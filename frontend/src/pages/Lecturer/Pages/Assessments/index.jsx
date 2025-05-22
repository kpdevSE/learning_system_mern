import { useState, useEffect } from "react";
import axios from "axios";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import
{
    Card, CardContent, CardDescription, CardFooter,
    CardHeader, CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import
{
    Search, Filter, FileText, Clock, Users, BarChart, Plus,
    Calendar, Edit, Eye, Trash, Wand2,
    Upload,
    AlertCircle,
    Download,
    ExternalLink
} from "lucide-react";

import
{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";

import
{
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function AssessmentsPage()
{
    const [assessments, setAssessments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() =>
    {
        const fetchUser = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`http://localhost:5000/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setUser(response.data.data);
                console.log(response.data.data)
            } catch (err)
            {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, []);

    const loggedUser = user.email;
    console.log(loggedUser)

    useEffect(() =>
    {
        const fetchAssessments = async () =>
        {
            try
            {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:5000/api/users/getassessments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
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

    // Handle view assessment
    const handleViewAssessment = (assessment) =>
    {
        setSelectedAssessment(assessment);
        setViewDialogOpen(true);
    };

    // Handle delete assessment
    const handleDeleteAssessment = async (assessmentId) =>
    {
        setIsDeleting(true);
        try
        {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/users/deleteassessment/${assessmentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Remove assessment from state
            setAssessments(prev => prev.filter(assessment => assessment._id !== assessmentId));
            toast.success("Assessment deleted successfully!");
        } catch (error)
        {
            console.error('Failed to delete assessment:', error);
            toast.error(error.response?.data?.message || "Failed to delete assessment");
        } finally
        {
            setIsDeleting(false);
        }
    };

    // Format date helper
    const formatDate = (dateString) =>
    {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Handle PDF download
    const handleDownloadPDF = (assessment) =>
    {
        if (assessment.pdfFile && assessment.pdfFile.fileUrl)
        {
            const downloadUrl = `http://localhost:5000${assessment.pdfFile.fileUrl}`;
            window.open(downloadUrl, '_blank');
        } else
        {
            toast.error("No PDF file available for this assessment");
        }
    };

    const renderAssessmentCards = (filterType) =>
    {
        if (!Array.isArray(assessments)) return null;

        const filtered = filterType
            ? assessments.filter(a => a.type === filterType)
            : assessments;

        if (!filtered) return null;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filtered.map((assessment) => (
                    <Card key={assessment._id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">
                                    {assessment.title}
                                    {assessment.aiGenerated && (
                                        <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
                                            AI Generated
                                        </Badge>
                                    )}
                                </CardTitle>
                                <Badge
                                    variant={assessment.status === "published" ? "default" : "outline"}
                                    className={assessment.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                >
                                    {assessment.status === "published" ? "Published" : "Draft"}
                                </Badge>
                            </div>
                            <CardDescription className="flex items-center mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                Due: {formatDate(assessment.dueDate)}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pb-3">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                                    <div className="flex items-center text-blue-600 mb-1">
                                        <Users className="h-4 w-4 mr-1" />
                                        <span>Submissions</span>
                                    </div>
                                    <p className="text-xl font-semibold">
                                        {assessment.submissionCount || 0}/{assessment.totalStudents || 0}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                    <div className="flex items-center text-green-600 mb-1">
                                        <BarChart className="h-4 w-4 mr-1" />
                                        <span>Average</span>
                                    </div>
                                    <p className="text-xl font-semibold">
                                        {assessment.status === "published" && assessment.submissionCount > 0
                                            ? `${assessment.averageScore || 0}%`
                                            : "N/A"}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
                                    <div className="flex items-center text-purple-600 mb-1">
                                        <FileText className="h-4 w-4 mr-1" />
                                        <span>Type</span>
                                    </div>
                                    <p className="text-xl font-semibold capitalize">
                                        {assessment.type}
                                    </p>
                                </div>
                            </div>

                            {/* Show PDF info if available */}
                            {assessment.pdfFile && (
                                <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FileText className="h-4 w-4 mr-1" />
                                            <span>{assessment.pdfFile.fileName}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDownloadPDF(assessment)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Download className="h-3 w-3 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex justify-between pt-3 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleViewAssessment(assessment)}
                            >
                                <Eye size={14} />
                                View
                            </Button>

                            <div className="flex gap-2">


                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-1"
                                            disabled={isDeleting}
                                        >
                                            <Trash size={14} />
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the assessment
                                                "{assessment.title}" and all associated data.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDeleteAssessment(assessment._id)}
                                                className="bg-red-500 hover:bg-red-600"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    };

    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("manual");
    const [assessmentType, setAssessmentType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [totalMarks, setTotalMarks] = useState(100);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [autoGrading, setAutoGrading] = useState(false);
    const [createdBy, setCreatedBy] = useState(loggedUser);

    const handleFileChange = (e) =>
    {
        const file = e.target.files[0];
        if (file)
        {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("dueDate", dueDate);
            formData.append("description", description);
            formData.append("type", assessmentType);
            formData.append("difficulty", difficulty);
            formData.append("totalMarks", totalMarks.toString());
            formData.append("autoGrading", autoGrading.toString());

            if (selectedFile)
            {
                formData.append("pdfFile", selectedFile);
            }

            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:5000/api/users/uploadassessments",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.status !== 201)
            {
                throw new Error("Failed to create assessment");
            }

            const newAssessment = res.data.assessment;
            setAssessments((prev) => [newAssessment, ...prev]);

            // reset form
            setTitle("");
            setDueDate("");
            setDescription("");
            setAssessmentType("");
            setDifficulty("");
            setTotalMarks(100);
            setAutoGrading(false);
            setSelectedFile(null);
            setOpen(false);

            toast.success("Assessment created successfully!");
        } catch (err)
        {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create assessment");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
                        <p className="text-gray-500 mt-1">Create, manage, and grade student assessments</p>
                    </div>

                    <div className="flex gap-4">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <Plus size={16} />
                                    Create Assessment
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Create Assessment</DialogTitle>
                                    <DialogDescription>
                                        Create a new assessment for your students
                                    </DialogDescription>
                                </DialogHeader>

                                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
                                    <TabsList className="grid grid-cols-2 w-full">
                                        <TabsTrigger value="manual">Manual Creation</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="manual" className="space-y-4 mt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="title">Assessment Title</Label>
                                                <Input
                                                    id="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="Enter assessment title"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="due-date">Due Date</Label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="due-date"
                                                        type="datetime-local"
                                                        className="pl-10"
                                                        value={dueDate}
                                                        onChange={(e) => setDueDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Enter assessment description"
                                                rows={3}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="assessment-type">Assessment Type</Label>
                                                <Select
                                                    value={assessmentType}
                                                    onValueChange={setAssessmentType}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="quiz">Quiz</SelectItem>
                                                        <SelectItem value="exam">Exam</SelectItem>
                                                        <SelectItem value="assignment">Assignment</SelectItem>
                                                        <SelectItem value="project">Project</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="difficulty">Difficulty Level</Label>
                                                <Select
                                                    value={difficulty}
                                                    onValueChange={setDifficulty}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select difficulty" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="beginner">
                                                            <div className="flex items-center">
                                                                Beginner
                                                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                                                    Easy
                                                                </Badge>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="intermediate">
                                                            <div className="flex items-center">
                                                                Intermediate
                                                                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                                                                    Medium
                                                                </Badge>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="pro">
                                                            <div className="flex items-center">
                                                                Pro
                                                                <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                                                                    Hard
                                                                </Badge>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label>Total Marks: {totalMarks}</Label>
                                            </div>
                                            <Slider
                                                value={[totalMarks]}
                                                min={10}
                                                max={200}
                                                step={5}
                                                onValueChange={(value) => setTotalMarks(value[0])}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="file-upload">Upload PDF Content (Optional)</Label>
                                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-gray-50">
                                                <Upload className="h-8 w-8 text-gray-400" />
                                                <p className="text-sm text-gray-500">Drag and drop your PDF file here or click to browse</p>
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    accept=".pdf"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                                <Button variant="outline" onClick={() => document.getElementById('file-upload').click()}>
                                                    Browse Files
                                                </Button>
                                                {selectedFile && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <FileText className="h-4 w-4 text-blue-500" />
                                                        <span className="text-sm">{selectedFile.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="auto-grading"
                                                checked={autoGrading}
                                                onCheckedChange={setAutoGrading}
                                            />
                                            <Label htmlFor="auto-grading" className="flex items-center gap-2">
                                                Enable Auto-Grading
                                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                                    AI Powered
                                                </Badge>
                                            </Label>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <DialogFooter className="flex justify-between mt-6 pt-4 border-t">
                                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!title || !assessmentType || !difficulty}
                                    >
                                        Create Assessment
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search assessments..." className="pl-10" />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        Filter
                    </Button>
                </div>

                <Tabs defaultValue="all" className="mb-6">
                    <TabsList className="grid grid-cols-5 w-full max-w-md">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                        <TabsTrigger value="exams">Exams</TabsTrigger>
                        <TabsTrigger value="assignments">Assignments</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        {renderAssessmentCards()}
                    </TabsContent>

                    <TabsContent value="quizzes" className="mt-6">
                        {renderAssessmentCards("quiz")}
                    </TabsContent>

                    <TabsContent value="exams" className="mt-6">
                        {renderAssessmentCards("exam")}
                    </TabsContent>

                    <TabsContent value="assignments" className="mt-6">
                        {renderAssessmentCards("assignment")}
                    </TabsContent>

                    <TabsContent value="projects" className="mt-6">
                        {renderAssessmentCards("project")}
                    </TabsContent>
                </Tabs>

                {/* View Assessment Dialog */}
                <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                {selectedAssessment?.title}
                            </DialogTitle>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge
                                    variant={selectedAssessment?.status === "published" ? "default" : "outline"}
                                    className={selectedAssessment?.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                >
                                    {selectedAssessment?.status === "published" ? "Published" : "Draft"}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                    {selectedAssessment?.type}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                    {selectedAssessment?.difficulty}
                                </Badge>
                                {selectedAssessment?.aiGenerated && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                        AI Generated
                                    </Badge>
                                )}
                            </div>
                        </DialogHeader>

                        {selectedAssessment && (
                            <div className="space-y-6 mt-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {selectedAssessment.description || "No description provided."}
                                    </p>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">Assessment Details</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Marks:</span>
                                                <span className="font-medium">{selectedAssessment.totalMarks}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Due Date:</span>
                                                <span className="font-medium">{formatDate(selectedAssessment.dueDate)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Auto Grading:</span>
                                                <span className="font-medium">
                                                    {selectedAssessment.autoGrading ? "Enabled" : "Disabled"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Created:</span>
                                                <span className="font-medium">
                                                    {formatDate(selectedAssessment.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">Statistics</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Students:</span>
                                                <span className="font-medium">{selectedAssessment.totalStudents || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Submissions:</span>
                                                <span className="font-medium">{selectedAssessment.submissionCount || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Average Score:</span>
                                                <span className="font-medium">
                                                    {selectedAssessment.averageScore ? `${selectedAssessment.averageScore}%` : "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Completion Rate:</span>
                                                <span className="font-medium">
                                                    {selectedAssessment.totalStudents ?
                                                        `${Math.round((selectedAssessment.submissionCount || 0) / selectedAssessment.totalStudents * 100)}%`
                                                        : "N/A"
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedAssessment.pdfFile && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="font-semibold text-lg mb-3">Attached Files</h3>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                                    <span className="font-medium">{selectedAssessment.pdfFile.fileName}</span>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDownloadPDF(selectedAssessment)}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}