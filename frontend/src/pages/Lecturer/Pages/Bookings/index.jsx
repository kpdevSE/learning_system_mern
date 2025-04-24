import { useState } from "react";
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
import { Calendar as CalendarIcon, Clock, FileText, Video, X, Check, UserPlus, Filter } from "lucide-react";

export default function Bookings()
{
    const [date, setDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    // Mock data for bookings
    const upcomingBookings = [
        {
            id: 1,
            studentName: "Alice Brown",
            course: "Business English",
            date: "2025-04-25",
            time: "14:00 - 15:00",
            status: "confirmed",
            topic: "Presentation Skills"
        },
        {
            id: 2,
            studentName: "Mike Johnson",
            course: "IELTS Preparation",
            date: "2025-04-25",
            time: "10:00 - 11:30",
            status: "confirmed",
            topic: "Writing Task 2"
        },
        {
            id: 3,
            studentName: "Sarah Williams",
            course: "Conversational English",
            date: "2025-04-26",
            time: "16:00 - 17:00",
            status: "confirmed",
            topic: "Daily Routines Discussion"
        }
    ];

    const pendingBookings = [
        {
            id: 4,
            studentName: "Robert Chen",
            course: "General English",
            date: "2025-04-30",
            time: "09:00 - 10:00",
            status: "pending",
            topic: "Grammar Review"
        },
        {
            id: 5,
            studentName: "Diana Miller",
            course: "Business English",
            date: "2025-05-02",
            time: "13:00 - 14:00",
            status: "pending",
            topic: "Job Interview Preparation"
        }
    ];

    const pastBookings = [
        {
            id: 6,
            studentName: "James Wilson",
            course: "IELTS Preparation",
            date: "2025-04-20",
            time: "15:30 - 16:30",
            status: "completed",
            topic: "Speaking Practice"
        },
        {
            id: 7,
            studentName: "Emma Garcia",
            course: "Conversational English",
            date: "2025-04-18",
            time: "11:00 - 12:00",
            status: "completed",
            topic: "Travel Vocabulary"
        },
        {
            id: 8,
            studentName: "Olivia Taylor",
            course: "General English",
            date: "2025-04-15",
            time: "17:00 - 18:00",
            status: "completed",
            topic: "Past Tense Review"
        }
    ];

    const handleViewDetails = (booking) =>
    {
        setSelectedBooking(booking);
        setShowDialog(true);
    };

    const handleStatusChange = (bookingId, newStatus) =>
    {
        alert(`Booking #${bookingId} status changed to ${newStatus}`);
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
                                <Tabs defaultValue="upcoming">
                                    <TabsList className="grid grid-cols-3 mb-4">
                                        <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                                        <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
                                        <TabsTrigger value="past">History ({pastBookings.length})</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="upcoming">
                                        <div className="space-y-4">
                                            {upcomingBookings.map(booking => (
                                                <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white">
                                                    <div className="mb-2 sm:mb-0">
                                                        <h4 className="font-medium">{booking.studentName}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <CalendarIcon className="h-3 w-3" />
                                                            <span>{booking.date}, {booking.time}</span>
                                                        </div>
                                                        <p className="text-sm">{booking.course} - {booking.topic}</p>
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
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="pending">
                                        <div className="space-y-4">
                                            {pendingBookings.map(booking => (
                                                <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white">
                                                    <div className="mb-2 sm:mb-0">
                                                        <h4 className="font-medium">{booking.studentName}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <CalendarIcon className="h-3 w-3" />
                                                            <span>{booking.date}, {booking.time}</span>
                                                        </div>
                                                        <p className="text-sm">{booking.course} - {booking.topic}</p>
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
                                                                onClick={() => handleStatusChange(booking.id, "rejected")}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-green-600 border-green-200 hover:bg-green-50"
                                                                onClick={() => handleStatusChange(booking.id, "confirmed")}
                                                            >
                                                                <Check className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="past">
                                        <div className="space-y-4">
                                            {pastBookings.map(booking => (
                                                <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white">
                                                    <div className="mb-2 sm:mb-0">
                                                        <h4 className="font-medium">{booking.studentName}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <CalendarIcon className="h-3 w-3" />
                                                            <span>{booking.date}, {booking.time}</span>
                                                        </div>
                                                        <p className="text-sm">{booking.course} - {booking.topic}</p>
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
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Calendar View</CardTitle>
                                <CardDescription>Your teaching schedule</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border "
                                    highlightedDays={[
                                        new Date(2025, 3, 25).getDate(),
                                        new Date(2025, 3, 26).getDate(),
                                        new Date(2025, 3, 30).getDate(),
                                        new Date(2025, 4, 2).getDate(),
                                    ]}
                                />
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Sessions on {date.toLocaleDateString()}</h4>
                                    <div className="space-y-2">
                                        {[...upcomingBookings, ...pendingBookings].filter(
                                            booking => booking.date === date.toISOString().split('T')[0]
                                        ).map(booking => (
                                            <div key={booking.id} className="p-2 text-sm border rounded-md">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-medium">{booking.time}</p>
                                                    {getStatusBadge(booking.status)}
                                                </div>
                                                <p>{booking.studentName} - {booking.course}</p>
                                            </div>
                                        ))}
                                        {![...upcomingBookings, ...pendingBookings].some(
                                            booking => booking.date === date.toISOString().split('T')[0]
                                        ) && (
                                                <p className="text-sm text-muted-foreground">No sessions scheduled</p>
                                            )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Availability</CardTitle>
                            <CardDescription>Set your teaching hours and breaks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Day</h4>
                                    <Select defaultValue="monday">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="monday">Monday</SelectItem>
                                            <SelectItem value="tuesday">Tuesday</SelectItem>
                                            <SelectItem value="wednesday">Wednesday</SelectItem>
                                            <SelectItem value="thursday">Thursday</SelectItem>
                                            <SelectItem value="friday">Friday</SelectItem>
                                            <SelectItem value="saturday">Saturday</SelectItem>
                                            <SelectItem value="sunday">Sunday</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Start Time</h4>
                                    <Select defaultValue="9">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Start time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 14 }, (_, i) => i + 8).map(hour => (
                                                <SelectItem key={hour} value={hour.toString()}>
                                                    {hour}:00
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">End Time</h4>
                                    <Select defaultValue="17">
                                        <SelectTrigger>
                                            <SelectValue placeholder="End time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 14 }, (_, i) => i + 8).map(hour => (
                                                <SelectItem key={hour} value={hour.toString()}>
                                                    {hour}:00
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button className="w-full bg-black hover:bg-black">Add Time Slot</Button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm font-medium mb-2">Current Weekly Schedule</h4>
                                <div className="border rounded-md overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-100">
                                                <th className="text-left p-2 text-sm font-medium">Day</th>
                                                <th className="text-left p-2 text-sm font-medium">Hours</th>
                                                <th className="text-left p-2 text-sm font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-t">
                                                <td className="p-2 text-sm">Monday</td>
                                                <td className="p-2 text-sm">9:00 - 17:00</td>
                                                <td className="p-2 text-sm">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                                                </td>
                                            </tr>
                                            <tr className="border-t">
                                                <td className="p-2 text-sm">Tuesday</td>
                                                <td className="p-2 text-sm">9:00 - 17:00</td>
                                                <td className="p-2 text-sm">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                                                </td>
                                            </tr>
                                            <tr className="border-t">
                                                <td className="p-2 text-sm">Wednesday</td>
                                                <td className="p-2 text-sm">9:00 - 17:00</td>
                                                <td className="p-2 text-sm">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                                                </td>
                                            </tr>
                                            <tr className="border-t">
                                                <td className="p-2 text-sm">Thursday</td>
                                                <td className="p-2 text-sm">9:00 - 17:00</td>
                                                <td className="p-2 text-sm">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                                                </td>
                                            </tr>
                                            <tr className="border-t">
                                                <td className="p-2 text-sm">Friday</td>
                                                <td className="p-2 text-sm">9:00 - 15:00</td>
                                                <td className="p-2 text-sm">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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

                                <div className="col-span-1 text-sm font-medium">Course:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.course}</div>

                                <div className="col-span-1 text-sm font-medium">Topic:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.topic}</div>

                                <div className="col-span-1 text-sm font-medium">Date:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.date}</div>

                                <div className="col-span-1 text-sm font-medium">Time:</div>
                                <div className="col-span-3 text-sm">{selectedBooking.time}</div>

                                <div className="col-span-1 text-sm font-medium">Status:</div>
                                <div className="col-span-3 text-sm">{getStatusBadge(selectedBooking.status)}</div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-1">Session Notes</h4>
                                <Textarea placeholder="Add notes about this session..." />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="flex gap-2 mb-2 sm:mb-0">
                                {selectedBooking.status === "pending" && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="text-red-600"
                                            onClick={() =>
                                            {
                                                handleStatusChange(selectedBooking.id, "rejected");
                                                setShowDialog(false);
                                            }}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-green-600"
                                            onClick={() =>
                                            {
                                                handleStatusChange(selectedBooking.id, "confirmed");
                                                setShowDialog(false);
                                            }}
                                        >
                                            Accept
                                        </Button>
                                    </>
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