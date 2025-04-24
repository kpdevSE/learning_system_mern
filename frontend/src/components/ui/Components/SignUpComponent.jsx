import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

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


            alert("Logged Successfully")

            // Redirect based on role
            setTimeout(() =>
            {
                const role = response.data.user.role;
                if (role === "admin")
                {
                    window.location.href = "/admin/dashboard";
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
            alert("Login failed")
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
            alert("Pleasse fill all the feilds")
            return;
        }

        if (registerData.password !== registerData.confirmPassword)
        {
            alert("Password Do not match")
            return;
        }

        try
        {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:5000/api/auth/register`, registerData);
            console.log(process.env.REACT_APP_API_URL)

            alert("register successfully leas login")

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
            alert("something wrong")
        } finally
        {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Authentication</DialogTitle>
                    <DialogDescription>
                        Sign in to your account or create a new one.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <Input
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Login as</Label>
                                <RadioGroup
                                    name="role"
                                    value={loginData.role}
                                    onValueChange={(value) => setLoginData(prev => ({ ...prev, role: value }))}
                                    className="flex space-x-4"
                                    disabled={isLoading}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="student" id="login-student" />
                                        <Label htmlFor="login-student">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="teacher" id="login-teacher" />
                                        <Label htmlFor="login-teacher">Teacher</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="admin" id="login-admin" />
                                        <Label htmlFor="login-admin">Admin</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Register Tab */}
                    <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="register-name">Full Name</Label>
                                <Input
                                    id="register-name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-email">Email</Label>
                                <Input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-password">Password</Label>
                                <Input
                                    id="register-password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                                <Input
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Register as</Label>
                                <RadioGroup
                                    name="role"
                                    value={registerData.role}
                                    onValueChange={(value) => setRegisterData(prev => ({ ...prev, role: value }))}
                                    className="flex space-x-4"
                                    disabled={isLoading}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="student" id="register-student" />
                                        <Label htmlFor="register-student">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="teacher" id="register-teacher" />
                                        <Label htmlFor="register-teacher">Teacher</Label>
                                    </div>
                                </RadioGroup>
                                <p className="text-xs text-gray-500">
                                    Note: Admin accounts can only be created by existing admins
                                </p>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Registering..." : "Register"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}