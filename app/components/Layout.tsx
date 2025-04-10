import { useState, useEffect } from "react";
import { Link, Outlet } from "@remix-run/react";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null); // 跟踪当前 hover 的链接
    const [isMobile, setIsMobile] = useState(false); // 动态检测是否为移动端

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = (link) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);

    // 动态检测屏幕大小
    useEffect(() => {
        // 初始检测
        const checkIsMobile = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };

        // 客户端渲染时执行
        if (typeof window !== "undefined") {
            checkIsMobile(); // 初始检查
            window.addEventListener('resize', checkIsMobile); // 监听窗口大小变化
        }

        // 清理事件监听
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener('resize', checkIsMobile);
            }
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-[#131313]">
            {/* Top Menu (Header) */}
            <header className="fixed w-full bg-black bg-opacity-70 shadow-md z-10 top-0">
                <nav className="max-w-7xl mx-auto px-4 md:px-12 py-5 md:py-4 flex items-center justify-between">
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
                            <button className="bg-white text-black font-poppins font-bold text-[16px] rounded-[20px] py-2 px-4 hover:bg-gray-200 transition-colors">
                                Demo
                            </button>
                        </Link>
                    </div>
                    {/* Mobile Menu Button */}
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
                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-[#131313] shadow-md overflow-hidden transition-all duration-500 ease-in-out ${
                        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-6">
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

            {/* 自定义 CSS 动画 */}
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
            `}</style>
        </div>
    );
}