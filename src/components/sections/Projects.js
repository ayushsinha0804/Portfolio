import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { config } from '../../config';

const Projects = () => {
    const { projects } = config;

    return (
        <section id="projects" className="py-24 max-w-[1000px] mx-auto">
            <h2 className="flex items-center text-2xl md:text-3xl font-bold text-lightest-slate mb-10 w-full whitespace-nowrap after:content-[''] after:block after:h-[1px] after:bg-lightest-navy after:w-[300px] after:ml-5 after:relative after:top-[1px]">
                <span className="text-green font-mono text-xl mr-2">03.</span> Some Things I've Built
            </h2>

            <div className="flex flex-col space-y-24">
                {projects.map((project, i) => (
                    <div key={i} className="relative grid grid-cols-12 items-center gap-2">
                        <div className={`col-span-12 md:col-span-7 row-span-1 relative ${i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-6 md:order-last'}`}>
                            <div className="w-full h-[300px] md:h-[360px] bg-green/20 rounded mix-blend-multiply hover:mix-blend-normal transition-all duration-300 relative border border-green/20">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center text-green font-mono">
                                    Project Image: {project.title}
                                </div>
                            </div>
                        </div>

                        <div className={`col-span-12 md:col-span-5 row-span-1 z-10 p-6 md:p-0 ${i % 2 === 0 ? 'md:col-end-13 md:text-right' : 'md:col-start-1 md:text-left'}`}>
                            <p className="font-mono text-green text-sm mb-2">Featured Project</p>
                            <h3 className="text-lightest-slate text-2xl font-bold mb-4">
                                <a href={project.external} className="hover:text-green">{project.title}</a>
                            </h3>
                            <div className="bg-light-navy p-6 rounded shadow-xl text-light-slate text-sm mb-4">
                                <p>{project.description}</p>
                            </div>
                            <ul className={`flex flex-wrap text-slate font-mono text-xs mb-8 space-x-4 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {project.tech.map((t, idx) => (
                                    <li key={idx} className="mb-1">{t}</li>
                                ))}
                            </ul>
                            <div className={`flex items-center space-x-4 text-slate ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {project.github && (
                                    <a href={project.github} className="hover:text-green text-xl"><FiGithub /></a>
                                )}
                                {project.external && (
                                    <a href={project.external} className="hover:text-green text-xl"><FiExternalLink /></a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
