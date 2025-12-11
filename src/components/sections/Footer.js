import React from 'react';
import { FiGithub, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="flex flex-col items-center justify-center p-6 bg-navy text-slate text-sm font-mono pb-10">
            <div className="flex md:hidden space-x-6 mb-8 text-xl">
                <a href="#" className="hover:text-green"><FiGithub /></a>
                <a href="#" className="hover:text-green"><FiInstagram /></a>
                <a href="#" className="hover:text-green"><FiTwitter /></a>
                <a href="#" className="hover:text-green"><FiLinkedin /></a>
            </div>
            <div className="text-center">
                <div>Designed by Brittany Chiang</div>
                <div>Built by Ayush Sinha</div>
            </div>
        </footer>
    );
};

export default Footer;
