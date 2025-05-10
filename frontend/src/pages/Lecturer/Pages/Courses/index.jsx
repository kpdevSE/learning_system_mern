import { useEffect, useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Clock, Users, DollarSign, Star, FileText, LucideEye } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";


export default function CoursesPage()
{

    const [imageUrl, setImageUrl] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("")
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
    const [courseDetails, setCourseDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        topicOne: "",
        topicTwo: "",
        smallDescription: "",
        fullDescription: "",
        lessonsQuantity: 0,
        price: 0,
        duration: "",
        imageUrl: "",
        youtubeUrl: ""
    });

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
            youtubeUrl,
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
            window.location.reload()
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
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/users/courses/${courseId}`, {
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

        if (open && courseId)
        {
            setLoading(true);
            fetchCourseDetails();
        }
    }, [open, courseId]);



    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Update Courses
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/users/courses/${courseId}`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            if (response.status === 200)
            {
                toast.success("Course updated successfully!");
                window.location.reload()
            }
        } catch (error)
        {
            console.error("Error updating course:", error);
            toast.error("Failed to update course.");
        }
    };

    // Delete Course
    const handleDelete = async () =>
    {
        try
        {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:5000/api/users/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(courseId)
            if (response.status === 200)
            {

                toast.success("Course deleted successfully!");
                window.location.reload()
            }
        } catch (error)
        {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course.");
        }
    };

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
                                        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full " key={course._id}>
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
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm" onClick={() => setCourseId(course._id)}>Edit Course</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Course</DialogTitle>
                                                                <DialogDescription>
                                                                    Make changes to the course details here. Click save when you're done.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="topicOne" className="text-right">
                                                                        Topic One
                                                                    </Label>
                                                                    <Input
                                                                        id="topicOne"
                                                                        name="topicOne"
                                                                        value={formData.topicOne}
                                                                        onChange={handleChange}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="topicTwo" className="text-right">
                                                                        Topic Two
                                                                    </Label>
                                                                    <Input
                                                                        id="topicTwo"
                                                                        name="topicTwo"
                                                                        value={formData.topicTwo}
                                                                        onChange={handleChange}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="smallDescription" className="text-right">
                                                                        Small Description
                                                                    </Label>
                                                                    <textarea
                                                                        id="smallDescription"
                                                                        name="smallDescription"
                                                                        value={formData.smallDescription}
                                                                        onChange={handleChange}
                                                                        className="col-span-3 p-2 border rounded-md"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="fullDescription" className="text-right">
                                                                        Full Description
                                                                    </Label>
                                                                    <textarea
                                                                        id="fullDescription"
                                                                        name="fullDescription"
                                                                        value={formData.fullDescription}
                                                                        onChange={handleChange}
                                                                        className="col-span-3 p-2 border rounded-md"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="lessonsQuantity" className="text-right">
                                                                        Lessons Quantity
                                                                    </Label>
                                                                    <Input
                                                                        id="lessonsQuantity"
                                                                        name="lessonsQuantity"
                                                                        value={formData.lessonsQuantity}
                                                                        onChange={handleChange}
                                                                        type="number"
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="price" className="text-right">
                                                                        Price
                                                                    </Label>
                                                                    <Input
                                                                        id="price"
                                                                        name="price"
                                                                        value={formData.price}
                                                                        onChange={handleChange}
                                                                        type="number"
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="duration" className="text-right">
                                                                        Duration
                                                                    </Label>
                                                                    <Input
                                                                        id="duration"
                                                                        name="duration"
                                                                        value={formData.duration}
                                                                        onChange={handleChange}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="imageUrl" className="text-right">
                                                                        Image URL
                                                                    </Label>
                                                                    <Input
                                                                        id="imageUrl"
                                                                        name="imageUrl"
                                                                        value={formData.imageUrl}
                                                                        onChange={handleChange}
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="imageUrl">Course Video URL</Label>
                                                                    <Input
                                                                        id="youtubeUrl"
                                                                        value={youtubeUrl}
                                                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                                                        placeholder="https://example.com/image.jpg"
                                                                        className="mt-3"
                                                                    />
                                                                </div>
                                                                <DialogFooter>
                                                                    <Button type="submit">Save changes</Button>
                                                                </DialogFooter>
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog>

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
                                                                    {loading ? "Loading..." : courseDetails?.topicOne}
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            {loading ? (
                                                                <div className="text-center py-6">Loading...</div>
                                                            ) : courseDetails ? (
                                                                <div className="space-y-4">
                                                                    <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                                                                        <img src={courseDetails?.imageUrl} alt="" className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <h2 className="text-xl font-bold">{courseDetails?.topicOne}</h2>
                                                                    <p className="text-muted-foreground">{courseDetails?.topicTwo}</p>
                                                                    <p className="text-gray-600">{courseDetails?.fullDescription}</p>
                                                                    <p className="text-gray-600">{courseDetails?.smallDescription}</p>
                                                                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                                        <div><strong>Lessons:</strong> {courseDetails?.lessonsQuantity}</div>
                                                                        <div><strong>Duration:</strong> {courseDetails?.duration}</div>
                                                                        <div><strong>Price:</strong> ${courseDetails?.price}</div>
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
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setCourseId(course._id)}> <Trash2 className="w-4 h-4" /></Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Delete Confirmation</DialogTitle>
                                                                <DialogDescription>
                                                                    Are You Sure ?
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <Button className="bg-red-500 hover:bg-red-500" onClick={handleDelete}>Delete</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
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
                                        <Label htmlFor="imageUrl">Course Video URL</Label>
                                        <Input
                                            id="youtubeUrl"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
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

