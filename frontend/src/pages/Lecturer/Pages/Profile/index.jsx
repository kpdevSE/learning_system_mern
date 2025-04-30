import { useEffect, useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import axios from "axios";

export default function ProfilePage()
{

    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [spcialization, setSpcialization] = useState();
    const [department, setDepartment] = useState();
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
        formData.append('spcialization', spcialization);
        formData.append('department', department);
        formData.append('profileImage', profileImage); // This is the actual File object

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
        <div className="flex h-screen bg-gray-100">
            <LecturerSidebar />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Profile</h1>

                    <Tabs defaultValue="view" className="w-full">
                        <TabsList className="mb-6">
                            <TabsTrigger value="view">View Profile</TabsTrigger>
                            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                        </TabsList>

                        <TabsContent value="view">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        {user && user.profileImage ? (
                                            <AvatarImage
                                                src={`http://localhost:5000${user.profileImage}`}
                                                alt={user.name || "Profile"}
                                            />
                                        ) : (
                                            <AvatarImage src="/api/placeholder/100/100" alt="Profile" />
                                        )}
                                        <AvatarFallback>{loggedUser?.name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-2xl">{loggedUser?.name}</CardTitle>
                                        <CardDescription>{loggedUser?.email}</CardDescription>
                                    </div>
                                </CardHeader>
                                {user ? (
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h3 className="font-medium text-gray-500">Department</h3>
                                            <p>{user.department}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Specialization</h3>
                                            <p>{user.spcialization}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Bio</h3>
                                            <p className="text-gray-700">{user.bio}</p>
                                        </div>
                                    </CardContent>
                                ) : (
                                    <div className="font-semibold text-xl text-red-500 text-center">
                                        <p>Please Navigate to Profile Edit tab and Update Your Profile </p>
                                    </div>
                                )}

                            </Card>
                        </TabsContent>

                        <TabsContent value="edit">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Edit Profile</CardTitle>
                                    <CardDescription>Make changes to your profile information</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
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
                                                <Label htmlFor="department">Department</Label>
                                                <Input
                                                    id="department"
                                                    name="department"
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="specialization">Specialization</Label>
                                                <Input
                                                    id="specialization"
                                                    name="specialization"
                                                    value={spcialization}
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
                                </CardContent>
                                {/* <CardFooter className="flex justify-end space-x-2">
                                  
                                </CardFooter> */}
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}