import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BookOpen, Award, Calendar, Star, ArrowLeft, CheckCircle, Globe, Headphones, Video, MessageSquare, Target, Trophy, Zap, Play, Download, Mail, Phone } from 'lucide-react';
import Navbar from '@/components/ui/Components/NavigationBar';
import FooterComponent from '@/components/ui/Components/Footer';

const ProgrammeAndFacilities = () =>
{
    const [currentPage, setCurrentPage] = useState('programs');
    const [selectedProgram, setSelectedProgram] = useState(null);

    const programs = [
        {
            id: 1,
            title: 'Online English Courses',
            description: 'Comprehensive online English learning with interactive lessons and live sessions',
            duration: '3-12 months',
            level: 'All Levels',
            students: '500+',
            rating: 4.8,
            price: 'Rs.20,000/=',
            emoji: '🌐',
            heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            cardImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            features: ['📱 Live Interactive Sessions', '⏰ Self-paced Learning', '🎧 24/7 Support', '📲 Mobile App Access'],
            curriculum: ['Grammar Fundamentals', 'Vocabulary Building', 'Speaking Practice', 'Listening Skills', 'Writing Techniques', 'Pronunciation Training'],
            instructor: 'Native English Speakers',
            certificate: 'Course Completion Certificate',
            fullDescription: 'Master English with our comprehensive online courses designed for learners of all levels. Our interactive platform combines live sessions with self-paced learning modules, ensuring flexibility while maintaining high educational standards.',
            highlights: ['Interactive whiteboard sessions', 'Real-time feedback', 'Flexible scheduling', 'Progress analytics'],
            testimonial: '"This course transformed my English skills in just 6 months!" - Sarah Johnson'
        },
        {
            id: 2,
            title: 'IT + English Diploma',
            description: 'Combined program focusing on technical English and IT skills for career advancement',
            duration: '18 months',
            level: 'Intermediate+',
            students: '200+',
            rating: 4.9,
            price: 'Rs.35,000/=',
            emoji: '💻',
            heroImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            cardImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            features: ['🔧 Technical English', '🏆 IT Certifications', '📊 Project-based Learning', '🏢 Industry Placement'],
            curriculum: ['Technical Vocabulary', 'Business Communication', 'Programming Concepts', 'Software Documentation', 'Presentation Skills', 'Professional Writing'],
            instructor: 'Industry Experts',
            certificate: 'Diploma Certificate',
            fullDescription: 'Bridge the gap between English proficiency and IT expertise. This unique program prepares you for international IT careers by combining advanced English skills with technical knowledge and industry-relevant certifications.',
            highlights: ['Industry partnerships', 'Real project experience', 'Job placement assistance', 'Dual certification'],
            testimonial: '"Got my dream job at a tech company thanks to this program!" - Michael Chen'
        },
        {
            id: 3,
            title: 'English Diploma',
            description: 'Formal English diploma program with comprehensive language training',
            duration: '12 months',
            level: 'Beginner to Advanced',
            students: '350+',
            rating: 4.7,
            price: 'Rs.60,000/=',
            emoji: '🎓',
            heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            cardImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            features: ['📚 Comprehensive Curriculum', '📝 Assessment Tests', '💼 Portfolio Development', '✍️ Academic Writing'],
            curriculum: ['English Literature', 'Advanced Grammar', 'Creative Writing', 'Critical Thinking', 'Research Methods', 'Academic Presentation'],
            instructor: 'Certified English Teachers',
            certificate: 'Accredited Diploma',
            fullDescription: 'Earn a recognized English diploma through our structured program that covers all aspects of English language learning. Perfect for students seeking formal qualification and comprehensive language mastery.',
            highlights: ['Accredited qualification', 'University pathway', 'Academic writing focus', 'Literature appreciation'],
            testimonial: '"The diploma opened doors to university abroad!" - Emma Rodriguez'
        },
        {
            id: 4,
            title: '50 Days English Camp',
            description: 'Intensive English immersion program for rapid language improvement',
            duration: '50 days',
            level: 'All Levels',
            students: '150+',
            rating: 4.9,
            price: 'Rs.12,000/=',
            emoji: '⚡',
            heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            cardImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            features: ['🗣️ Daily Practice Sessions', '👥 Group Activities', '🎯 Speaking Challenges', '📈 Progress Tracking'],
            curriculum: ['Daily Conversation', 'Survival English', 'Cultural Context', 'Practical Scenarios', 'Confidence Building', 'Fluency Development'],
            instructor: 'Intensive Learning Specialists',
            certificate: 'Camp Completion Certificate',
            fullDescription: 'Transform your English in just 50 days through our intensive immersion program. Daily practice sessions, group activities, and speaking challenges designed to rapidly improve your confidence and fluency.',
            highlights: ['Rapid improvement', 'Intensive practice', 'Group motivation', 'Daily challenges'],
            testimonial: '"Amazing results in just 50 days - I can finally speak confidently!" - David Kim'
        },
        {
            id: 5,
            title: 'A/L Student English Courses',
            description: 'Specialized English courses designed for Advanced Level students',
            duration: '6 months',
            level: 'Advanced',
            students: '300+',
            rating: 4.6,
            price: 'Rs.8,000/=',
            emoji: '📚',
            heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            cardImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            features: ['📋 Exam Preparation', '✍️ Essay Writing', '📖 Literature Analysis', '🎤 Speaking Practice'],
            curriculum: ['Advanced Grammar', 'Literature Studies', 'Essay Techniques', 'Exam Strategies', 'Critical Analysis', 'Academic English'],
            instructor: 'A/L Specialists',
            certificate: 'Course Certificate',
            fullDescription: 'Specifically designed for Advanced Level students, this course focuses on exam preparation, advanced writing skills, and literature analysis to ensure excellent performance in A/L English examinations.',
            highlights: ['Exam-focused', 'Literature mastery', 'Essay techniques', 'Grade improvement'],
            testimonial: '"Scored A+ in A/L English thanks to this course!" - Priya Sharma'
        },
        {
            id: 6,
            title: 'HD English Course',
            description: 'High-definition English learning with premium content and personalized attention',
            duration: '9 months',
            level: 'All Levels',
            students: '100+',
            rating: 5.0,
            price: 'Rs.225,000/=',
            emoji: '🏆',
            heroImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            cardImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            features: ['⭐ Premium Content', '👨‍🏫 Personal Mentor', '📹 HD Video Lessons', '🤝 One-on-One Sessions'],
            curriculum: ['Personalized Learning Path', 'Advanced Conversation', 'Business English', 'Public Speaking', 'Professional Writing', 'Cultural Intelligence'],
            instructor: 'Premium Tutors',
            certificate: 'Premium Certificate',
            fullDescription: 'Our flagship premium course offering the highest quality English education with personalized mentoring, HD content, and exclusive one-on-one sessions for maximum learning outcomes.',
            highlights: ['Premium quality', 'Personal mentoring', 'HD content', 'Exclusive access'],
            testimonial: '"The best investment I made in my education!" - Alex Thompson'
        }
    ];

    const facilities = [
        {
            icon: <Video className="w-8 h-8" />,
            title: 'HD Video Classrooms',
            description: 'State-of-the-art virtual classrooms with crystal clear video and audio quality for immersive learning experiences.',
            image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <Headphones className="w-8 h-8" />,
            title: '24/7 Audio Lab',
            description: 'Access our comprehensive audio laboratory anytime for pronunciation practice and listening skill development.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: 'Live Chat Support',
            description: 'Instant support from our English experts and technical team whenever you need assistance with your learning journey.',
            image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Global Learning Community',
            description: 'Connect with English learners worldwide through our interactive community platform and practice groups.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: 'Digital Library',
            description: 'Extensive collection of e-books, articles, and learning materials accessible from any device, anywhere.',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: 'Progress Tracking',
            description: 'Advanced analytics and progress tracking tools to monitor your improvement and identify areas for growth.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Achievement System',
            description: 'Gamified learning experience with badges, certificates, and rewards to keep you motivated throughout your journey.',
            image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'AI-Powered Learning',
            description: 'Intelligent learning algorithms that adapt to your pace and style for personalized educational experiences.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];

    const ProgramsPage = () => (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">English Learning Programs</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose from our comprehensive range of English courses designed to meet your specific learning goals and schedule
                        </p>
                    </div>

                    <nav className="flex justify-center space-x-8 mb-12">
                        <button
                            onClick={() => setCurrentPage('programs')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${currentPage === 'programs'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Programs
                        </button>
                        <button
                            onClick={() => setCurrentPage('facilities')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${currentPage === 'facilities'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Facilities
                        </button>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((program) => (
                            <Card key={program.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={program.cardImage}
                                        alt={program.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 text-4xl bg-white/90 rounded-full p-2">
                                        {program.emoji}
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            {program.level}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        {program.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {program.duration}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="w-4 h-4 mr-2" />
                                            {program.students} students enrolled
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                            {program.rating} rating
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button
                                            onClick={() => setSelectedProgram(program)}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Learn More
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );

    const FacilitiesPage = () => (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Facilities</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our world-class facilities designed to enhance your English learning experience
                        </p>
                    </div>

                    <nav className="flex justify-center space-x-8 mb-12">
                        <button
                            onClick={() => setCurrentPage('programs')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${currentPage === 'programs'
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Programs
                        </button>
                        <button
                            onClick={() => setCurrentPage('facilities')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${currentPage === 'facilities'
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Facilities
                        </button>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {facilities.map((facility, index) => (
                            <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white/70 backdrop-blur-sm overflow-hidden">
                                <div className="relative h-32 overflow-hidden">
                                    <img
                                        src={facility.image}
                                        alt={facility.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-2 left-2 text-white">
                                        {facility.icon}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg">{facility.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-sm">{facility.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Choose Our Platform?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-purple-600 mb-4">
                                    <Award className="w-12 h-12 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Certified Excellence</h3>
                                <p className="text-gray-600">All our courses are accredited and meet international standards</p>
                            </div>
                            <div className="text-center">
                                <div className="text-purple-600 mb-4">
                                    <Users className="w-12 h-12 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                                <p className="text-gray-600">Learn from native speakers and certified English professionals</p>
                            </div>
                            <div className="text-center">
                                <div className="text-purple-600 mb-4">
                                    <CheckCircle className="w-12 h-12 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                                <p className="text-gray-600">Join thousands of successful graduates who achieved their goals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );

    const ProgramDetailPage = ({ program }) => (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
                <div className="max-w-6xl mx-auto">
                    <Button
                        onClick={() => setSelectedProgram(null)}
                        variant="outline"
                        className="mb-6 hover:bg-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Programs
                    </Button>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Hero Section with Image */}
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src={program.heroImage}
                                alt={program.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">{program.emoji}</div>
                                    <h1 className="text-4xl font-bold mb-2">{program.title}</h1>
                                    <div className="flex items-center justify-center space-x-6">
                                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                            {program.level}
                                        </Badge>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 mr-1 text-yellow-400" />
                                            <span className="font-semibold">{program.rating}</span>
                                        </div>
                                        <span className="text-3xl font-bold">{program.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <section>
                                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Course Overview</h2>
                                        <p className="text-gray-700 text-lg leading-relaxed mb-4">{program.fullDescription}</p>

                                        {/* Testimonial Card */}
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                            <div className="flex items-start">
                                                <Star className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                                                <p className="text-gray-700 italic">{program.testimonial}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Highlights</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {program.highlights.map((highlight, index) => (
                                                <div key={index} className="flex items-center bg-green-50 p-3 rounded-lg">
                                                    <Trophy className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Curriculum</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {program.curriculum.map((item, index) => (
                                                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {program.features.map((feature, index) => (
                                                <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Video Preview Section */}
                                    <section className="bg-gray-50 p-6 rounded-lg">
                                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Course Preview</h2>
                                        <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                                            <Play className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">Watch Course Introduction</h3>
                                            <p className="text-gray-600 mb-4">Get a preview of what you'll learn in this course</p>
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                <Play className="w-4 h-4 mr-2" />
                                                Play Preview
                                            </Button>
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-6">
                                    <Card className="sticky top-6">
                                        <CardHeader>
                                            <CardTitle>Course Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-gray-500 mr-3" />
                                                <div>
                                                    <div className="font-semibold">Duration</div>
                                                    <div className="text-gray-600">{program.duration}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-gray-500 mr-3" />
                                                <div>
                                                    <div className="font-semibold">Enrolled</div>
                                                    <div className="text-gray-600">{program.students}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <BookOpen className="w-5 h-5 text-gray-500 mr-3" />
                                                <div>
                                                    <div className="font-semibold">Instructor</div>
                                                    <div className="text-gray-600">{program.instructor}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-gray-500 mr-3" />
                                                <div>
                                                    <div className="font-semibold">Certificate</div>
                                                    <div className="text-gray-600">{program.certificate}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="text-center mb-4">
                                                <div className="text-3xl font-bold text-blue-600 mb-2">{program.price}</div>
                                                <div className="text-gray-600">One-time payment</div>
                                            </div>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 mb-3">
                                                Enroll Now
                                            </Button>
                                            <Button variant="outline" className="w-full mb-3">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Brochure
                                            </Button>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    Email
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    Call
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Stats Card */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Quick Stats</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Success Rate</span>
                                                    <span className="font-semibold text-green-600">95%</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Completion Rate</span>
                                                    <span className="font-semibold text-blue-600">88%</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Average Rating</span>
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                                        <span className="font-semibold">{program.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Related Courses */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>You Might Also Like</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {programs.filter(p => p.id !== program.id).slice(0, 2).map((relatedProgram) => (
                                                    <div
                                                        key={relatedProgram.id}
                                                        className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                                        onClick={() => setSelectedProgram(relatedProgram)}
                                                    >
                                                        <div className="text-2xl mr-3">{relatedProgram.emoji}</div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-sm">{relatedProgram.title}</div>
                                                            <div className="text-xs text-gray-600">{relatedProgram.price}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">What's included in the course?</h3>
                                        <p className="text-gray-600 text-sm">All video lessons, exercises, assessments, and certificate upon completion.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Can I learn at my own pace?</h3>
                                        <p className="text-gray-600 text-sm">Yes, most courses offer flexible scheduling with self-paced learning options.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Is there a money-back guarantee?</h3>
                                        <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee if you're not satisfied.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Do I get lifetime access?</h3>
                                        <p className="text-gray-600 text-sm">Yes, you'll have lifetime access to all course materials and updates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />``
        </div>
    );

    if (selectedProgram)
    {
        return <ProgramDetailPage program={selectedProgram} />;
    }

    return currentPage === 'programs' ? <ProgramsPage /> : <FacilitiesPage />;
};

export default ProgrammeAndFacilities;