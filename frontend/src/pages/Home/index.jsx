import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { ChevronRight, BookOpen, Users, Calendar, Video, Award, Star } from 'lucide-react';
import Navbar from '@/components/ui/Components/NavigationBar';

export default function HomePage()
{
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-16 px-4 md:py-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect with Expert English Tutors</h1>
                            <p className="text-xl mb-8">Book personalized lessons, access quality courses, and improve your English skills at your own pace.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                                    Find a Tutor
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                                    Browse Courses
                                </Button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-blue-500 p-8 rounded-xl">
                                <img src="/api/placeholder/500/350" alt="Online tutoring illustration" className="rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <Calendar className="h-10 w-10 text-blue-600 mb-2" />
                                <CardTitle>Flexible Booking System</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Book lessons with qualified tutors based on your schedule, with real-time availability and instant confirmation.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <Video className="h-10 w-10 text-blue-600 mb-2" />
                                <CardTitle>Virtual Classroom</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Enjoy seamless video lessons with integrated whiteboard, screen sharing, and interactive learning tools.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                                <CardTitle>Structured Courses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Access specialized English courses designed by expert lecturers, from general English to IELTS preparation.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Our platform makes it easy to connect with English tutors and start learning immediately</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
                            <p className="text-gray-600">Sign up and set your learning preferences and goals</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <Calendar className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">2. Book a Tutor</h3>
                            <p className="text-gray-600">Browse tutor profiles and schedule lessons</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <Video className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">3. Attend Lessons</h3>
                            <p className="text-gray-600">Join live video sessions and access learning materials</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <Award className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">4. Track Progress</h3>
                            <p className="text-gray-600">Complete assessments and earn certificates</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Categories */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Popular Course Categories</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "General English", icon: BookOpen, count: "120+ Courses" },
                            { title: "Business English", icon: BookOpen, count: "85+ Courses" },
                            { title: "IELTS Preparation", icon: BookOpen, count: "64+ Courses" },
                            { title: "Conversational English", icon: BookOpen, count: "95+ Courses" },
                            { title: "Academic Writing", icon: BookOpen, count: "42+ Courses" },
                            { title: "English for Kids", icon: BookOpen, count: "38+ Courses" }
                        ].map((category, index) => (
                            <Card key={index} className="group hover:border-blue-400 transition-all cursor-pointer">
                                <CardHeader className="pb-2">
                                    <category.icon className="h-6 w-6 text-blue-600 mb-2" />
                                    <CardTitle>{category.title}</CardTitle>
                                </CardHeader>
                                <CardFooter className="pt-2 flex justify-between items-center">
                                    <CardDescription>{category.count}</CardDescription>
                                    <ChevronRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            View All Courses
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Thompson",
                                role: "IELTS Student",
                                content: "The platform made it incredibly easy to find the perfect tutor for my IELTS preparation. I improved my score from 6.5 to 7.5 in just two months!",
                                rating: 5
                            },
                            {
                                name: "Michael Chen",
                                role: "Business Professional",
                                content: "The business English courses have helped me communicate more confidently with international clients. The scheduling system fits perfectly with my busy schedule.",
                                rating: 5
                            },
                            {
                                name: "Aisha Rahman",
                                role: "University Student",
                                content: "I love how easy it is to book sessions with different tutors. The personalized feedback on my academic writing has been invaluable for my studies.",
                                rating: 4
                            }
                        ].map((testimonial, index) => (
                            <Card key={index} className="border-none shadow-md">
                                <CardHeader>
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="italic mb-4">"{testimonial.content}"</p>
                                    <div className="flex items-center">
                                        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                                            <span className="font-semibold text-blue-600">{testimonial.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-blue-600 text-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Improve Your English?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students learning English with expert tutors on our platform. Get started today!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                            Sign Up Now
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}