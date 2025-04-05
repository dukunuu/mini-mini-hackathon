//TODO navbar

import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Menu, X, Globe } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Alchemist</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm">
                <Link to="/sign-in">
                  Нэвтрэх
                </Link>
              </Button>
              <Button size="sm">
                <Link to="/sign-up">
                  Бүртгүүлэх
                </Link>
                </Button>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="w-full">Log In</Button>
                <Button size="sm" className="w-full">Register</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
