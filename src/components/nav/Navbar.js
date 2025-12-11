import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../../config';
import Logo from '../icons/Logo';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { navLinks } = config;

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'h-16 md:h-20 bg-navy/90 shadow-lg backdrop-blur-sm' : 'h-20 md:h-24 bg-transparent'
                }`}
        >
            <nav className="flex justify-between items-center px-6 md:px-12 h-full">
                <Link to="/" className="z-50 text-green hover:text-green-400">
                    <Logo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <ol className="flex space-x-8">
                        {navLinks &&
                            navLinks.map(({ url, name }, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <a
                                        href={url}
                                        className="flex text-lightest-slate hover:text-green text-sm font-mono"
                                    >
                                        <span className="text-green mr-1">{`0${i + 1}.`}</span>
                                        {name}
                                    </a>
                                </motion.li>
                            ))}
                    </ol>
                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Resume_Ayush_Sinha.pdf"
                        className="border border-green text-green px-4 py-2 rounded hover:bg-green/10 transition-colors font-mono text-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Resume
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-[60]">
                    <button
                        onClick={toggleMenu}
                        className="text-green text-3xl p-2"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40 md:hidden"
                                onClick={toggleMenu}
                            />
                            {/* Slide-in Menu */}
                            <motion.aside
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="fixed top-0 right-0 bottom-0 w-[min(75vw,300px)] bg-light-navy shadow-2xl flex flex-col items-center justify-center z-50 md:hidden"
                                style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
                            >
                                <nav className="flex flex-col items-center">
                                    <ol className="flex flex-col items-center space-y-6 mb-10">
                                        {navLinks.map(({ url, name }, i) => (
                                            <li key={i}>
                                                <a
                                                    href={url}
                                                    onClick={toggleMenu}
                                                    className="flex flex-col items-center text-lightest-slate hover:text-green font-mono text-base"
                                                >
                                                    <span className="text-green text-xs mb-1">{`0${i + 1}.`}</span>
                                                    {name}
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="Resume_Ayush_Sinha.pdf"
                                        className="border border-green text-green px-6 py-3 rounded hover:bg-green/10 transition-colors font-mono text-base"
                                    >
                                        Resume
                                    </a>
                                </nav>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
