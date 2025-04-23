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
    Search,
    MoreHorizontal,
    Trash2,
    Edit,
    Eye,
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
    DialogFooter
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for lecturers
const mockLecturers = [
    {
        id: 1,
        name: "Dr. John Davis",
        email: "john.davis@example.edu",
        lecturerId: "LC20230001",
        joinDate: "2021-08-15",
        department: "Computer Science",
        coursesAssigned: 4,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 2,
        name: "Prof. Sarah Martinez",
        email: "s.martinez@example.edu",
        lecturerId: "LC20230002",
        joinDate: "2019-09-01",
        department: "Business Administration",
        coursesAssigned: 3,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 3,
        name: "Dr. Robert Kim",
        email: "r.kim@example.edu",
        lecturerId: "LC20230003",
        joinDate: "2020-01-10",
        department: "Psychology",
        coursesAssigned: 2,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 4,
        name: "Dr. Amelia Patel",
        email: "a.patel@example.edu",
        lecturerId: "LC20230004",
        joinDate: "2018-07-22",
        department: "Medicine",
        coursesAssigned: 0,
        status: "Inactive",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 5,
        name: "Prof. Thomas Johnson",
        email: "t.johnson@example.edu",
        lecturerId: "LC20230005",
        joinDate: "2022-03-05",
        department: "Engineering",
        coursesAssigned: 5,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 6,
        name: "Dr. Lisa Wong",
        email: "l.wong@example.edu",
        lecturerId: "LC20230006",
        joinDate: "2020-06-15",
        department: "Physics",
        coursesAssigned: 3,
        status: "On Leave",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 7,
        name: "Prof. Mark Williams",
        email: "m.williams@example.edu",
        lecturerId: "LC20230007",
        joinDate: "2017-08-01",
        department: "Mathematics",
        coursesAssigned: 4,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 8,
        name: "Dr. Elena Petrova",
        email: "e.petrova@example.edu",
        lecturerId: "LC20230008",
        joinDate: "2021-01-10",
        department: "Literature",
        coursesAssigned: 2,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 9,
        name: "Prof. Daniel Lee",
        email: "d.lee@example.edu",
        lecturerId: "LC20230009",
        joinDate: "2019-07-20",
        department: "History",
        coursesAssigned: 0,
        status: "Inactive",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 10,
        name: "Dr. Michelle Garcia",
        email: "m.garcia@example.edu",
        lecturerId: "LC20230010",
        joinDate: "2018-09-05",
        department: "Chemistry",
        coursesAssigned: 3,
        status: "Active",
        avatar: "/api/placeholder/32/32"
    }
];

export default function LecturerPage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [lecturers, setLecturers] = useState(mockLecturers);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [lecturerToDelete, setLecturerToDelete] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const lecturersPerPage = 5;
    const totalPages = Math.ceil(lecturers.length / lecturersPerPage);

    // Get current lecturers for pagination
    const indexOfLastLecturer = currentPage * lecturersPerPage;
    const indexOfFirstLecturer = indexOfLastLecturer - lecturersPerPage;
    const filteredLecturers = lecturers.filter(lecturer =>
        lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.lecturerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentLecturers = filteredLecturers.slice(indexOfFirstLecturer, indexOfLastLecturer);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle search
    const handleSearch = (e) =>
    {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Handle delete
    const openDeleteDialog = (lecturer) =>
    {
        setLecturerToDelete(lecturer);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () =>
    {
        if (lecturerToDelete)
        {
            setLecturers(lecturers.filter(lecturer => lecturer.id !== lecturerToDelete.id));
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
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Lecturers Management</h1>
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
                                Lecturer has been successfully deleted.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <div>
                                    <CardTitle>Lecturers Directory</CardTitle>
                                    <CardDescription>Manage all lecturers in the system</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <Input
                                            type="search"
                                            placeholder="Search lecturers..."
                                            className="pl-8 w-full sm:w-64"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <Button className="bg-black hover:bg-black cursor-pointer">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Lecturer
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
                                            <TableHead className="hidden md:table-cell">Department</TableHead>
                                            <TableHead className="hidden md:table-cell">Join Date</TableHead>
                                            <TableHead className="hidden md:table-cell">Courses</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentLecturers.length > 0 ? (
                                            currentLecturers.map((lecturer) => (
                                                <TableRow key={lecturer.id}>
                                                    <TableCell>
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={lecturer.avatar} alt={lecturer.name} />
                                                            <AvatarFallback>{lecturer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">{lecturer.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{lecturer.email}</div>
                                                    </TableCell>
                                                    <TableCell>{lecturer.lecturerId}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{lecturer.department}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{lecturer.joinDate}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{lecturer.coursesAssigned}</TableCell>
                                                    <TableCell>
                                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lecturer.status)}`}>
                                                            {lecturer.status}
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
                                                                    onClick={() => openDeleteDialog(lecturer)}
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
                                                <TableCell colSpan={8} className="text-center h-24">
                                                    No lecturers found matching your search criteria.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {indexOfFirstLecturer + 1}-{Math.min(indexOfLastLecturer, filteredLecturers.length)} of {filteredLecturers.length} lecturers
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
                            Are you sure you want to delete {lecturerToDelete?.name}? This action cannot be undone.
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