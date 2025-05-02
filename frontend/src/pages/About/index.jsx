import Navbar from '@/components/ui/Components/NavigationBar';
import { ArrowLeft, Award, Globe, Users, Target, Check } from 'lucide-react';
import Aboutus from '../../assets/aboutus.jpg'
import Boy from '../../assets/boy.jpg'
import Girl from '../../assets/girl.jpg'
import FooterComponent from '@/components/ui/Components/Footer';
import Nadeesha from '../../assets/ProfileImages/Nadeesha Wishwani.jpeg'
import Malshani from '../../assets/ProfileImages/Malshani Herath.jpeg'
import Surani from '../../assets/ProfileImages/Surani Erandi.jpeg'
import Thiwangi from '../../assets/ProfileImages/Thiwangi Uddima.jpeg'
import Ranumi from '../../assets/ProfileImages/Ranumi Mihinadee.jpeg'

export default function AboutPage()
{
    const stats = [
        { value: '200,000+', label: 'Active Learners' },
        { value: '500+', label: 'Expert Instructors' },
        { value: '1,000+', label: 'Courses Available' },
        { value: '50+', label: 'Countries Reached' }
    ];

    const values = [
        {
            icon: <Award className="h-8 w-8 text-black" />,
            title: "Excellence",
            description: "We are committed to providing the highest quality educational content and learning experiences to help our students achieve their full potential."
        },
        {
            icon: <Globe className="h-8 w-8 text-black" />,
            title: "Accessibility",
            description: "We believe that education should be accessible to everyone, regardless of their location, background, or financial situation."
        },
        {
            icon: <Users className="h-8 w-8 text-black" />,
            title: "Community",
            description: "We foster a supportive community where students and instructors can connect, collaborate, and grow together."
        },
        {
            icon: <Target className="h-8 w-8 text-black" />,
            title: "Innovation",
            description: "We continuously strive to innovate and improve our platform to meet the evolving needs of our learners and the changing demands of the job market."
        }
    ];

    const team = [
        {
            name: "Nadeesha Wishwani",
            role: "Founder & CEO",
            bio: "Former education technology executive with 15+ years of experience in the e-learning industry. Passionate about making quality education accessible to everyone.",
            image: Nadeesha
        },
        {
            name: "Malshani Herath",
            role: "Chief Technology Officer",
            bio: "Tech industry veteran with expertise in building scalable learning platforms. Leads our engineering team in creating innovative solutions for online education.",
            image: Malshani
        },
        {
            name: "Surani Erandi",
            role: "Chief Learning Officer",
            bio: "Educational psychologist with a focus on adult learning. Oversees course development and ensures pedagogical excellence across all content.",
            image: Surani
        },
        {
            name: "Ranumi Mihinadee",
            role: "Head of Partnerships",
            bio: "Builds strategic relationships with educational institutions and industry leaders to expand our course offerings and create career opportunities for students.",
            image: Ranumi
        },
        {
            name: "Thiwangi Uddima",
            role: "Director of Student Success",
            bio: "With a background in student services and educational outreach, Isuru brings over a decade of experience in improving learner engagement and satisfaction.",
            image: Thiwangi
        }
    ];

    const milestones = [
        {
            year: "2018",
            title: "Company Founded",
            description: "LearnHub was founded with a mission to make quality education accessible to everyone."
        },
        {
            year: "2019",
            title: "First 100,000 Students",
            description: "Reached our first major milestone of 100,000 registered students across 20 countries."
        },
        {
            year: "2020",
            title: "Enterprise Solutions Launch",
            description: "Expanded our offerings to include corporate training solutions for businesses of all sizes."
        },
        {
            year: "2022",
            title: "Mobile App Released",
            description: "Launched our mobile application to enable learning on-the-go for our growing community."
        },
        {
            year: "2024",
            title: "Global Expansion",
            description: "Expanded operations to offices in 5 countries and added support for 15 languages."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto">
                {/* Back to Homepage link */}
                <div className="mb-8">
                    <a href="/" className="inline-flex items-center text-black hover:text-black font-medium">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Homepage
                    </a>
                </div>

                {/* Main Content */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Hero Section */}
                    <div className="relative">
                        <div className="h-64 sm:h-80 w-full  bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${Aboutus})` }}>
                            <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-3xl">
                                <h1 className="text-3xl sm:text-4xl font-bold mb-4">About LearnHub</h1>
                                <p className="text-lg sm:text-xl text-violet-100">
                                    Empowering individuals through quality education and innovative learning experiences since 2018.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Our Story */}
                    <div className="px-6 py-12 sm:px-12 lg:px-16">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                LearnHub began with a simple idea: to create a platform where quality education is accessible to everyone, everywhere.
                                Founded in 2018 by a team of educators and technologists, we set out to bridge the gap between traditional education
                                and the skills needed in today's rapidly evolving job market.
                            </p>
                            <p className="text-lg text-gray-600">
                                What started as a small collection of technology courses has grown into a comprehensive learning ecosystem
                                serving hundreds of thousands of students worldwide. Our mission remains the same: to empower individuals to
                                transform their lives through learning.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <p className="text-3xl font-bold text-black">{stat.value}</p>
                                    <p className="text-gray-600 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Our Values */}
                        <div className="my-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {values.map((value, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center">
                                        <div className="inline-flex items-center justify-center mb-4">
                                            {value.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Our Team */}
                        <div className="my-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {team.map((member, index) => (
                                    <div key={index} className="text-center">
                                        <div className="h-48 w-48 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                        <p className="text-black font-medium mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-sm">{member.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Milestones */}
                        <div className="my-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-violet-100"></div>

                                <div className="space-y-12">
                                    {milestones.map((milestone, index) => (
                                        <div key={index} className={`relative sm:flex ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                                            {/* Year marker */}
                                            <div className="hidden sm:flex sm:items-center sm:justify-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 w-12 h-12 rounded-full bg-black text-white font-bold">
                                                {milestone.year}
                                            </div>

                                            {/* Content */}
                                            <div className={`sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-16' : 'sm:pl-16'} sm:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                                    <span className="sm:hidden inline-block px-3 py-1 bg-black text-white text-sm font-bold rounded-full mb-2">
                                                        {milestone.year}
                                                    </span>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                                                    <p className="text-gray-600">{milestone.description}</p>
                                                </div>
                                            </div>

                                            {/* Empty div to maintain the flex layout */}
                                            <div className="hidden sm:block sm:w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Our Approach */}
                        <div className="my-16">
                            <div className="bg-violet-50 p-8 sm:p-12 rounded-lg border border-violet-100">
                                <div className="max-w-3xl mx-auto">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Educational Approach</h2>
                                    <p className="text-lg text-gray-700 mb-8">
                                        We believe that effective learning goes beyond just watching videos or reading materials. Our approach combines
                                        engaging content, practical exercises, and community interaction to create a comprehensive learning experience.
                                    </p>

                                    <div className="space-y-4">
                                        {[
                                            "Expert-led courses designed by industry professionals",
                                            "Hands-on projects that apply concepts to real-world scenarios",
                                            "Interactive assessments to test understanding and retention",
                                            "Community forums for peer-to-peer learning and networking",
                                            "Personalized learning paths tailored to individual goals"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start">
                                                <Check className="h-6 w-6 text-black flex-shrink-0 mt-0.5" />
                                                <p className="ml-3 text-gray-700">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="my-16 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Learning Community</h2>
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                Ready to start your learning journey with us? Create an account today and join thousands of learners worldwide.
                            </p>
                            <div className="inline-flex space-x-4">
                                <a href="/signup" className="bg-black hover:bg-black text-white px-8 py-3 rounded-md font-medium">
                                    Sign Up Free
                                </a>
                                <a href="/contact" className="bg-white border border-black text-black hover:bg-violet-50 px-8 py-3 rounded-md font-medium">
                                    Contact Us
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}