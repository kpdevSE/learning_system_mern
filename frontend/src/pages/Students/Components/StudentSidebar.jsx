import { useState, useEffect } from 'react';
import { Menu, X, Home, BookOpen, Calendar, FileText, MessageSquare, Bell, Settings, LogOut, BookmarkIcon, GraduationCap, CreditCard, Clock, Award } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function StudentSidebar()
{
    const [isMobileView, setIsMobileView] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [user, setUser] = useState()
    const navigate = useNavigate();

    // Menu items for the student sidebar
    const menuItems = [
        { icon: Home, name: "Dashboard", path: "/student/dashboard" },
        { icon: GraduationCap, name: "Profile", path: "/student/profile" },
        { icon: BookOpen, name: "My Courses", path: "/student/courses" },
        { icon: FileText, name: "Assignments", path: "/student/assignments" },
        { icon: Bell, name: "Notifications", path: "/student/notifications" },
        { icon: CreditCard, name: "Payments", path: "/student/payments" },
    ];

    const handleLogout = async () =>
    {
        try
        {
            // Remove JWT from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Optionally call the backend logout endpoint (stateless)
            await axios.post('http://localhost:5000/api/auth/logout');

            // Redirect to login page
            navigate('/');
        } catch (error)
        {
            console.error('Logout error:', error);
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
        const checkScreenSize = () =>
        {
            setIsMobileView(window.innerWidth < 1024);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);


    }, []);



    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && isMobileView && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <div className="fixed top-4 left-4 z-30 lg:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle Menu"
                >
                    <Menu size={20} />
                </Button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 z-30
                h-full bg-white dark:bg-gray-950
                border-r border-gray-200 dark:border-gray-800 
                transition-all duration-300 ease-in-out
                ${isMobileView ? 'w-64' : 'w-64'} 
                ${isMobileView && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}
            `}>
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between px-4">
                        <div className="font-semibold text-lg">Learning Portal</div>

                        {/* Mobile Close Button */}
                        {isMobileView && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileOpen(false)}
                                className="lg:hidden"
                                aria-label="Close Sidebar"
                            >
                                <X size={20} />
                            </Button>
                        )}
                    </div>

                    <Separator />

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className="flex items-center rounded-md px-3 py-2 text-gray-700 cursor-pointer hover:bg-black dark:text-gray-200 dark:hover:bg-gray-800 hover:text-white hover:font-semibold"
                            >
                                <item.icon size={20} className="mr-3" />
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4">
                        <Separator className="my-2" />

                        <div className="flex items-center pt-2">
                            <Avatar className="h-16 w-16">
                                {user && user.profileImage ? (
                                    <AvatarImage
                                        src={`http://localhost:5000${user.profileImage}`}
                                        alt={user.name || "Profile"}
                                    />
                                ) : (
                                    <AvatarImage src="/api/placeholder/100/100" alt="Profile" />
                                )}

                            </Avatar>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{user?.name || "Student Name"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.lecturerEmail || "example@gmail.com"}</p>

                            </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                <Settings size={16} className="mr-1" />
                                Settings
                            </Button>
                            <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-500" onClick={handleLogout}>
                                <LogOut size={16} className="mr-1" />
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area - This pushes the content to the right when sidebar is visible */}
            <div className={`
                transition-all duration-300 ease-in-out
                ${isMobileView ? 'ml-0' : 'ml-64'}
            `}>
                {/* Your main content goes here */}
            </div>
        </>
    );
}