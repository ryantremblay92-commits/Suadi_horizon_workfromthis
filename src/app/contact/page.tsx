'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'general',
        message: '',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, subject: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Send via WhatsApp
        const message = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
        );
        window.open(`https://wa.me/966570196677?text=${message}`, '_blank');

        toast.success('Message Sent', {
            description: 'Your message has been sent via WhatsApp',
        });

        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            subject: 'general',
            message: '',
        });
    };

    return (
        <div className="min-h-screen bg-background text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Contact Us</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-3xl font-bold mb-8 text-white">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Phone Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <Phone className="w-5 h-5" />
                                        Phone
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-semibold text-white">+966 57 019 6677</p>
                                    <p className="text-sm text-gray-300">Available 24/7 (WhatsApp)</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Email Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <Mail className="w-5 h-5" />
                                        Email
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-semibold text-white">salehma@saudihorizon.online</p>
                                    <p className="text-sm text-gray-300">Response within 24 hours</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Location Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <MapPin className="w-5 h-5" />
                                        Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-semibold text-white">Al-Noor Mall, Kuwait Bay</p>
                                    <p className="text-sm text-gray-300">Al-Noor District, Saudi Arabia</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* WhatsApp Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Button
                                onClick={() => window.open('https://wa.me/966570196677?text=Hi, I would like to contact your sales team', '_blank')}
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Chat on WhatsApp
                            </Button>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Send us a Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Name and Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name" className="text-white">Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-gray-700 border-gray-600 text-white"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-white">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-gray-700 border-gray-600 text-white"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone and Company */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="phone" className="text-white">Phone *</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-gray-700 border-gray-600 text-white"
                                                    placeholder="+966..."
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="company" className="text-white">Company</Label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-700 border-gray-600 text-white"
                                                    placeholder="Company name"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <Label htmlFor="subject" className="text-white">Subject *</Label>
                                            <Select value={formData.subject} onValueChange={handleSelectChange}>
                                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">General Inquiry</SelectItem>
                                                    <SelectItem value="quote">Request a Quote</SelectItem>
                                                    <SelectItem value="parts">Parts Inquiry</SelectItem>
                                                    <SelectItem value="support">Technical Support</SelectItem>
                                                    <SelectItem value="partnership">Partnership</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <Label htmlFor="message" className="text-white">Message *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-gray-700 border-gray-600 text-white min-h-[150px]"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
