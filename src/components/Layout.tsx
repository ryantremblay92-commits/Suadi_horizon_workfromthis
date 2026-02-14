'use client';

import { Header } from "./Header"
import { SkipLink } from "./SkipLink"
import { WhatsAppButton } from "./WhatsAppButton"
import { ReactNode } from "react"

import { usePathname } from "next/navigation"

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col relative">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* Floating WhatsApp Button - visible on all pages */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton
          message="Hello! I'm interested in heavy equipment spare parts."
          phoneNumber="966570196677"
          className="rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  )
}
