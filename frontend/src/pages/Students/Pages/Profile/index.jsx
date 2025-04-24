import { useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        // Here you would typically handle form submission to a backend API
        setIsEditing(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <StudentSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">My Profile</h1>

                    <Card className="mb-8">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/api/placeholder/48/48" alt="Profile" />
                                    <AvatarFallback>AJ</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{formData.name}</CardTitle>
                                    <CardDescription>{formData.email}</CardDescription>
                                </div>
                            </div>
                            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="major">Major</Label>
                                                <Input
                                                    id="major"
                                                    name="major"
                                                    value={formData.major}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="year">Year</Label>
                                                <Input
                                                    id="year"
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                className="min-h-24 rounded-md border border-gray-200 p-2"
                                                value={formData.bio}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <Button type="submit" className="mt-4">Save Changes</Button>
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
                                        <p className="text-gray-700">{formData.bio}</p>
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