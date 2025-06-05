import { useState, useEffect } from "react";
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
    CardTitle
} from "@/components/ui/card";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import
{
    ChevronDown,
    Search,
    MoreHorizontal,
    Trash2,
    Edit,
    Eye,
    Download,
    Filter,
    PlusCircle,
    Activity,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

export default function LecturePage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const studentsPerPage = 5;

    // Fetch students from backend
    useEffect(() =>
    {
        fetchStudents();
    }, []);

    const fetchStudents = async () =>
    {
        try
        {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:5000/api/get/allteachers');
            // Access the data array from the response
            const studentsData = response.data.data;
            // Ensure data is an array
            setStudents(Array.isArray(studentsData) ? studentsData : []);
            console.log('Fetched students:', studentsData);
        } catch (err)
        {
            console.error('Error fetching students:', err);
            setError('Failed to load students. Please try again.');
            setStudents([]); // Set empty array on error
        } finally
        {
            setLoading(false);
        }
    };

    // Ensure students is always an array
    const studentsArray = Array.isArray(students) ? students : [];
    const totalPages = Math.ceil(studentsArray.length / studentsPerPage);

    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = studentsArray.slice(indexOfFirstStudent, indexOfLastStudent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle delete
    const openDeleteDialog = (student) =>
    {
        setStudentToDelete(student);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () =>
    {
        if (studentToDelete)
        {
            try
            {
                // Call your delete API endpoint using the student's _id
                const response = await axios.delete(`http://localhost:5000/api/users/deletestudent/${studentToDelete._id}`);

                // Remove student from local state
                setStudents(students.filter(student => student._id !== studentToDelete._id));
                setDeleteDialogOpen(false);
                setShowDeleteAlert(true);

                // Hide the alert after 3 seconds
                setTimeout(() =>
                {
                    setShowDeleteAlert(false);
                }, 3000);
            } catch (err)
            {
                console.error('Error deleting student:', err);
                setError('Failed to delete student. Please try again.');
                setDeleteDialogOpen(false);
            }
        }
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
            case 'On Leave':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
            default:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        }
    };

    // Format date helper
    const formatDate = (dateString) =>
    {
        return new Date(dateString).toLocaleDateString();
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
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Lectures Management</h1>
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
                                Student has been successfully deleted.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Error alert */}
                    {error && (
                        <Alert className="mb-4 bg-red-50 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800">
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <div>
                                    <CardTitle>Lectures Directory</CardTitle>
                                    <CardDescription>Manage all Lectures in the system</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                        className="bg-black hover:bg-black cursor-pointer"
                                        onClick={fetchStudents}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                        )}
                                        {loading ? 'Loading...' : 'Refresh'}
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Student ID</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className=" md:table-cell">Role</TableHead>
                                            {/* <TableHead className="text-right">Actions</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center h-24">
                                                    <div className="flex items-center justify-center">
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Loading students...
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : currentStudents.length > 0 ? (
                                            currentStudents.map((student) => (
                                                <TableRow key={student._id}>
                                                    <TableCell>
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={student.avatar} alt={student.name} />
                                                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">{student.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                                                    </TableCell>
                                                    <TableCell>{student._id}</TableCell>
                                                    <TableCell className=" md:table-cell">{student.email}</TableCell>
                                                    <TableCell>
                                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                                                            {student.role}
                                                        </Badge>
                                                    </TableCell>
                                                    {/* <TableCell>
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                                                            {student.status}
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
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                                                    onClick={() => openDeleteDialog(student)}
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell> */}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center h-24">
                                                    {error ? 'Error loading students.' : 'No students found.'}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {!loading && currentStudents.length > 0 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, studentsArray.length)} of {studentsArray.length} Lectures
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
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {studentToDelete?.name}? This action cannot be undone.
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
        </div >
    );
}