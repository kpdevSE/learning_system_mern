import { useEffect, useState } from "react";
import StudentSidebar from "../../Components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import
{
    CreditCard,
    Calendar,
    Clock,
    Download,
    FileText,
    Filter,
    Search as SearchIcon,
    CheckCircle,
    AlertCircle,
    Wallet,
    DollarSign,
    BadgePercent,
    TrendingUp,
    CircleAlert
} from "lucide-react";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CompanyLogo from '../../../../assets/ProfileImages/logo.png'


export default function Payment()
{
    const [activeTab, setActiveTab] = useState("history");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [newPaymentDialogOpen, setNewPaymentDialogOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState({})

    // Mock payment history data
    const paymentHistory = [
        {
            id: "PAY-2025-04-15",
            date: "Apr 15, 2025",
            description: "Spring Semester Tuition",
            amount: 3500.00,
            status: "completed",
            method: "Credit Card",
            receipt: true
        },
        {
            id: "PAY-2025-03-20",
            date: "Mar 20, 2025",
            description: "Library Late Fees",
            amount: 12.50,
            status: "completed",
            method: "Debit Card",
            receipt: true
        },
        {
            id: "PAY-2025-03-10",
            date: "Mar 10, 2025",
            description: "Advanced Data Structures Course",
            amount: 79.99,
            status: "completed",
            method: "PayPal",
            receipt: true
        },
        {
            id: "PAY-2025-02-28",
            date: "Feb 28, 2025",
            description: "Campus Parking Permit",
            amount: 250.00,
            status: "completed",
            method: "Bank Transfer",
            receipt: true
        },
        {
            id: "PAY-2025-01-15",
            date: "Jan 15, 2025",
            description: "Winter Semester Tuition",
            amount: 3500.00,
            status: "processing",
            method: "Credit Card",
            receipt: false
        },
        {
            id: "PAY-2024-12-10",
            date: "Dec 10, 2024",
            description: "Laboratory Fees",
            amount: 150.00,
            status: "failed",
            method: "Credit Card",
            receipt: false
        }
    ];

    // Mock pending payments data
    const pendingPayments = [
        {
            id: "INV-2025-05-15",
            dueDate: "May 15, 2025",
            description: "Summer Semester Tuition",
            amount: 2800.00,
            status: "unpaid"
        },
        {
            id: "INV-2025-04-30",
            dueDate: "Apr 30, 2025",
            description: "Graduation Fee",
            amount: 120.00,
            status: "unpaid"
        },
        {
            id: "INV-2025-05-10",
            dueDate: "May 10, 2025",
            description: "Dormitory Fees",
            amount: 1500.00,
            status: "unpaid"
        }
    ];

    // Filter payment history based on search and status
    const filteredPayments = paymentHistory.filter(payment =>
    {
        const matchesSearch = payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === "all" || payment.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Calculate payment statistics
    const totalPaid = paymentHistory
        .filter(p => p.status === "completed")
        .reduce((sum, payment) => sum + payment.amount, 0);

    const pendingAmount = pendingPayments
        .reduce((sum, payment) => sum + payment.amount, 0);

    // Handle new payment submission
    const handlePaymentSubmit = (e) =>
    {
        e.preventDefault();
        // In a real implementation, this would process the payment
        alert("Payment processed successfully!");
        setNewPaymentDialogOpen(false);
    };

    const [payement, setPayemeny] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
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

    const companyInfo = {
        name: "English Academy",
        address: "123 Education Street, City, State 12345",
        email: "support@educationinstitute.com",
        phone: "+1 (555) 123-4567",
        website: "www.educationinstitute.com",
        logo: CompanyLogo
    };

    const loadImageAsBase64 = (url) =>
    {
        return new Promise((resolve, reject) =>
        {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () =>
            {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    const generateInvoicePDF = async (payment) =>
    {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;

        // Add company logo (placeholder)
        doc.addImage(companyInfo.logo, 'PNG', 15, 15, 50, 15);

        // Add invoice title and number
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("INVOICE", pageWidth / 2, 30, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`Invoice #: ${payment._id}`, pageWidth - 15, 15, { align: 'right' });


        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(companyInfo.name, 15, 40);
        doc.text(companyInfo.address, 15, 45);
        doc.text(`Phone: ${companyInfo.phone}`, 15, 50);
        doc.text(`Email: ${companyInfo.email}`, 15, 55);
        doc.text(`Website: ${companyInfo.website}`, 15, 60);

        doc.setDrawColor(220, 220, 220);
        doc.line(15, 65, pageWidth - 15, 65);

        // Student Info
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text("Billed To:", 15, 75);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        // Increased space between student and lecturer email
        doc.text(`Student Email : ${payment.loggedUserEmail}`, 15, 80);
        doc.text(`Lecturer Email : ${payment.savedLecturerEmail}`, 15, 90); // Adjusted y-coordinate

        console.log(payment.loggedUserEmail);
        console.log(payment.savedLecturerEmail);

        // Payment Details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text("Payment Details", 15, 105);

        // Displaying Payment Details without using table
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Description: ${payment.savedSmallDescription}`, 15, 115);
        doc.text(`Amount: Rs. ${payment.savedPrice}`, 15, 120);

        const finalY = 130;  // Adjusted for a cleaner layout
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text("Total Amount:", 120, finalY);
        doc.text(`Rs. ${payment.savedPrice}`, pageWidth - 15, finalY, { align: 'right' });

        doc.text("Payment Status:", 120, finalY + 5);
        doc.text("Completed", pageWidth - 15, finalY + 5, { align: 'right' });

        doc.text("Payment Method:", 120, finalY + 10);
        doc.text("Online", pageWidth - 15, finalY + 10, { align: 'right' });

        doc.setDrawColor(220, 220, 220);
        doc.line(15, finalY + 20, pageWidth - 15, finalY + 20);

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text("Thank you for your payment!", pageWidth / 2, finalY + 30, { align: 'center' });
        doc.text("This is an electronically generated receipt and does not require a signature.",
            pageWidth / 2, finalY + 35, { align: 'center' });

        doc.save(`Invoice-${payment._id}.pdf`);
    };

    // Open invoice preview modal
    const openInvoicePreview = (payment) =>
    {
        setSelectedPayment(payment);
        setPreviewOpen(true);
    };

    // Close invoice preview modal
    const closeInvoicePreview = () =>
    {
        setPreviewOpen(false);
    };







    useEffect(() =>
    {
        const fetchStudentCount = async () =>
        {
            const token = localStorage.getItem('token');
            try
            {
                setLoading(true)
                const response = await axios.get('http://localhost:5000/api/users/countofpayement', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPayemeny(response.data.data);
                console.log(response.data.data)
            } catch (err)
            {
                console.error('Error fetching student count:', err);
            }
            setLoading(false)
        };

        fetchStudentCount();
    }, []);

    // Status badge renderer
    const renderStatusBadge = (status) =>
    {
        switch (status)
        {
            case "completed":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" /> Completed
                    </Badge>
                );
            case "processing":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <Clock className="w-3 h-3 mr-1" /> Processing
                    </Badge>
                );
            case "failed":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        <AlertCircle className="w-3 h-3 mr-1" /> Failed
                    </Badge>
                );
            case "unpaid":
                return (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <CircleAlert className="w-3 h-3 mr-1" /> Unpaid
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />

            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                        <p className="text-muted-foreground">Manage your payments and view transaction history</p>
                    </div>
                    <Button onClick={() => setNewPaymentDialogOpen(true)} className='bg-black hover:bg-black'>
                        <DollarSign className="mr-2 h-4 w-4" /> Make a Payment
                    </Button>
                </div>

                {/* Payment Stats */}


                <Tabs defaultValue="history" className="mb-6" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="history">Payment History</TabsTrigger>

                    </TabsList>

                    <TabsContent value="history">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction History</CardTitle>
                                <CardDescription>View all your payment transactions</CardDescription>


                            </CardHeader>

                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payement.map(payment => (
                                            <TableRow key={payment._id}>
                                                <TableCell className="font-medium">{payment._id}</TableCell>
                                                <TableCell>{new Date(payment.createdAt).toLocaleString('en-US', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })}</TableCell>
                                                <TableCell>{payment.savedSmallDescription}</TableCell>
                                                <TableCell>Rs.{payment.savedPrice}</TableCell>
                                                <TableCell>Online</TableCell>
                                                <TableCell><div className="bg-green-300 text-green-800 font-semibold rounded-lg flex items-center text-center justify-center">completed</div></TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => openInvoicePreview(payment)}
                                                        >
                                                            <FileText className="h-4 w-4 mr-1" /> Preview
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => generateInvoicePDF(payment)}
                                                        >
                                                            <Download className="h-4 w-4 mr-1" /> Invoice
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {payement.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                                    No payment records found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>

                            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Invoice Preview</DialogTitle>
                                        <DialogDescription>
                                            Preview your invoice before downloading
                                        </DialogDescription>
                                    </DialogHeader>

                                    {selectedPayment && (
                                        <div className="p-4 border rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <img src={companyInfo.logo} alt="Logo" className="h-12 mb-4" />
                                                    <h3 className="text-lg font-bold">{companyInfo.name}</h3>
                                                    <p className="text-sm text-gray-500">{companyInfo.address}</p>
                                                    <p className="text-sm text-gray-500">{companyInfo.email}</p>
                                                </div>
                                                <div className="text-right">
                                                    <h2 className="text-xl font-bold">INVOICE</h2>
                                                    <p className="text-sm">#{selectedPayment._id}</p>
                                                    <p className="text-sm">Date: {new Date(selectedPayment.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            {payement.map((e) =>
                                            {
                                                return (

                                                    <div className="border-t border-b my-4 py-4">
                                                        <h4 className="font-medium mb-2">Bill To:</h4>
                                                        <p className="text-sm">Student Name: <span className="font-bold"> {e.loggedUserEmail}</span></p>
                                                        <p className="text-sm">Lecturer Email: <span className="font-bold"> {e.savedLecturerEmail}</span> </p>
                                                    </div>
                                                )

                                            })}

                                            <table className="w-full mb-6">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="py-2 px-4 text-left">Description</th>
                                                        <th className="py-2 px-4 text-right">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="py-2 px-4 border-b">{selectedPayment.savedSmallDescription}</td>
                                                        <td className="py-2 px-4 text-right border-b">Rs.{selectedPayment.savedPrice}</td>
                                                    </tr>
                                                    <tr className="font-bold">
                                                        <td className="py-2 px-4 text-right">Total:</td>
                                                        <td className="py-2 px-4 text-right">Rs.{selectedPayment.savedPrice}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="flex justify-between text-sm">
                                                <div>
                                                    <p>Payment Status: <span className="font-medium">Completed</span></p>
                                                    <p>Payment Method: <span className="font-medium">Online</span></p>
                                                </div>
                                                <div className="text-center text-gray-500 text-xs mt-4">
                                                    <p>Thank you for your payment!</p>
                                                    <p>This is an electronically generated receipt and does not require a signature.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <DialogFooter className="flex justify-between">
                                        <Button variant="outline" onClick={closeInvoicePreview}>Close</Button>
                                        <Button
                                            onClick={() =>
                                            {
                                                if (selectedPayment)
                                                {
                                                    generateInvoicePDF(selectedPayment);
                                                }
                                            }}
                                        >
                                            <Download className="h-4 w-4 mr-2" /> Download PDF
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <CardFooter className="flex justify-between">
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4" /> Export Statement
                                </Button>
                                <div className="text-sm text-muted-foreground">
                                    Showing {filteredPayments.length} of {paymentHistory.length} transactions
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="pending">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Payments</CardTitle>
                                <CardDescription>Upcoming payments and invoices</CardDescription>
                            </CardHeader>

                            <CardContent>
                                {pendingPayments.length > 0 ? (
                                    <div className="space-y-4">
                                        {pendingPayments.map(payment => (
                                            <div key={payment.id} className="border rounded-lg p-4">
                                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-medium">{payment.description}</h3>
                                                        <p className="text-sm text-muted-foreground">{payment.id}</p>
                                                    </div>
                                                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                                                        {renderStatusBadge(payment.status)}
                                                        <span className="font-bold">${payment.amount.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap justify-between items-center gap-2">
                                                    <div className="text-sm flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                                        Due: {payment.dueDate}
                                                    </div>
                                                    <Button className="bg-black hover:bg-black">Pay Now</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                                        <h3 className="text-lg font-medium">No Pending Payments</h3>
                                        <p className="text-muted-foreground mt-2">
                                            You don't have any pending payments at the moment.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="methods">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Methods</CardTitle>
                                <CardDescription>Manage your saved payment methods</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-md">
                                                <CreditCard className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Credit Card</h3>
                                                <p className="text-sm text-muted-foreground">•••• •••• •••• 4242</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-black">Default</Badge>
                                    </div>

                                    <div className="border rounded-lg p-4 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-md">
                                                <Wallet className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">PayPal</h3>
                                                <p className="text-sm text-muted-foreground">student@example.com</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Make Default</Button>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Button className="w-full bg-black hover:bg-black">
                                    <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Make Payment Dialog */}
            <Dialog open={newPaymentDialogOpen} onOpenChange={setNewPaymentDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Make a Payment</DialogTitle>
                        <DialogDescription>
                            Enter payment details to process your transaction
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handlePaymentSubmit}>
                        <div className="space-y-4 my-4">
                            <div className="space-y-2">
                                <Label htmlFor="payment-type">Payment Type</Label>
                                <Select
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                >
                                    <SelectTrigger id="payment-type">
                                        <SelectValue placeholder="Select payment type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="credit-card">Credit Card (•••• 4242)</SelectItem>
                                        <SelectItem value="paypal">PayPal</SelectItem>
                                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="new-card">New Credit Card</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="invoice">Select Invoice</Label>
                                <Select defaultValue={pendingPayments[0]?.id}>
                                    <SelectTrigger id="invoice">
                                        <SelectValue placeholder="Select invoice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pendingPayments.map(payment => (
                                            <SelectItem key={payment.id} value={payment.id}>
                                                {payment.description} - ${payment.amount.toFixed(2)}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="custom">Custom Amount</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {paymentMethod === "new-card" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="card-number">Card Number</Label>
                                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry Date</Label>
                                            <Input id="expiry" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" placeholder="123" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name on Card</Label>
                                        <Input id="name" placeholder="John Doe" />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="amount"
                                        className="pl-8"
                                        defaultValue={pendingPayments[0]?.amount.toFixed(2)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Input id="notes" placeholder="Add payment notes" />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setNewPaymentDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-black hover:bg-black">Process Payment</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}