import { useState, useEffect } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, Download, ArrowUpRight, ArrowDownRight, DollarSign, Users, BookOpen, Filter } from "lucide-react";
import axios from "axios";

// Simple Table components since @/components/ui/table is not available
const Table = ({ children, className = "" }) => (
    <div className={`overflow-x-auto ${className}`}>
        <table className="w-full border-collapse border border-gray-200">
            {children}
        </table>
    </div>
);

const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children, className = "" }) => (
    <tr className={`border-b border-gray-200 ${className}`}>{children}</tr>
);
const TableHead = ({ children, className = "" }) => (
    <th className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${className}`}>
        {children}
    </th>
);
const TableCell = ({ children, className = "" }) => (
    <td className={`px-4 py-3 text-sm text-gray-900 ${className}`}>
        {children}
    </td>
);

export default function EarningsPage()
{
    const [dateRange, setDateRange] = useState("thisMonth");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentData, setPaymentData] = useState({
        data: [],
        totalAmount: 0,
        totalCourses: 0
    });

    const [monthlyData] = useState([
        { name: 'Jan', earnings: 4000, students: 24 },
        { name: 'Feb', earnings: 3000, students: 18 },
        { name: 'Mar', earnings: 5000, students: 32 },
        { name: 'Apr', earnings: 4500, students: 28 },
        { name: 'May', earnings: 6000, students: 40 },
        { name: 'Jun', earnings: 5500, students: 35 }
    ]);

    // Fetch payment data from API
    const fetchPaymentData = async () =>
    {
        try
        {
            setLoading(true);
            setError(null);

            // Get token from localStorage (adjust based on your auth setup)
            const token = localStorage.getItem('token')
            console.log('Token:', token); // Debug token

            console.log('Making API request...'); // Debug request start
            const response = await axios.get('http://localhost:5000/api/users/getpayementdetails', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response); // Debug response

            // Axios automatically throws for non-2xx status codes, so we don't need to check response.ok
            const result = response.data;
            console.log('Parsed result:', result); // Debug parsed data

            if (result)
            {
                console.log('Setting payment data...'); // Debug data setting
                setPaymentData({
                    data: result.data || [],
                    totalAmount: result.totalAmount || 0,
                    totalCourses: result.totalCourses || 0
                });

                console.log(result)
            }
        } catch (error)
        {
            console.error('Detailed error:', {
                message: error.message,
                response: error.response,
                request: error.request
            });
            setError(error.message);
            // Set some mock data for demonstration if API fails
            setPaymentData({
                data: [
                    {
                        _id: '1',
                        savedCourseName: 'React Fundamentals',
                        savedPrice: '99.00',
                        savedStudentEmail: 'student1@example.com',
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: '2',
                        savedCourseName: 'Advanced JavaScript',
                        savedPrice: '149.00',
                        savedStudentEmail: 'student2@example.com',
                        createdAt: new Date().toISOString()
                    }
                ],
                totalAmount: 248,
                totalCourses: 2
            });
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchPaymentData();
    }, [dateRange]);

    // Convert payment data to transactions format
    const transactions = paymentData.data.map((payment, index) => ({
        id: payment._id || index,
        date: new Date(payment.createdAt || Date.now()).toLocaleDateString(),
        description: `Course Payment - ${payment.savedSmallDescription || payment.savedTopicOne || 'Unknown Course'}`,
        student: payment.loggedUserEmail || payment.savedUsername || '—',
        amount: parseFloat(payment.savedPrice || 0),
        status: 'completed'
    }));

    // Convert payment data to course earnings format
    const courseEarningsMap = {};
    paymentData.data.forEach(payment =>
    {
        const courseName = payment.savedCourseName || 'Unknown Course';
        const price = parseFloat(payment.savedPrice || 0);

        if (courseEarningsMap[courseName])
        {
            courseEarningsMap[courseName].revenue += price;
            courseEarningsMap[courseName].students += 1;
        } else
        {
            courseEarningsMap[courseName] = {
                id: courseName.replace(/\s+/g, '-').toLowerCase(),
                title: courseName,
                revenue: price,
                students: 1,
                growth: Math.floor(Math.random() * 40) - 10
            };
        }
    });

    const courseEarnings = Object.values(courseEarningsMap);

    // Calculate real earnings data
    const realEarnings = {
        total: paymentData.totalAmount,
        pending: paymentData.totalAmount * 0.1,
        totalStudents: paymentData.data.length,
        totalCourses: paymentData.totalCourses,
        withdrawn: paymentData.totalAmount * 0.8,
        monthlyGrowth: 12
    };

    if (loading)
    {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <LecturerSidebar />
                <div className="flex-1 p-8 flex justify-center items-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading earnings data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
                        <p className="text-gray-500 mt-1">Monitor your revenue and financial performance</p>
                        {error && (
                            <p className="text-red-500 text-sm mt-2">⚠️ Using demo data - API Error: {error}</p>
                        )}
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

                        <Button variant="outline" className="flex items-center gap-2" onClick={fetchPaymentData}>
                            <Download size={16} />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Earnings Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Total Earnings</CardDescription>
                            <CardTitle className="text-2xl flex items-center">

                                Rs.{realEarnings.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="flex items-center text-sm">
                                <span className={`flex items-center ${realEarnings.monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {realEarnings.monthlyGrowth >= 0 ? (
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 mr-1" />
                                    )}
                                    {Math.abs(realEarnings.monthlyGrowth)}% from last month
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Pending Earnings</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                {realEarnings.pending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                            <CardDescription>Total Payments</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                <Users className="h-5 w-5 mr-1 text-blue-500" />
                                {realEarnings.totalStudents}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="text-sm text-gray-500">
                                Across {realEarnings.totalCourses} courses
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Withdrawn</CardDescription>
                            <CardTitle className="text-2xl flex items-center">
                                {realEarnings.withdrawn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                                {transactions.length > 0 ? transactions.map((transaction) => (
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
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                            No transactions found
                                        </TableCell>
                                    </TableRow>
                                )}
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
                            {courseEarnings.length > 0 ? courseEarnings.map((course) => (
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
                                                <p className="text-2xl font-semibold">Rs.{course.revenue.toFixed(2)}</p>
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


                                </Card>
                            )) : (
                                <div className="col-span-2 text-center text-gray-500 py-8">
                                    No course revenue data found
                                </div>
                            )}
                        </div>

                        {courseEarnings.length > 0 && (
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
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}