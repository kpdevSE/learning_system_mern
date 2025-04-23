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
    Activity
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

// Mock data for students
const mockStudents = [
    {
        id: 1,
        name: "Emma Thompson",
        email: "emma.t@example.edu",
        studentId: "ST20230001",
        enrollmentDate: "2023-09-15",
        program: "Computer Science",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 2,
        name: "James Wilson",
        email: "j.wilson@example.edu",
        studentId: "ST20230002",
        enrollmentDate: "2023-09-10",
        program: "Business Administration",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 3,
        name: "Sofia Rodriguez",
        email: "sofia.r@example.edu",
        studentId: "ST20230003",
        enrollmentDate: "2023-09-05",
        program: "Psychology",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 4,
        name: "David Chen",
        email: "d.chen@example.edu",
        studentId: "ST20230004",
        enrollmentDate: "2023-09-08",
        program: "Engineering",
        status: "Inactive",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 5,
        name: "Ava Johnson",
        email: "ava.j@example.edu",
        studentId: "ST20230005",
        enrollmentDate: "2023-09-12",
        program: "Medicine",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 6,
        name: "Michael Brown",
        email: "m.brown@example.edu",
        studentId: "ST20230006",
        enrollmentDate: "2023-08-30",
        program: "Physics",
        status: "On Leave",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 7,
        name: "Olivia Davis",
        email: "o.davis@example.edu",
        studentId: "ST20230007",
        enrollmentDate: "2023-09-01",
        program: "Mathematics",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 8,
        name: "William Taylor",
        email: "w.taylor@example.edu",
        studentId: "ST20230008",
        enrollmentDate: "2023-09-03",
        program: "History",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 9,
        name: "Isabella Martin",
        email: "i.martin@example.edu",
        studentId: "ST20230009",
        enrollmentDate: "2023-09-07",
        program: "Literature",
        status: "Inactive",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 10,
        name: "Ethan Anderson",
        email: "e.anderson@example.edu",
        studentId: "ST20230010",
        enrollmentDate: "2023-09-14",
        program: "Chemistry",
        status: "Active",
        avatar: "/api/placeholder/32/32"
    }
];

export default function StudentsPage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [students, setStudents] = useState(mockStudents);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const studentsPerPage = 5;
    const totalPages = Math.ceil(students.length / studentsPerPage);

    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.program.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle search
    const handleSearch = (e) =>
    {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Handle delete
    const openDeleteDialog = (student) =>
    {
        setStudentToDelete(student);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () =>
    {
        if (studentToDelete)
        {
            setStudents(students.filter(student => student.id !== studentToDelete.id));
            setDeleteDialogOpen(false);
            setShowDeleteAlert(true);

            // Hide the alert after 3 seconds
            setTimeout(() =>
            {
                setShowDeleteAlert(false);
            }, 3000);
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
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Students Management</h1>
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

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <div>
                                    <CardTitle>Students Directory</CardTitle>
                                    <CardDescription>Manage all students in the system</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <Input
                                            type="search"
                                            placeholder="Search students..."
                                            className="pl-8 w-full sm:w-64"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <Button className="bg-black hover:bg-black cursor-pointer">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Student
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
                                            <TableHead>ID</TableHead>
                                            <TableHead className="hidden md:table-cell">Program</TableHead>
                                            <TableHead className="hidden md:table-cell">Enrollment Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentStudents.length > 0 ? (
                                            currentStudents.map((student) => (
                                                <TableRow key={student.id}>
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
                                                    <TableCell>{student.studentId}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{student.program}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{student.enrollmentDate}</TableCell>
                                                    <TableCell>
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
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center h-24">
                                                    No students found matching your search criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
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
        </div>
    );
}