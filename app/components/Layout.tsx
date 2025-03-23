import { Link } from "@remix-run/react";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            {/* Top Menu (Header) */}
            <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-10">
                <nav className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Logo - Black in light mode, White in dark mode */}
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
                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        <Link to="/about" className="text-gray-800 dark:text-gray-100 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            About
                        </Link>
                        <Link to="/features" className="text-gray-800 dark:text-gray-100 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Features
                        </Link>
                        <Link to="/use-cases" className="text-gray-800 dark:text-gray-100 font-inter hover:text-blue-400 transition-colors">
                            Use Cases
                        </Link>
                        <Link to="/contact" className="text-gray-800 dark:text-gray-100 font-inter hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Contact
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
                {children}
            </main>

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