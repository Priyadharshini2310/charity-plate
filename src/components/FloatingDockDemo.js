
import React, { useState, useEffect } from "react";
import {
  IconUsers,
  IconUserPlus,
  IconHome,
  IconQuote,
  IconActivity,
  IconChartDots3,
  IconLogin,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import logo from "../images/charity-plate-logo.svg";
import logotext from "../images/NameLogo.png";
import logoicon from "../images/LogoIcon.png";
import { VscFeedback } from "react-icons/vsc";

export default function CharityPlateNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", icon: IconHome, href: "#hero" },
    { title: "How It Works", icon: IconActivity, href: "#how-it-works" },
    { title: "Impact", icon: IconChartDots3, href: "#impact" },
    { title: "Testimonials", icon: IconQuote, href: "#testimonials" },
  ];

  const ctaButtons = [
    { title: "Sign Up", icon: IconUserPlus, href: "/signup", primary: true },
    { title: "Login", icon: IconLogin, href: "/login", primary: false },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative">
                  <img src={logoicon} className="h-16 w-16 object-contain" />
                </div>
                <div className="flex items-center">
                  <img
                    src={logotext}
                    className="w-52 h-16 object-contain"
                    alt="Name Logo"
                  />
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200 group"
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{link.title}</span>
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {ctaButtons.map((button) => {
                const Icon = button.icon;
                return (
                  <a
                    key={button.title}
                    href={button.href}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      button.primary
                        ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:shadow-lg hover:scale-105 hover:from-sky-700 hover:to-sky-800"
                        : "border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{button.title}</span>
                  </a>
                );
              })}
              {/* Feedback Button */}
              <button
                onClick={() => {
                  window.location.href = "#feedback";
                }}
                className="flex items-center space-x-2 px-4 py-2.5  font-medium transition-all duration-200 bg-white  text-gray-700 hover:border-sky-600 hover:text-sky-600"
                aria-label="Feedback"
              >
                <VscFeedback className="h-5 w-5 group-hover:scale-110 transition-transform" />
                
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <IconX className="h-6 w-6 text-gray-700" />
              ) : (
                <IconMenu2 className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-6 bg-white/95 backdrop-blur-lg shadow-lg space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition-all"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.title}</span>
                </a>
              );
            })}

            <div className="pt-4 space-y-2 border-t">
              {ctaButtons.map((button) => {
                const Icon = button.icon;
                return (
                  <a
                    key={button.title}
                    href={button.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg font-medium transition-all ${
                      button.primary
                        ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white"
                        : "border-2 border-sky-600 text-sky-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{button.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

     
    </>
  );
}
