import { useEffect, useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

export default function StudentProfilePage()
{
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        major: "Computer Science",
        year: "Junior",
        bio: "I'm a student passionate about web development and machine learning."
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [major, setMajor] = useState();
    const [year, setYear] = useState();
    const [user, setUser] = useState({})
    const [loggedUser, setLoggedUser] = useState({})
    const [loading, setLoading] = useState(false);

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Handle image selection
    const handleImageChange = (e) =>
    {
        const file = e.target.files[0];

        if (file)
        {
            setProfileImage(file);
            console.log(file)

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    console.log(loggedUser.email)

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('lecturerEmail', loggedUser.email);
        formData.append('bio', bio);
        formData.append('spcialization', major);
        formData.append('department', year);
        formData.append('profileImage', profileImage);

        try
        {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/users/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Profile updated:', response.data);
            toast.success("Profile updated successfully");
        } catch (error)
        {
            console.error('Error updating profile:', error);
            toast.error("Something went wrong");
        } finally
        {
            setLoading(false);
        }
    };


    useEffect(() =>
    {
        const fetchUser = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`http://localhost:5000/api/users/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });

                setUser(response.data.data);
                console.log(response.data.data)

                console.log(response.data.data)
            } catch (err)
            {
                console.error('Error fetching user:', err);
            }
        };

        fetchUser();
    }, []);

    useEffect(() =>
    {
        const fetchUserNew = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`http://localhost:5000/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });


                setLoggedUser(response.data.data);
                console.log(response.data.data)

            } catch (err)
            {
                console.error('Error fetching user:', err);
            }
        };

        fetchUserNew();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <StudentSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">My Profile</h1>

                    <Card className="mb-8">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    {user && user.profileImage ? (
                                        <AvatarImage
                                            src={`http://localhost:5000${user.profileImage}`}
                                            alt={user.name || "Profile"}
                                        />
                                    ) : (
                                        <AvatarImage src="/api/placeholder/100/100" alt="Profile" />
                                    )}
                                    <AvatarFallback>{user?.name.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{loggedUser?.name}</CardTitle>
                                    <CardDescription>{loggedUser?.email}</CardDescription>
                                </div>
                            </div>
                            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {isEditing ? (
                                // <form onSubmit={handleSubmit}>
                                //     <div className="grid gap-4">
                                //         <div className="grid gap-2">
                                //             <Label htmlFor="name">Full Name</Label>
                                //             <Input
                                //                 id="name"
                                //                 name="name"
                                //                 value={formData.name}
                                //                 onChange={handleChange}
                                //             />
                                //         </div>

                                //         <div className="grid gap-2">
                                //             <Label htmlFor="email">Email</Label>
                                //             <Input
                                //                 id="email"
                                //                 name="email"
                                //                 type="email"
                                //                 value={formData.email}
                                //                 onChange={handleChange}
                                //             />
                                //         </div>

                                //         <div className="grid grid-cols-2 gap-4">
                                //             <div className="grid gap-2">
                                //                 <Label htmlFor="major">Major</Label>
                                //                 <Input
                                //                     id="major"
                                //                     name="major"
                                //                     value={formData.major}
                                //                     onChange={handleChange}
                                //                 />
                                //             </div>
                                //             <div className="grid gap-2">
                                //                 <Label htmlFor="year">Year</Label>
                                //                 <Input
                                //                     id="year"
                                //                     name="year"
                                //                     value={formData.year}
                                //                     onChange={handleChange}
                                //                 />
                                //             </div>
                                //         </div>

                                //         <div className="grid gap-2">
                                //             <Label htmlFor="bio">Bio</Label>
                                //             <textarea
                                //                 id="bio"
                                //                 name="bio"
                                //                 className="min-h-24 rounded-md border border-gray-200 p-2"
                                //                 value={formData.bio}
                                //                 onChange={handleChange}
                                //             />
                                //         </div>

                                //         <Button type="submit" className="mt-4">Save Changes</Button>
                                //     </div>
                                // </form>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Major</Label>
                                            <Input
                                                id="department"
                                                name="department"
                                                value={major}
                                                onChange={(e) => setDepartment(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="specialization">Year</Label>
                                            <Input
                                                id="specialization"
                                                name="specialization"
                                                value={year}
                                                onChange={(e) => setSpcialization(e.target.value)}
                                            />
                                        </div>

                                        {/* Image Upload Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="profileImage">Profile Image</Label>
                                            <Input
                                                id="profileImage"
                                                name="profileImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />

                                            {/* Image Preview */}
                                            {imagePreview && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
                                                    <div className="w-24 h-24 rounded-full overflow-hidden border">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Profile Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            className="w-full min-h-24 p-2 border rounded-md"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-2 mt-4">
                                        <Button variant="outline" type="button">Cancel</Button>
                                        <Button
                                            className="bg-black hover:bg-black"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <h3 className="font-medium text-sm text-gray-500">Major</h3>
                                            <p>{formData.major}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm text-gray-500">Year</h3>
                                            <p>{formData.year}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-sm text-gray-500">Bio</h3>
                                        <p className="text-gray-700">{user.bio}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="border-t pt-6">
                            <p className="text-sm text-gray-500">Last updated: April 20, 2025</p>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>Manage how your profile information is displayed to others</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">Show email address</h3>
                                        <p className="text-sm text-gray-500">Allow other students to see your email</p>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                        <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 left-0.5"></div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">Profile visibility</h3>
                                        <p className="text-sm text-gray-500">Make your profile visible to other students</p>
                                    </div>
                                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                        <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 right-0.5"></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}