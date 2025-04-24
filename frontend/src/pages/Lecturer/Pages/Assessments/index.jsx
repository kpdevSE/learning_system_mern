import { useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileText, Clock, Users, BarChart, Plus, Calendar, Edit, Eye, Trash } from "lucide-react";

export default function AssessmentsPage()
{
    // Sample assessment data (you would fetch this from your backend)
    const assessments = [
        {
            id: 1,
            title: "Midterm Exam: Computer Science Fundamentals",
            type: "exam",
            status: "published",
            dueDate: "May 5, 2025",
            submissionCount: 42,
            totalStudents: 50,
            averageScore: 78
        },
        {
            id: 2,
            title: "Weekly Quiz: Data Structures",
            type: "quiz",
            status: "draft",
            dueDate: "April 28, 2025",
            submissionCount: 0,
            totalStudents: 50,
            averageScore: 0
        },
        {
            id: 3,
            title: "Programming Assignment: Algorithms",
            type: "assignment",
            status: "published",
            dueDate: "May 10, 2025",
            submissionCount: 23,
            totalStudents: 50,
            averageScore: 82
        },
        {
            id: 4,
            title: "Final Project: Web Application Development",
            type: "project",
            status: "published",
            dueDate: "June 15, 2025",
            submissionCount: 5,
            totalStudents: 50,
            averageScore: 90
        }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
                        <p className="text-gray-500 mt-1">Create, manage, and grade student assessments</p>
                    </div>

                    <Button className="flex items-center gap-2">
                        <Plus size={16} />
                        Create Assessment
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search assessments..."
                            className="pl-10"
                        />
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {assessments.map((assessment) => (
                                <Card key={assessment.id} className="overflow-hidden">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl">{assessment.title}</CardTitle>
                                            <Badge
                                                variant={assessment.status === "published" ? "default" : "outline"}
                                                className={assessment.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                            >
                                                {assessment.status === "published" ? "Published" : "Draft"}
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex items-center mt-1">
                                            <Calendar className="h-3.5 w-3.5 mr-1" />
                                            Due: {assessment.dueDate}
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
                                                    {assessment.submissionCount}/{assessment.totalStudents}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                                <div className="flex items-center text-green-600 mb-1">
                                                    <BarChart className="h-4 w-4 mr-1" />
                                                    <span>Average</span>
                                                </div>
                                                <p className="text-xl font-semibold">
                                                    {assessment.status === "published" && assessment.submissionCount > 0 ?
                                                        `${assessment.averageScore}%` :
                                                        "N/A"}
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
                                    </CardContent>

                                    <CardFooter className="flex justify-between pt-3 border-t">
                                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                                            <Eye size={14} />
                                            View
                                        </Button>

                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                <Edit size={14} />
                                                Edit
                                            </Button>

                                            <Button variant="ghost" size="sm" className="text-red-500 flex items-center gap-1">
                                                <Trash size={14} />
                                                Delete
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Other tab contents would follow the same pattern */}
                    <TabsContent value="quizzes" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {assessments
                                .filter(assessment => assessment.type === "quiz")
                                .map((assessment) => (
                                    <Card key={assessment.id} className="overflow-hidden">
                                        {/* Same card structure as above */}
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                                                <Badge
                                                    variant={assessment.status === "published" ? "default" : "outline"}
                                                    className={assessment.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                                >
                                                    {assessment.status === "published" ? "Published" : "Draft"}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex items-center mt-1">
                                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                                Due: {assessment.dueDate}
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
                                                        {assessment.submissionCount}/{assessment.totalStudents}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                                    <div className="flex items-center text-green-600 mb-1">
                                                        <BarChart className="h-4 w-4 mr-1" />
                                                        <span>Average</span>
                                                    </div>
                                                    <p className="text-xl font-semibold">
                                                        {assessment.status === "published" && assessment.submissionCount > 0 ?
                                                            `${assessment.averageScore}%` :
                                                            "N/A"}
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
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-3 border-t">
                                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                <Eye size={14} />
                                                View
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                    <Edit size={14} />
                                                    Edit
                                                </Button>

                                                <Button variant="ghost" size="sm" className="text-red-500 flex items-center gap-1">
                                                    <Trash size={14} />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="exams" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {assessments
                                .filter(assessment => assessment.type === "exam")
                                .map((assessment) => (
                                    <Card key={assessment.id} className="overflow-hidden">
                                        {/* Card content structure same as above */}
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                                                <Badge
                                                    variant={assessment.status === "published" ? "default" : "outline"}
                                                    className={assessment.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                                >
                                                    {assessment.status === "published" ? "Published" : "Draft"}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex items-center mt-1">
                                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                                Due: {assessment.dueDate}
                                            </CardDescription>
                                        </CardHeader>

                                        {/* Same card body as above */}
                                        <CardContent className="pb-3">
                                            {/* Same stats as above */}
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                                                    <div className="flex items-center text-blue-600 mb-1">
                                                        <Users className="h-4 w-4 mr-1" />
                                                        <span>Submissions</span>
                                                    </div>
                                                    <p className="text-xl font-semibold">
                                                        {assessment.submissionCount}/{assessment.totalStudents}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                                    <div className="flex items-center text-green-600 mb-1">
                                                        <BarChart className="h-4 w-4 mr-1" />
                                                        <span>Average</span>
                                                    </div>
                                                    <p className="text-xl font-semibold">
                                                        {assessment.status === "published" && assessment.submissionCount > 0 ?
                                                            `${assessment.averageScore}%` :
                                                            "N/A"}
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
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-3 border-t">
                                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                <Eye size={14} />
                                                View
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                    <Edit size={14} />
                                                    Edit
                                                </Button>

                                                <Button variant="ghost" size="sm" className="text-red-500 flex items-center gap-1">
                                                    <Trash size={14} />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="assignments" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {assessments
                                .filter(assessment => assessment.type === "assignment")
                                .map((assessment) => (
                                    <Card key={assessment.id} className="overflow-hidden">
                                        {/* Same card structure */}
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                                                <Badge
                                                    variant={assessment.status === "published" ? "default" : "outline"}
                                                    className={assessment.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                                >
                                                    {assessment.status === "published" ? "Published" : "Draft"}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex items-center mt-1">
                                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                                Due: {assessment.dueDate}
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
                                                        {assessment.submissionCount}/{assessment.totalStudents}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                                    <div className="flex items-center text-green-600 mb-1">
                                                        <BarChart className="h-4 w-4 mr-1" />
                                                        <span>Average</span>
                                                    </div>
                                                    <p className="text-xl font-semibold">
                                                        {assessment.status === "published" && assessment.submissionCount > 0 ?
                                                            `${assessment.averageScore}%` :
                                                            "N/A"}
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
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-3 border-t">
                                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                <Eye size={14} />
                                                View
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                    <Edit size={14} />
                                                    Edit
                                                </Button>

                                                <Button variant="ghost" size="sm" className="text-red-500 flex items-center gap-1">
                                                    <Trash size={14} />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="projects" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {assessments
                                .filter(assessment => assessment.type === "project")
                                .map((assessment) => (
                                    <Card key={assessment.id} className="overflow-hidden">
                                        {/* Same card structure */}
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                                                <Badge
                                                    variant={assessment.status === "published" ? "default" : "outline"}
                                                    className={assessment.status === "published" ? "bg-green-500" : "text-amber-500 border-amber-500"}
                                                >
                                                    {assessment.status === "published" ? "Published" : "Draft"}
                                                </Badge>
                                            </div>
                                            <CardDescription className="flex items-center mt-1">
                                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                                Due: {assessment.dueDate}
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
                                                        {assessment.submissionCount}/{assessment.totalStudents}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                                    <div className="flex items-center text-green-600 mb-1">
                                                        <BarChart className="h-4 w-4 mr-1" />
                                                        <span>Average</span>
                                                    </div>
                                                    <p className="text-xl font-semibold">
                                                        {assessment.status === "published" && assessment.submissionCount > 0 ?
                                                            `${assessment.averageScore}%` :
                                                            "N/A"}
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
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-3 border-t">
                                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                <Eye size={14} />
                                                View
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                    <Edit size={14} />
                                                    Edit
                                                </Button>

                                                <Button variant="ghost" size="sm" className="text-red-500 flex items-center gap-1">
                                                    <Trash size={14} />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}