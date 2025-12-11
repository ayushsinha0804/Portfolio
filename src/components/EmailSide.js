import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

const EmailSide = () => {
    const { email } = config;

    return (
        <div className="hidden md:block fixed bottom-0 right-6 lg:right-12 z-10 text-light-slate">
            <div className="flex flex-col items-center relative after:content-[''] after:block after:w-[1px] after:h-[90px] after:bg-light-slate after:mx-auto after:mt-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="mb-5"
                >
                    <a
                        href={`mailto:${email}`}
                        className="font-mono text-xs tracking-widest hover:text-green hover:-translate-y-[3px] transition-all inline-block py-2.5 [writing-mode:vertical-rl]"
                    >
                        {email}
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default EmailSide;
