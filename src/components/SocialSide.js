import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

const SocialSide = () => {
    const { socialMedia } = config;

    return (
        <div className="hidden md:block fixed bottom-0 left-6 lg:left-12 z-10 text-light-slate">
            <ul className="flex flex-col items-center m-0 p-0 list-none space-y-5 after:content-[''] after:block after:w-[1px] after:h-[90px] after:bg-light-slate after:mx-auto after:mt-5">
                {socialMedia &&
                    socialMedia.map(({ url, name }, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.5 + (i * 0.1) }}
                            className="last-of-type:mb-5"
                        >
                            <a
                                href={url}
                                aria-label={name}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 hover:text-green hover:-translate-y-[3px] transition-all inline-block text-xl"
                            >
                                {name === 'GitHub' ? (
                                    <FiGithub />
                                ) : name === 'Instagram' ? (
                                    <FiInstagram />
                                ) : (
                                    <FiLinkedin />
                                )}
                            </a>
                        </motion.li>
                    ))}
            </ul>
        </div>
    );
};

export default SocialSide;
