import React, { useState, useEffect } from 'react';
import Navbar from './nav/Navbar';
import SocialSide from './SocialSide';
import EmailSide from './EmailSide';

const Layout = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    const { x, y } = mousePosition;

    return (
        <div
            className="min-h-screen bg-navy text-slate transition-colors duration-300"
            style={{
                background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
                backgroundColor: '#0a192f' // Fallback/Base color
            }}
        >
            <Navbar />
            <div id="content">
                <main className="px-0 md:px-12 lg:px-24 xl:px-36 py-24 max-w-[1600px] mx-auto min-h-screen flex flex-col">
                    {children}
                </main>
            </div>
            <SocialSide />
            <EmailSide />
        </div>
    );
};

export default Layout;
