'use client';

import Link from "next/link"
import { LogOut, ShoppingCart, Menu, LogIn, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "./LanguageSwitcher"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"
import { getCart } from "@/api/cart"

export function Header() {
  const { logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  const [cartCount, setCartCount] = useState(getCart().length)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in heavy equipment spare parts.")
    window.open(`https://wa.me/966570196677?text=${message}`, '_blank')
  }

  const navItems = [
    { label: t('nav.home'), path: "/" },
    { label: t('nav.spare_parts'), path: "/products" },
    { label: t('nav.brands'), path: "/about" },
    { label: t('nav.contact'), path: "/contact" },
  ]

  return (
    <header
      className={`
        fixed top-0 z-50 w-full transition-all duration-300 border-b border-white/5
        ${isScrolled
          ? 'bg-charcoal/95 backdrop-blur-xl shadow-lg'
          : 'bg-charcoal/90 backdrop-blur-md'}
      `}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
    <Link
      href="/"
      className="text-[1.375rem] font-bold text-white hover:text-gold transition-all duration-200 hover:scale-105 tracking-tight focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal rounded flex items-center gap-3"
    >
      <div className="w-8 h-8 border border-gold flex items-center justify-center rounded-sm">
        <span className="font-display font-bold text-gold">S</span>
      </div>
      <span className="font-display tracking-[0.2em] uppercase">Saudi <span className="text-gold">Horizon</span></span>
    </Link>

    {/* Desktop Navigation - Using semantic nav with Link */}
    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-gold transition-all duration-200 py-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal font-display"
        >
          {item.label}
        </Link>
      ))}
    </nav>

    <div className="flex items-center gap-3">
      {/* WhatsApp Button in Header */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleWhatsApp}
        aria-label="Contact via WhatsApp"
        className="text-white/60 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200 focus:ring-green-400"
        title="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </Button>

      <Button
        size="sm"
        onClick={() => router.push("/contact")}
        className="btn-gold text-charcoal font-bold text-[10px] uppercase tracking-widest transition-all duration-200 hover:shadow-lg focus:ring-gold h-9 px-6 font-display"
      >
        Request Quote
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/cart")}
        className="relative text-white/60 hover:text-gold hover:bg-gold/10 transition-all duration-200 focus:ring-gold"
        aria-label={`Shopping cart with ${cartCount} items`}
        aria-live="polite"
      >
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        {cartCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
            aria-label={`${cartCount} items in cart`}
          >
            {cartCount}
          </span>
        )}
      </Button>
      <LanguageSwitcher />
      <ThemeToggle />
      {isAuthenticated ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          aria-label="Logout"
          className="text-white/60 hover:text-gold hover:bg-gold/10 transition-all duration-200 focus:ring-gold"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/login")}
          aria-label="Login"
          className="text-white/60 hover:text-gold hover:bg-gold/10 transition-all duration-200 focus:ring-gold"
        >
          <LogIn className="h-5 w-5" aria-hidden="true" />
        </Button>
      )}

      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            aria-expanded={false}
            className="text-white/60 hover:text-gold hover:bg-gold/10 transition-all duration-200 focus:ring-gold"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-64 bg-charcoal border-white/10"
          aria-label="Navigation menu"
        >
          <nav className="flex flex-col gap-2 mt-8" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start text-white/80 hover:text-gold hover:bg-gold/10 transition-all duration-200 font-display"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="justify-start btn-gold text-charcoal hover:bg-gold/90 transition-all duration-200 hover:shadow-lg font-bold font-display"
              onClick={() => router.push("/contact")}
            >
              Request a Quote
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-all duration-200 font-display"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
              WhatsApp
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </div>
    </header >
  )
}
