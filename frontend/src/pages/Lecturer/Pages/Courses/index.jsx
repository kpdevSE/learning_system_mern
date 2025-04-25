import { useEffect, useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, BookOpen, Clock, Users, DollarSign, Star, FileText, Copy, Eye, Book, LucideEye } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CourseCard({ course, onEdit, onDelete, onDuplicate, onViewLessons })
{
    return (
        <Card className="overflow-hidden">
            <div className="h-40 bg-slate-200 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-slate-400" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.category}</CardDescription>
                    </div>
                    {course.status === "draft" && (
                        <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span>{course.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span>${course.price}</span>
                    </div>
                </div>
                {course.rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating.toFixed(1)}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={onViewLessons}>Lessons</Button>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDuplicate}
                        title="Duplicate"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={onDelete}
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function CoursesPage()
{

    const [imageUrl, setImageUrl] = useState("");
    const [topicOne, setTopicOne] = useState("");
    const [topicTwo, setTopicTwo] = useState("");
    const [smallDescription, setSmallDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [lessonsQuantity, setLessonsQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState("");
    const [loggedUser, setLoggedUser] = useState({});
    const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
    const [courseId, setCourseId] = useState(null);
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Logged User email getting
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


                setLoggedUser(response.data.data);
                console.log(response.data.data)
            } catch (err)
            {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, []);

    console.log(loggedUser.email)

    // Get CourseBy Email
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() =>
    {
        const fetchMyCourses = async () =>
        {
            try
            {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/users/mycourses", {
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


    // Create a Course function
    const handleCreateCourse = async (e) =>
    {
        e.preventDefault();

        const payload = {
            lecturerEmail: loggedUser.email,
            imageUrl,
            topicOne,
            topicTwo,
            smallDescription,
            fullDescription,
            lessonsQuantity,
            price,
            duration,
        };

        try
        {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/users/create', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("Course created:", res.data);
            toast.success("Course created!");
        } catch (error)
        {
            console.error("Course creation failed:", error);
            toast.error("Failed to create course");
        }
    };

    // Fetching Course Details 
    useEffect(() =>
    {
        const fetchCourseDetails = async () =>
        {
            try
            {
                const res = await axios.get(`http://localhost:5000/api/users/corses/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setCourse(res.data.data);
            } catch (err)
            {
                console.error("Error fetching course:", err);
            } finally
            {
                setLoading(false);
            }
        };

        if (open && courseId)
        {
            setLoading(true);
            fetchCourseDetails();
        }
    }, [open, courseId]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <LecturerSidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Course Management</h1>
                        <Button onClick={() => setIsAddCourseOpen(true)} className="flex items-center gap-1 bg-black hover:bg-black">
                            <PlusCircle className="h-4 w-4" />
                            <span>Create Course</span>
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-3  md:grid-cols-2 grid-cols-1 place-content-center place-items-center">
                        {
                            myCourses.length > 0 ? (
                                myCourses.map((course) =>
                                {
                                    return (
                                        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center mb-4">

                                                    <img src={course.imageUrl} alt="" className="w-full h-full" />
                                                </div>
                                                <h3 className="text-lg font-semibold">{course.topicOne}</h3>
                                                <p className="text-sm text-muted-foreground">{course.topicTwo}</p>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.smallDescription}</p>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-4">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" /> {course.students || 0} Students
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" /> {course.duration}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FileText className="w-4 h-4" /> {course.lessonsQuantity} Lessons
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="w-4 h-4" /> ${course.price}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm font-medium">
                                                    <Star className="w-4 h-4" /> {course.rating || "4.7"}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" >Edit</Button>
                                                    <Button variant="outline" size="sm" >Lessons</Button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Dialog open={open} onOpenChange={setOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => setCourseId(course._id)}
                                                            >
                                                                <LucideEye className="w-4 h-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[600px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Course Details</DialogTitle>
                                                                <DialogDescription>
                                                                    {loading ? "Loading..." : course?.topicOne}
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            {loading ? (
                                                                <div className="text-center py-6">Loading...</div>
                                                            ) : course ? (
                                                                <div className="space-y-4">
                                                                    <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                                                                        <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <h2 className="text-xl font-bold">{course.topicOne}</h2>
                                                                    <p className="text-muted-foreground">{course.topicTwo}</p>
                                                                    <p className="text-gray-600">{course.fullDescription}</p>
                                                                    <p className="text-gray-600">{course.smallDescription}</p>
                                                                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                                        <div><strong>Lessons:</strong> {course.lessonsQuantity}</div>
                                                                        <div><strong>Duration:</strong> {course.duration}</div>
                                                                        <div><strong>Price:</strong> ${course.price}</div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center py-6">Course not found.</div>
                                                            )}

                                                            <DialogFooter>
                                                                <Button onClick={() => setOpen(false)}>Close</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button variant="ghost" size="icon" className="text-red-500" >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            ) : (<div>No courses found</div>)
                        }
                    </div>

                    {/* Add Course Dialog */}
                    <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Course</DialogTitle>
                                <DialogDescription>
                                    Fill in the course details to publish it.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="imageUrl">Course Image URL</Label>
                                        <Input
                                            id="imageUrl"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="mt-3"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="topicOne">Topic One</Label>
                                        <Input
                                            id="topicOne"
                                            value={topicOne}
                                            onChange={(e) => setTopicOne(e.target.value)}
                                            placeholder="e.g. Web Development Basics"
                                            className="mt-3"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="topicTwo">Topic Two</Label>
                                        <Input
                                            id="topicTwo"
                                            value={topicTwo}
                                            onChange={(e) => setTopicTwo(e.target.value)}
                                            placeholder="Optional secondary topic"
                                            className="mt-3"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="smallDescription">Short Description</Label>
                                        <Textarea
                                            id="smallDescription"
                                            value={smallDescription}
                                            onChange={(e) => setSmallDescription(e.target.value)}
                                            rows={2}
                                            placeholder="A brief summary of your course"
                                            className="mt-3"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="fullDescription">Full Description</Label>
                                        <Textarea
                                            id="fullDescription"
                                            value={fullDescription}
                                            onChange={(e) => setFullDescription(e.target.value)}
                                            rows={4}
                                            placeholder="Detailed course explanation"
                                            className="mt-3"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lessonsQuantity">Number of Lessons</Label>
                                        <Input
                                            id="lessonsQuantity"
                                            type="number"
                                            value={lessonsQuantity}
                                            onChange={(e) => setLessonsQuantity(parseInt(e.target.value))}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="price">Price ($)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            placeholder="e.g. 6 weeks"
                                            className="mt-3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateCourse} className="bg-black hover:bg-black">Create Course</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

