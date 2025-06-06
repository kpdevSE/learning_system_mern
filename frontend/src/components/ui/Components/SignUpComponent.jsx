import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LogIn, UserPlus, Mail, Lock, User, GraduationCap, BookOpen, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { toast } from "sonner";

export default function RegisterComponent()
{
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const { toast } = useToast();

    // Login form state
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        role: "student" // Default role
    });

    // Register form state
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student" // Default role
    });

    const handleLoginChange = (e) =>
    {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) =>
    {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) =>
    {
        e.preventDefault();

        if (!loginData.email || !loginData.password)
        {
            alert("please fill all the feilds")
            return;
        }

        try
        {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:5000/api/auth/login`, loginData);

            // Store token in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("userId", response.data.user._id);


            toast.success("Login successfully")

            // Redirect based on role
            setTimeout(() =>
            {
                const role = response.data.user.role;
                if (role === "admin")
                {
                    window.location.href = "/admin/courses";
                } else if (role === "teacher")
                {
                    window.location.href = "/lecturer/dashboard";
                } else
                {
                    window.location.href = "/student/dashboard";
                }
            }, 1000);

            setIsOpen(false);
        } catch (error)
        {
            console.error("Login error:", error.response?.data || error.message);
            toast.error("Login Failed")
        } finally
        {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) =>
    {
        e.preventDefault();

        // Basic validation
        if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword)
        {
            toast.error("Please fill the all feilds")
            return;
        }

        if (registerData.password !== registerData.confirmPassword)
        {
            toast.error("password do not match")
            return;
        }

        try
        {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:5000/api/auth/register`, registerData);


            toast.success("Registration Sucessfull. Please Login")

            // Reset form and switch to login tab
            setRegisterData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "student"
            });

            // A timeout to allow the toast to be seen
            setTimeout(() =>
            {
                document.getElementById("login-tab").click();
            }, 1000);

        } catch (error)
        {
            console.error("Login error:", error.response?.data || error.message);
            toast.error("Something went wrong")
        } finally
        {
            setIsLoading(false);
        }
    };

    const getRoleIcon = (role) =>
    {
        switch (role)
        {
            case 'student': return <GraduationCap className="w-4 h-4" />;
            case 'teacher': return <BookOpen className="w-4 h-4" />;
            case 'admin': return <Shield className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getRoleColor = (role) =>
    {
        switch (role)
        {
            case 'student': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'teacher': return 'bg-green-100 text-green-800 border-green-200';
            case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] p-0 border-0 bg-transparent shadow-2xl">
                <Card className="w-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-t-lg">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Sign in to your account or create a new one to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-lg">
                                <TabsTrigger
                                    id="login-tab"
                                    value="login"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-medium transition-all duration-200"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </TabsTrigger>
                                <TabsTrigger
                                    value="register"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-600 font-medium transition-all duration-200"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Register
                                </TabsTrigger>
                            </TabsList>

                            {/* Login Tab */}
                            <TabsContent value="login" className="space-y-0">
                                <div onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-email" className="text-sm font-medium text-gray-700 flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id="login-email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={loginData.email}
                                            onChange={handleLoginChange}
                                            disabled={isLoading}
                                            className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="login-password" className="text-sm font-medium text-gray-700 flex items-center">
                                            <Lock className="w-4 h-4 mr-2 text-gray-500" />
                                            Password
                                        </Label>
                                        <Input
                                            id="login-password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                            disabled={isLoading}
                                            className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-gray-700">Select Your Role</Label>
                                        <RadioGroup
                                            name="role"
                                            value={loginData.role}
                                            onValueChange={(value) => setLoginData(prev => ({ ...prev, role: value }))}
                                            className="flex flex-wrap gap-3"
                                            disabled={isLoading}
                                        >
                                            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${loginData.role === 'student' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <RadioGroupItem value="student" id="login-student" className="text-blue-600" />
                                                <Label htmlFor="login-student" className="cursor-pointer flex items-center font-medium">
                                                    <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                                                    Student
                                                </Label>
                                            </div>
                                            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${loginData.role === 'teacher' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <RadioGroupItem value="teacher" id="login-teacher" className="text-green-600" />
                                                <Label htmlFor="login-teacher" className="cursor-pointer flex items-center font-medium">
                                                    <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                                                    Teacher
                                                </Label>
                                            </div>
                                            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${loginData.role === 'admin' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <RadioGroupItem value="admin" id="login-admin" className="text-purple-600" />
                                                <Label htmlFor="login-admin" className="cursor-pointer flex items-center font-medium">
                                                    <Shield className="w-4 h-4 mr-2 text-purple-600" />
                                                    Admin
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <Button
                                        onClick={handleLogin}
                                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Logging in...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <LogIn className="w-4 h-4 mr-2" />
                                                Sign In
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Register Tab */}
                            <TabsContent value="register" className="space-y-0">
                                <div onSubmit={handleRegister} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="register-name" className="text-sm font-medium text-gray-700 flex items-center">
                                            <User className="w-4 h-4 mr-2 text-gray-500" />
                                            Full Name
                                        </Label>
                                        <Input
                                            id="register-name"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={registerData.name}
                                            onChange={handleRegisterChange}
                                            disabled={isLoading}
                                            className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="register-email" className="text-sm font-medium text-gray-700 flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id="register-email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={registerData.email}
                                            onChange={handleRegisterChange}
                                            disabled={isLoading}
                                            className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="register-password" className="text-sm font-medium text-gray-700 flex items-center">
                                                <Lock className="w-4 h-4 mr-2 text-gray-500" />
                                                Password
                                            </Label>
                                            <Input
                                                id="register-password"
                                                name="password"
                                                type="password"
                                                placeholder="Create password"
                                                value={registerData.password}
                                                onChange={handleRegisterChange}
                                                disabled={isLoading}
                                                className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="register-confirm-password" className="text-sm font-medium text-gray-700 flex items-center">
                                                <Lock className="w-4 h-4 mr-2 text-gray-500" />
                                                Confirm
                                            </Label>
                                            <Input
                                                id="register-confirm-password"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm password"
                                                value={registerData.confirmPassword}
                                                onChange={handleRegisterChange}
                                                disabled={isLoading}
                                                className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-gray-700">Register As</Label>
                                        <RadioGroup
                                            name="role"
                                            value={registerData.role}
                                            onValueChange={(value) => setRegisterData(prev => ({ ...prev, role: value }))}
                                            className="flex flex-wrap gap-3"
                                            disabled={isLoading}
                                        >
                                            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${registerData.role === 'student' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <RadioGroupItem value="student" id="register-student" className="text-blue-600" />
                                                <Label htmlFor="register-student" className="cursor-pointer flex items-center font-medium">
                                                    <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                                                    Student
                                                </Label>
                                            </div>
                                            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${registerData.role === 'teacher' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <RadioGroupItem value="teacher" id="register-teacher" className="text-green-600" />
                                                <Label htmlFor="register-teacher" className="cursor-pointer flex items-center font-medium">
                                                    <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                                                    Teacher
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                            <p className="text-xs text-amber-700 flex items-center">
                                                <Shield className="w-3 h-3 mr-1.5" />
                                                Admin accounts can only be created by existing administrators
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleRegister}
                                        className="w-full h-11 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Creating Account...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <UserPlus className="w-4 h-4 mr-2" />
                                                Create Account
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}