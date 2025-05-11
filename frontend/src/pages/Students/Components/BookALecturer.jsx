import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import
{
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Calendar, Clock, Mail, Bookmark, Check, X, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import
{
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { format } from "date-fns";

export default function LecturerBookingSystem()
{
    const [selectedLecturer, setSelectedLecturer] = useState(null);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [myBookingsOpen, setMyBookingsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("in-person");
    const [bookingData, setBookingData] = useState({
        date: "",
        time: "",
        topic: "",
        platform: "zoom"
    });
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    // Fetch teacher profiles from API
    useEffect(() =>
    {
        const fetchUsers = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                if (!token)
                {
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/users/getteacherprofiles", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data.data);
                setLoading(false);
            } catch (error)
            {
                console.error("Error fetching lecturers:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Fetch current user
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

                setCurrentUser(response.data.data);
            } catch (err)
            {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, []);

    // Fetch bookings
    const fetchMyBookings = async () =>
    {
        try
        {
            setBookingsLoading(true);
            const token = localStorage.getItem('token');
            if (!token)
            {
                setBookingsLoading(false);
                return;
            }

            const response = await axios.get("http://localhost:5000/api/users/getbookings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setBookings(response.data.data);
            setBookingsLoading(false);
        } catch (error)
        {
            console.error("Error fetching bookings:", error);
            setBookingsLoading(false);
        }
    };

    // Filter out only lecturers (users with valid department and specialization)
    const lecturers = users.filter(user =>
        user.department &&
        user.spcialization &&
        user.department !== "undefined" &&
        user.spcialization !== "undefined"
    ).map(lecturer => ({
        id: lecturer._id,
        name: lecturer.name,
        department: lecturer.department,
        specialization: [lecturer.spcialization], // Wrap in array since your UI expects an array
        email: lecturer.lecturerEmail || "No email provided",
        bio: lecturer.bio || "",
        image: lecturer.profileImage || "/api/placeholder/150/150"
    }));

    const departments = [...new Set(lecturers.map(l => l.department))];

    const filteredLecturers = filter === "all"
        ? lecturers
        : lecturers.filter(l => l.department === filter);

    const handleBooking = (lecturer) =>
    {
        setSelectedLecturer(lecturer);
        setBookingOpen(true);
        setBookingData({
            date: "",
            time: "",
            topic: "",
            platform: "zoom"
        });
    };

    const handleInputChange = (e) =>
    {
        const { id, value } = e.target;

        // Handle different input fields based on their ID
        if (id === "date" || id === "v-date")
        {
            setBookingData({ ...bookingData, date: value });
        } else if (id === "time" || id === "v-time")
        {
            setBookingData({ ...bookingData, time: value });
        } else if (id === "topic" || id === "v-topic")
        {
            setBookingData({ ...bookingData, topic: value });
        }
    };

    const handlePlatformChange = (value) =>
    {
        setBookingData({ ...bookingData, platform: value });
    };

    const handleTabChange = (value) =>
    {
        setSelectedTab(value);
    };

    const handleSubmitBooking = async () =>
    {
        try
        {
            setErrorMsg("");

            // Validate required fields
            if (!bookingData.date)
            {
                setErrorMsg("Please select a date");
                return;
            }
            if (!bookingData.time)
            {
                setErrorMsg("Please select a time");
                return;
            }
            if (!bookingData.topic)
            {
                setErrorMsg("Please enter a topic");
                return;
            }

            const token = localStorage.getItem('token');
            if (!token || !currentUser || !selectedLecturer)
            {
                setErrorMsg("Authentication error. Please try again or log in.");
                return;
            }

            const bookingPayload = {
                lecturerId: selectedLecturer.id,
                lecturerName: selectedLecturer.name,
                lecturerEmail: selectedLecturer.email,
                department: selectedLecturer.department,
                date: bookingData.date,
                time: bookingData.time,
                topic: bookingData.topic,
                consultationType: selectedTab,
                platform: selectedTab === 'virtual' ? bookingData.platform : ''
            };

            await axios.post('http://localhost:5000/api/users/postbooking', bookingPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setBookingOpen(false);
            setConfirmationOpen(true);

            // Refresh bookings after creating a new one
            fetchMyBookings();
        } catch (error)
        {
            console.error("Error creating booking:", error);
            setErrorMsg(error.response?.data?.message || "Failed to create booking. Please try again.");
        }
    };

    const handleCancelBooking = (booking) =>
    {
        setBookingToCancel(booking);
        setCancelDialogOpen(true);
    };

    const confirmCancelBooking = async () =>
    {
        try
        {
            if (!bookingToCancel) return;

            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.put(`http://localhost:5000/api/users/deletebooking/${bookingToCancel._id}`,
                { status: 'cancelled' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // Refresh bookings
            fetchMyBookings();
            setCancelDialogOpen(false);
        } catch (error)
        {
            console.error("Error cancelling booking:", error);
        }
    };

    // When "My Bookings" is opened, fetch the bookings
    useEffect(() =>
    {
        if (myBookingsOpen)
        {
            fetchMyBookings();
        }
    }, [myBookingsOpen]);

    return (
        <div className="w-full">
            {/* Book a Lecturer Drawer */}
            <Drawer>
                <div className="flex gap-4">
                    <DrawerTrigger asChild>
                        <Button className="gap-2">
                            <Calendar className="h-4 w-4" />Book a Lecturer
                        </Button>
                    </DrawerTrigger>
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setMyBookingsOpen(true)}
                    >
                        <Clock className="h-4 w-4" />My Bookings
                    </Button>
                </div>
                <DrawerContent className="max-h-[90vh] overflow-y-auto">
                    <div className="mx-auto w-full max-w-4xl">
                        <DrawerHeader>
                            <DrawerTitle className="text-2xl font-bold">Book a Lecturer</DrawerTitle>
                            <DrawerDescription>
                                Browse our expert lecturers and book a consultation
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing {filteredLecturers.length} lecturers
                                </div>
                                <Select value={filter} onValueChange={setFilter}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Filter by department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center h-40">
                                    <div className="text-center">
                                        <p className="text-gray-500">Loading lecturers...</p>
                                    </div>
                                </div>
                            ) : filteredLecturers.length === 0 ? (
                                <div className="flex justify-center items-center h-40">
                                    <div className="text-center">
                                        <p className="text-gray-500">No lecturers found in this department.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredLecturers.map((lecturer) => (
                                        <Card key={lecturer.id} className="overflow-hidden transition-all hover:shadow-md">
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12 border">
                                                        <AvatarImage
                                                            src={lecturer.image.startsWith("/uploads")
                                                                ? `http://localhost:5000${lecturer.image}`
                                                                : lecturer.image}
                                                            alt={lecturer.name}
                                                        />
                                                        <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-lg">{lecturer.name}</CardTitle>
                                                        <CardDescription>{lecturer.department}</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pb-2">
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {lecturer.specialization.map((spec, i) => (
                                                        <Badge key={i} variant="secondary" className="text-xs">{spec}</Badge>
                                                    ))}
                                                </div>
                                                {lecturer.bio && (
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{lecturer.bio}</p>
                                                )}
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Mail className="h-3 w-3 mr-1" />
                                                    <span>{lecturer.email}</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="pt-0">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="w-full mt-2"
                                                    onClick={() => handleBooking(lecturer)}
                                                >
                                                    <Bookmark className="h-4 w-4 mr-2" />
                                                    Book Consultation
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Booking Dialog */}
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                {selectedLecturer && (
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Book Consultation with {selectedLecturer.name}</DialogTitle>
                            <DialogDescription>
                                Fill out this form to schedule your consultation
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex items-center gap-4 py-2">
                            <Avatar className="h-16 w-16 border">
                                <AvatarImage
                                    src={selectedLecturer.image.startsWith("/uploads")
                                        ? `http://localhost:5000${selectedLecturer.image}`
                                        : selectedLecturer.image}
                                    alt={selectedLecturer.name}
                                />
                                <AvatarFallback>{selectedLecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium">{selectedLecturer.name}</h3>
                                <p className="text-sm text-gray-500">{selectedLecturer.department}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedLecturer.specialization.map((spec) => (
                                        <Badge key={spec} variant="outline" className="text-xs">{spec}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {errorMsg && (
                            <div className="bg-red-50 text-red-700 p-2 rounded border border-red-200 text-sm">
                                {errorMsg}
                            </div>
                        )}

                        <Tabs defaultValue="in-person" onValueChange={handleTabChange}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="in-person">In-Person</TabsTrigger>
                                <TabsTrigger value="virtual">Virtual</TabsTrigger>
                            </TabsList>
                            <TabsContent value="in-person" className="space-y-4 pt-4">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={bookingData.date}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={bookingData.time}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="topic">Consultation Topic</Label>
                                        <Textarea
                                            id="topic"
                                            placeholder="Briefly describe what you'd like to discuss"
                                            value={bookingData.topic}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="virtual" className="space-y-4 pt-4">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="v-date">Date</Label>
                                        <Input
                                            id="v-date"
                                            type="date"
                                            value={bookingData.date}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="v-time">Time</Label>
                                        <Input
                                            id="v-time"
                                            type="time"
                                            value={bookingData.time}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="platform">Platform</Label>
                                        <Select
                                            value={bookingData.platform}
                                            onValueChange={handlePlatformChange}
                                        >
                                            <SelectTrigger id="platform">
                                                <SelectValue placeholder="Select platform" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="zoom">Zoom</SelectItem>
                                                <SelectItem value="teams">Microsoft Teams</SelectItem>
                                                <SelectItem value="meet">Google Meet</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="v-topic">Consultation Topic</Label>
                                        <Textarea
                                            id="v-topic"
                                            placeholder="Briefly describe what you'd like to discuss"
                                            value={bookingData.topic}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setBookingOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitBooking}>
                                Book Consultation
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
                <DialogContent className="max-w-xs">
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="rounded-full bg-green-100 p-3 mb-4">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <DialogTitle className="text-center">Booking Submitted!</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            Your consultation with {selectedLecturer?.name} has been scheduled. The lecturer will review and confirm your request soon.
                        </DialogDescription>
                        <Button
                            className="mt-4 w-full"
                            onClick={() => setConfirmationOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* My Bookings Dialog */}
            <Dialog open={myBookingsOpen} onOpenChange={setMyBookingsOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>My Bookings</DialogTitle>
                        <DialogDescription>
                            View and manage your consultation bookings
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-500">
                            {bookings.length} bookings found
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={fetchMyBookings}
                        >
                            <RefreshCw className="h-3 w-3" />
                            Refresh
                        </Button>
                    </div>

                    {bookingsLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="text-center">
                                <p className="text-gray-500">Loading bookings...</p>
                            </div>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="text-center">
                                <p className="text-gray-500">You don't have any bookings yet.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {bookings.map((booking) =>
                            {
                                // Format the date
                                const bookingDate = new Date(booking.date);
                                const formattedDate = bookingDate ?
                                    format(bookingDate, 'MMM dd, yyyy') : 'Invalid date';

                                return (
                                    <Card key={booking._id} className="overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg">{booking.lecturerName}</CardTitle>
                                                    <CardDescription>{booking.department}</CardDescription>
                                                </div>
                                                <Badge
                                                    variant={
                                                        booking.status === 'confirmed' ? 'default' :
                                                            booking.status === 'cancelled' ? 'destructive' :
                                                                booking.status === 'completed' ? 'outline' : 'secondary'
                                                    }
                                                    className="uppercase text-xs"
                                                >
                                                    {booking.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pb-2">
                                            <div className="grid grid-cols-2 gap-2 mb-3">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="h-3 w-3 mr-2" />
                                                    {formattedDate}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="h-3 w-3 mr-2" />
                                                    {booking.time}
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <Badge variant="outline">
                                                    {booking.consultationType === 'in-person' ? 'In-Person' : 'Virtual'}
                                                    {booking.consultationType === 'virtual' && booking.platform && ` - ${booking.platform}`}
                                                </Badge>
                                            </div>
                                            <p className="text-sm font-medium">Topic:</p>
                                            <p className="text-sm text-gray-600">{booking.topic}</p>
                                        </CardContent>
                                        <CardFooter className="pt-0">
                                            {booking.status === 'pending' && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="w-full mt-2"
                                                    onClick={() => handleCancelBooking(booking)}
                                                >
                                                    <X className="h-4 w-4 mr-2" />
                                                    Cancel Booking
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setMyBookingsOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Booking Confirmation Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel your booking with {bookingToCancel?.lecturerName} on {bookingToCancel?.date ? format(new Date(bookingToCancel.date), 'MMM dd, yyyy') : ''} at {bookingToCancel?.time}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep Booking</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmCancelBooking}>
                            Yes, Cancel Booking
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}