
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, DollarSign, Star, Clock } from "lucide-react";

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

    return (
        <div className="flex min-h-screen bg-slate-50">
            <LecturerSidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Lecturer Dashboard</h1>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <span className="text-2xl font-bold">24</span>
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
                                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <span className="text-2xl font-bold">$1,240</span>
                                <DollarSign className="h-5 w-5 text-muted-foreground" />
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