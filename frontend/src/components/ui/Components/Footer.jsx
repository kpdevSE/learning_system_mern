export default function FooterComponent()
{
    return (
        <div>
            <footer className="bg-gray-800 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">LearnHub</h3>
                            <p className="text-sm mb-4">
                                Empowering individuals and organizations through high-quality online learning experiences.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Media Icons */}
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Facebook</span>
                                    <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <span className="sr-only">LinkedIn</span>
                                    <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Courses</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-white">Web Development</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Data Science</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Design</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Business</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Marketing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Partners</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
                        <p>&copy; 2025 LearnHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}