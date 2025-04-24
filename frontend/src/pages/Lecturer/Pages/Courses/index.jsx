import { useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, BookOpen, Clock, Users, DollarSign, Star, FileText, Copy, Eye } from "lucide-react";

function CourseCard({ course, onEdit, onDelete, onDuplicate, onViewLessons })
{
    return (
        <Card className="overflow-hidden">
            <div className="h-40 bg-slate-200 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-slate-400" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.category}</CardDescription>
                    </div>
                    {course.status === "draft" && (
                        <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span>{course.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span>${course.price}</span>
                    </div>
                </div>
                {course.rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating.toFixed(1)}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={onViewLessons}>Lessons</Button>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDuplicate}
                        title="Duplicate"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={onDelete}
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function CoursesPage()
{
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "Business English for Professionals",
            category: "Business English",
            description: "Master business communication skills, industry vocabulary, and professional etiquette for the global workplace.",
            level: "Intermediate",
            lessons: 12,
            duration: "6 weeks",
            price: 120,
            students: 18,
            rating: 4.7,
            status: "active",
            image: "/business-english.jpg"
        },
        {
            id: 2,
            title: "IELTS Exam Preparation",
            category: "IELTS Preparation",
            description: "Comprehensive preparation for all sections of the IELTS exam with practice tests and personalized feedback.",
            level: "Advanced",
            lessons: 16,
            duration: "8 weeks",
            price: 180,
            students: 24,
            rating: 4.9,
            status: "active",
            image: "/ielts-preparation.jpg"
        },
        {
            id: 3,
            title: "Conversational English for Beginners",
            category: "Conversational English",
            description: "Build confidence in everyday conversations with practical vocabulary and authentic speaking practice.",
            level: "Beginner",
            lessons: 10,
            duration: "5 weeks",
            price: 90,
            students: 15,
            rating: 4.5,
            status: "active",
            image: "/conversational-english.jpg"
        },
        {
            id: 4,
            title: "English Grammar Mastery",
            category: "General English",
            description: "Comprehensive review of English grammar rules with exercises and practical applications.",
            level: "Intermediate",
            lessons: 8,
            duration: "4 weeks",
            price: 75,
            students: 12,
            rating: 4.3,
            status: "draft",
            image: "/grammar-mastery.jpg"
        }
    ]);

    const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
    const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
    const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false);
    const [isViewLessonsOpen, setIsViewLessonsOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({
        title: "",
        category: "General English",
        description: "",
        level: "Intermediate",
        lessons: 0,
        duration: "",
        price: 0,
        status: "draft"
    });

    // Mock lesson data for the selected course
    const mockLessons = [
        { id: 1, title: "Introduction to Course Content", type: "Video", duration: "45 min", status: "published" },
        { id: 2, title: "Key Vocabulary & Expressions", type: "Article", duration: "30 min", status: "published" },
        { id: 3, title: "Grammar Review & Practice", type: "Interactive", duration: "60 min", status: "published" },
        { id: 4, title: "Listening Comprehension", type: "Audio", duration: "40 min", status: "draft" },
        { id: 5, title: "Speaking Practice Activities", type: "Video", duration: "45 min", status: "draft" }
    ];

    const handleAddCourse = () =>
    {
        const id = courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 1;
        setCourses([...courses, { ...newCourse, id, students: 0, rating: 0 }]);
        setIsAddCourseOpen(false);
        setNewCourse({
            title: "",
            category: "General English",
            description: "",
            level: "Intermediate",
            lessons: 0,
            duration: "",
            price: 0,
            status: "draft"
        });
    };

    const handleEditCourse = () =>
    {
        setCourses(courses.map(course => course.id === currentCourse.id ? currentCourse : course));
        setIsEditCourseOpen(false);
    };

    const handleDeleteCourse = () =>
    {
        setCourses(courses.filter(course => course.id !== currentCourse.id));
        setIsDeleteCourseOpen(false);
    };

    const duplicateCourse = (course) =>
    {
        const id = Math.max(...courses.map(course => course.id)) + 1;
        const duplicatedCourse = { ...course, id, title: `${course.title} (Copy)`, students: 0, status: "draft" };
        setCourses([...courses, duplicatedCourse]);
    };

    const courseCategories = ["General English", "Business English", "IELTS Preparation", "Conversational English", "Academic English"];
    const courseLevels = ["Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced", "Proficient"];

    const getCourseStatusBadge = (status) =>
    {
        const statusStyles = {
            active: "bg-green-100 text-green-800",
            draft: "bg-yellow-100 text-yellow-800",
            archived: "bg-gray-100 text-gray-800"
        };

        return (
            <Badge className={statusStyles[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <LecturerSidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Course Management</h1>
                        <Button onClick={() => setIsAddCourseOpen(true)} className="flex items-center gap-1 bg-black hover:bg-black">
                            <PlusCircle className="h-4 w-4" />
                            <span>Create Course</span>
                        </Button>
                    </div>

                    <Tabs defaultValue="active">
                        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                            <TabsTrigger value="active">Active Courses</TabsTrigger>
                            <TabsTrigger value="draft">Drafts</TabsTrigger>
                            <TabsTrigger value="all">All Courses</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.filter(course => course.status === "active").map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onEdit={() =>
                                        {
                                            setCurrentCourse(course);
                                            setIsEditCourseOpen(true);
                                        }}
                                        onDelete={() =>
                                        {
                                            setCurrentCourse(course);
                                            setIsDeleteCourseOpen(true);
                                        }}
                                        onDuplicate={() => duplicateCourse(course)}
                                        onViewLessons={() =>
                                        {
                                            setCurrentCourse(course);
                                            setIsViewLessonsOpen(true);
                                        }}
                                    />
                                ))}
                                {courses.filter(course => course.status === "active").length === 0 && (
                                    <div className="col-span-3 text-center p-10 border rounded-lg bg-white">
                                        <p className="text-muted-foreground">No active courses. Create a new course or publish a draft.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="draft">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.filter(course => course.status === "draft").map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onEdit={() =>
                                        {
                                            setCurrentCourse(course);
                                            setIsEditCourseOpen(true);
                                        }}
                                        onDelete={() =>
                                        {
                                            setCurrentCourse(course);
                                            setIsDeleteCourseOpen(true);
                                        }}
                                        onDuplicate={() => duplicateCourse(course)}
                                        onViewLessons={() =>
                                        {
                                            setCurrentCourse(course);
                                            setIsViewLessonsOpen(true);
                                        }}
                                    />
                                ))}
                                {courses.filter(course => course.status === "draft").length === 0 && (
                                    <div className="col-span-3 text-center p-10 border rounded-lg bg-white">
                                        <p className="text-muted-foreground">No draft courses. Create a new course to get started.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="all">
                            <Table>
                                <TableCaption>A list of all your courses</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Course Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Students</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courses.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell className="font-medium">{course.title}</TableCell>
                                            <TableCell>{course.category}</TableCell>
                                            <TableCell>{course.level}</TableCell>
                                            <TableCell>${course.price}</TableCell>
                                            <TableCell>{course.students}</TableCell>
                                            <TableCell>{getCourseStatusBadge(course.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                        {
                                                            setCurrentCourse(course);
                                                            setIsViewLessonsOpen(true);
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                        {
                                                            setCurrentCourse(course);
                                                            setIsEditCourseOpen(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => duplicateCourse(course)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-600"
                                                        onClick={() =>
                                                        {
                                                            setCurrentCourse(course);
                                                            setIsDeleteCourseOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>

                    {/* Add Course Dialog */}
                    <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Course</DialogTitle>
                                <DialogDescription>
                                    Add a new course to your teaching portfolio.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Course Title</Label>
                                        <Input
                                            id="title"
                                            value={newCourse.title}
                                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                            placeholder="e.g. Business English for Professionals"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={newCourse.category}
                                            onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courseCategories.map(category => (
                                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="level">Level</Label>
                                        <Select
                                            value={newCourse.level}
                                            onValueChange={(value) => setNewCourse({ ...newCourse, level: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courseLevels.map(level => (
                                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="lessons">Number of Lessons</Label>
                                        <Input
                                            id="lessons"
                                            type="number"
                                            value={newCourse.lessons}
                                            onChange={(e) => setNewCourse({ ...newCourse, lessons: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            value={newCourse.duration}
                                            onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                                            placeholder="e.g. 6 weeks"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="price">Price ($)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={newCourse.price}
                                            onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={newCourse.description}
                                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                            placeholder="Describe what students will learn in this course"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2 pt-4">
                                        <Switch
                                            id="publish"
                                            checked={newCourse.status === "active"}
                                            onCheckedChange={(checked) => setNewCourse({ ...newCourse, status: checked ? "active" : "draft" })}
                                        />
                                        <Label htmlFor="publish">Publish immediately</Label>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>Cancel</Button>
                                <Button onClick={handleAddCourse} className="bg-black hover:bg-black">Create Course</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Course Dialog */}
                    {currentCourse && (
                        <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
                            <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Edit Course</DialogTitle>
                                    <DialogDescription>
                                        Modify the details of your course.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="edit-title">Course Title</Label>
                                            <Input
                                                id="edit-title"
                                                value={currentCourse.title}
                                                onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="edit-category">Category</Label>
                                            <Select
                                                value={currentCourse.category}
                                                onValueChange={(value) => setCurrentCourse({ ...currentCourse, category: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courseCategories.map(category => (
                                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="edit-level">Level</Label>
                                            <Select
                                                value={currentCourse.level}
                                                onValueChange={(value) => setCurrentCourse({ ...currentCourse, level: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courseLevels.map(level => (
                                                        <SelectItem key={level} value={level}>{level}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="edit-lessons">Number of Lessons</Label>
                                            <Input
                                                id="edit-lessons"
                                                type="number"
                                                value={currentCourse.lessons}
                                                onChange={(e) => setCurrentCourse({ ...currentCourse, lessons: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="edit-duration">Duration</Label>
                                            <Input
                                                id="edit-duration"
                                                value={currentCourse.duration}
                                                onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="edit-price">Price ($)</Label>
                                            <Input
                                                id="edit-price"
                                                type="number"
                                                value={currentCourse.price}
                                                onChange={(e) => setCurrentCourse({ ...currentCourse, price: parseFloat(e.target.value) })}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="edit-description">Description</Label>
                                            <Textarea
                                                id="edit-description"
                                                value={currentCourse.description}
                                                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                                                rows={4}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2 pt-4">
                                            <Switch
                                                id="edit-status"
                                                checked={currentCourse.status === "active"}
                                                onCheckedChange={(checked) => setCurrentCourse({ ...currentCourse, status: checked ? "active" : "draft" })}
                                            />
                                            <Label htmlFor="edit-status">
                                                {currentCourse.status === "active" ? "Published" : "Publish course"}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditCourseOpen(false)}>Cancel</Button>
                                    <Button onClick={handleEditCourse} className="bg-black hover:bg-black">Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}

                    {/* Delete Course Confirmation Dialog */}
                    {currentCourse && (
                        <Dialog open={isDeleteCourseOpen} onOpenChange={setIsDeleteCourseOpen}>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Delete Course</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete "{currentCourse.title}"? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="pt-4">
                                    {currentCourse.students > 0 && (
                                        <div className="p-4 mb-4 bg-yellow-50 text-yellow-800 rounded-md">
                                            <p>Warning: This course has {currentCourse.students} enrolled students. Deleting it will remove their access.</p>
                                        </div>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDeleteCourseOpen(false)}>Cancel</Button>
                                    <Button variant="destructive" onClick={handleDeleteCourse}>Delete Course</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}

                    {/* Course Lessons Dialog */}
                    {currentCourse && (
                        <Dialog open={isViewLessonsOpen} onOpenChange={setIsViewLessonsOpen}>
                            <DialogContent className="sm:max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>Course Lessons</DialogTitle>
                                    <DialogDescription>
                                        Manage lessons for "{currentCourse.title}"
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">Lessons ({mockLessons.length})</h3>
                                        <Button size="sm" className="flex items-center gap-1 bg-black hover:bg-black">
                                            <PlusCircle className="h-4 w-4" />
                                            <span>Add Lesson</span>
                                        </Button>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Duration</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockLessons.map((lesson) => (
                                                <TableRow key={lesson.id}>
                                                    <TableCell className="font-medium">{lesson.title}</TableCell>
                                                    <TableCell>{lesson.type}</TableCell>
                                                    <TableCell>{lesson.duration}</TableCell>
                                                    <TableCell>
                                                        <Badge className={
                                                            lesson.status === "published"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                        }>
                                                            {lesson.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="icon">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setIsViewLessonsOpen(false)} className="bg-black hover:bg-black">Close</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </div>
    );
}

