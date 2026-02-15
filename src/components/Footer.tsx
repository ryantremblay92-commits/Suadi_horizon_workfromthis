'use client';

import { MessageCircle, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { getCategories, Category } from "@/api/categories"

export function Footer() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories()
        setCategories(res.categories)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Thank you for subscribing to our newsletter!")
  }

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Spare Parts", path: "/products" },
    { name: "Machinery", path: "/machinery" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  // Use top 8 categories from database
  const topCategories = categories.slice(0, 8)

  const locations = [
    { city: "Al-Noor Mall, Kuwait Bay", address: "Al-Noor District" },
    { city: "Omar bin Al-Khattab Street", address: "Bujwaar Kuwait Bay" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/saudihorizon", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/saudihorizon", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/saudihorizon", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/saudihorizon", label: "Instagram" },
  ]

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow rounded-lg flex items-center justify-center">
                <span className="text-navy font-bold text-xl">SH</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Saudi Horizon Co.</h3>
                <p className="text-xs text-gray-400">شركة الأفق السعودية</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Your trusted partner for all heavy equipment spare parts.
              ANC brand specialist for engine, turbocharger, electrical, transmission, and hydraulic parts.
            </p>
            <div className="flex gap-3" role="list">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  aria-label={`Visit us on ${social.label}`}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(link.path);
                    }}
                    className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-transparent rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services / Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Products</h4>
            <ul className="space-y-3">
              {topCategories.map((category) => (
                <li key={category.name}>
                  <a
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/products?category=${encodeURIComponent(category.name)}`);
                    }}
                    className="text-sm text-gray-300 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-transparent rounded"
                  >
                    {category.name.replace(' GROUP', '').replace('&', '&')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow flex-shrink-0" aria-hidden="true" />
                <a href="tel:+966570196677" className="text-sm text-gray-300 hover:text-yellow transition-colors">
                  +966 57 019 6677
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow flex-shrink-0" aria-hidden="true" />
                <a href="mailto:salehma@saudihorizon.online" className="text-sm text-gray-300 hover:text-yellow transition-colors">
                  salehma@saudihorizon.online
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-gray-300">
                  Al-Noor Mall, Bujwaar Kuwait Bay<br />
                  Al-Ahli Bank (SNB), Omar bin Al-Khattab Street<br />
                  Al-Noor District
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://wa.me/966570196677', '_blank')}
              className="border-yellow text-yellow hover:bg-yellow hover:text-white transition-colors duration-200 mt-2"
            >
              <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              WhatsApp Support
            </Button>
          </div>
        </div>

        {/* Locations Strip */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap gap-6 justify-center">
            {locations.map((loc) => (
              <div key={loc.city} className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-yellow" aria-hidden="true" />
                <span>{loc.city} - {loc.address}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for the latest products and industry news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow focus:ring-yellow"
                required
              />
              <Button
                type="submit"
                className="bg-yellow text-white hover:bg-yellow/90 px-6"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Saudi Horizon Co. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-6 text-sm" aria-label="Legal">
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/privacy');
                }}
                className="text-gray-400 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/terms');
                }}
                className="text-gray-400 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/contact');
                }}
                className="text-gray-400 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              >
                Contact Us
              </a>
              <a
                href="/cookie-policy"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/cookie-policy');
                }}
                className="text-gray-400 hover:text-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              >
                Cookie Policy
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
