'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Wrench, MapPin, Calendar, Truck, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { toast } from 'sonner';

const serviceAreas = [
    { city: 'Riyadh', regions: ['Central', 'North', 'South', 'East', 'West'] },
    { city: 'Jeddah', regions: ['North', 'Central', 'South', 'Corniche'] },
    { city: 'Dammam', regions: ['Central', 'Khobar', 'Al-Ahsa'] },
    { city: 'Mecca', regions: ['Central', 'Azizia'] },
    { city: 'Medina', regions: ['Central', 'North'] },
    { city: 'Al-Qassim', regions: ['Buraidah', 'Unaizah'] },
];

const equipmentTypes = [
    'Excavator',
    'Wheel Loader',
    'Bulldozer',
    'Crane',
    'Forklift',
    'Concrete Mixer',
    'Compactor',
    'Generator',
    'Air Compressor',
    'Other',
];

export default function InstallationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        equipmentType: '',
        city: '',
        region: '',
        preferredDate: '',
        notes: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Installation request submitted! Our team will contact you within 24 hours.');
        setIsSubmitting(false);
        setFormData({
            name: '', phone: '', email: '', company: '', equipmentType: '',
            city: '', region: '', preferredDate: '', notes: '',
        });
    };

    return (
        <div className="min-h-screen bg-background text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Installation Services</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Wrench className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Equipment Installation Services</h1>
                    <p className="text-xl text-gray-300">Professional installation by certified technicians across Saudi Arabia</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {[
                        { icon: MapPin, title: 'Service Areas', items: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Al-Qassim'] },
                        { icon: Truck, title: 'Equipment Types', items: ['Excavators', 'Loaders', 'Cranes', 'Forklifts', 'Generators', 'Industrial Machinery'] },
                        { icon: CheckCircle, title: 'Certification', items: ['ISO 9001 Certified', 'Manufacturer Approved', '2-Year Warranty', '24/7 Support'] },
                    ].map((feature, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                            <Card className="bg-gray-800 border-gray-700 h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-white">
                                        <feature.icon className="w-6 h-6 text-yellow-500" />{feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {feature.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-2 text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-yellow-500" />{item}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white text-center text-2xl">Request Installation Service</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                                    <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="bg-gray-700 border-gray-600 text-white" placeholder="Your name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                                    <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="bg-gray-700 border-gray-600 text-white" placeholder="05XXXXXXXX" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="bg-gray-700 border-gray-600 text-white" placeholder="email@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-gray-300">Company Name</Label>
                                    <Input id="company" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className="bg-gray-700 border-gray-600 text-white" placeholder="Company name" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">Equipment Type *</Label>
                                    <Select value={formData.equipmentType} onValueChange={(v) => handleInputChange('equipmentType', v)}>
                                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Select equipment type" /></SelectTrigger>
                                        <SelectContent>{equipmentTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="preferredDate" className="text-gray-300">Preferred Date</Label>
                                    <Input id="preferredDate" type="date" value={formData.preferredDate} onChange={(e) => handleInputChange('preferredDate', e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">City *</Label>
                                    <Select value={formData.city} onValueChange={(v) => { handleInputChange('city', v); handleInputChange('region', ''); }}>
                                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Select city" /></SelectTrigger>
                                        <SelectContent>{serviceAreas.map(a => <SelectItem key={a.city} value={a.city}>{a.city}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">Region/Area</Label>
                                    <Select value={formData.region} onValueChange={(v) => handleInputChange('region', v)} disabled={!formData.city}>
                                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Select region" /></SelectTrigger>
                                        <SelectContent>
                                            {serviceAreas.find(a => a.city === formData.city)?.regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="notes" className="text-gray-300">Additional Notes</Label>
                                    <Textarea id="notes" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className="bg-gray-700 border-gray-600 text-white" placeholder="Describe your installation requirements..." />
                                </div>
                                <div className="md:col-span-2">
                                    <Button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3">
                                        {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : 'Submit Installation Request'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="mt-12 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <Phone className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4 text-white">Need Immediate Assistance?</h2>
                    <p className="text-gray-300 mb-6">Our installation team is available Sunday through Thursday, 8AM to 6PM</p>
                    <Button onClick={() => router.push('/contact')} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold">Contact Installation Team</Button>
                </motion.div>
            </div>
        </div>
    );
}
