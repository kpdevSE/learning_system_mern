import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Book, Video, FileText, Download, Plus, AlertCircle, Check } from "lucide-react";
import axios from "axios";
import StudentSidebar from "../../Components/StudentSidebar";

export default function CourseMaterialsPage()
{

    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});


    // Fetch User Details
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

    const userEmail = user.email
    console.log(userEmail)

    const [loggedEmail, setLoggedEmail] = useState(userEmail)


    const [contentItems, setContentItems] = useState([]);
    // Fetch Pdfs
    useEffect(() =>
    {
        const fetchPDFs = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:5000/api/users/pdfall", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const pdfs = response.data.data.map(pdf => ({
                    id: pdf._id,
                    title: pdf.title,
                    category: "pdf",
                    date: new Date(pdf.uploadDate).toLocaleDateString(),
                    path: `uploads/${pdf.filename}`,
                    type: "pdf",
                }));

                setContentItems(pdfs);
            } catch (error)
            {
                console.error("Error fetching PDFs:", error);
            }
        };

        fetchPDFs();
    }, []);


    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = contentItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const [activeTab, setActiveTab] = useState("all");




    return (
        <div className="flex min-h-screen bg-gray-50">
            <StudentSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Course Materials</h1>
                        <p className="text-gray-500 mt-1">Download  your course materials</p>
                    </div>

                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search for content..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        Filter
                    </Button>

                </div>



                <Tabs defaultValue="all" className="mb-6">


                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item) => (
                                <Card key={item.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <FileText className="h-10 w-10 text-blue-500 bg-blue-50 p-2 rounded-lg" />
                                        </div>
                                        <CardTitle className="mt-3">{item.title}</CardTitle>
                                        <CardDescription className="flex justify-between">
                                            <span className="capitalize">{item.category}</span>
                                            <span>{item.date}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between pt-3">
                                        <a
                                            href={`http://localhost:5000/${item.path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="outline" size="sm">View</Button>
                                        </a>
                                        <a
                                            href={`http://localhost:5000/${item.path}`}
                                            download
                                        >
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                <Download size={14} />
                                                Download
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>


                </Tabs>
            </div>
        </div>
    );
}