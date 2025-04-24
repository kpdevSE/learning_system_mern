import { useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, Download, ArrowUpRight, ArrowDownRight, DollarSign, Users, BookOpen, Filter } from "lucide-react";

export default function EarningsPage()
{
    const [dateRange, setDateRange] = useState("thisMonth");

    // Sample earnings data (you would fetch this from your backend)
    const earnings = {
        total: 12450.75,
        pending: 850.25,
        withdrawn: 10000.00,
        monthlyGrowth: 12.5,
        totalStudents: 420,
        totalCourses: 8,
    };

    // Sample monthly earnings data for charts
    const monthlyData = [
        { name: "Jan", earnings: 950, students: 35 },
        { name: "Feb", earnings: 1200, students: 42 },
        { name: "Mar", earnings: 1400, students: 48 },
        { name: "Apr", earnings: 1100, students: 40 },
        { name: "May", earnings: 1650, students: 55 },
        { name: "Jun", earnings: 1850, students: 62 },
        { name: "Jul", earnings: 2200, students: 75 },
        { name: "Aug", earnings: 2000, students: 70 },
        { name: "Sep", earnings: 2350, students: 82 },
        { name: "Oct", earnings: 2750, students: 95 },
        { name: "Nov", earnings: 3150, students: 110 },
        { name: "Dec", earnings: 3400, students: 118 },
    ];

    // Sample transactions data
    const transactions = [
        {
            id: 1,
            date: "Apr 20, 2025",
            description: "Course Purchase: Advanced Machine Learning",
            student: "John Smith",
            amount: 129.99,
            status: "completed"
        },
        {
            id: 2,
            date: "Apr 18, 2025",
            description: "Monthly Payout",
            student: "",
            amount: -2500.00,
            status: "withdrawn"
        },
        {
            id: 3,
            date: "Apr 15, 2025",
            description: "Course Purchase: Web Development Bootcamp",
            student: "Emily Johnson",
            amount: 199.99,
            status: "completed"
        },
        {
            id: 4,
            date: "Apr 12, 2025",
            description: "Course Purchase: Data Science Fundamentals",
            student: "Michael Brown",
            amount: 89.99,
            status: "completed"
        },
        {
            id: 5,
            date: "Apr 10, 2025",
            description: "Course Purchase: Python Masterclass",
            student: "Sarah Wilson",
            amount: 149.99,
            status: "pending"
        },
        {
            id: 6,
            date: "Apr 5, 2025",
            description: "Course Purchase: Mobile App Development",
            student: "David Garcia",
            amount: 179.99,
            status: "completed"
        },
    ];

    // Sample course earnings data
    const courseEarnings = [
        {
            id: 1,
            title: "Web Development Bootcamp",
            students: 127,
            revenue: 5420.50,
            growth: 8.2
        },
        {
            id: 2,
            title: "Python Masterclass",
            students: 98,
            revenue: 3150.75,
            growth: 12.5
        },
        {
            id: 3,
            title: "Machine Learning Fundamentals",
            students: 85,
            revenue: 2380.25,
            growth: 5.8
        },
        {
            id: 4,
            title: "Mobile App Development",
            students: 72,
            revenue: 1950.00,
            growth: -2.3
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
                        <p className="text-gray-500 mt-1">Monitor your revenue and financial performance</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Select defaultValue={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="thisMonth">This Month</SelectItem>
                                <SelectItem value="lastMonth">Last Month</SelectItem>
                                <SelectItem value="last3Months">Last 3 Months</SelectItem>
                                <SelectItem value="last6Months">Last 6 Months</SelectItem>
                                <SelectItem value="thisYear">This Year</SelectItem>
                                <SelectItem value="allTime">All Time</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" className="flex items-center gap-2">
                            <Download size={16} />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Earnings Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Total Earnings</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                <DollarSign className="h-5 w-5 mr-1 text-green-500" />
                                ${earnings.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="flex items-center text-sm">
                                <span className={`flex items-center ${earnings.monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {earnings.monthlyGrowth >= 0 ? (
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 mr-1" />
                                    )}
                                    {Math.abs(earnings.monthlyGrowth)}% from last month
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Pending Earnings</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                <DollarSign className="h-5 w-5 mr-1 text-amber-500" />
                                ${earnings.pending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="text-sm text-gray-500">
                                Available for withdrawal in 7 days
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Total Students</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                <Users className="h-5 w-5 mr-1 text-blue-500" />
                                {earnings.totalStudents}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="text-sm text-gray-500">
                                Across {earnings.totalCourses} courses
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Withdrawn</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                <DollarSign className="h-5 w-5 mr-1 text-purple-500" />
                                ${earnings.withdrawn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="text-sm text-gray-500">
                                Total amount withdrawn
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue Chart */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>Monthly earnings and student enrollment</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="earnings" stroke="#3b82f6" name="Earnings ($)" />
                                <Line yAxisId="right" type="monotone" dataKey="students" stroke="#10b981" name="New Students" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Tabs defaultValue="transactions" className="mb-6">
                    <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        <TabsTrigger value="courses">Course Revenue</TabsTrigger>
                    </TabsList>

                    <TabsContent value="transactions" className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold">Recent Transactions</h3>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Filter size={14} />
                                Filter
                            </Button>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="whitespace-nowrap">{transaction.date}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>{transaction.student || "—"}</TableCell>
                                        <TableCell className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                                            {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    transaction.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-purple-100 text-purple-700'
                                                }`}>
                                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex justify-center mt-4">
                            <Button variant="outline">View All Transactions</Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="courses">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold">Course Revenue</h3>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Filter size={14} />
                                Filter
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {courseEarnings.map((course) => (
                                <Card key={course.id}>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">{course.title}</CardTitle>
                                        <CardDescription className="flex items-center">
                                            <Users className="h-3.5 w-3.5 mr-1" />
                                            {course.students} enrolled students
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pb-3">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-500">Total Revenue</p>
                                                <p className="text-2xl font-semibold">${course.revenue.toFixed(2)}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Growth</p>
                                                <p className={`text-lg font-medium flex items-center justify-end ${course.growth >= 0 ? "text-green-500" : "text-red-500"
                                                    }`}>
                                                    {course.growth >= 0 ? (
                                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                                    ) : (
                                                        <ArrowDownRight className="h-4 w-4 mr-1" />
                                                    )}
                                                    {Math.abs(course.growth)}%
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-0">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <ResponsiveContainer width="100%" height={350} className="mt-8">
                            <BarChart data={courseEarnings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="title" tick={{ fontSize: 12 }} interval={0} tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" name="Revenue ($)" fill="#3b82f6" />
                                <Bar dataKey="students" name="Students" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}