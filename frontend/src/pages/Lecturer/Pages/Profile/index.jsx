import { useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage()
{
    const [profileData, setProfileData] = useState({
        name: "Dr. Jane Smith",
        email: "jane.smith@university.edu",
        department: "Computer Science",
        specialization: "Software Engineering",
        bio: "Professor with 10+ years of experience in teaching and research. Focused on software architecture and design patterns."
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

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
                                        <AvatarImage src="/api/placeholder/100/100" alt="Profile" />
                                        <AvatarFallback>JS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                                        <CardDescription>{profileData.email}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-gray-500">Department</h3>
                                        <p>{profileData.department}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-500">Specialization</h3>
                                        <p>{profileData.specialization}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-500">Bio</h3>
                                        <p className="text-gray-700">{profileData.bio}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="edit">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Edit Profile</CardTitle>
                                    <CardDescription>Make changes to your profile information</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={profileData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={profileData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department</Label>
                                            <Input
                                                id="department"
                                                name="department"
                                                value={profileData.department}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="specialization">Specialization</Label>
                                            <Input
                                                id="specialization"
                                                name="specialization"
                                                value={profileData.specialization}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            className="w-full min-h-24 p-2 border rounded-md"
                                            value={profileData.bio}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button className="bg-black hover:bg-black">Save Changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}