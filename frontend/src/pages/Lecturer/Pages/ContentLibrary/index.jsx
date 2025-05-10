import { useEffect, useState } from "react";
import LecturerSidebar from "../../Components/LecturerSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Book, Video, FileText, Download, Plus, AlertCircle, Check } from "lucide-react";
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ContentLibraryPage()
{

    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");

    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});

    const handleFileChange = (e) =>
    {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf")
        {
            setSelectedFile(file);
            if (!title)
            {
                const fileName = file.name.replace(/\.[^/.]+$/, "");
                setTitle(fileName);
            }
            setUploadStatus(null);
        } else
        {
            setSelectedFile(null);
            setUploadStatus({
                success: false,
                message: "Please select a valid PDF file",
            });
        }
    };
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
    // Upload PDF
    const handleUpload = async (e) =>
    {
        e.preventDefault();
        if (!selectedFile || !title.trim())
        {
            setUploadStatus({
                success: false,
                message: !selectedFile
                    ? "Please select a PDF file"
                    : "Please enter a title for your PDF",
            });
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("pdf", selectedFile);
        formData.append("title", title.trim());
        formData.append("loggedEmail", user.email);

        try
        {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                "http://localhost:5000/api/users/uploadpdf",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success)
            {
                setUploadStatus({
                    success: true,
                    message: "PDF uploaded successfully!",
                });
                toast.success("PDF uploaded successfully!");



                setTimeout(() =>
                {
                    setTitle("");
                    setSelectedFile(null);
                    setUploadStatus(null);
                    setOpen(false);
                }, 1500);


                setTimeout(() =>
                {

                    window.location.reload()
                }, 1500);
            } else
            {
                throw new Error(response.data.message || "Error uploading PDF");
            }
        } catch (error)
        {
            setUploadStatus({
                success: false,
                message: error.message || "Failed to upload PDF",
            });
        } finally
        {
            setIsUploading(false);
        }
    };

    const [contentItems, setContentItems] = useState([]);
    // Fetch Pdfs
    useEffect(() =>
    {
        const fetchPDFs = async () =>
        {
            try
            {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:5000/api/users/pdfbyemail", {
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




    const [activeTab, setActiveTab] = useState("all");

    // Sample content items (you would fetch these from your backend)


    return (
        <div className="flex min-h-screen bg-gray-50">
            <LecturerSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
                        <p className="text-gray-500 mt-1">Manage and organize your teaching materials</p>
                    </div>



                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2 bg-black hover:bg-black">
                                <Plus size={16} />
                                Add New PDF
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Upload PDF Document</DialogTitle>
                                <DialogDescription>
                                    Upload a PDF file to your collection. Please provide a title for your document.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="pdfTitle" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        id="pdfTitle"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter document title"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="pdfFile" className="text-right">
                                        PDF File
                                    </Label>
                                    <div className="col-span-3">
                                        <Input
                                            id="pdfFile"
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            className="col-span-3"
                                        />
                                        {selectedFile && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Selected: {selectedFile.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {uploadStatus && (
                                <Alert
                                    className={
                                        uploadStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                                    }
                                >
                                    {uploadStatus.success ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <AlertCircle className="h-4 w-4" />
                                    )}
                                    <AlertDescription>{uploadStatus.message}</AlertDescription>
                                </Alert>
                            )}

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="flex items-center gap-2"
                                >
                                    {isUploading ? "Uploading..." : "Upload PDF"}
                                    {!isUploading && <Upload size={16} />}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>


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
                        <TabsTrigger value="all">Uploaded</TabsTrigger>

                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contentItems.map((item) => (
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