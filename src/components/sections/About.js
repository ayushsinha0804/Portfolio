import React from 'react';
import me from "../../sections/me.jpg";
const About = () => {
    const skills = ['JavaScript (ES6+)', 'React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'Machine Learning'];

    return (
        <section id="about" className="max-w-[900px] mx-auto py-24 px-6 md:px-12">
            <h2 className="flex items-center text-2xl md:text-3xl font-bold text-lightest-slate mb-10 w-full whitespace-nowrap after:content-[''] after:block after:h-[1px] after:bg-lightest-navy after:w-[100px] md:after:w-[300px] after:ml-5 after:relative after:top-[1px]">
                <span className="text-green font-mono text-xl mr-2">01.</span> About Me
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12">
                <div className="text-slate text-lg leading-relaxed">
                    <p className="mb-4">
                        Hello! My name is Ayush and I enjoy creating things that live on the internet. I'm a Computer Science graduate from Siksha ‘O’ Anusandhan University with a strong foundation in MERN stack development and Machine Learning.
                    </p>

                    <p className="mb-4">
                        Fast-forward to today, and I've had the privilege of working at{' '}
                        <a href="https://www.ayushsinha0804.github.io/Electronic-Point-Website" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">
                            Electronic Point
                        </a>{' '}
                        as a Web Developer, and gaining cybersecurity experience at{' '}
                        <a href="#" className="text-green hover:underline">
                            Ernst and Young
                        </a>
                        . My main focus these days is building accessible, inclusive products and digital experiences.
                    </p>

                    <p className="mb-4">Here are a few technologies I've been working with recently:</p>

                    <ul className="grid grid-cols-2 gap-2 mt-5 font-mono text-sm">
                        {skills.map((skill, i) => (
                            <li key={i} className="relative pl-5 before:content-['▹'] before:text-green before:absolute before:left-0">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative group w-full max-w-[300px] mx-auto md:mx-0">
                    <div className="relative z-10 w-full h-auto bg-green rounded transition-all duration-300 group-hover:bg-transparent">
                        <img src={me} alt="Headshot" className="w-full h-auto rounded mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500"/>
                    </div>
                    <div className="absolute top-5 left-5 w-full h-full border-2 border-green rounded -z-10 transition-all duration-300 group-hover:top-4 group-hover:left-4"></div>
                </div>
            </div>
        </section>
    );
};

export default About;
