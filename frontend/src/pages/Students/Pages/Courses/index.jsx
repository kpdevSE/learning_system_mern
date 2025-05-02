import { useEffect, useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, Filter, Plus, Search as SearchIcon, Star, Users } from "lucide-react";
import axios from "axios";
import PurchaseComponent from "@/components/ui/Components/PurchaseComponent";
import PlayerComponent from "@/components/ui/Components/Player";



export default function Courses()
{
    const [activeTab, setActiveTab] = useState("enrolled");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
    const [courseId, setCourseId] = useState(null);
    const [courseDetails, setCourseDetails] = useState({});
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [myPurchasedCourses, setMyPurchasedCourses] = useState([])


    const [myCourses, setMyCourses] = useState([]);

    // Fetch All Courses
    useEffect(() =>
    {
        const fetchMyCourses = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/users/allcourses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyCourses(res.data.data);
                console.log(res.data.data);
            } catch (err)
            {
                console.error("Error fetching my courses:", err);
            }
        };

        fetchMyCourses();
    }, []);

    useEffect(() =>
    {
        const fetchMyPurchaseCourses = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/users/purchased/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyPurchasedCourses(res.data.data);
                console.log(res.data.data);
            } catch (err)
            {
                console.error("Error fetching my purchased courses:", err);
            }
        };

        fetchMyPurchaseCourses();
    }, []);


    // Fetching Course details
    useEffect(() =>
    {
        const fetchCourseDetails = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/users/studentcourses/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setCourseDetails(res.data.data);
                console.log(res.data.data)
            } catch (err)
            {
                console.error("Error fetching course:", err);
            } finally
            {
                setLoading(false);
            }
        };
        fetchCourseDetails()

    }, [courseId]);


    // Fetch Logged user
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


    // Handle course purchase
    const handlePurchaseCourse = () =>
    {
        // In a real implementation, this would connect to payment processing
        alert(`Purchase successful! You are now enrolled in ${selectedCourse.title}`);
        setPurchaseDialogOpen(false);
    };



    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />

            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                        <p className="text-muted-foreground">Manage your enrolled courses and discover new ones</p>
                    </div>
                </div>

                <Tabs defaultValue="enrolled" className="mb-6" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                        <TabsTrigger value="available">Available Courses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="enrolled">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myPurchasedCourses.map((course, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>{course.savedSmallDescription || "Course Title"}</CardTitle>
                                        <CardDescription>
                                            Lecturer: {course.savedLecturerEmail || "Unknown"}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        {course?.savedImageUrl && (
                                            <img
                                                src={course.savedImageUrl}
                                                alt="Course Thumbnail"
                                                className="w-full h-40 object-cover rounded-lg mb-3"
                                            />
                                        )}

                                        <p className="text-sm mb-1">{course.savedFullDescription}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Duration: {course.savedDuration} | Quantity: {course.savedQuantity}
                                        </p>

                                        <p className="mt-2 text-sm font-medium">Topics:</p>
                                        <ul className="list-disc list-inside text-sm">
                                            <li>{course.savedTopicOne}</li>
                                            <li>{course.savedTopicTwo}</li>
                                        </ul>

                                        <p className="mt-2 text-sm">Price: Rs.{course.savedPrice} (You already Purchased)</p>


                                        <PlayerComponent youtubeUrl={course.savedYoutubeUrl} topicOne={course.savedTopicOne} topicTwo={course.savedTopicTwo} savedLecturerEmail={course.savedLecturerEmail} savedDuration={course.savedDuration} savedFullDescription={course.savedFullDescription} savedQuantity={course.savedQuantity} savedSmallDescription={course.savedSmallDescription} />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                    </TabsContent>

                    <TabsContent value="available">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="w-full md:w-2/3">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search courses by title or instructor..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 flex gap-2">
                                {/* <div className="flex-1">
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>
                                                {dept === "all" ? "All Categories" : dept}
                                            </option>
                                        ))}
                                    </select>
                                </div> */}
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourses.map(course => (
                                <Card key={course._id} className="overflow-hidden">
                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />

                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{course.topicOne}</CardTitle>
                                            <Badge variant="outline">{course.level}</Badge>
                                        </div>
                                        <CardDescription>
                                            {course.lecturerEmail}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {course.smallDescription}
                                        </p>

                                        <div className="flex justify-between text-sm mb-4">
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                                <span>{course.rating} ({course.reviews} reviews)</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                <span>{course.students} students</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{course.lessonsQuantity} Lessons</span>
                                            <span>{course.duration}</span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex justify-between items-center">
                                        <div className="font-bold text-lg">Rs.{course.price}</div>
                                        <Dialog open={open} >
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="bg-black hover:bg-black/90 text-white"
                                                    onClick={() =>
                                                    {
                                                        setCourseId(course._id);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    <Plus className="w-4 h-4 mr-2" /> Enroll Now
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[600px]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-bold">Course Details</DialogTitle>
                                                    <DialogDescription className="text-base text-muted-foreground">
                                                        {loading ? "Loading course information..." : courseDetails?.topicOne}
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {loading ? (
                                                    <div className="space-y-4 py-6">
                                                        <div className="w-full h-40 bg-gray-100 animate-pulse rounded-md" />
                                                        <div className="h-6 bg-gray-100 animate-pulse rounded-md w-3/4" />
                                                        <div className="h-4 bg-gray-100 animate-pulse rounded-md w-full" />
                                                        <div className="h-24 bg-gray-100 animate-pulse rounded-md w-full" />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="h-8 bg-gray-100 animate-pulse rounded-md" />
                                                            <div className="h-8 bg-gray-100 animate-pulse rounded-md" />
                                                        </div>
                                                    </div>
                                                ) : courseDetails ? (
                                                    <div className="space-y-4">
                                                        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                                                            <img
                                                                src={courseDetails?.imageUrl}
                                                                alt={courseDetails?.topicOne}
                                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>

                                                        <div className="flex justify-between items-start">
                                                            <h2 className="text-xl font-bold text-gray-900">{courseDetails?.topicOne}</h2>
                                                            <span className="px-3 py-1 bg-black text-white text-sm rounded-full font-medium">
                                                                ${courseDetails?.price}
                                                            </span>
                                                        </div>

                                                        <p className="text-muted-foreground text-sm">{courseDetails?.topicTwo}</p>

                                                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                                            <p className="text-gray-700">{courseDetails?.smallDescription}</p>
                                                        </div>

                                                        <p className="text-gray-600 italic text-sm">{courseDetails?.fullDescription}</p>

                                                        <div className="grid grid-cols-3 gap-3 mt-2">
                                                            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                                <span className="text-xs uppercase tracking-wide text-gray-500">Lessons</span>
                                                                <span className="font-bold text-gray-900">{courseDetails?.lessonsQuantity}</span>
                                                            </div>
                                                            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                                <span className="text-xs uppercase tracking-wide text-gray-500">Duration</span>
                                                                <span className="font-bold text-gray-900">{courseDetails?.duration}</span>
                                                            </div>
                                                            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                                <span className="text-xs uppercase tracking-wide text-gray-500">Price</span>
                                                                <span className="font-bold text-gray-900">Rs.{courseDetails?.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-12">
                                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                                            <AlertCircle className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                        <h3 className="text-lg font-medium text-gray-900">Course not found</h3>
                                                        <p className="text-gray-500 mt-2">We couldn't find the course you're looking for.</p>
                                                    </div>
                                                )}

                                                <DialogFooter className="flex gap-2 mt-4">
                                                    <PurchaseComponent loggedUser={user.email} price={courseDetails.price} lecturerEmail={courseDetails.lecturerEmail} duration={courseDetails.duration} quantity={courseDetails.lessonsQuantity} fullDescription={courseDetails.fullDescription} smallDescription={courseDetails.smallDescription} topicOne={courseDetails.topicOne} topicTwo={courseDetails.topicTwo} imageUrl={courseDetails.imageUrl} username={user.name} youtubeUrl={courseDetails.youtubeUrl} />
                                                    <Button variant="outline" onClick={() => setOpen(false)}>
                                                        Close
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </CardFooter>
                                </Card>
                            ))}

                            {/* {filteredAvailableCourses.length === 0 && (
                                <div className="col-span-full text-center py-12">
                                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            )} */}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}