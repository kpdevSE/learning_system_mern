import { useState } from 'react';
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import Navbar from '@/components/ui/Components/NavigationBar';
import PersonImage from '../../assets/person.jpg'
import HeroBg from '../../assets/herobg.jpg'
import BootCampImage from '../../assets/bbotcamps.jpg'
import UIUXimage from '../../assets/uiux.jpg'
import DataScience from '../../assets/datascience.jpg'
import Girl from '../../assets/girl.jpg'
import Boy from '../../assets/boy.jpg'

export default function LMSLandingPage()
{


    const features = [
        {
            icon: <BookOpen className="h-6 w-6 text-violet-600" />,
            title: "Extensive Course Library",
            description: "Access hundreds of courses across various disciplines and skill levels."
        },
        {
            icon: <Users className="h-6 w-6 text-violet-600" />,
            title: "Expert Instructors",
            description: "Learn from industry professionals with years of experience."
        },
        {
            icon: <Award className="h-6 w-6 text-violet-600" />,
            title: "Recognized Certificates",
            description: "Earn certificates that are recognized by top employers worldwide."
        },
        {
            icon: <Clock className="h-6 w-6 text-violet-600" />,
            title: "Learn at Your Pace",
            description: "Study whenever and wherever with lifetime access to course materials."
        }
    ];

    const popularCourses = [
        {
            id: 1,
            title: "Web Development Bootcamp",
            category: "Programming",
            rating: 4.9,
            students: "12,500+",
            image: BootCampImage
        },
        {
            id: 2,
            title: "UI/UX Design Masterclass",
            category: "Design",
            rating: 4.8,
            students: "8,200+",
            image: UIUXimage
        },
        {
            id: 3,
            title: "Data Science Fundamentals",
            category: "Data Science",
            rating: 4.7,
            students: "10,800+",
            image: DataScience
        }
    ];

    const testimonials = [
        {
            id: 1,
            content: "This platform transformed my career. The courses are comprehensive and the instructors are knowledgeable and engaging.",
            author: "Sarah Johnson",
            role: "Software Developer",
            avatar: Girl
        },
        {
            id: 2,
            content: "I've tried many online learning platforms, but LearnHub stands out with its intuitive interface and high-quality content.",
            author: "Michael Chen",
            role: "UX Designer",
            avatar: Boy
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 md:pr-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Unlock Your Potential with Expert-Led Courses
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Join millions of learners worldwide and transform your career with our comprehensive learning platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#" className="bg-violet-600 text-white hover:bg-violet-700 px-6 py-3 rounded-md text-base font-medium flex items-center justify-center">
                                    Get Started For Free <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                                <a href="#" className="bg-white text-violet-700 border border-violet-600 hover:bg-violet-50 px-6 py-3 rounded-md text-base font-medium flex items-center justify-center">
                                    Browse Courses
                                </a>
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((id) => (
                                        <img key={id} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" src={PersonImage} />
                                    ))}
                                </div>
                                <span className="ml-3 text-sm text-gray-600">
                                    Join <span className="font-semibold">200,000+</span> satisfied learners
                                </span>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                            <img src={HeroBg} alt="Learning Platform" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Courses */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Most Popular Courses</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Start your learning journey with our top-rated courses
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularCourses.map((course) => (
                            <div key={course.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                <div className="p-5">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 mb-3">{course.category}</span>
                                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <span className="text-yellow-400">★</span>
                                            <span className="ml-1 text-sm font-medium">{course.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{course.students} students</span>
                                    </div>
                                    <a href="#" className="block text-center bg-white text-violet-700 border border-violet-600 hover:bg-violet-50 px-4 py-2 rounded-md text-sm font-medium">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <a href="#" className="inline-flex items-center text-violet-700 hover:text-violet-800 font-medium">
                            View all courses <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose LearnHub</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We provide the tools and resources you need to succeed
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-md bg-violet-100">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Success stories from our community of learners
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                        <img src={testimonial.avatar} alt={testimonial.author} />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic">{testimonial.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-violet-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
                    <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
                        Join thousands of students who are already advancing their careers with LearnHub.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#" className="bg-white text-violet-700 hover:bg-gray-100 px-6 py-3 rounded-md text-base font-medium inline-flex items-center justify-center">
                            Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                        <a href="#" className="bg-transparent text-white border border-white hover:bg-violet-600 px-6 py-3 rounded-md text-base font-medium inline-flex items-center justify-center">
                            Learn More
                        </a>
                    </div>
                </div>
            </section>



        </div>
    );
}