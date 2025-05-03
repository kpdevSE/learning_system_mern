import { useEffect, useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Clock, BookOpen, Award, User, Calendar as CalendarIcon, Activity, LoaderIcon, Bell } from "lucide-react";
import axios from "axios";
import { Terminal } from "lucide-react"
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
            const role = user.role;
            const filtered = message.filter((msg) => msg.role === role);
            setFilteredMessages(filtered);
            console.log("Filtered Messages:", filtered);
        }
    }, [user, message]);


    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />

            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
                    </div>
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
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                    {filteredMessages.map((e, index) => (
                                        <div>

                                            <p className="text-gray-800 text-lg">{e.message}</p>
                                            <p className="text-[13px] text-gray-400 font-semibold">By Admin User</p>
                                        </div>

                                    ))}
                                </AlertDescription>
                            </Alert>


                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-black text-white hover:bg-black hover:text-white cursor-pointer">Cancel</AlertDialogCancel>

                            </AlertDialogFooter>
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