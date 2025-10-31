"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Image from 'next/image';

// Small avatar component: show photoURL if present, otherwise show initials
const UserAvatar = ({ user, size = 36 }) => {
  const [imgError, setImgError] = useState(false);

  const displayName = user?.displayName || "";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const photo = user?.photoURL;

  const sizePx = `${size}px`;

  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden bg-gray-300 text-gray-800"
      style={{ width: sizePx, height: sizePx, minWidth: sizePx }}
      aria-hidden={false}
    >
      {photo && !imgError ? (
        <Image
          src={photo}
          alt={displayName || "User avatar"}
          width={size}
          height={size}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
};

// --- Components for Reusability ---
const DropdownLink = ({ href, children, onClick }) => (
  <Link
    href={href}
    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

// Reusable component for the desktop dropdown menu
const DesktopDropdown = ({ title, links }) => (
  <div className="relative group">
    {/* Button to show dropdown on hover/click */}
    <button
      className="text-white hover:text-gray-300 transition-colors font-medium flex items-center space-x-1"
      type="button"
    >
      <span>{title}</span>
      <ChevronDown className="w-4 h-4" />
    </button>

    {/* Dropdown Menu */}
    <div className="absolute left-0 mt-4 w-72 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      {links.map((link, index) => (
        <DropdownLink key={index} href={link.href}>
          {link.label}
        </DropdownLink>
      ))}
    </div>
  </div>
);

// Reusable component for the mobile dropdown menu
const MobileDropdown = ({
  title,
  links,
  isExpanded,
  toggleDropdown,
  closeMobileMenu,
}) => {
  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="w-full text-left px-3 py-2 rounded-md text-white hover:bg-gray-900 transition-colors font-medium flex items-center justify-between"
        aria-expanded={isExpanded}
        type="button"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile Submenu */}
      {isExpanded && (
        <div className="pl-6 space-y-1 mt-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-900 transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ---Navigation Links ---
export const navData = {
  mainLinks: [
    { href: "/live-course", label: "Live Course" },
    { href: "/all-courses", label: "All Course" },
  ],
  dropdowns: [
    {
      title: "10 TK Course",
      links: [
        {
          href: "/courses/freelancing-calculator",
          label: "Freelancing Calculator",
        },
        { href: "/courses/google-ads-basic", label: "Google Ads Basic Course" },
      ],
    },
    {
      title: "Premium Course",
      links: [
        {
          href: "/courses/total-freelancing-package",
          label: "Total Freelancing Package",
        },
        {
          href: "/courses/client-communication",
          label: "Freelancing Client Communication",
        },
        {
          href: "/courses/ads-advanced-strategy",
          label: "Google Ads Advanced Strategy & Optimization",
        },
        {
          href: "/courses/marketing-sales-fundamentals",
          label: "Fundamental of Marketing & Sales",
        },
        {
          href: "/courses/freedom-freelancing-formula",
          label: "The Freedom Freelancing Formula",
        },
        {
          href: "/courses/ads-conversion-tracking",
          label: "Google Ads Conversion Tracking",
        },
      ],
    },
  ],
  utilityLinks: [{ href: "/success-stories", label: "Success Stories" }],
};

// --- Main Navbar Component ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [is10TKDropdownOpen, setIs10TKDropdownOpen] = useState(false);
  const [isPremiumDropdownOpen, setIsPremiumDropdownOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  // Handle click outside to close user menu
  const handleClickOutside = useCallback((event) => {
    if (showUserMenu && !event.target.closest('.user-menu')) {
      setShowUserMenu(false);
    }
  }, [showUserMenu]);

  // Add/remove click outside listener
  useEffect(() => {
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu, handleClickOutside]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setIs10TKDropdownOpen(false);
    setIsPremiumDropdownOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIs10TKDropdownOpen(false);
    setIsPremiumDropdownOpen(false);
  }, []);

  // Optimized toggles:
  const toggle10TKDropdown = useCallback(() => {
    setIs10TKDropdownOpen((prev) => !prev);
    setIsPremiumDropdownOpen(false);
  }, []);

  const togglePremiumDropdown = useCallback(() => {
    setIsPremiumDropdownOpen((prev) => !prev);
    setIs10TKDropdownOpen(false);
  }, []);

  return (
    <nav
      className="bg-[#151515] text-white sticky top-0 z-50 shadow-lg py-2"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="flex items-center"
              aria-label="ComeToLearn withSamad Home"
            >
              <span className="text-3xl font-bold text-white hover:text-gray-300 transition-colors leading-none">
                ComeToLearn
                <span className="text-red-700 block text-lg font-normal mt-[-0.2em]">
                  withSamad
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Links */}
            {navData.mainLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdowns */}
            {navData.dropdowns.map((dropdown, index) => (
              <DesktopDropdown
                key={index}
                title={dropdown.title}
                links={dropdown.links}
              />
            ))}

            {/* Utility Links */}
            {navData.utilityLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Login Button */}
            {/* User Info and Logout */}
            {user ? (
              <div className="relative user-menu">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center cursor-pointer"
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <UserAvatar user={user} size={36} />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-gray-600">Signed in as- </p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.displayName}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-200"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-200 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none p-1"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-label="Close menu" />
              ) : (
                <Menu className="w-6 h-6" aria-label="Open menu" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-black border-t border-gray-800 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Main Links */}
          {navData.mainLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block px-3 py-2 rounded-md text-white hover:bg-gray-900 transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          {/* 10 TK Course Mobile Dropdown */}
          <MobileDropdown
            title={navData.dropdowns[0].title}
            links={navData.dropdowns[0].links}
            isExpanded={is10TKDropdownOpen}
            toggleDropdown={toggle10TKDropdown}
            closeMobileMenu={closeMobileMenu}
          />

          {/* Premium Course Mobile Dropdown */}
          <MobileDropdown
            title={navData.dropdowns[1].title}
            links={navData.dropdowns[1].links}
            isExpanded={isPremiumDropdownOpen}
            toggleDropdown={togglePremiumDropdown}
            closeMobileMenu={closeMobileMenu}
          />

          {/* Utility Links */}
          {navData.utilityLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block px-3 py-2 rounded-md text-white hover:bg-gray-900 transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile User Info and Logout */}
          {user ? (
            <div className="px-3 py-2 space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-white">
                <UserAvatar user={user} size={32} />
                <div className="flex-1">
                  <p className="font-medium">{user.displayName}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-white hover:bg-gray-900 rounded-md items-center gap-2"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full px-3 py-2 text-white hover:bg-gray-900 rounded-md flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
