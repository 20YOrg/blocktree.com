import { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "@remix-run/react";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = (link) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);

    // 动态检测屏幕大小
    useEffect(() => {
        const checkIsMobile = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };

        if (typeof window !== "undefined") {
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener('resize', checkIsMobile);
            }
        };
    }, []);

    // 动态获取 header 高度
    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-[#131313]">
            {/* Top Menu (Header) */}
            <header ref={headerRef} className="fixed w-full bg-black bg-opacity-60 sm:shadow-md z-10 top-0 backdrop-blur-md">
                <nav className="max-w-7xl mx-auto px-4 md:px-12 py-5 md:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <img
                                src="/blocktree-logo-white.png"
                                alt="Blocktree Logo"
                                className="w-32"
                            />
                        </Link>
                    </div>
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
                            <button className="bg-white text-black font-poppins font-bold text-[16px] rounded-[20px] py-2 px-4 hover:bg-gray-200 transition-colors">
                                Demo
                            </button>
                        </Link>
                    </div>
                    <button
                        className="md:hidden text-[#FFFFFF] focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-black bg-opacity-60 shadow-md transition-all duration-500 ease-in-out fixed w-full z-10 backdrop-blur-lg mobile-menu ${
                    isMenuOpen ? 'max-h-96' : 'max-h-0'
                }`}
                style={{ top: `${headerHeight}px` }}
            >
                <div
                    className={`max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-6 transition-opacity duration-300 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Link
                        to="https://github.com"
                        className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-medium md:font-light text-[14px] md:text-[16px] md:hover:text-blue-500 transition-colors animate-fadeIn"
                        onClick={toggleMenu}
                        onMouseEnter={isMobile ? null : () => handleMouseEnter('github')}
                        onMouseLeave={isMobile ? null : handleMouseLeave}
                        style={{ animationDelay: '0ms' }}
                    >
                        <img
                            src={isMobile || hoveredLink !== 'github' ? '/github.png' : '/github-hover.png'}
                            alt="Github Icon"
                            className="w-4 h-4"
                        />
                        Github
                    </Link>
                    <Link
                        to="/whitepaper"
                        className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-medium md:font-light text-[14px] md:text-[16px] md:hover:text-blue-500 transition-colors animate-fadeIn"
                        onClick={toggleMenu}
                        onMouseEnter={isMobile ? null : () => handleMouseEnter('whitepaper')}
                        onMouseLeave={isMobile ? null : handleMouseLeave}
                        style={{ animationDelay: '100ms' }}
                    >
                        <img
                            src={
                                isMobile
                                    ? '/whitepaper-mobile.png'
                                    : hoveredLink === 'whitepaper'
                                    ? '/whitepaper-hover.png'
                                    : '/whitepaper.png'
                            }
                            alt="Whitepaper Icon"
                            className="w-[16px] h-[16px]"
                        />
                        Whitepaper
                    </Link>
                    <Link
                        to="/contact"
                        className="flex items-center gap-2 text-[#FFFFFF] font-poppins font-medium md:font-light text-[14px] md:text-[16px] md:hover:text-blue-500 transition-colors animate-fadeIn"
                        onClick={toggleMenu}
                        onMouseEnter={isMobile ? null : () => handleMouseEnter('contact')}
                        onMouseLeave={isMobile ? null : handleMouseLeave}
                        style={{ animationDelay: '200ms' }}
                    >
                        <img
                            src={
                                isMobile
                                    ? '/contact-mobile.png'
                                    : hoveredLink === 'contact'
                                    ? '/contact-hover.png'
                                    : '/contact.png'
                            }
                            alt="Contact Icon"
                            className="w-[16px] h-[13px]"
                        />
                        Contact
                    </Link>
                    <Link
                        to="/demo"
                        className="block animate-fadeIn"
                        onClick={toggleMenu}
                        style={{ animationDelay: '300ms' }}
                    >
                        <button className="bg-white text-black font-poppins font-bold text-[14px] md:text-[16px] rounded-[20px] py-2 px-4 md:hover:bg-gray-200 transition-colors">
                            Demo
                        </button>
                    </Link>
                </div>
            </div>

            <main className="flex-1 w-full">{children || <Outlet />}</main>

            <footer className="bg-[#111111] py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="mb-4 md:mb-0">
                        <Link to="/">
                            <img
                                src="/blocktree-logo-white.png"
                                alt="Blocktree Logo"
                                className="w-28"
                            />
                        </Link>
                    </div>
                    <div className="text-center">
                        <p className="text-[#3B3B3B] font-poppins font-medium text-[12px]">
                            © 2025 Blocktree Foundation. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3B3B3B] rounded-[5px] p-[5px]"
                        >
                            <img src="/github.png" alt="Github Icon" className="w-4 h-4" />
                        </a>
                        <a
                            href="/whitepaper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3B3B3B] rounded-[5px] p-[5px]"
                        >
                            <img src="/whitepaper-thick.png" alt="Whitepaper Icon" className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out forwards;
                }

                /* 确保模糊效果在所有浏览器中生效 */
                header, .mobile-menu {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }
            `}</style>
        </div>
    );
}