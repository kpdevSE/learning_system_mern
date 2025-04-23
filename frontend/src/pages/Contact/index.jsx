import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../components/ui/form';
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import Navbar from '@/components/ui/Components/NavigationBar';

export default function ContactPage()
{


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Header Section */}
            <section className="bg-blue-600 text-white py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
                    <p className="text-xl max-w-2xl mx-auto text-center">
                        Have questions about our platform? Reach out to our team and we'll be happy to help.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <Card className="border-none shadow-md">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                                    <p className="text-gray-600 mb-2">For general inquiries</p>
                                    <a href="mailto:info@englishplatform.com" className="text-blue-600 hover:underline">
                                        info@englishplatform.com
                                    </a>
                                    <p className="text-gray-600 mt-2 mb-2">For support</p>
                                    <a href="mailto:support@englishplatform.com" className="text-blue-600 hover:underline">
                                        support@englishplatform.com
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                                    <p className="text-gray-600 mb-2">Customer Support</p>
                                    <a href="tel:+11234567890" className="text-blue-600 hover:underline">
                                        +1 (123) 456-7890
                                    </a>
                                    <p className="text-gray-600 mt-2 mb-2">Business Inquiries</p>
                                    <a href="tel:+10987654321" className="text-blue-600 hover:underline">
                                        +1 (098) 765-4321
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                                        <Clock className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                                    <p className="text-gray-600 mb-2">Monday - Friday</p>
                                    <p className="text-blue-600 font-medium">9:00 AM - 6:00 PM EST</p>
                                    <p className="text-gray-600 mt-2 mb-2">Saturday</p>
                                    <p className="text-blue-600 font-medium">10:00 AM - 2:00 PM EST</p>
                                    <p className="text-gray-600 mt-2">Sunday: Closed</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form and Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        {/* <div>
                            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                            <Card className="border-none shadow-md">
                                <CardContent className="pt-6">
                                    <form >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="space-y-2">
                                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                                <Input id="firstName" placeholder="Enter your first name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                                <Input id="lastName" placeholder="Enter your last name" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <Input id="email" type="email" placeholder="Enter your email" required />
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <FormLabel htmlFor="subject">Subject</FormLabel>
                                            <Select value={subject} onValueChange={setSubject}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">General Inquiry</SelectItem>
                                                    <SelectItem value="support">Technical Support</SelectItem>
                                                    <SelectItem value="billing">Billing Question</SelectItem>
                                                    <SelectItem value="feedback">Feedback</SelectItem>
                                                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <FormLabel htmlFor="message">Message</FormLabel>
                                            <Textarea
                                                id="message"
                                                placeholder="How can we help you?"
                                                rows={5}
                                                required
                                            />
                                        </div>

                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div> */}

                        {/* Office Locations */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
                            <Card className="border-none shadow-md mb-6">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <MapPin className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Main Office</h3>
                                            <p className="text-gray-600 mb-1">123 Education Street</p>
                                            <p className="text-gray-600 mb-1">Suite 456</p>
                                            <p className="text-gray-600 mb-1">New York, NY 10001</p>
                                            <p className="text-gray-600">United States</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <MapPin className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">European Office</h3>
                                            <p className="text-gray-600 mb-1">45 Learning Lane</p>
                                            <p className="text-gray-600 mb-1">Tech Park</p>
                                            <p className="text-gray-600 mb-1">London, EC2A 4NE</p>
                                            <p className="text-gray-600">United Kingdom</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map Placeholder */}
                            <div className="mt-6 rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                    <p className="text-gray-600">Interactive map would be displayed here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        {[
                            {
                                question: "How do I book a session with a tutor?",
                                answer: "You can book a session by browsing our tutor directory, selecting a tutor that matches your needs, and choosing from their available time slots. Once you've selected a time, you can confirm your booking and receive a confirmation email."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for certain regions. All payments are processed securely through our payment partners."
                            },
                            {
                                question: "Can I cancel or reschedule my session?",
                                answer: "Yes, you can cancel or reschedule your session up to 24 hours before the scheduled time without any penalty. Cancellations made less than 24 hours before may be subject to our cancellation policy."
                            },
                            {
                                question: "Do you offer refunds if I'm not satisfied?",
                                answer: "Yes, we have a satisfaction guarantee. If you're not satisfied with your lesson, please contact our support team within 48 hours of the session, and we'll work to resolve the issue or provide a refund."
                            },
                        ].map((faq, index) => (
                            <Card key={index} className="border-none shadow-md">
                                <CardContent className="pt-6">
                                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                                        <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">Don't see your question here?</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-blue-600 text-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-xl mb-8">Sign up today and connect with expert English tutors from around the world.</p>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                        Get Started
                    </Button>
                </div>
            </section>
        </div>
    );
}