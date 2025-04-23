// components/Navbar.jsx
import React, { useState } from 'react';
import { Button } from '../button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LoginComponent from './SignUpComponent';
import RegisterComponent from './LoginComponent';

const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () =>
    {
        setIsOpen(!isOpen);
    };

    const toggleCoursesMenu = () =>
    {
        setIsCoursesOpen(!isCoursesOpen);
    };

    const isActive = (path) =>
    {
        return location.pathname === path;
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const courseLinks = [
        { name: 'General English', path: '/courses/general-english' },
        { name: 'Business English', path: '/courses/business-english' },
        { name: 'IELTS Preparation', path: '/courses/ielts-preparation' },
        { name: 'Conversational English', path: '/courses/conversational-english' },
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-purple-600">English Learning</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(link.path)
                                    ? 'text-purple-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-purple-600 hover:bg-blue-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Courses Dropdown */}
                        <div className="relative">
                            <button
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-blue-50 flex items-center"
                                onClick={toggleCoursesMenu}
                            >
                                Courses <ChevronDown className="ml-1 h-4 w-4" />
                            </button>

                            {isCoursesOpen && (
                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
                                    {courseLinks.map((course) => (
                                        <Link
                                            key={course.path}
                                            to={course.path}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-purple-600"
                                            onClick={() => setIsCoursesOpen(false)}
                                        >
                                            {course.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <LoginComponent />
                        <RegisterComponent />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-blue-50 focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-purple-600 hover:bg-blue-50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Courses Dropdown */}
                        <div>
                            <button
                                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-blue-50 rounded-md"
                                onClick={toggleCoursesMenu}
                            >
                                Courses
                                <ChevronDown className={`h-4 w-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isCoursesOpen && (
                                <div className="pl-4">
                                    {courseLinks.map((course) => (
                                        <Link
                                            key={course.path}
                                            to={course.path}
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-blue-50 rounded-md"
                                            onClick={() =>
                                            {
                                                setIsCoursesOpen(false);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {course.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                    G
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">Guest User</div>
                                <div className="text-sm font-medium text-gray-500">Not signed in</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <Link
                                to="/login"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-blue-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Log In
                            </Link>
                            <LoginComponent />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;