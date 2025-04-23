import { useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import
{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import
{
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import
{
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import
{
    MoreHorizontal,
    Trash2,
    Edit,
    Eye,
    Search,
    PlusCircle,
    Calendar,
    Users,
    BookOpen,
    Clock,
    Activity,
    Check,
    X,
    AlertCircle,
    Filter
} from "lucide-react";
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for courses
const mockCourses = [
    {
        id: 1,
        code: "CS101",
        title: "Introduction to Computer Science",
        instructor: "Dr. Alan Turing",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Computer Science",
        credits: 3,
        students: 45,
        startDate: "2024-09-05",
        endDate: "2024-12-20",
        status: "Active",
        description: "Fundamental concepts of computer science including programming, algorithms, and problem-solving.",
        schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM"
    },
    {
        id: 2,
        code: "MATH201",
        title: "Calculus II",
        instructor: "Prof. Katherine Johnson",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Mathematics",
        credits: 4,
        students: 38,
        startDate: "2024-09-06",
        endDate: "2024-12-18",
        status: "Active",
        description: "Integration techniques, sequences and series, parametric equations, and polar coordinates.",
        schedule: "Tue, Thu 9:00 AM - 11:00 AM"
    },
    {
        id: 3,
        code: "BIO150",
        title: "Introduction to Biology",
        instructor: "Dr. Rosalind Franklin",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Biology",
        credits: 4,
        students: 52,
        startDate: "2024-09-04",
        endDate: "2024-12-15",
        status: "Active",
        description: "Basic principles of cellular and molecular biology, genetics, and evolution.",
        schedule: "Mon, Wed 1:00 PM - 2:30 PM, Fri 1:00 PM - 3:00 PM (Lab)"
    },
    {
        id: 4,
        code: "PHYS211",
        title: "Physics for Scientists and Engineers",
        instructor: "Dr. Richard Feynman",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Physics",
        credits: 5,
        students: 30,
        startDate: "2024-09-05",
        endDate: "2024-12-19",
        status: "Active",
        description: "Mechanics, kinematics, and dynamics of particles and rigid bodies.",
        schedule: "Tue, Thu 1:00 PM - 3:00 PM, Wed 3:00 PM - 5:00 PM (Lab)"
    },
    {
        id: 5,
        code: "ENG102",
        title: "Academic Writing",
        instructor: "Prof. Maya Angelou",
        instructorAvatar: "/api/placeholder/32/32",
        department: "English",
        credits: 3,
        students: 25,
        startDate: "2024-09-03",
        endDate: "2024-12-14",
        status: "Active",
        description: "Development of critical thinking and writing skills for academic discourse.",
        schedule: "Mon, Wed, Fri 2:00 PM - 3:00 PM"
    },
    {
        id: 6,
        code: "CHEM110",
        title: "General Chemistry",
        instructor: "Dr. Marie Curie",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Chemistry",
        credits: 4,
        students: 40,
        startDate: "2024-09-04",
        endDate: "2024-12-16",
        status: "Active",
        description: "Atomic structure, periodic properties, chemical bonding, and states of matter.",
        schedule: "Tue, Thu 10:00 AM - 11:30 AM, Thu 2:00 PM - 5:00 PM (Lab)"
    },
    {
        id: 7,
        code: "PSYC101",
        title: "Introduction to Psychology",
        instructor: "Dr. Carl Jung",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Psychology",
        credits: 3,
        students: 60,
        startDate: "2024-09-06",
        endDate: "2024-12-18",
        status: "Active",
        description: "Overview of human behavior and mental processes.",
        schedule: "Mon, Wed 11:00 AM - 12:30 PM"
    },
    {
        id: 8,
        code: "HIST205",
        title: "World History: 1500-Present",
        instructor: "Prof. Howard Zinn",
        instructorAvatar: "/api/placeholder/32/32",
        department: "History",
        credits: 3,
        students: 35,
        startDate: "2024-09-05",
        endDate: "2024-12-17",
        status: "Inactive",
        description: "Global historical developments and interactions from 1500 to the present.",
        schedule: "Tue, Thu 3:00 PM - 4:30 PM"
    },
    {
        id: 9,
        code: "ECON201",
        title: "Principles of Microeconomics",
        instructor: "Dr. Adam Smith",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Economics",
        credits: 3,
        students: 48,
        startDate: "2024-09-03",
        endDate: "2024-12-15",
        status: "Active",
        description: "Introduction to economic principles focusing on individual decision-making units.",
        schedule: "Mon, Wed, Fri 9:00 AM - 10:00 AM"
    },
    {
        id: 10,
        code: "ART120",
        title: "Introduction to Drawing",
        instructor: "Prof. Frida Kahlo",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Fine Arts",
        credits: 3,
        students: 22,
        startDate: "2024-09-04",
        endDate: "2024-12-16",
        status: "Pending",
        description: "Fundamental drawing techniques focusing on observation and expression.",
        schedule: "Tue, Thu 1:00 PM - 3:00 PM"
    },
    {
        id: 11,
        code: "CS301",
        title: "Database Systems",
        instructor: "Dr. Ada Lovelace",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Computer Science",
        credits: 4,
        students: 32,
        startDate: "2024-09-06",
        endDate: "2024-12-19",
        status: "Active",
        description: "Design and implementation of database systems, focusing on relational models and SQL.",
        schedule: "Mon, Wed 3:00 PM - 4:30 PM, Fri 3:00 PM - 5:00 PM (Lab)"
    },
    {
        id: 12,
        code: "PHIL202",
        title: "Ethics",
        instructor: "Prof. John Rawls",
        instructorAvatar: "/api/placeholder/32/32",
        department: "Philosophy",
        credits: 3,
        students: 28,
        startDate: "2024-09-03",
        endDate: "2024-12-14",
        status: "Cancelled",
        description: "Examination of major ethical theories and their application to contemporary issues.",
        schedule: "Tue, Thu 11:00 AM - 12:30 PM"
    }
];

export default function CoursesPage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [courses, setCourses] = useState(mockCourses);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [viewCourseDetails, setViewCourseDetails] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    const coursesPerPage = 6;

    // Filter courses based on search and active tab
    const filteredCourses = courses.filter(course =>
    {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.department.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTab =
            activeTab === "all" ||
            (activeTab === "active" && course.status === "Active") ||
            (activeTab === "pending" && course.status === "Pending") ||
            (activeTab === "inactive" && (course.status === "Inactive" || course.status === "Cancelled"));

        return matchesSearch && matchesTab;
    });

    // Calculate total pages and current page courses
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle search
    const handleSearch = (e) =>
    {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Handle tab change
    const handleTabChange = (value) =>
    {
        setActiveTab(value);
        setCurrentPage(1);
    };

    // Handle delete
    const openDeleteDialog = (course) =>
    {
        setCourseToDelete(course);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () =>
    {
        if (courseToDelete)
        {
            setCourses(courses.filter(course => course.id !== courseToDelete.id));
            setDeleteDialogOpen(false);
            setShowDeleteAlert(true);

            // Hide the alert after 3 seconds
            setTimeout(() =>
            {
                setShowDeleteAlert(false);
            }, 3000);
        }
    };

    // Handle view details
    const openViewDialog = (course) =>
    {
        setViewCourseDetails(course);
        setViewDialogOpen(true);
    };

    // Status badge color
    const getStatusColor = (status) =>
    {
        switch (status)
        {
            case 'Active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
            case 'Pending':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    // Status icon
    const getStatusIcon = (status) =>
    {
        switch (status)
        {
            case 'Active':
                return <Check className="h-4 w-4 text-green-600" />;
            case 'Inactive':
                return <X className="h-4 w-4 text-gray-600" />;
            case 'Pending':
                return <Clock className="h-4 w-4 text-blue-600" />;
            case 'Cancelled':
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}

            <AdminSidebar />


            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation Bar */}
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
                                <Activity className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Course Management</h1>
                        </div>
                    </div>
                </header>

                {/* Main Content Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {/* Success alert for deletion */}
                    {showDeleteAlert && (
                        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800">
                            <Trash2 className="h-4 w-4" />
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Course has been successfully deleted.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
                        <Card>
                            <CardContent className="p-6 flex items-center space-x-4">
                                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Courses</p>
                                    <h3 className="text-2xl font-bold">{courses.length}</h3>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center space-x-4">
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                    <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Courses</p>
                                    <h3 className="text-2xl font-bold">{courses.filter(c => c.status === "Active").length}</h3>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center space-x-4">
                                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                                    <Users className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                                    <h3 className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</h3>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center space-x-4">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departments</p>
                                    <h3 className="text-2xl font-bold">{new Set(courses.map(c => c.department)).size}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <div>
                                    <CardTitle>Course Directory</CardTitle>
                                    <CardDescription>Manage all courses in the system</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <Input
                                            type="search"
                                            placeholder="Search courses..."
                                            className="pl-8 w-full sm:w-64"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>

                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pb-0">
                            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                                <TabsList className="grid grid-cols-4 mb-4">
                                    <TabsTrigger value="all">All Courses</TabsTrigger>
                                    <TabsTrigger value="active">Active</TabsTrigger>
                                    <TabsTrigger value="pending">Pending</TabsTrigger>
                                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all" className="mt-0">
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Course</TableHead>
                                                    <TableHead className="hidden md:table-cell">Department</TableHead>
                                                    <TableHead className="hidden md:table-cell">Instructor</TableHead>
                                                    <TableHead>Students</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentCourses.length > 0 ? (
                                                    currentCourses.map((course) => (
                                                        <TableRow key={course.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{course.title}</div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">{course.code}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">{course.department}</TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="flex items-center">
                                                                    <Avatar className="h-6 w-6 mr-2">
                                                                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                                                                        <AvatarFallback>{course.instructor.substring(0, 2)}</AvatarFallback>
                                                                    </Avatar>
                                                                    {course.instructor}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{course.students}</TableCell>
                                                            <TableCell>
                                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                                                    <span className="mr-1">{getStatusIcon(course.status)}</span>
                                                                    {course.status}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem className="cursor-pointer" onClick={() => openViewDialog(course)}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="cursor-pointer">
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                                                            onClick={() => openDeleteDialog(course)}
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center h-24">
                                                            No courses found matching your search criteria.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                <TabsContent value="active" className="mt-0">
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Course</TableHead>
                                                    <TableHead className="hidden md:table-cell">Department</TableHead>
                                                    <TableHead className="hidden md:table-cell">Instructor</TableHead>
                                                    <TableHead>Students</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentCourses.length > 0 ? (
                                                    currentCourses.map((course) => (
                                                        <TableRow key={course.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{course.title}</div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">{course.code}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">{course.department}</TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="flex items-center">
                                                                    <Avatar className="h-6 w-6 mr-2">
                                                                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                                                                        <AvatarFallback>{course.instructor.substring(0, 2)}</AvatarFallback>
                                                                    </Avatar>
                                                                    {course.instructor}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{course.students}</TableCell>
                                                            <TableCell>
                                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                                                    <span className="mr-1">{getStatusIcon(course.status)}</span>
                                                                    {course.status}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem className="cursor-pointer" onClick={() => openViewDialog(course)}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="cursor-pointer">
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                                                            onClick={() => openDeleteDialog(course)}
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center h-24">
                                                            No active courses found matching your search criteria.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                <TabsContent value="pending" className="mt-0">
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Course</TableHead>
                                                    <TableHead className="hidden md:table-cell">Department</TableHead>
                                                    <TableHead className="hidden md:table-cell">Instructor</TableHead>
                                                    <TableHead>Students</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentCourses.length > 0 ? (
                                                    currentCourses.map((course) => (
                                                        <TableRow key={course.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{course.title}</div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">{course.code}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">{course.department}</TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="flex items-center">
                                                                    <Avatar className="h-6 w-6 mr-2">
                                                                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                                                                        <AvatarFallback>{course.instructor.substring(0, 2)}</AvatarFallback>
                                                                    </Avatar>
                                                                    {course.instructor}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{course.students}</TableCell>
                                                            <TableCell>
                                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                                                    <span className="mr-1">{getStatusIcon(course.status)}</span>
                                                                    {course.status}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem className="cursor-pointer" onClick={() => openViewDialog(course)}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="cursor-pointer">
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                                                            onClick={() => openDeleteDialog(course)}
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center h-24">
                                                            No pending courses found matching your search criteria.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                <TabsContent value="inactive" className="mt-0">
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Course</TableHead>
                                                    <TableHead className="hidden md:table-cell">Department</TableHead>
                                                    <TableHead className="hidden md:table-cell">Instructor</TableHead>
                                                    <TableHead>Students</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentCourses.length > 0 ? (
                                                    currentCourses.map((course) => (
                                                        <TableRow key={course.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{course.title}</div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">{course.code}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">{course.department}</TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="flex items-center">
                                                                    <Avatar className="h-6 w-6 mr-2">
                                                                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                                                                        <AvatarFallback>{course.instructor.substring(0, 2)}</AvatarFallback>
                                                                    </Avatar>
                                                                    {course.instructor}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{course.students}</TableCell>
                                                            <TableCell>
                                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                                                    <span className="mr-1">{getStatusIcon(course.status)}</span>
                                                                    {course.status}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem className="cursor-pointer" onClick={() => openViewDialog(course)}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="cursor-pointer">
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                                                            onClick={() => openDeleteDialog(course)}
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center h-24">
                                                            No inactive courses found matching your search criteria.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>

                        {/* Pagination */}
                        <CardFooter className="flex items-center justify-between pt-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} courses
                            </p>

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) =>
                                    {
                                        const pageNumber = index + 1;
                                        return (
                                            <PaginationItem key={index}>
                                                <PaginationLink
                                                    onClick={() => paginate(pageNumber)}
                                                    isActive={currentPage === pageNumber}
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {totalPages > 5 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    onClick={() => paginate(totalPages)}
                                                    isActive={currentPage === totalPages}
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </CardFooter>
                    </Card>
                </main>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {courseToDelete?.title} ({courseToDelete?.code})? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Course Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Course Details</DialogTitle>
                        <DialogDescription>
                            Comprehensive information about the selected course.
                        </DialogDescription>
                    </DialogHeader>

                    {viewCourseDetails && (
                        <div className="space-y-4 mt-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{viewCourseDetails.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Code: {viewCourseDetails.code}</p>
                                </div>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(viewCourseDetails.status)}`}>
                                    <span className="mr-1">{getStatusIcon(viewCourseDetails.status)}</span>
                                    {viewCourseDetails.status}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</p>
                                        <p>{viewCourseDetails.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Credits</p>
                                        <p>{viewCourseDetails.credits}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Instructor</p>
                                    <div className="flex items-center mt-1">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={viewCourseDetails.instructorAvatar} alt={viewCourseDetails.instructor} />
                                            <AvatarFallback>{viewCourseDetails.instructor.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <p>{viewCourseDetails.instructor}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Course Timeline</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <p>{viewCourseDetails.startDate} to {viewCourseDetails.endDate}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Schedule</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <p>{viewCourseDetails.schedule}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Enrolled Students</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <p>{viewCourseDetails.students} students</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                                    <p className="mt-1 text-sm">{viewCourseDetails.description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex space-x-2 justify-end">
                        <Button className="bg-black hover:bg-black cursor-pointer" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}