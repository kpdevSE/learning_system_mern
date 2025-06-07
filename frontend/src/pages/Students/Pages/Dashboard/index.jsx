import { useEffect, useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Clock, BookOpen, Award, User, Calendar as CalendarIcon, Activity, LoaderIcon, Bell, Settings } from "lucide-react";
import axios from "axios";
import { X } from "lucide-react"
import
{
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import
{
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function StudentDashboard()
{
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    // Mock data for the dashboard
    const upcomingClasses = [
        { id: 1, subject: "Mathematics", time: "10:00 AM", teacher: "Dr. Smith" },
        { id: 2, subject: "Physics", time: "1:30 PM", teacher: "Prof. Johnson" },
        { id: 3, subject: "Computer Science", time: "3:45 PM", teacher: "Ms. Davis" }
    ];

    const assignments = [
        { id: 1, title: "Calculus Problem Set", dueDate: "Apr 27", subject: "Mathematics", status: "Pending" },
        { id: 2, title: "Physics Lab Report", dueDate: "Apr 30", subject: "Physics", status: "In Progress" },
        { id: 3, title: "Programming Project", dueDate: "May 5", subject: "Computer Science", status: "Not Started" }
    ];

    const [courseCount, setCourseCount] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([])
    const [user, setUser] = useState({})
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [notificationCount, setNotificationsCount] = useState()


    // Get Notifications Count
    useEffect(() =>
    {
        const fetchNotificationCount = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                if (!token) return;
                const response = await axios.get('http://localhost:5000/api/users/notificationcount',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );

                setNotificationsCount(response.data.count)
                console.log(response.data.count)
            } catch (err)
            {
                console.log("Error Fetching Notifications Count")
            }
        }

        fetchNotificationCount()
    }, [])

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


                setUser(response.data.data);
                console.log(response.data.data)
            } catch (err)
            {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, []);

    const loggedRole = user.role;
    console.log(loggedRole)

    useEffect(() =>
    {
        const fetchStudentCount = async () =>
        {

            try
            {
                setLoading(true)
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/coursecount/count', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourseCount(response.data.total);
                console.log(response.data.total)

            } catch (err)
            {
                console.error('Error fetching courses count:', err);
            }
            setLoading(false)
        };

        fetchStudentCount();
    }, []);

    useEffect(() =>
    {
        const fetchMessages = async () =>
        {
            try
            {
                setLoading(true);

                const token = localStorage.getItem("token");



                const response = await axios.get(`http://localhost:5000/api/users/getnotifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMessage(response.data.notifications);
                console.log(response.data.notifications);
            } catch (err)
            {
                console.error("Error fetching notifications:", err);
            } finally
            {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() =>
    {
        if (user && message.length > 0)
        {
            // Only show notifications for student role
            const filtered = message.filter((msg) => msg.role === 'student');
            setFilteredMessages(filtered);
            console.log("Filtered Student Messages:", filtered);
        }
    }, [user, message]);

    // Update the notification count to only count student notifications
    const unreadCount = filteredMessages ? filteredMessages.filter(n => !n.read).length : 0;

    const formatDate = (dateString) =>
    {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />

            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
                    </div>
                    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                        <AlertDialogTrigger asChild>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <Bell className="h-6 w-6 text-gray-600" />
                                {unreadCount > 0 && (
                                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </div>
                                )}
                            </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="max-w-md w-full mx-4 p-0 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">Notifications</h2>
                                        <p className="text-blue-100 text-sm">
                                            {message ? message.length : 0} total, {unreadCount} unread
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                                            <Settings className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                                            title="Close"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-96 overflow-y-auto">
                                {loading ? (
                                    <div className="p-8 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                                        <p className="text-sm text-gray-500">Loading notifications...</p>
                                    </div>
                                ) : !filteredMessages || filteredMessages.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                        <p className="text-sm">No student notifications yet</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {filteredMessages.map((notification, index) => (
                                            <div
                                                key={notification._id || index}
                                                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-400' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    {/* Avatar or Icon */}
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                                                        {notification.sender ? notification.sender.charAt(0).toUpperCase() : 'A'}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {notification.sender || 'Admin User'}
                                                            </p>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                            )}
                                                        </div>
                                                        <p className={`text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'} mb-2`}>
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(notification.createdAt || notification.timestamp)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {message && message.length > 0 && (
                                <div className="border-t bg-gray-50 px-4 py-3">
                                    <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        View All Notifications
                                    </button>
                                </div>
                            )}
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button className="flex items-center gap-2 bg-black hover:bg-black">
                        <User size={16} />
                        My Profile
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">All Courses</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <span className="text-2xl font-bold">{
                                loading ? (
                                    <div>
                                        <LoaderIcon />
                                    </div>) : (
                                    <div>
                                        {courseCount}
                                    </div>
                                )}</span>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">7</div>
                            <p className="text-xs text-muted-foreground">4 pending</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">GPA</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3.8</div>
                            <p className="text-xs text-muted-foreground">+0.2 from last semester</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">96%</div>
                            <p className="text-xs text-muted-foreground">Last 30 days</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="classes">
                            <TabsList className="mb-4">
                                <TabsTrigger value="classes">Today's Classes</TabsTrigger>
                                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                            </TabsList>

                            <TabsContent value="classes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Classes</CardTitle>
                                        <CardDescription>Your schedule for today</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {upcomingClasses.map((cls) => (
                                                <div key={cls.id} className="flex items-center justify-between border-b pb-4">
                                                    <div>
                                                        <p className="font-medium">{cls.subject}</p>
                                                        <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <p className="text-sm">{cls.time}</p>
                                                        <Button variant="outline" size="sm">Join</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">View Full Schedule</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="assignments">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Assignments</CardTitle>
                                        <CardDescription>Track your pending work</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {assignments.map((assignment) => (
                                                <div key={assignment.id} className="flex items-center justify-between border-b pb-4">
                                                    <div>
                                                        <p className="font-medium">{assignment.title}</p>
                                                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-sm">Due: {assignment.dueDate}</p>
                                                            <p className="text-xs text-muted-foreground">{assignment.status}</p>
                                                        </div>
                                                        <Button variant="outline" size="sm">View</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">View All Assignments</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <Card>
                            <CardHeader>
                                <CardTitle>Course Progress</CardTitle>
                                <CardDescription>Your performance in current courses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium">Mathematics</p>
                                            <p className="text-sm">85%</p>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-200">
                                            <div className="h-2 rounded-full bg-blue-600 w-4/5"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium">Physics</p>
                                            <p className="text-sm">70%</p>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-200">
                                            <div className="h-2 rounded-full bg-blue-600 w-3/4"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium">Computer Science</p>
                                            <p className="text-sm">92%</p>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-200">
                                            <div className="h-2 rounded-full bg-blue-600 w-11/12"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Calendar</span>
                                    <CalendarIcon className="h-4 w-4" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Announcements</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border-l-4 border-blue-600 pl-4 py-2">
                                    <p className="font-medium">Midterm Exam Schedule</p>
                                    <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                                </div>
                                <div className="border-l-4 border-blue-600 pl-4 py-2">
                                    <p className="font-medium">Library Closure</p>
                                    <p className="text-sm text-muted-foreground">Posted 3 days ago</p>
                                </div>
                                <div className="border-l-4 border-blue-600 pl-4 py-2">
                                    <p className="font-medium">Course Registration</p>
                                    <p className="text-sm text-muted-foreground">Posted 5 days ago</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full">View All</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}