import { motion } from 'framer-motion';
import { config } from '../../config';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
    const { socialMedia } = config;

    const one = <h1 className="text-green font-mono text-base md:text-lg mb-5">Hi, my name is</h1>;
    const two = <h2 className="text-lightest-slate text-4xl md:text-7xl font-bold mb-4">Ayush Sinha.</h2>;
    const three = <h3 className="text-slate text-3xl md:text-6xl font-bold mb-5">I build things for the web.</h3>;
    const four = (
        <p className="max-w-[540px] text-slate text-lg md:text-xl leading-relaxed mb-12">
            I'm a software engineer specializing in building (and occasionally designing) exceptional digital
            experiences. Currently, I'm focused on building accessible, human-centered products at{' '}
            <a href="https://www.ayushsinha0804.github.io/Electronic-Point-Website" target="_blank" rel="noopener noreferrer" className="text-green hover:underline relative">
                Electronic Point
            </a>
            .
        </p>
    );

    const five = (
        <div className="flex items-center space-x-6 text-lightest-slate">
            {socialMedia &&
                socialMedia.map(({ url, name }, i) => (
                    <a
                        key={i}
                        href={url}
                        aria-label={name}
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl hover:text-green hover:-translate-y-1 transition-all"
                    >
                        {name === 'GitHub' ? (
                            <FiGithub />
                        ) : name === 'Instagram' ? (
                            <FiInstagram />
                        ) : (
                            <FiLinkedin />
                        )}
                    </a>
                ))}
        </div>
    );

    const items = [one, two, three, four, five];

    return (
        <section className="flex flex-col justify-center min-h-screen max-w-[1000px] mx-auto pt-[100px] px-6 md:px-12">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}
                >
                    {item}
                </motion.div>
            ))}
        </section>
    );
};

export default Hero;
