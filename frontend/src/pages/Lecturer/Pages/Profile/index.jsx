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
    const [campus, setCampus] = useState('');
    const [liveLocation, setLiveLocation] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [age, setAge] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
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
        formData.append('profileImage', profileImage);
        formData.append('campus', campus);
        formData.append('liveLocation', liveLocation);
        formData.append('mobileNumber', mobileNumber);
        formData.append('birthday', birthday); // ISO string or YYYY-MM-DD
        formData.append('gender', gender);
        formData.append('nicNumber', nicNumber);
        formData.append('age', age);
        formData.append('educationLevel', educationLevel);

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
                                        {user?.profileImage ? (
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
                                        <CardTitle className="text-2xl">{user?.name}</CardTitle>
                                        <CardDescription>{user?.lecturerEmail}</CardDescription>
                                    </div>
                                </CardHeader>

                                {user ? (
                                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800 mt-4">
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
                                            <p>{user.bio}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Campus</h3>
                                            <p>{user.campus}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Live Location</h3>
                                            <p>{user.liveLocation}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Mobile Number</h3>
                                            <p>{user.mobileNumber}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Birthday</h3>
                                            <p>{new Date(user.birthday).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Gender</h3>
                                            <p>{user.gender}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">NIC Number</h3>
                                            <p>{user.nicNumber}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Age</h3>
                                            <p>{user.age}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-500">Education Level</h3>
                                            <p>{user.educationLevel}</p>
                                        </div>
                                    </CardContent>
                                ) : (
                                    <div className="font-semibold text-xl text-red-500 text-center p-6">
                                        <p>Please navigate to the Profile Edit tab and update your profile.</p>
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

                                            {/* Campus Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="campus">Campus (Higher Education)</Label>
                                                <Input
                                                    id="campus"
                                                    name="campus"
                                                    value={campus}
                                                    onChange={(e) => setCampus(e.target.value)}
                                                />
                                            </div>

                                            {/* Live Location Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="liveLocation">Live Location</Label>
                                                <Input
                                                    id="liveLocation"
                                                    name="liveLocation"
                                                    value={liveLocation}
                                                    onChange={(e) => setLiveLocation(e.target.value)}
                                                />
                                            </div>

                                            {/* Mobile Number Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="mobileNumber">Mobile Number</Label>
                                                <Input
                                                    id="mobileNumber"
                                                    name="mobileNumber"
                                                    value={mobileNumber}
                                                    onChange={(e) => setMobileNumber(e.target.value)}
                                                />
                                            </div>

                                            {/* Birthday Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="birthday">Birthday</Label>
                                                <Input
                                                    id="birthday"
                                                    name="birthday"
                                                    type="date"
                                                    value={birthday}
                                                    onChange={(e) => setBirthday(e.target.value)}
                                                />
                                            </div>

                                            {/* Age Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age</Label>
                                                <Input
                                                    id="age"
                                                    name="age"
                                                    type="number"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                />
                                            </div>

                                            {/* Gender Field with Select */}
                                            <div className="space-y-2">
                                                <Label htmlFor="gender">Gender</Label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="w-full p-2 border rounded-md"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>

                                            {/* NIC Number Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="nicNumber">NIC Number</Label>
                                                <Input
                                                    id="nicNumber"
                                                    name="nicNumber"
                                                    value={nicNumber}
                                                    onChange={(e) => setNicNumber(e.target.value)}
                                                />
                                            </div>

                                            {/* Education Level Field with Select */}
                                            <div className="space-y-2">
                                                <Label htmlFor="educationLevel">Education Level</Label>
                                                <select
                                                    id="educationLevel"
                                                    name="educationLevel"
                                                    className="w-full p-2 border rounded-md"
                                                    value={educationLevel}
                                                    onChange={(e) => setEducationLevel(e.target.value)}
                                                >
                                                    <option value="">Select Education Level</option>
                                                    <option value="Diploma Level">Diploma Level</option>
                                                    <option value="Higher Diploma">Higher Diploma</option>
                                                    <option value="BSc Level">BSc Level</option>
                                                    <option value="Masters">Masters</option>
                                                    <option value="PhD Level">PhD Level</option>
                                                </select>
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