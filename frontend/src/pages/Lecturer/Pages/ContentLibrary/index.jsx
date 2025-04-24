import { useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Book, Video, FileText, Download, Plus } from "lucide-react";

export default function ContentLibraryPage()
{
    const [activeTab, setActiveTab] = useState("all");

    // Sample content items (you would fetch these from your backend)
    const contentItems = [
        { id: 1, title: "Introduction to Computer Science", type: "pdf", category: "lectures", date: "April 20, 2025" },
        { id: 2, title: "Data Structures Tutorial", type: "video", category: "tutorials", date: "April 15, 2025" },
        { id: 3, title: "Algorithm Analysis Quiz", type: "quiz", category: "assessments", date: "April 10, 2025" },
        { id: 4, title: "Programming Fundamentals", type: "pdf", category: "lectures", date: "April 5, 2025" }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
                        <p className="text-gray-500 mt-1">Manage and organize your teaching materials</p>
                    </div>

                    <Button className="flex items-center gap-2 bg-black hover:bg-black">
                        <Plus size={16} />
                        Add New Content
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search for content..."
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        Filter
                    </Button>
                </div>

                <Tabs defaultValue="all" className="mb-6">
                    <TabsList className="grid grid-cols-5 w-full max-w-md">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="lectures">Lectures</TabsTrigger>
                        <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                        <TabsTrigger value="assessments">Assessments</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contentItems.map((item) => (
                                <Card key={item.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            {item.type === "pdf" && <FileText className="h-10 w-10 text-blue-500 bg-blue-50 p-2 rounded-lg" />}
                                            {item.type === "video" && <Video className="h-10 w-10 text-purple-500 bg-purple-50 p-2 rounded-lg" />}
                                            {item.type === "quiz" && <Book className="h-10 w-10 text-green-500 bg-green-50 p-2 rounded-lg" />}
                                        </div>
                                        <CardTitle className="mt-3">{item.title}</CardTitle>
                                        <CardDescription className="flex justify-between">
                                            <span className="capitalize">{item.category}</span>
                                            <span>{item.date}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between pt-3">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                            <Download size={14} />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="lectures">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contentItems
                                .filter(item => item.category === "lectures")
                                .map((item) => (
                                    <Card key={item.id}>
                                        <CardHeader className="pb-3">
                                            <FileText className="h-10 w-10 text-blue-500 bg-blue-50 p-2 rounded-lg" />
                                            <CardTitle className="mt-3">{item.title}</CardTitle>
                                            <CardDescription className="flex justify-between">
                                                <span className="capitalize">{item.category}</span>
                                                <span>{item.date}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="flex justify-between pt-3">
                                            <Button variant="outline" size="sm">View</Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                <Download size={14} />
                                                Download
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>

                    {/* Other tab contents would follow the same pattern */}
                    <TabsContent value="tutorials" className="mt-6">
                        <p className="text-center text-gray-500 py-8">Tutorial content will appear here</p>
                    </TabsContent>

                    <TabsContent value="assessments" className="mt-6">
                        <p className="text-center text-gray-500 py-8">Assessment content will appear here</p>
                    </TabsContent>

                    <TabsContent value="resources" className="mt-6">
                        <p className="text-center text-gray-500 py-8">Resource content will appear here</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}