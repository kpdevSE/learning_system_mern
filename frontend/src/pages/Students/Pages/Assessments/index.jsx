import { useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, FileText, Calendar, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Assessments()
{
    const [filter, setFilter] = useState("all");

    // Sample assessment data
    const assessments = [
        {
            id: 1,
            title: "Midterm Examination",
            subject: "Mathematics",
            dueDate: "May 5, 2025",
            status: "upcoming",
            type: "exam",
            totalMarks: 100,
            weightage: "30%"
        },
        {
            id: 2,
            title: "Web Development Project",
            subject: "Computer Science",
            dueDate: "May 10, 2025",
            status: "upcoming",
            type: "project",
            totalMarks: 50,
            weightage: "20%"
        },
        {
            id: 3,
            title: "Physics Quiz",
            subject: "Physics",
            dueDate: "Apr 28, 2025",
            status: "pending",
            type: "quiz",
            totalMarks: 20,
            weightage: "10%"
        },
        {
            id: 4,
            title: "Literature Essay",
            subject: "English",
            dueDate: "Apr 15, 2025",
            status: "completed",
            type: "assignment",
            totalMarks: 30,
            marks: 27,
            weightage: "15%"
        },
        {
            id: 5,
            title: "Chemistry Lab Report",
            subject: "Chemistry",
            dueDate: "Apr 10, 2025",
            status: "completed",
            type: "lab",
            totalMarks: 40,
            marks: 35,
            weightage: "15%"
        }
    ];

    // Filter assessments based on selected filter
    const filteredAssessments = filter === "all"
        ? assessments
        : assessments.filter(assessment => assessment.status === filter);

    // Get statistics
    const stats = {
        upcoming: assessments.filter(a => a.status === "upcoming").length,
        pending: assessments.filter(a => a.status === "pending").length,
        completed: assessments.filter(a => a.status === "completed").length,
        total: assessments.length
    };

    const completedAssessments = assessments.filter(a => a.status === "completed");
    const totalScore = completedAssessments.reduce((sum, a) => sum + a.marks, 0);
    const totalPossible = completedAssessments.reduce((sum, a) => sum + a.totalMarks, 0);
    const averageScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

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
            default:
                return null;
        }
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
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.upcoming}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed}</div>
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
                                <div className="flex space-x-2 mt-2">
                                    <Button
                                        variant={filter === "all" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("all")}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        variant={filter === "upcoming" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("upcoming")}
                                    >
                                        Upcoming
                                    </Button>
                                    <Button
                                        variant={filter === "pending" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("pending")}
                                    >
                                        Pending
                                    </Button>
                                    <Button
                                        variant={filter === "completed" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilter("completed")}
                                    >
                                        Completed
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Assessment</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAssessments.map((assessment) => (
                                            <TableRow key={assessment.id}>
                                                <TableCell className="font-medium">{assessment.title}</TableCell>
                                                <TableCell>{assessment.subject}</TableCell>
                                                <TableCell>{assessment.dueDate}</TableCell>
                                                <TableCell>{renderStatusBadge(assessment.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredAssessments.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                                    No assessments found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Deadlines</CardTitle>
                                <CardDescription>Assessments due in the next 7 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {assessments
                                        .filter(a => a.status === "upcoming" || a.status === "pending")
                                        .slice(0, 3)
                                        .map((assessment) => (
                                            <div key={assessment.id} className="flex items-start gap-4 p-3 rounded-lg border">
                                                <div className="bg-primary/10 p-2 rounded-md">
                                                    {assessment.type === "exam" && <FileText className="h-5 w-5 text-primary" />}
                                                    {assessment.type === "quiz" && <AlertCircle className="h-5 w-5 text-primary" />}
                                                    {assessment.type === "project" && <BarChart3 className="h-5 w-5 text-primary" />}
                                                    {assessment.type === "assignment" && <FileText className="h-5 w-5 text-primary" />}
                                                    {assessment.type === "lab" && <FileText className="h-5 w-5 text-primary" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium">{assessment.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{assessment.subject}</p>
                                                        </div>
                                                        <Badge variant="outline">{assessment.type}</Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="text-sm">
                                                            Due: <span className="font-medium">{assessment.dueDate}</span>
                                                        </div>
                                                        <div className="text-sm">
                                                            Weightage: <span className="font-medium">{assessment.weightage}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    {assessments.filter(a => a.status === "upcoming" || a.status === "pending").length === 0 && (
                                        <div className="text-center py-6 text-muted-foreground">
                                            No upcoming deadlines
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">View All Deadlines</Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Overview</CardTitle>
                                <CardDescription>Your assessment scores and statistics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">Average Score</h4>
                                        <span className="text-lg font-bold">{averageScore}%</span>
                                    </div>
                                    <Progress value={averageScore} className="h-2" />
                                </div>

                                {completedAssessments.length > 0 ? (
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-sm">Recent Results</h4>
                                        {completedAssessments.slice(0, 3).map(assessment => (
                                            <div key={assessment.id} className="flex justify-between items-center border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{assessment.title}</p>
                                                    <p className="text-sm text-muted-foreground">{assessment.subject}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">{assessment.marks}/{assessment.totalMarks}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {Math.round((assessment.marks / assessment.totalMarks) * 100)}%
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-muted-foreground">
                                        No completed assessments yet
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">View Detailed Performance</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Subject Distribution</CardTitle>
                                <CardDescription>Assessment breakdown by subject</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[...new Set(assessments.map(a => a.subject))].map(subject =>
                                    {
                                        const subjectAssessments = assessments.filter(a => a.subject === subject);
                                        const completed = subjectAssessments.filter(a => a.status === "completed").length;
                                        const total = subjectAssessments.length;
                                        const percentage = Math.round((completed / total) * 100) || 0;

                                        return (
                                            <div key={subject}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">{subject}</span>
                                                    <span className="text-sm text-muted-foreground">{completed}/{total}</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-slate-200">
                                                    <div
                                                        className="h-2 rounded-full bg-primary"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
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