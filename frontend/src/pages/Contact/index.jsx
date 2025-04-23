import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowLeft, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Navbar from '@/components/ui/Components/NavigationBar';
import FooterComponent from '@/components/ui/Components/Footer';

export default function ContactPage()
{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        // In a real application, you would send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);

        // Reset form after submission
        setTimeout(() =>
        {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back to Homepage link */}
                    <div className="mb-8">
                        <a href="/" className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Homepage
                        </a>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="lg:flex">
                            {/* Contact Info Section */}
                            <div className="lg:w-1/3 bg-violet-700 text-white p-8 lg:p-12">
                                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                                <p className="mb-8 text-violet-100">
                                    Have questions or need assistance? Our team is here to help you with any inquiries about our courses or platform.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Mail className="h-6 w-6 text-violet-200" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium">Email</h3>
                                            <p className="mt-1 text-violet-200">support@learnhub.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Phone className="h-6 w-6 text-violet-200" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium">Phone</h3>
                                            <p className="mt-1 text-violet-200">+1 (555) 123-4567</p>
                                            <p className="mt-1 text-violet-200">Monday-Friday, 9AM-6PM EST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-violet-200" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium">Office</h3>
                                            <p className="mt-1 text-violet-200">
                                                123 Learning Avenue<br />
                                                Suite 400<br />
                                                New York, NY 10001
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media Links */}
                                <div className="mt-12">
                                    <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="bg-violet-600 hover:bg-violet-500 h-10 w-10 rounded-full flex items-center justify-center">
                                            <span className="sr-only">Facebook</span>
                                            <div className="h-5 w-5 bg-violet-300 rounded-sm flex items-center justify-center"><Facebook className='text-black' /></div>
                                        </a>
                                        <a href="#" className="bg-violet-600 hover:bg-violet-500 h-10 w-10 rounded-full flex items-center justify-center">
                                            <span className="sr-only">Twitter</span>
                                            <div className="h-5 w-5 bg-violet-300 rounded-sm flex items-center justify-center"><Twitter className='text-black' /></div>
                                        </a>
                                        <a href="#" className="bg-violet-600 hover:bg-violet-500 h-10 w-10 rounded-full flex items-center justify-center">
                                            <span className="sr-only">LinkedIn</span>
                                            <div className="h-5 w-5 bg-violet-300 rounded-sm flex items-center justify-center"><Linkedin className='text-black' /></div>
                                        </a>
                                        <a href="#" className="bg-violet-600 hover:bg-violet-500 h-10 w-10 rounded-full flex items-center justify-center">
                                            <span className="sr-only">Instagram</span>
                                            <div className="h-5 w-5 bg-violet-300 rounded-sm flex items-center justify-center"><Instagram className='text-black' /></div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form Section */}
                            <div className="lg:w-2/3 p-8 lg:p-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                                {submitted ? (
                                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-green-800">Message Sent</h3>
                                                <p className="text-sm text-green-700 mt-1">
                                                    Thank you for your message! We'll get back to you as soon as possible.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                                                    placeholder="johndoe@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                                                placeholder="Please provide details about your inquiry..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">
                                                    I agree to the <a href="#" className="text-violet-600 hover:text-violet-800">Privacy Policy</a> and consent to be contacted regarding my inquiry.
                                                </span>
                                            </label>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                            >
                                                <Send className="h-5 w-5 mr-2" />
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* FAQ Section */}
                                <div className="mt-12">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                                    <dl className="space-y-6">
                                        <div>
                                            <dt className="text-lg font-medium text-gray-900">How quickly can I expect a response?</dt>
                                            <dd className="mt-2 text-gray-600">We strive to respond to all inquiries within 24 business hours.</dd>
                                        </div>
                                        <div>
                                            <dt className="text-lg font-medium text-gray-900">Do you offer technical support?</dt>
                                            <dd className="mt-2 text-gray-600">Yes, our technical support team is available Monday through Friday, 9AM-6PM EST.</dd>
                                        </div>
                                        <div>
                                            <dt className="text-lg font-medium text-gray-900">Can I visit your office in person?</dt>
                                            <dd className="mt-2 text-gray-600">Yes, you can schedule an appointment by contacting us via email or phone.</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}