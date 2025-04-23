import { useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar";
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
    ChevronDown
} from "lucide-react";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Chart component (placeholder - in real implementation, use recharts or another chart library)
const LineChart = ({ data, height = 200 }) =>
{
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-gray-500 dark:text-gray-400">Chart Visualization</p>
        </div>
    );
};

export default function AnalyticsPage()
{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [timeRange, setTimeRange] = useState("This Month");

    // Mock data for analytics
    const overviewData = {
        studentsTotal: 1247,
        studentsGrowth: 12.5,
        lecturersTotal: 89,
        lecturersGrowth: 4.2,
        coursesTotal: 156,
        coursesGrowth: 7.8,
        completionRate: 76
    };

    const departmentPerformance = [
        { name: "Computer Science", students: 342, growth: 15.4, color: "bg-blue-500" },
        { name: "Business Administration", students: 278, growth: 9.2, color: "bg-green-500" },
        { name: "Engineering", students: 213, growth: 11.8, color: "bg-amber-500" },
        { name: "Medicine", students: 187, growth: 6.5, color: "bg-purple-500" },
        { name: "Psychology", students: 164, growth: 4.7, color: "bg-pink-500" }
    ];

    const recentActivities = [
        { id: 1, action: "New Student Enrolled", user: "Emma Thompson", program: "Computer Science", time: "2 hours ago" },
        { id: 2, action: "Course Completed", user: "James Wilson", program: "Business Administration", time: "5 hours ago" },
        { id: 3, action: "Lecturer Added", user: "Dr. Sarah Martinez", program: "Psychology", time: "Yesterday" },
        { id: 4, action: "New Course Created", user: "Prof. John Davis", program: "Engineering", time: "2 days ago" },
        { id: 5, action: "Student Transferred", user: "Sofia Rodriguez", program: "Medicine", time: "3 days ago" }
    ];

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
                            <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {/* Tabs for different analytics views */}
                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="students">Students</TabsTrigger>
                            <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
                            <TabsTrigger value="courses">Courses</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Overview Tab Content */}

                    <Tabs>


                        <TabsContent value="overview" className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                        <Users className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{overviewData.studentsTotal}</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className={`flex items-center ${overviewData.studentsGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {overviewData.studentsGrowth > 0 ? (
                                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                                )}
                                                {Math.abs(overviewData.studentsGrowth)}%
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Lecturers</CardTitle>
                                        <GraduationCap className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{overviewData.lecturersTotal}</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className={`flex items-center ${overviewData.lecturersGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {overviewData.lecturersGrowth > 0 ? (
                                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                                )}
                                                {Math.abs(overviewData.lecturersGrowth)}%
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
                                        <div className="text-2xl font-bold">{overviewData.coursesTotal}</div>
                                        <div className="flex items-center pt-1 text-xs">
                                            <span className={`flex items-center ${overviewData.coursesGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {overviewData.coursesGrowth > 0 ? (
                                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                                )}
                                                {Math.abs(overviewData.coursesGrowth)}%
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{overviewData.completionRate}%</div>
                                        <div className="pt-2">
                                            <Progress value={overviewData.completionRate} className="h-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card className="col-span-1">
                                    <CardHeader>
                                        <CardTitle>Student Enrollment Trends</CardTitle>
                                        <CardDescription>Monthly enrollment data for the past year</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <LineChart data={[]} height={300} />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-1">
                                    <CardHeader>
                                        <CardTitle>Course Completion Rate</CardTitle>
                                        <CardDescription>Completion rates by department</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <LineChart data={[]} height={300} />
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Department Performance */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Department Performance</CardTitle>
                                            <CardDescription>Student distribution and growth by department</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {departmentPerformance.map((dept, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                                                    <div>
                                                        <div className="font-medium">{dept.name}</div>
                                                        <div className="text-sm text-gray-500">{dept.students} students</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${dept.growth > 10 ? 'bg-green-100 text-green-800' : dept.growth > 5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {dept.growth > 0 ? '+' : ''}{dept.growth}%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activity */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Activity</CardTitle>
                                            <CardDescription>Latest actions and events in the system</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <FileText className="h-4 w-4 mr-2" />
                                            View All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start space-x-4">
                                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                                                <div className="flex-1">
                                                    <div className="font-medium">{activity.action}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {activity.user} • {activity.program}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    <Tabs>


                        {/* Other tabs content (placeholders) */}
                        <TabsContent value="students">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Students Analytics</CardTitle>
                                    <CardDescription>Detailed student metrics and performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64">
                                        <p className="text-gray-500">Detailed students analytics will be shown here</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="lecturers">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lecturers Analytics</CardTitle>
                                    <CardDescription>Detailed lecturer metrics and performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64">
                                        <p className="text-gray-500">Detailed lecturers analytics will be shown here</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>


                    <Tabs>

                        <TabsContent value="courses">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Courses Analytics</CardTitle>
                                    <CardDescription>Detailed course metrics and performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64">
                                        <p className="text-gray-500">Detailed courses analytics will be shown here</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </main>
            </div>
        </div>
    );
}