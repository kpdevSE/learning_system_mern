import { useState } from "react";
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

export default function Payment()
{
    const [activeTab, setActiveTab] = useState("history");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [newPaymentDialogOpen, setNewPaymentDialogOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalPaid.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">Current academic year</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">{pendingPayments.length} pending invoices</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${pendingPayments[0]?.amount.toFixed(2) || "0.00"}</div>
                            <p className="text-xs text-muted-foreground">Due on {pendingPayments[0]?.dueDate || "N/A"}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
                            <BadgePercent className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$250.00</div>
                            <p className="text-xs text-muted-foreground">Academic achievement bonus</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="history" className="mb-6" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="history">Payment History</TabsTrigger>
                        <TabsTrigger value="pending">Pending Payments</TabsTrigger>
                        <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                    </TabsList>

                    <TabsContent value="history">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction History</CardTitle>
                                <CardDescription>View all your payment transactions</CardDescription>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <div className="relative flex-1">
                                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by description or ID..."
                                            className="pl-10"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="processing">Processing</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
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
                                        {filteredPayments.map(payment => (
                                            <TableRow key={payment.id}>
                                                <TableCell className="font-medium">{payment.id}</TableCell>
                                                <TableCell>{payment.date}</TableCell>
                                                <TableCell>{payment.description}</TableCell>
                                                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                                                <TableCell>{payment.method}</TableCell>
                                                <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    {payment.receipt && (
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="h-4 w-4 mr-1" /> Receipt
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {filteredPayments.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                                    No payment records found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>

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