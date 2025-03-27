import { useState } from "react";
import { Link, Outlet } from "@remix-run/react";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            {/* Top Menu (Header) */}
            <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-10">
                <nav className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Logo */}
                        <Link to="/">
                            <img
                                src="/blocktree-logo-black.png"
                                alt="Blocktree Logo"
                                className="w-32 dark:hidden"
                            />
                            <img
                                src="/blocktree-logo-white.png"
                                alt="Blocktree Logo"
                                className="w-32 hidden dark:block"
                            />
                        </Link>
                    </div>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/about"
                            className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/features"
                            className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            to="/use-cases"
                            className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-400 transition-colors"
                        >
                            Use Cases
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-800 dark:text-gray-100 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </nav>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
                        <div className="flex flex-col px-4 py-4 space-y-4">
                            <Link
                                to="/about"
                                className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                            <Link
                                to="/features"
                                className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                onClick={toggleMenu}
                            >
                                Features
                            </Link>
                            <Link
                                to="/use-cases"
                                className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-400 transition-colors"
                                onClick={toggleMenu}
                            >
                                Use Cases
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-800 dark:text-gray-100 font-inter font-semibold text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full pt-[80px]">{children || <Outlet />}</main>

            {/* Footer */}
            <footer className="bg-gray-200 dark:bg-gray-800 py-6">
                <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-700 dark:text-gray-300 font-inter">
                            © 2025 Blocktree. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a href="/about" className="text-gray-700 dark:text-gray-300 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            About
                        </a>
                        <a href="/features" className="text-gray-700 dark:text-gray-300 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Features
                        </a>
                        <a href="/use-cases" className="text-gray-700 dark:text-gray-300 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Use Cases
                        </a>
                        <a href="/contact" className="text-gray-700 dark:text-gray-300 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Contact
                        </a>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Twitter
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Discord
                        </a>
                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Telegram
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}