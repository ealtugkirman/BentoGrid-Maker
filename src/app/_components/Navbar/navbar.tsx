"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [stars, setStars] = useState<number>(0)
  const [targetStars, setTargetStars] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    fetch("https://api.github.com/repos/ealtugkirman/BentoGrid-Maker")
      .then((res) => res.json())
      .then((data) => {
        setTargetStars(data.stargazers_count)
      })
      .catch((err) => console.error("Error fetching GitHub stars:", err))
  }, [])

  useEffect(() => {
    if (stars < targetStars) {
      const timeout = setTimeout(() => {
        setStars((prev) => Math.min(prev + Math.ceil((targetStars - prev) / 10), targetStars))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [stars, targetStars])

  return (
    <nav className="border-b border-gray-800 bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
            Bento Grid Maker
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="https://www.bentotailwind.com/components">Components</NavLink>
            <Button variant="outline" size="sm" asChild className="bg-gray-900 hover:bg-gray-800 transition-colors">
              <a
                href="https://github.com/ealtugkirman/BentoGrid-Maker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Github className="h-5 w-5" />
                <span className="font-medium">{stars.toLocaleString()} Stars</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-2 space-y-2"
            >
              <NavLink href="https://www.bentotailwind.com/components" mobile>
                Components
              </NavLink>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full justify-center bg-gray-900 hover:bg-gray-800 transition-colors mt-2"
              >
                <a
                  href="https://github.com/ealtugkirman/BentoGrid-Maker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2"
                >
                  <Github className="h-5 w-5" />
                  <span className="font-medium">{stars.toLocaleString()} Stars</span>
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function NavLink({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  return (
    <Link href={href} className={`font-medium hover:text-gray-300 transition-colors ${mobile ? "block py-2" : ""}`}>
      {children}
    </Link>
  )
}

