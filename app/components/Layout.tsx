import { useState } from "react";
import { Link, Outlet } from "@remix-run/react";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null); // 跟踪当前 hover 的链接
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = (link) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);

    return (
        <div className="flex min-h-screen flex-col bg-[#131313]">
            {/* Top Menu (Header) */}
            <header className="fixed w-full bg-black bg-opacity-70 shadow-md z-10 top-0">
                <nav className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Logo */}
                        <Link to="/">
                            <img
                                src="/blocktree-logo-white.png"
                                alt="Blocktree Logo"
                                className="w-32"
                            />
                        </Link>
                    </div>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="https://github.com"
                            className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                            onMouseEnter={() => handleMouseEnter('github')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={hoveredLink === 'github' ? '/github-hover.png' : '/github.png'}
                                alt="Github Icon"
                                className="w-4 h-4"
                            />
                            Github
                        </Link>
                        <Link
                            to="/whitepaper"
                            className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                            onMouseEnter={() => handleMouseEnter('whitepaper')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={hoveredLink === 'whitepaper' ? '/whitepaper-hover.png' : '/whitepaper.png'}
                                alt="Whitepaper Icon"
                                className="w-4 h-4"
                            />
                            Whitepaper
                        </Link>
                        <Link
                            to="/contact"
                            className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                            onMouseEnter={() => handleMouseEnter('contact')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={hoveredLink === 'contact' ? '/contact-hover.png' : '/contact.png'}
                                alt="Contact Icon"
                                className="w-4 h-4"
                            />
                            Contact
                        </Link>
                        <Link to="/demo" className="ml-4">
                            <button className="bg-white text-black font-poppins font-semibold text-[16px] rounded-[20px] py-2 px-4 hover:bg-gray-200 transition-colors">
                                Demo
                            </button>
                        </Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#FFFFFF] focus:outline-none"
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
                    <div className="md:hidden bg-[#131313] shadow-md">
                        <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 space-y-4">
                            <Link
                                to="https://github.com"
                                className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                                onClick={toggleMenu}
                                onMouseEnter={() => handleMouseEnter('github')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={hoveredLink === 'github' ? '/github-hover.png' : '/github.png'}
                                    alt="Github Icon"
                                    className="w-4 h-4"
                                />
                                Github
                            </Link>
                            <Link
                                to="/whitepaper"
                                className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                                onClick={toggleMenu}
                                onMouseEnter={() => handleMouseEnter('whitepaper')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={hoveredLink === 'whitepaper' ? '/whitepaper-hover.png' : '/whitepaper.png'}
                                    alt="Whitepaper Icon"
                                    className="w-4 h-4"
                                />
                                Whitepaper
                            </Link>
                            <Link
                                to="/contact"
                                className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                                onClick={toggleMenu}
                                onMouseEnter={() => handleMouseEnter('contact')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={hoveredLink === 'contact' ? '/contact-hover.png' : '/contact.png'}
                                    alt="Contact Icon"
                                    className="w-4 h-4"
                                />
                                Contact
                            </Link>
                            <Link
                                to="/demo"
                                className="block text-[#FFFFFF] font-poppins font-light text-[16px] hover:text-blue-500 transition-colors"
                                onClick={toggleMenu}
                            >
                                Demo
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">{children || <Outlet />}</main>

            {/* Footer */}
            <footer className="bg-[#111111] py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: Logo */}
                    <div className="mb-4 md:mb-0">
                        <Link to="/">
                            <img
                                src="/blocktree-logo-white.png"
                                alt="Blocktree Logo"
                                className="w-28"
                            />
                        </Link>
                    </div>
                    {/* Center: Copyright */}
                    <div className="text-center">
                        <p className="text-[#6C727F] font-poppins font-medium text-[12px]">
                            © 2025 Blocktree Foundation. All rights reserved.
                        </p>
                    </div>
                    {/* Right: Icons */}
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3D3D3D] rounded-[5px] p-[5px]"
                        >
                            <img src="/github.png" alt="Github Icon" className="w-4 h-4" />
                        </a>
                        <a
                            href="/whitepaper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3D3D3D] rounded-[5px] p-[5px]"
                        >
                            <img src="/whitepaper-thick.png" alt="Whitepaper Icon" className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}