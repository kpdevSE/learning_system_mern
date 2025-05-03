
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, DollarSign, Star, Clock, LoaderIcon, IndianRupee, Bell } from "lucide-react";
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
    const [user, setUser] = useState({})
    const [filteredMessages, setFilteredMessages] = useState([]);

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

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Notification</AlertDialogTitle>
                                <AlertDialogDescription>
                                    View your Notifications
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="space-y-4">
                                {filteredMessages.map((e, index) => (
                                    <Card key={index} className="p-4 shadow-md rounded-lg border border-black">
                                        <p className="text-gray-800 text-lg">{e.message}</p>
                                        <p className="text-[13px] text-gray-400 font-semibold">By Admin User</p>
                                    </Card>
                                ))}
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white hover:bg-black hover:text-white cursor-pointer">Cancel</AlertDialogCancel>

                            </AlertDialogFooter>
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
                                    <span className="text-2xl font-bold mr-2">4.8</span>
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                </div>
                                <span className="text-sm text-muted-foreground">(32 reviews)</span>
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