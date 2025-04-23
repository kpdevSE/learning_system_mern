import { useState, useEffect } from 'react';
import { Menu, X, Home, Settings, Users, BarChart2, HelpCircle } from 'lucide-react';
import { Button } from '../button';
import { Separator } from '../separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Sidebar()
{
    const [isMobileView, setIsMobileView] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Menu items for the sidebar
    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '#' },
        { icon: BarChart2, label: 'Analytics', href: '#' },
        { icon: Users, label: 'Team', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
        { icon: HelpCircle, label: 'Help', href: '#' },
    ];

    // Check if the screen is mobile size
    useEffect(() =>
    {
        const checkScreenSize = () =>
        {
            setIsMobileView(window.innerWidth < 1024); // 1024px is the lg breakpoint in Tailwind
        };

        // Initial check
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Clean up
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
                        <div className="font-semibold text-lg">Company Name</div>

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
                    <nav className="flex-1 space-y-1 p-2">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-blue-500 dark:text-gray-200 dark:hover:bg-gray-800 hover:text-white  hover:font-semibold"
                            >
                                <item.icon size={20} className="mr-3" />
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4">
                        <Separator className="my-2" />
                        <div className="flex items-center pt-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                            <div className="ml-3">
                                <p className="text-sm font-medium">User Name</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
                            </div>
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