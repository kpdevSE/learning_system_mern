import { useState, useEffect } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, FileText, Video, X, Check, UserPlus, Filter, Loader2 } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";

export default function Bookings()
{
    const [date, setDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [bookings, setBookings] = useState({
        upcoming: [],
        pending: [],
        past: []
    });
    const [loading, setLoading] = useState(true);
    const [sessionNotes, setSessionNotes] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState({
        day: "monday",
        startTime: "9",
        endTime: "17"
    });

    // Fetch lecturer bookings
    useEffect(() =>
    {
        const fetchBookings = async () =>
        {
            try
            {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/getLecturerbookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log("API Response:", response.data.data);

                if (response.data.success)
                {
                    // Process and categorize bookings
                    const allBookings = response.data.data;
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const categorizedBookings = {
                        upcoming: [],
                        pending: [],
                        past: []
                    };

                    allBookings.forEach(booking =>
                    {
                        // Ensure date is properly converted
                        const bookingDate = new Date(booking.date);
                        bookingDate.setHours(0, 0, 0, 0);

                        // Extract student name from email if not directly available
                        const studentName = booking.studentEmail ? booking.studentEmail.split('@')[0] : "Unknown Student";

                        // Format for display
                        const formattedBooking = {
                            ...booking,
                            formattedDate: format(bookingDate, 'yyyy-MM-dd'),
                            studentName: studentName,
                            course: booking.department || "Not specified",
                        };

                        if (booking.status === 'pending')
                        {
                            categorizedBookings.pending.push(formattedBooking);
                        } else if (bookingDate < today || booking.status === 'completed' || booking.status === 'cancelled')
                        {
                            categorizedBookings.past.push(formattedBooking);
                        } else if (booking.status === 'confirmed')
                        {
                            categorizedBookings.upcoming.push(formattedBooking);
                        }
                    });

                    console.log("Categorized bookings:", categorizedBookings);
                    setBookings(categorizedBookings);
                }
            } catch (error)
            {
                console.error("Error fetching bookings:", error);
                toast.error("Failed to load bookings");
            } finally
            {
                setLoading(false);
            }
        };

        fetchBookings();

        // Mock time slots data for demo
        setTimeSlots([
            { day: "Monday", hours: "9:00 - 17:00" },
            { day: "Tuesday", hours: "9:00 - 17:00" },
            { day: "Wednesday", hours: "9:00 - 17:00" },
            { day: "Thursday", hours: "9:00 - 17:00" },
            { day: "Friday", hours: "9:00 - 15:00" }
        ]);
    }, []);

    const handleViewDetails = (booking) =>
    {
        setSelectedBooking(booking);
        setSessionNotes("");
        setShowDialog(true);
    };

    const handleStatusChange = async (bookingId, newStatus) =>
    {
        try
        {
            const token = localStorage.getItem('token');
            if (!token)
            {
                console.error("No token found in localStorage");
                return;
            }
            console.log("Token:", token);
            const response = await axios.put(
                `http://localhost:5000/api/status/updateBookingStatus/${bookingId}`,
                { status: newStatus },
            );


            if (response.data.success)
            {
                toast.success(`Booking status updated to ${newStatus}`);

                // Update local state
                const updatedBookings = { ...bookings };

                // Remove from old category
                ['upcoming', 'pending', 'past'].forEach(category =>
                {
                    updatedBookings[category] = updatedBookings[category].filter(b => b._id !== bookingId);
                });

                // Add to new category
                const updatedBooking = response.data.data || {
                    ...selectedBooking,
                    status: newStatus
                };

                if (newStatus === 'pending')
                {
                    updatedBookings.pending.push(updatedBooking);
                } else if (newStatus === 'confirmed')
                {
                    updatedBookings.upcoming.push(updatedBooking);
                } else if (newStatus === 'completed' || newStatus === 'cancelled')
                {
                    updatedBookings.past.push(updatedBooking);
                }

                setBookings(updatedBookings);
                setShowDialog(false);
            }
        } catch (error)
        {
            console.error("Error updating booking status:", error);
            toast.error("Failed to update booking status");
        }
    };

    const getStatusBadge = (status) =>
    {
        const statusStyles = {
            confirmed: "bg-green-100 text-green-800 hover:bg-green-200",
            pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
            completed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
            cancelled: "bg-red-100 text-red-800 hover:bg-red-200"
        };

        return (
            <Badge className={statusStyles[status] || "bg-gray-100 text-gray-800"}>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
            </Badge>
        );
    };

    const handleAddTimeSlot = () =>
    {
        const newSlot = {
            day: newTimeSlot.day.charAt(0).toUpperCase() + newTimeSlot.day.slice(1),
            hours: `${newTimeSlot.startTime}:00 - ${newTimeSlot.endTime}:00`
        };

        setTimeSlots([...timeSlots, newSlot]);
        toast.success("Time slot added");
    };

    const handleRemoveTimeSlot = (index) =>
    {
        const updatedSlots = [...timeSlots];
        updatedSlots.splice(index, 1);
        setTimeSlots(updatedSlots);
        toast.success("Time slot removed");
    };

    // Get highlighted days for calendar
    // const getHighlightedDays = () =>
    // {
    //     const highlightedDays = [];
    //     const allDateBookings = [...bookings.upcoming, ...bookings.pending];

    //     allDateBookings.forEach(booking =>
    //     {
    //         if (booking.date)
    //         {
    //             const bookingDate = new Date(booking.date);
    //             highlightedDays.push(bookingDate.getDate());
    //         }
    //     });

    //     return highlightedDays;
    // };

    const getHighlightedDays = () =>
    {
        const confirmedBookings = bookings.upcoming; // Already filtered as confirmed
        const days = confirmedBookings.map(b => new Date(b.date));
        return days;
    };

    // Get sessions for selected date
    const getSessionsForDate = (selectedDate) =>
    {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        // const allBookings = [...bookings.upcoming, ...bookings.pending];

        return bookings.upcoming.filter(booking => booking.formattedDate === formattedDate);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <LecturerSidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Booking Management</h1>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1 ">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                            <Button variant="default" size="sm" className="flex items-center gap-1 bg-black hover:bg-black">
                                <UserPlus className="h-4 w-4" />
                                <span>Set Availability</span>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Session Schedule</CardTitle>
                                <CardDescription>Manage your upcoming teaching sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                    </div>
                                ) : (
                                    <Tabs defaultValue="upcoming">
                                        <TabsList className="grid grid-cols-3 mb-4">
                                            <TabsTrigger value="upcoming">Upcoming ({bookings.upcoming.length})</TabsTrigger>
                                            <TabsTrigger value="pending">Pending ({bookings.pending.length})</TabsTrigger>
                                            <TabsTrigger value="past">History ({bookings.past.length})</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="upcoming">
                                            <div className="space-y-4">
                                                {bookings.upcoming.length > 0 ? (
                                                    bookings.upcoming.map((booking) => (
                                                        <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white">
                                                            <div className="mb-2 sm:mb-0">
                                                                <h4 className="font-medium">{booking.studentName}</h4>
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <CalendarIcon className="h-3 w-3" />
                                                                    <span>{booking.formattedDate}, {booking.time}</span>
                                                                </div>
                                                                <p className="text-sm">{booking.department} - {booking.topic}</p>
                                                                <p className="text-xs mt-1">{booking.consultationType} consultation</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {getStatusBadge(booking.status)}
                                                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                                                                    Details
                                                                </Button>
                                                                <Button variant="default" size="sm" className="flex items-center gap-1 bg-black hover:bg-black">
                                                                    <Video className="h-4 w-4" />
                                                                    <span>Start</span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center py-8 text-muted-foreground">No upcoming bookings</p>
                                                )}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="pending">
                                            <div className="space-y-4">
                                                {bookings.pending.length > 0 ? (
                                                    bookings.pending.map((booking) => (
                                                        <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white">
                                                            <div className="mb-2 sm:mb-0">
                                                                <h4 className="font-medium">{booking.studentName}</h4>
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <CalendarIcon className="h-3 w-3" />
                                                                    <span>{booking.formattedDate}, {booking.time}</span>
                                                                </div>
                                                                <p className="text-sm">{booking.department} - {booking.topic}</p>
                                                                <p className="text-xs mt-1">{booking.consultationType} consultation</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {getStatusBadge(booking.status)}
                                                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                                                                    Details
                                                                </Button>
                                                                <div className="flex gap-1">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                                                        onClick={() => handleStatusChange(booking._id, "cancelled")}
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="text-green-600 border-green-200 hover:bg-green-50"
                                                                        onClick={() => handleStatusChange(booking._id, "confirmed")}
                                                                    >
                                                                        <Check className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center py-8 text-muted-foreground">No pending bookings</p>
                                                )}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="past">
                                            <div className="space-y-4">
                                                {bookings.past.length > 0 ? (
                                                    bookings.past.map((booking) => (
                                                        <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white">
                                                            <div className="mb-2 sm:mb-0">
                                                                <h4 className="font-medium">{booking.studentName}</h4>
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <CalendarIcon className="h-3 w-3" />
                                                                    <span>{booking.formattedDate}, {booking.time}</span>
                                                                </div>
                                                                <p className="text-sm">{booking.department} - {booking.topic}</p>
                                                                <p className="text-xs mt-1">{booking.consultationType} consultation {booking.status === 'cancelled' && '(cancelled)'}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {getStatusBadge(booking.status)}
                                                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                                                                    Details
                                                                </Button>
                                                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                                    <FileText className="h-4 w-4" />
                                                                    <span>Notes</span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center py-8 text-muted-foreground">No past bookings</p>
                                                )}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Calendar View</CardTitle>
                                <CardDescription>Your confirmed teaching sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                    modifiers={{
                                        booked: getHighlightedDays(),
                                    }}
                                    modifiersClassNames={{
                                        booked: 'bg-green-200 text-green-900 font-semibold rounded-full',
                                    }}
                                />
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Confirmed Sessions on {format(date, 'MMMM d, yyyy')}</h4>
                                    <div className="space-y-2">
                                        {getSessionsForDate(date).length > 0 ? (
                                            getSessionsForDate(date).map(booking => (
                                                <div key={booking._id} className="p-2 text-sm border rounded-md">
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-medium">{booking.time}</p>
                                                        {getStatusBadge(booking.status)}
                                                    </div>
                                                    <p>{booking.studentName} - {booking.department}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No confirmed sessions</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                </div>
            </div>

            {/* Booking Details Dialog */}
            {selectedBooking && (
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                            <DialogDescription>
                                Session with {selectedBooking.studentName}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                            <div className="grid grid-cols-4 gap-2">
                                <div className="col-span-1 text-sm font-medium">Student:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.studentName}</div>

                                <div className="col-span-1 text-sm font-medium">Email:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.studentEmail}</div>

                                <div className="col-span-1 text-sm font-medium">Department:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.department}</div>

                                <div className="col-span-1 text-sm font-medium">Topic:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.topic}</div>

                                <div className="col-span-1 text-sm font-medium">Date:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.formattedDate}</div>

                                <div className="col-span-1 text-sm font-medium">Time:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.time}</div>

                                <div className="col-span-1 text-sm font-medium">Type:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.consultationType}</div>

                                {selectedBooking.platform && (
                                    <>
                                        <div className="col-span-1 text-sm font-medium">Platform:</div>
                                        <div className="col-span-3 text-sm">
                                            {selectedBooking.platform.charAt(0).toUpperCase() + selectedBooking.platform.slice(1)}
                                        </div>
                                    </>
                                )}

                                <div className="col-span-1 text-sm font-medium">Status:</div>
                                <div className="col-span-3 text-sm">{getStatusBadge(selectedBooking.status)}</div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-1">Session Notes</h4>
                                <Textarea
                                    placeholder="Add notes about this session..."
                                    value={sessionNotes}
                                    onChange={(e) => setSessionNotes(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="flex gap-2 mb-2 sm:mb-0">
                                {selectedBooking.status === "pending" && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="text-red-600"
                                            onClick={() => handleStatusChange(selectedBooking._id, "cancelled")}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-green-600"
                                            onClick={() => handleStatusChange(selectedBooking._id, "confirmed")}
                                        >
                                            Accept
                                        </Button>
                                    </>
                                )}
                                {selectedBooking.status === "confirmed" && (
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStatusChange(selectedBooking._id, "completed")}
                                    >
                                        Mark as Complete
                                    </Button>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setShowDialog(false)}>Close</Button>
                                {selectedBooking.status === "confirmed" && (
                                    <Button className="flex items-center gap-1 bg-black hover:bg-black">
                                        <Video className="h-4 w-4" />
                                        Start Session
                                    </Button>
                                )}
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}


