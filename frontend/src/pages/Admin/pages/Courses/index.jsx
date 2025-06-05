import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
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
    Filter,
    Loader2
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

export default function CoursesPage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [viewCourseDetails, setViewCourseDetails] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const coursesPerPage = 6;

    // Fetch all courses
    const fetchCourses = async () =>
    {
        try
        {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/users/allcourses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setCourses(response.data.data);
        } catch (error)
        {
            console.error('Error fetching courses:', error);
            toast.error('Failed to fetch courses');
        } finally
        {
            setLoading(false);
        }
    };

    // Fetch course details
    const fetchCourseDetails = async (courseId) =>
    {
        try
        {
            setDetailsLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/users/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCourseDetails(response.data.data);
        } catch (error)
        {
            console.error('Error fetching course details:', error);
            toast.error('Failed to fetch course details');
        } finally
        {
            setDetailsLoading(false);
        }
    };

    // Delete course
    const handleDelete = async (courseId) =>
    {
        try
        {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/api/users/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200)
            {
                toast.success("Course deleted successfully!");
                // Remove the deleted course from state instead of reloading
                setCourses(courses.filter(course => course._id !== courseId));
                setDeleteDialogOpen(false);
                setShowDeleteAlert(true);

                // Hide alert after 3 seconds
                setTimeout(() =>
                {
                    setShowDeleteAlert(false);
                }, 3000);
            }
        } catch (error)
        {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course.");
        }
    };

    // Initial data fetch
    useEffect(() =>
    {
        fetchCourses();
    }, []);

    // Filter courses based on search and active tab
    const filteredCourses = courses.filter(course =>
    {
        const matchesSearch =
            course.topicTwo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.topicOne.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.lecturerEmail.toLowerCase().includes(searchTerm.toLowerCase());

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

    // Handle delete dialog
    const openDeleteDialog = (course) =>
    {
        setCourseToDelete(course);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () =>
    {
        if (courseToDelete)
        {
            handleDelete(courseToDelete._id);
        }
    };

    // Handle view details
    const openViewDialog = async (course) =>
    {
        setViewCourseDetails(course);
        setViewDialogOpen(true);
        await fetchCourseDetails(course._id);
    };

    // Add new function to handle dialog close
    const handleViewDialogClose = () =>
    {
        setViewDialogOpen(false);
        setViewCourseDetails(null);
        setCourseDetails(null);
        setDetailsLoading(false);
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

    // Format date helper
    const formatDate = (dateString) =>
    {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    // Loading state
    if (loading)
    {
        return (
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <AdminSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="text-lg">Loading courses...</span>
                    </div>
                </div>
            </div>
        );
    }

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

                    {/* Statistics Cards */}
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
                                    <h3 className="text-2xl font-bold">{courses.length}</h3>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center space-x-4">
                                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                                    <Users className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                                    <h3 className="text-2xl font-bold">Rs.{courses.reduce((sum, course) => sum + (course.price || 0), 0).toLocaleString()}</h3>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center space-x-4">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Lessons</p>
                                    <h3 className="text-2xl font-bold">{courses.reduce((sum, course) => sum + (course.lessonsQuantity || 0), 0)}</h3>
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
                                </TabsList>

                                {/* All tabs share the same table structure */}
                                {['all'].map(tabValue => (
                                    <TabsContent key={tabValue} value={tabValue} className="mt-0">
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Course</TableHead>
                                                        <TableHead className="hidden md:table-cell">Instructor</TableHead>
                                                        <TableHead className="hidden md:table-cell">Price</TableHead>
                                                        <TableHead>Lessons</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {currentCourses.length > 0 ? (
                                                        currentCourses.map((course) => (
                                                            <TableRow key={course._id}>
                                                                <TableCell>
                                                                    <div className="flex items-center space-x-3">
                                                                        <img
                                                                            src={course.imageUrl || '/api/placeholder/40/40'}
                                                                            alt={course.topicTwo || course.smallDescription}
                                                                            className="w-10 h-10 rounded object-cover"
                                                                        />
                                                                        <div>
                                                                            <div className="font-medium">{course.topicTwo || course.smallDescription || 'Untitled Course'}</div>
                                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{course.topicOne || 'N/A'}</div>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">
                                                                    <div className="flex items-center">
                                                                        <Avatar className="h-6 w-6 mr-2">
                                                                            <AvatarImage src={course.imageUrl} alt={course.lecturerEmail} />
                                                                            <AvatarFallback>{course.lecturerEmail?.substring(0, 2).toUpperCase() || 'NA'}</AvatarFallback>
                                                                        </Avatar>
                                                                        {course.lecturerEmail || 'Unknown Instructor'}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="hidden md:table-cell">${course.price || 0}</TableCell>
                                                                <TableCell>{course.lessonsQuantity || 0}</TableCell>
                                                                <TableCell>
                                                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                                        <span className="mr-1"><Check className="h-4 w-4 text-green-600" /></span>
                                                                        Active
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
                                ))}
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
                                                    className="cursor-pointer"
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
                                                    className="cursor-pointer"
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
                            Are you sure you want to delete "{courseToDelete?.topicTwo}"? This action cannot be undone.
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
            <Dialog open={viewDialogOpen} onOpenChange={handleViewDialogClose}>
                <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Course Details</DialogTitle>
                        <DialogDescription>
                            Comprehensive information about the selected course.
                        </DialogDescription>
                    </DialogHeader>

                    {detailsLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : viewCourseDetails && (
                        <div className="space-y-4 mt-2">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{viewCourseDetails.topicTwo || viewCourseDetails.smallDescription || 'Untitled Course'}</h3>
                                    <p className="text-sm text-muted-foreground">Code: {viewCourseDetails.topicOne || 'N/A'}</p>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    <Check className="h-4 w-4 mr-1" />
                                    Active
                                </Badge>
                            </div>

                            {viewCourseDetails.imageUrl && (
                                <div className="w-full">
                                    <img
                                        src={viewCourseDetails.imageUrl}
                                        alt={viewCourseDetails.topicTwo || viewCourseDetails.smallDescription}
                                        className="w-full h-48 object-cover rounded-lg border"
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Price</p>
                                        <p className="text-lg font-semibold">${viewCourseDetails.price || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Lessons</p>
                                        <p className="text-lg font-semibold">{viewCourseDetails.lessonsQuantity || 0}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Instructor</p>
                                    <div className="flex items-center mt-1">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={viewCourseDetails.imageUrl} alt={viewCourseDetails.lecturerEmail} />
                                            <AvatarFallback>{viewCourseDetails.lecturerEmail?.substring(0, 2).toUpperCase() || 'NA'}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm">{viewCourseDetails.lecturerEmail || 'Unknown Instructor'}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm">{viewCourseDetails.duration || 'N/A'}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Published Date</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm">{formatDate(viewCourseDetails.publishedAt)}</p>
                                    </div>
                                </div>

                                {viewCourseDetails.youtubeUrl && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Preview Video</p>
                                        <a
                                            href={viewCourseDetails.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80 text-sm break-all underline-offset-4 hover:underline"
                                        >
                                            {viewCourseDetails.youtubeUrl}
                                        </a>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                                    <p className="mt-1 text-sm text-foreground">{viewCourseDetails.fullDescription || viewCourseDetails.smallDescription || 'No description available'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}