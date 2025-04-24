import { useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Book, BookOpen, CheckCircle, Clock, CreditCard, Download, Filter, Layers, PlayCircle, Plus, Search as SearchIcon, Star, Users } from "lucide-react";

export default function Courses()
{
    const [activeTab, setActiveTab] = useState("enrolled");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

    // Mock data for enrolled courses
    const enrolledCourses = [
        {
            id: 1,
            title: "Introduction to Calculus",
            instructor: "Dr. Sarah Johnson",
            department: "Mathematics",
            progress: 75,
            thumbnail: "/api/placeholder/400/225",
            status: "in-progress",
            lessons: 24,
            completed: 18,
            lastAccessed: "2 days ago"
        },
        {
            id: 2,
            title: "Web Development Fundamentals",
            instructor: "Prof. Michael Chen",
            department: "Computer Science",
            progress: 40,
            thumbnail: "/api/placeholder/400/225",
            status: "in-progress",
            lessons: 36,
            completed: 14,
            lastAccessed: "Today"
        },
        {
            id: 3,
            title: "Introduction to Psychology",
            instructor: "Dr. Emily Reynolds",
            department: "Psychology",
            progress: 100,
            thumbnail: "/api/placeholder/400/225",
            status: "completed",
            lessons: 18,
            completed: 18,
            lastAccessed: "1 week ago"
        },
        {
            id: 4,
            title: "Principles of Economics",
            instructor: "Prof. David Wilson",
            department: "Economics",
            progress: 10,
            thumbnail: "/api/placeholder/400/225",
            status: "in-progress",
            lessons: 30,
            completed: 3,
            lastAccessed: "3 days ago"
        }
    ];

    // Mock data for available courses
    const availableCourses = [
        {
            id: 101,
            title: "Advanced Data Structures",
            instructor: "Dr. James Miller",
            department: "Computer Science",
            rating: 4.8,
            reviews: 342,
            students: 2156,
            price: 79.99,
            thumbnail: "/api/placeholder/400/225",
            description: "Deepen your understanding of data structures with this comprehensive course covering advanced topics like AVL trees, red-black trees, and network flow algorithms.",
            level: "Advanced",
            duration: "10 weeks",
            lessons: 45,
            features: ["24/7 Support", "Certificate", "Downloadable Resources"]
        },
        {
            id: 102,
            title: "Organic Chemistry",
            instructor: "Prof. Lisa Zhang",
            department: "Chemistry",
            rating: 4.6,
            reviews: 218,
            students: 1742,
            price: 89.99,
            thumbnail: "/api/placeholder/400/225",
            description: "Master organic chemistry concepts with this in-depth course covering reactions, mechanisms, and laboratory techniques essential for success in chemistry.",
            level: "Intermediate",
            duration: "12 weeks",
            lessons: 50,
            features: ["Lab Demonstrations", "Practice Problems", "Certificate"]
        },
        {
            id: 103,
            title: "Marketing Analytics",
            instructor: "Dr. Rachel Brown",
            department: "Business",
            rating: 4.9,
            reviews: 427,
            students: 3210,
            price: 69.99,
            thumbnail: "/api/placeholder/400/225",
            description: "Learn how to use data to drive marketing decisions. This course covers market research, consumer behavior analysis, and digital marketing metrics.",
            level: "Intermediate",
            duration: "8 weeks",
            lessons: 32,
            features: ["Real-world Projects", "Industry Case Studies", "Certificate"]
        },
        {
            id: 104,
            title: "Machine Learning Fundamentals",
            instructor: "Prof. Alex Turner",
            department: "Computer Science",
            rating: 4.7,
            reviews: 385,
            students: 2875,
            price: 99.99,
            thumbnail: "/api/placeholder/400/225",
            description: "Discover the foundations of machine learning with hands-on projects covering supervised and unsupervised learning algorithms, neural networks, and more.",
            level: "Intermediate",
            duration: "14 weeks",
            lessons: 56,
            features: ["Coding Exercises", "AI Projects", "Certificate"]
        },
        {
            id: 105,
            title: "World History: 1900-Present",
            instructor: "Dr. Samuel Washington",
            department: "History",
            rating: 4.5,
            reviews: 192,
            students: 1536,
            price: 59.99,
            thumbnail: "/api/placeholder/400/225",
            description: "Explore the major events and developments of the 20th and 21st centuries, including world wars, decolonization, globalization, and technological revolution.",
            level: "Beginner",
            duration: "8 weeks",
            lessons: 40,
            features: ["Historical Documents", "Visual Timeline", "Certificate"]
        }
    ];

    // Handle course purchase
    const handlePurchaseCourse = () =>
    {
        // In a real implementation, this would connect to payment processing
        alert(`Purchase successful! You are now enrolled in ${selectedCourse.title}`);
        setPurchaseDialogOpen(false);
    };

    // Filter courses based on search and category
    const filteredAvailableCourses = availableCourses.filter(course =>
    {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === "all" || course.department === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Get all unique departments for filter
    const departments = ["all", ...new Set(availableCourses.map(course => course.department))];

    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />

            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                        <p className="text-muted-foreground">Manage your enrolled courses and discover new ones</p>
                    </div>
                </div>

                <Tabs defaultValue="enrolled" className="mb-6" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                        <TabsTrigger value="available">Available Courses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="enrolled">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium mb-2">Course Progress</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {enrolledCourses.filter(c => c.status === "completed").length}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {enrolledCourses.filter(c => c.status === "in-progress").length}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {Math.round(enrolledCourses.reduce((acc, curr) => acc + curr.progress, 0) / enrolledCourses.length)}%
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrolledCourses.map(course => (
                                <Card key={course.id} className="overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />

                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{course.title}</CardTitle>
                                            {course.status === "completed" ? (
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                    <CheckCircle className="w-3 h-3 mr-1" /> Completed
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                                    <Clock className="w-3 h-3 mr-1" /> In Progress
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription>
                                            {course.instructor} • {course.department}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} className="h-2" />
                                        </div>

                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{course.completed}/{course.lessons} lessons</span>
                                            <span>Last accessed {course.lastAccessed}</span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex gap-2">
                                        <Button className="w-full">
                                            <PlayCircle className="w-4 h-4 mr-2" /> Continue
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="available">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="w-full md:w-2/3">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search courses by title or instructor..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 flex gap-2">
                                <div className="flex-1">
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>
                                                {dept === "all" ? "All Categories" : dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAvailableCourses.map(course => (
                                <Card key={course.id} className="overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />

                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{course.title}</CardTitle>
                                            <Badge variant="outline">{course.level}</Badge>
                                        </div>
                                        <CardDescription>
                                            {course.instructor} • {course.department}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {course.description}
                                        </p>

                                        <div className="flex justify-between text-sm mb-4">
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                                <span>{course.rating} ({course.reviews} reviews)</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                <span>{course.students} students</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{course.lessons} lessons</span>
                                            <span>{course.duration}</span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex justify-between items-center">
                                        <div className="font-bold text-lg">${course.price}</div>
                                        <Button
                                            onClick={() =>
                                            {
                                                setSelectedCourse(course);
                                                setPurchaseDialogOpen(true);
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Enroll Now
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}

                            {filteredAvailableCourses.length === 0 && (
                                <div className="col-span-full text-center py-12">
                                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Course Purchase Dialog */}
            {selectedCourse && (
                <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Enroll in Course</DialogTitle>
                            <DialogDescription>
                                Review the course details before completing your enrollment
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 my-2">
                            <div className="flex gap-4 items-start">
                                <img
                                    src={selectedCourse.thumbnail}
                                    alt={selectedCourse.title}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">{selectedCourse.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {selectedCourse.instructor} • {selectedCourse.department}
                                    </p>
                                    <div className="flex items-center mt-1 text-sm">
                                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                        <span>{selectedCourse.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Duration</p>
                                    <p className="font-medium">{selectedCourse.duration}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Level</p>
                                    <p className="font-medium">{selectedCourse.level}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Lessons</p>
                                    <p className="font-medium">{selectedCourse.lessons}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Students</p>
                                    <p className="font-medium">{selectedCourse.students}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-medium mb-2">Course Features</h4>
                                <ul className="space-y-2">
                                    {selectedCourse.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">Price</p>
                                    <p className="text-xl font-bold">${selectedCourse.price}</p>
                                </div>
                                <Button
                                    onClick={handlePurchaseCourse}
                                    className="gap-2"
                                >
                                    <CreditCard className="h-4 w-4" /> Complete Purchase
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}