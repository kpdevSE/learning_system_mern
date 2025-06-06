

import { useState, useEffect } from "react";
import
{
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import
{
    Activity,
    Users,
    GraduationCap,
    BookOpen,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    FileText,
    Filter,
    ChevronDown,
    DollarSign,
    AlertCircle,
    Clock,
    Star,
    Eye,
    PlayCircle
} from "lucide-react";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminSidebar from "../../Components/AdminSidebar";

export default function AnalyticsPage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [timeRange, setTimeRange] = useState("This Month");
    const [paymentData, setPaymentData] = useState({
        data: [],
        totalAmount: 0,
        totalCourses: 0
    });
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [analytics, setAnalytics] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        uniqueStudents: 0,
        uniqueLecturers: 0,
        uniqueCourses: 0,
        avgPrice: 0,
        completionRate: 85,
        totalLessons: 0,
        avgDuration: 0,
        publishedCourses: 0
    });

    // Fetch all courses
    const fetchCourses = async () =>
    {
        try
        {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/users/allcourses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setCourses(result.data || []);
            console.log('Courses fetched:', result.data);
        } catch (error)
        {
            console.error('Error fetching courses:', error);
            // Set fallback course data
            const fallbackCourses = [
                {
                    _id: '1',
                    courseName: 'React Fundamentals',
                    price: 10000,
                    topicOne: 'Programming',
                    topicTwo: 'Frontend',
                    duration: '4 weeks',
                    lessonsQuantity: 12,
                    smallDescription: 'Learn React basics',
                    fullDescription: 'Complete React course for beginners',
                    imageUrl: 'https://example.com/react.jpg',
                    youtubeUrl: 'https://youtube.com/watch?v=example',
                    lectureEmail: 'lecturer1@example.com',
                    publishedAt: new Date().toISOString(),
                    __v: 0
                },
                {
                    _id: '2',
                    courseName: 'Advanced JavaScript',
                    price: 15000,
                    topicOne: 'Programming',
                    topicTwo: 'Backend',
                    duration: '6 weeks',
                    lessonsQuantity: 18,
                    smallDescription: 'Master JavaScript concepts',
                    fullDescription: 'Advanced JavaScript for professionals',
                    imageUrl: 'https://example.com/js.jpg',
                    youtubeUrl: 'https://youtube.com/watch?v=example2',
                    lectureEmail: 'lecturer2@example.com',
                    publishedAt: new Date().toISOString(),
                    __v: 0
                }
            ];
            setCourses(fallbackCourses);
        }
    };

    // Real API call integration
    const fetchPaymentData = async () =>
    {
        try
        {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/users/allpayments', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result)
            {
                const newPaymentData = {
                    data: result.data || [],
                    totalAmount: result.totalAmount || 0,
                    totalCourses: result.totalCourses || 0
                };

                setPaymentData(newPaymentData);
                calculateAnalytics(newPaymentData.data);
            }
        } catch (error)
        {
            console.error('Error fetching payment data:', error);
            setError(error.message);

            // Set fallback payment data
            const fallbackData = {
                data: [
                    {
                        _id: '1',
                        savedCourseName: 'React Fundamentals',
                        savedPrice: '10000',
                        loggedUserEmail: 'student1@example.com',
                        savedLecturerEmail: 'lecturer1@example.com',
                        savedUsername: 'John Doe',
                        cardholderName: 'Prof. Smith',
                        savedTopicOne: 'Programming',
                        savedDuration: '4 weeks',
                        savedQuantity: 1,
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: '2',
                        savedCourseName: 'Advanced JavaScript',
                        savedPrice: '15000',
                        loggedUserEmail: 'student2@example.com',
                        savedLecturerEmail: 'lecturer2@example.com',
                        savedUsername: 'Jane Smith',
                        cardholderName: 'Dr. Johnson',
                        savedTopicOne: 'Programming',
                        savedDuration: '6 weeks',
                        savedQuantity: 1,
                        createdAt: new Date().toISOString()
                    }
                ],
                totalAmount: 25000,
                totalCourses: 2
            };

            setPaymentData(fallbackData);
            calculateAnalytics(fallbackData.data);
        } finally
        {
            setLoading(false);
        }
    };

    const calculateAnalytics = (paymentData) =>
    {
        if (!paymentData || paymentData.length === 0)
        {
            setAnalytics({
                totalRevenue: 0,
                totalBookings: 0,
                uniqueStudents: 0,
                uniqueLecturers: 0,
                uniqueCourses: 0,
                avgPrice: 0,
                completionRate: 85,
                totalLessons: 0,
                avgDuration: 0,
                publishedCourses: 0
            });
            return;
        }

        const totalRevenue = paymentData.reduce((sum, item) => sum + parseFloat(item.savedPrice || 0), 0);
        const totalBookings = paymentData.length;
        const uniqueStudents = new Set(paymentData.map(item => item.loggedUserEmail || item.savedStudentEmail)).size;
        const uniqueLecturers = new Set(paymentData.map(item => item.savedLecturerEmail)).size;
        const uniqueCourses = new Set(paymentData.map(item => item.savedCourseName)).size;
        const avgPrice = totalBookings > 0 ? totalRevenue / totalBookings : 0;

        // Calculate course-specific analytics
        const totalLessons = courses.reduce((sum, course) => sum + (course.lessonsQuantity || 0), 0);
        const avgDuration = courses.length > 0 ?
            courses.reduce((sum, course) =>
            {
                const duration = course.duration ? parseInt(course.duration.match(/\d+/)?.[0] || 0) : 0;
                return sum + duration;
            }, 0) / courses.length : 0;
        const publishedCourses = courses.filter(course => course.publishedAt).length;

        setAnalytics({
            totalRevenue,
            totalBookings,
            uniqueStudents,
            uniqueLecturers,
            uniqueCourses,
            avgPrice,
            completionRate: 85,
            totalLessons,
            avgDuration,
            publishedCourses
        });
    };

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            await Promise.all([fetchPaymentData(), fetchCourses()]);
        };
        fetchData();
    }, []);

    useEffect(() =>
    {
        if (courses.length > 0 && paymentData.data.length > 0)
        {
            calculateAnalytics(paymentData.data);
        }
    }, [courses, paymentData]);

    // Process data for charts
    const getRevenueByMonth = () =>
    {
        const monthlyData = {};
        paymentData.data.forEach(item =>
        {
            const date = new Date(item.createdAt);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(item.savedPrice || 0);
        });

        return Object.entries(monthlyData).map(([month, revenue]) => ({
            month: month.substring(5),
            revenue
        }));
    };

    const getCourseDetailsWithEnrollments = () =>
    {
        const enrollmentData = {};
        paymentData.data.forEach(payment =>
        {
            if (payment.savedCourseName)
            {
                enrollmentData[payment.savedCourseName] = (enrollmentData[payment.savedCourseName] || 0) + 1;
            }
        });

        return courses.map(course => ({
            ...course,
            enrollments: enrollmentData[course.courseName] || 0,
            revenue: (enrollmentData[course.courseName] || 0) * (course.price || 0)
        }));
    };

    const getTopicDistribution = () =>
    {
        const topics = {};
        courses.forEach(course =>
        {
            if (course.topicOne)
            {
                topics[course.topicOne] = (topics[course.topicOne] || 0) + 1;
            }
            if (course.topicTwo && course.topicTwo !== course.topicOne)
            {
                topics[course.topicTwo] = (topics[course.topicTwo] || 0) + 1;
            }
        });

        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];
        return Object.entries(topics).map(([topic, count], index) => ({
            name: topic,
            value: count,
            fill: colors[index % colors.length]
        }));
    };

    const getLecturerPerformance = () =>
    {
        const lecturerData = {};

        // Get lecturer data from courses
        courses.forEach(course =>
        {
            if (course.lectureEmail)
            {
                if (!lecturerData[course.lectureEmail])
                {
                    lecturerData[course.lectureEmail] = {
                        email: course.lectureEmail,
                        courses: 0,
                        totalLessons: 0,
                        enrollments: 0,
                        revenue: 0
                    };
                }
                lecturerData[course.lectureEmail].courses += 1;
                lecturerData[course.lectureEmail].totalLessons += course.lessonsQuantity || 0;
            }
        });

        // Add payment data
        paymentData.data.forEach(payment =>
        {
            if (payment.savedLecturerEmail && lecturerData[payment.savedLecturerEmail])
            {
                lecturerData[payment.savedLecturerEmail].enrollments += 1;
                lecturerData[payment.savedLecturerEmail].revenue += parseFloat(payment.savedPrice || 0);
            }
        });

        return Object.values(lecturerData);
    };

    const revenueData = getRevenueByMonth();
    const courseDetailsData = getCourseDetailsWithEnrollments();
    const topicDistributionData = getTopicDistribution();
    const lecturerPerformanceData = getLecturerPerformance();

    if (loading)
    {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
                                <Activity className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Analytics Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{timeRange}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTimeRange("Today")}>Today</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeRange("This Week")}>This Week</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeRange("This Month")}>This Month</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeRange("Last 3 Months")}>Last 3 Months</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTimeRange("This Year")}>This Year</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" onClick={() => Promise.all([fetchPaymentData(), fetchCourses()])}>
                                <Download className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {error && (
                        <Alert className="mb-4 border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                                API Error: {error}. Using fallback data for demonstration.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-800">
                            <strong>Data Source:</strong> {error ? 'Fallback Data (API Error)' : 'Live API Data'} |
                            <strong> Payment Records:</strong> {paymentData.data.length} |
                            <strong> Course Records:</strong> {courses.length} |
                            <strong> Last Updated:</strong> {new Date().toLocaleTimeString()}
                        </div>
                    </div>

                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="courses">Courses</TabsTrigger>
                            <TabsTrigger value="students">Students</TabsTrigger>
                            <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            {/* Enhanced Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                        <DollarSign className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">LKR {analytics.totalRevenue.toLocaleString()}</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className="flex items-center text-green-600">
                                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                                12.5%
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                                        <BookOpen className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{courses.length}</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className="text-gray-500">
                                                {analytics.publishedCourses} published
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
                                        <PlayCircle className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{analytics.totalLessons}</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className="text-gray-500">
                                                Avg {(analytics.totalLessons / Math.max(courses.length, 1)).toFixed(1)} per course
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                                        <Clock className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{analytics.avgDuration.toFixed(1)} weeks</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className="text-gray-500">
                                                Course duration
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Monthly Revenue</CardTitle>
                                        <CardDescription>Revenue trends over time</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={revenueData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip formatter={(value) => [`LKR ${value.toLocaleString()}`, 'Revenue']} />
                                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Topic Distribution</CardTitle>
                                        <CardDescription>Popular course categories</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={topicDistributionData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {topicDistributionData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="courses" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
                                        <div className="text-sm text-gray-600">Total Courses</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-2xl font-bold text-green-600">{analytics.totalLessons}</div>
                                        <div className="text-sm text-gray-600">Total Lessons</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-2xl font-bold text-purple-600">LKR {courses.reduce((sum, course) => sum + (course.price || 0), 0).toLocaleString()}</div>
                                        <div className="text-sm text-gray-600">Total Course Value</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Performance</CardTitle>
                                    <CardDescription>Detailed course analytics with enrollment data</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {courseDetailsData.map((course, index) => (
                                            <div key={course._id || index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="font-semibold text-lg">{course.courseName}</h3>
                                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                {course.topicOne}
                                                            </span>
                                                            {course.topicTwo && course.topicTwo !== course.topicOne && (
                                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                                    {course.topicTwo}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-2">{course.smallDescription}</p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <PlayCircle className="h-4 w-4" />
                                                                {course.lessonsQuantity || 0} lessons
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4" />
                                                                {course.duration || 'N/A'}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Users className="h-4 w-4" />
                                                                {course.enrollments} enrolled
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-green-600">
                                                            LKR {(course.price || 0).toLocaleString()}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Revenue: LKR {course.revenue.toLocaleString()}
                                                        </div>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            by {course.lectureEmail}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Enrollment Rate</span>
                                                        <span>{course.enrollments} students</span>
                                                    </div>
                                                    <Progress
                                                        value={course.enrollments > 0 ? Math.min((course.enrollments / 50) * 100, 100) : 0}
                                                        className="h-2"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="students" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Analytics</CardTitle>
                                    <CardDescription>Detailed student enrollment and activity</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{analytics.uniqueStudents}</div>
                                                <div className="text-sm text-blue-800">Total Students</div>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">LKR {analytics.avgPrice.toFixed(0)}</div>
                                                <div className="text-sm text-green-800">Avg. Course Price</div>
                                            </div>
                                            <div className="bg-purple-50 p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-purple-600">{analytics.totalBookings}</div>
                                                <div className="text-sm text-purple-800">Total Enrollments</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-medium">Recent Students</h4>
                                            {paymentData.data.slice(0, 5).map((student, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <div className="font-medium">{student.savedUsername || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500">{student.loggedUserEmail || student.savedStudentEmail || 'N/A'}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">{student.savedCourseName || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500">LKR {parseFloat(student.savedPrice || 0).toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="lecturers" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lecturer Performance</CardTitle>
                                    <CardDescription>Lecturer analytics and performance metrics</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-blue-600">{analytics.uniqueLecturers}</div>
                                                <div className="text-sm text-gray-600">Total Lecturers</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {lecturerPerformanceData.length > 0 ?
                                                        (lecturerPerformanceData.reduce((sum, l) => sum + l.courses, 0) / lecturerPerformanceData.length).toFixed(1) : 0}
                                                </div>
                                                <div className="text-sm text-gray-600">Avg Courses per Lecturer</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {lecturerPerformanceData.length > 0 ?
                                                        (lecturerPerformanceData.reduce((sum, l) => sum + l.totalLessons, 0) / lecturerPerformanceData.length).toFixed(1) : 0}
                                                </div>
                                                <div className="text-sm text-gray-600">Avg Lessons per Lecturer</div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-4">
                                        {lecturerPerformanceData.length > 0 ? (
                                            lecturerPerformanceData.map((lecturer, index) => (
                                                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div>
                                                            <div className="font-medium text-lg">{lecturer.email}</div>
                                                            <div className="text-sm text-gray-500">Lecturer</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-green-600">
                                                                LKR {lecturer.revenue.toLocaleString()}
                                                            </div>
                                                            <div className="text-sm text-gray-500">Total Revenue</div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div className="text-center p-2 bg-blue-50 rounded">
                                                            <div className="font-semibold text-blue-600">{lecturer.courses}</div>
                                                            <div className="text-blue-800">Courses</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-green-50 rounded">
                                                            <div className="font-semibold text-green-600">{lecturer.totalLessons}</div>
                                                            <div className="text-green-800">Total Lessons</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-purple-50 rounded">
                                                            <div className="font-semibold text-purple-600">{lecturer.enrollments}</div>
                                                            <div className="text-purple-800">Enrollments</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-orange-50 rounded">
                                                            <div className="font-semibold text-orange-600">
                                                                {lecturer.enrollments > 0 ? (lecturer.revenue / lecturer.enrollments).toFixed(0) : 0}
                                                            </div>
                                                            <div className="text-orange-800">Avg Revenue/Student</div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span>Performance Score</span>
                                                            <span>{lecturer.enrollments} students</span>
                                                        </div>
                                                        <Progress
                                                            value={lecturer.enrollments > 0 ? Math.min((lecturer.enrollments / 20) * 100, 100) : 0}
                                                            className="h-2"
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                No lecturer data available
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Performing Lecturers Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lecturer Revenue Comparison</CardTitle>
                                    <CardDescription>Revenue generated by each lecturer</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {lecturerPerformanceData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={lecturerPerformanceData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis
                                                    dataKey="email"
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={100}
                                                    interval={0}
                                                />
                                                <YAxis />
                                                <Tooltip
                                                    formatter={(value, name) => [
                                                        name === 'revenue' ? `LKR ${value.toLocaleString()}` : value,
                                                        name === 'revenue' ? 'Revenue' : name
                                                    ]}
                                                    labelFormatter={(label) => `Lecturer: ${label}`}
                                                />
                                                <Bar dataKey="revenue" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No lecturer revenue data available
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Course Statistics Summary */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Platform Summary</CardTitle>
                            <CardDescription>Overall platform statistics and insights</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{courses.length}</div>
                                    <div className="text-sm text-gray-600">Total Courses Available</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {analytics.publishedCourses} published
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">{analytics.totalBookings}</div>
                                    <div className="text-sm text-gray-600">Total Enrollments</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {analytics.uniqueStudents} unique students
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                        LKR {analytics.totalRevenue.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Revenue Generated</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Avg LKR {analytics.avgPrice.toFixed(0)} per course
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-600 mb-2">{analytics.totalLessons}</div>
                                    <div className="text-sm text-gray-600">Total Lessons</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Avg {analytics.avgDuration.toFixed(1)} weeks duration
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-3">Most Popular Topics</h4>
                                        <div className="space-y-2">
                                            {topicDistributionData.slice(0, 3).map((topic, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <span className="text-sm">{topic.name}</span>
                                                    <span className="text-sm font-medium">{topic.value} courses</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-3">Recent Activity</h4>
                                        <div className="space-y-2">
                                            {paymentData.data.slice(0, 3).map((activity, index) => (
                                                <div key={index} className="text-sm">
                                                    <div className="font-medium">{activity.savedUsername}</div>
                                                    <div className="text-gray-500">
                                                        enrolled in {activity.savedCourseName}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}