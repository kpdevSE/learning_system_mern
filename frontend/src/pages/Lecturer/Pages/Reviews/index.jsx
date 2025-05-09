import { useEffect, useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Star, MessageCircle, ThumbsUp, Filter, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function ReviewsPage()
{
    const [filterRating, setFilterRating] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    // Sample reviews data (you would fetch this from your backend)
    const reviewsData = {
        average: 4.7,
        total: 148,
        responded: 124,
        distribution: {
            5: 102,
            4: 31,
            3: 10,
            2: 3,
            1: 2
        },
        recent: [
            {
                id: 1,
                courseName: "Advanced Web Development",
                studentName: "Emma Wilson",
                avatar: "/api/placeholder/32/32",
                rating: 5,
                date: "April 22, 2025",
                comment: "This course exceeded my expectations. The instructor was extremely knowledgeable and presented the material in an easy-to-understand manner. The practical examples were particularly helpful.",
                responded: true,
                response: "Thank you for your kind words, Emma! I'm glad you found the practical examples helpful.",
                responseDate: "April 23, 2025",
                helpful: 15
            },
            {
                id: 2,
                courseName: "Python Data Science Masterclass",
                studentName: "James Thompson",
                avatar: "/api/placeholder/32/32",
                rating: 4,
                date: "April 20, 2025",
                comment: "Great course overall. The content was comprehensive and well-structured. I'd appreciate more advanced exercises in future updates.",
                responded: false,
                helpful: 8
            },
            {
                id: 3,
                courseName: "Mobile App Development Bootcamp",
                studentName: "Sophia Chen",
                avatar: "/api/placeholder/32/32",
                rating: 5,
                date: "April 18, 2025",
                comment: "The instructor's teaching style is amazing! I was able to build my first mobile app by the end of the course. The step-by-step tutorials were incredibly helpful for a beginner like me.",
                responded: true,
                response: "Thanks Sophia! I'm thrilled to hear about your success with building your first app. Keep up the great work!",
                responseDate: "April 19, 2025",
                helpful: 12
            },
            {
                id: 4,
                courseName: "JavaScript Fundamentals",
                studentName: "Michael Brown",
                avatar: "/api/placeholder/32/32",
                rating: 3,
                date: "April 15, 2025",
                comment: "The course content is good, but some sections feel rushed. I would have preferred more in-depth explanations for the more complex topics.",
                responded: true,
                response: "Thank you for the feedback, Michael. I'll definitely consider adding more detailed explanations for complex topics in the next update.",
                responseDate: "April 16, 2025",
                helpful: 5
            },
            {
                id: 5,
                courseName: "Advanced Web Development",
                studentName: "Alexander Lee",
                avatar: "/api/placeholder/32/32",
                rating: 5,
                date: "April 12, 2025",
                comment: "Outstanding course! The instructor clearly has deep industry experience and shares practical tips that you won't find in textbooks. Highly recommended for anyone serious about web development.",
                responded: false,
                helpful: 18
            },
            {
                id: 6,
                courseName: "Database Design and SQL",
                studentName: "Olivia Martinez",
                avatar: "/api/placeholder/32/32",
                rating: 4,
                date: "April 10, 2025",
                comment: "Solid introduction to database concepts. The SQL challenges were particularly valuable. Would love to see an advanced follow-up course.",
                responded: true,
                response: "Thanks for the suggestion, Olivia! I'm actually planning an advanced SQL course for next quarter.",
                responseDate: "April 11, 2025",
                helpful: 7
            }
        ],
        needResponse: [
            {
                id: 2,
                courseName: "Python Data Science Masterclass",
                studentName: "James Thompson",
                avatar: "/api/placeholder/32/32",
                rating: 4,
                date: "April 20, 2025",
                comment: "Great course overall. The content was comprehensive and well-structured. I'd appreciate more advanced exercises in future updates.",
                responded: false,
                helpful: 8
            },
            {
                id: 5,
                courseName: "Advanced Web Development",
                studentName: "Alexander Lee",
                avatar: "/api/placeholder/32/32",
                rating: 5,
                date: "April 12, 2025",
                comment: "Outstanding course! The instructor clearly has deep industry experience and shares practical tips that you won't find in textbooks. Highly recommended for anyone serious about web development.",
                responded: false,
                helpful: 18
            }
        ],
        critical: [
            {
                id: 4,
                courseName: "JavaScript Fundamentals",
                studentName: "Michael Brown",
                avatar: "/api/placeholder/32/32",
                rating: 3,
                date: "April 15, 2025",
                comment: "The course content is good, but some sections feel rushed. I would have preferred more in-depth explanations for the more complex topics.",
                responded: true,
                response: "Thank you for the feedback, Michael. I'll definitely consider adding more detailed explanations for complex topics in the next update.",
                responseDate: "April 16, 2025",
                helpful: 5
            },
            {
                id: 7,
                courseName: "Design Principles for Developers",
                studentName: "Emily Johnson",
                avatar: "/api/placeholder/32/32",
                rating: 2,
                date: "April 8, 2025",
                comment: "The course has good information but the audio quality was poor in several lectures. Also, some of the design tools demonstrated are outdated.",
                responded: true,
                response: "I appreciate your honest feedback, Emily. I'm working on re-recording those lectures with better equipment and updating the software demonstrations.",
                responseDate: "April 9, 2025",
                helpful: 3
            },
            {
                id: 10,
                courseName: "Introduction to Machine Learning",
                studentName: "David Wilson",
                avatar: "/api/placeholder/32/32",
                rating: 2,
                date: "April 1, 2025",
                comment: "Too theoretical with not enough practical applications. Expected more hands-on projects and less mathematical theory.",
                responded: false,
                helpful: 6
            }
        ]
    };


    const [reviews, setreviews] = useState([])
    const [loading, setLoading] = useState(false)

    const renderStars = (rating) =>
    {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
            ));
    };


    const [user, setUser] = useState({})

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
    console.log(lecturerEmail)

    const filteredReviews = reviews.filter(
        review => review.lecturerEmail === lecturerEmail
    );


    useEffect(() =>
    {
        const fetchreviewsDetails = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/users/getreviewbyemail`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });



                setreviews(res.data.data);
                console.log(res.data.data)
            } catch (err)
            {
                console.error("Error fetching reviews:", err);
            } finally
            {
                setLoading(false);
            }
        };



        fetchreviewsDetails();

    }, []);

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



    // Helper function to render review cards


    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
                        <p className="text-gray-500 mt-1">Manage and respond to student feedback</p>
                    </div>
                </div>

                {/* Rating Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle>Overall Rating</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="flex flex-col items-center">
                                <div className="text-5xl font-bold text-blue-600 mb-1">{Number(reviewsDataDetails.average).toFixed(1)}</div>
                                <div className="flex mb-2">
                                    {renderStars(Math.round(reviewsDataDetails.average))}
                                </div>
                                <p className="text-gray-500 font-bold">{reviewsDataDetails.total} total reviews</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle>Rating Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            {[5, 4, 3, 2, 1].map(rating => (
                                <div key={rating} className="flex items-center mb-2">
                                    <div className="flex items-center w-12">
                                        <span className="mr-1">{rating}</span>
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    </div>
                                    <div className="flex-1 mx-2">
                                        <Progress
                                            value={(reviewsData.distribution[rating] / reviewsData.total) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                    <div className="w-10 text-right text-gray-500">
                                        {reviewsData.distribution[rating]}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle>Response Rate</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-6">
                                    <svg className="w-32 h-32">
                                        <circle
                                            className="text-gray-200"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="58"
                                            cx="64"
                                            cy="64"
                                        />
                                        <circle
                                            className="text-green-500"
                                            strokeWidth="8"
                                            strokeDasharray={`${(reviewsData.responded / reviewsData.total) * 365} 365`}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="58"
                                            cx="64"
                                            cy="64"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-2xl font-bold text-gray-700">
                                            {Math.round((reviewsData.responded / reviewsData.total) * 100)}%
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    You've responded to {reviewsData.responded} of {reviewsData.total} reviews
                                </p>
                                <div className="flex items-center mt-4">
                                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                                    <p className="text-sm text-amber-500">
                                        {reviewsData.total - reviewsData.responded} reviews need response
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>



                {/* Reviews Tabs */}
                <Tabs defaultValue="all" className="mb-6">


                    <TabsContent value="all" className="space-y-4">
                        {filteredReviews.map((review) =>
                        {
                            return (
                                <Card key={review._id} className="mb-4">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={`http://localhost:5000${review.profileImage}`} alt={review.loggedUserName} />

                                                    {console.log(review.profileImage)}
                                                    <AvatarFallback>
                                                        {review.loggedUserName?.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <p className="font-medium">{review.loggedUserName}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <div className="flex">
                                                            {renderStars(review.starCount)}
                                                        </div>
                                                        <span className="text-gray-500 text-sm">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                                {review.lecturerEmail}
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pb-3">
                                        <p className="text-gray-700">{review.description}</p>
                                    </CardContent>


                                </Card>
                            )
                        })}

                        <div className="flex justify-center mt-8">
                            <Button variant="outline">Load More Reviews</Button>
                        </div>
                    </TabsContent>


                </Tabs>
            </div>
        </div>
    );
}