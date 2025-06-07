import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, DollarSign, Star, Clock, LoaderIcon, IndianRupee, Bell, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function LecturerDashboard()
{
    // Mock data for dashboard
    const upcomingSessions = [
        { id: 1, studentName: "Alice Brown", course: "Business English", time: "2:00 PM - 3:00 PM", date: "Today" },
        { id: 2, studentName: "Mike Johnson", course: "IELTS Preparation", time: "10:00 AM - 11:30 AM", date: "Tomorrow" },
        { id: 3, studentName: "Sarah Williams", course: "Conversational English", time: "4:00 PM - 5:00 PM", date: "Tomorrow" },
    ];

    const recentReviews = [
        { id: 1, studentName: "David Lee", rating: 5, comment: "Excellent teaching style, very helpful!" },
        { id: 2, studentName: "Emma Watson", rating: 4, comment: "Clear explanations and patient." },
    ];

    const [studentCount, setStudentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notificationCount, setNotificationsCount] = useState()
    const [user, setUser] = useState({})
    const [payementCount, setPayementCount] = useState()

    // Get Notifications Count
    useEffect(() =>
    {
        const fetchNotificationCount = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                if (!token) return;
                const response = await axios.get('http://localhost:5000/api/users/teachernotificationcount',
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

    const lecturerEmail = user.email;

    const [reviewsDataDetails, setReviewsDataDetails] = useState({
        average: 0,
        total: 0,
        reviews: [],
    });

    useEffect(() =>
    {
        const fetchReviews = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/users/getreviewbyemail/${encodeURIComponent(lecturerEmail)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setReviewsDataDetails({
                    average: res.data.average,
                    total: res.data.total,
                    reviews: res.data.data,
                });
            } catch (err)
            {
                console.error("Error fetching reviews:", err);
            } finally
            {
                setLoading(false);
            }
        };

        if (lecturerEmail)
        {
            setLoading(true);
            fetchReviews();
        }
    }, [lecturerEmail]);



    useEffect(() =>
    {
        const fetchStudentCount = async () =>
        {
            const token = localStorage.getItem('token');
            try
            {
                setLoading(true)
                const response = await axios.get('http://localhost:5000/api/users/student/count', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStudentCount(response.data.total);

            } catch (err)
            {
                console.error('Error fetching student count:', err);
            }
            setLoading(false)
        };

        fetchStudentCount();
    }, []);






    const [message, setMessage] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([]);

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
                // Filter messages for teacher role immediately after fetching
                const teacherMessages = response.data.notifications.filter(msg => msg.role === 'teacher');
                setFilteredMessages(teacherMessages);
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

    const loggedRole = user.role;
    console.log(loggedRole)

    useEffect(() =>
    {
        const fetchPayementCount = async () =>
        {
            const token = localStorage.getItem('token');
            try
            {
                setLoading(true)
                const response = await axios.get('http://localhost:5000/api/users/countofpayement', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPayementCount(response.data.data);
                console.log(response.data.data)
            } catch (err)
            {
                console.error('Error fetching Payement count:', err);
            }
            setLoading(false)
        };

        fetchPayementCount();
    }, []);

    const [isOpen, setIsOpen] = useState(false);
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

    useEffect(() =>
    {
        if (user && message.length > 0)
        {
            const role = user.role;
            const filtered = message.filter((msg) => msg.role === role);
            setFilteredMessages(filtered);
            console.log("Filtered Messages:", filtered);
        }
    }, [user, message]);


    return (
        <div className="flex min-h-screen bg-slate-50">
            <LecturerSidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Lecturer Dashboard</h1>

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
                                            {filteredMessages ? filteredMessages.length : 0} total, {unreadCount} unread
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
                                        <p className="text-sm">No notifications yet</p>
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
                            {filteredMessages && filteredMessages.length > 0 && (
                                <div className="border-t bg-gray-50 px-4 py-3">
                                    <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        View All Notifications
                                    </button>
                                </div>
                            )}
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <span className="text-2xl font-bold">{
                                    loading ? (
                                        <div>
                                            <LoaderIcon />
                                        </div>) : (
                                        <div>
                                            {studentCount}
                                        </div>
                                    )}</span>
                                <Users className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <span className="text-2xl font-bold">7</span>
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">



                                <span className="text-2xl font-bold" >Rs . 56780</span>



                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold mr-2">{Number(reviewsDataDetails.average).toFixed(1)}</span>
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                </div>
                                <span className="text-sm text-muted-foreground font-bold">{reviewsDataDetails.total} reviews</span>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Monthly Goal */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Monthly Goal Progress</CardTitle>
                            <CardDescription>Teaching hours: 28/40</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={70} className="h-2" />
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground">
                            70% of your monthly goal completed
                        </CardFooter>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Upcoming Sessions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Sessions</CardTitle>
                                <CardDescription>Your scheduled lectures for the next 48 hours</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingSessions.map(session => (
                                        <div key={session.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="font-medium">{session.studentName}</h4>
                                                <p className="text-sm text-muted-foreground">{session.course}</p>
                                                <div className="flex items-center mt-1">
                                                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">{session.time}</span>
                                                </div>
                                            </div>
                                            <Badge variant={session.date === "Today" ? "destructive" : "outline"}>
                                                {session.date}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <a href="/lecturer/bookings" className="text-sm text-blue-600 hover:underline">
                                    View all scheduled sessions →
                                </a>
                            </CardFooter>
                        </Card>

                        {/* Recent Reviews */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Reviews</CardTitle>
                                <CardDescription>What your students are saying</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentReviews.map(review => (
                                        <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">{review.studentName}</h4>
                                                <div className="flex items-center">
                                                    <span className="mr-1 text-sm">{review.rating}</span>
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <a href="/lecturer/reviews" className="text-sm text-blue-600 hover:underline">
                                    View all reviews →
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}