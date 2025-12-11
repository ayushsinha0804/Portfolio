import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../../config';

const Experience = () => {
    const [activeTabId, setActiveTabId] = useState(0);

    const { jobs } = config;

    return (
        <section id="jobs" className="max-w-[700px] mx-auto py-24">
            <h2 className="flex items-center text-2xl md:text-3xl font-bold text-lightest-slate mb-10 w-full whitespace-nowrap after:content-[''] after:block after:h-[1px] after:bg-lightest-navy after:w-[300px] after:ml-5 after:relative after:top-[1px]">
                <span className="text-green font-mono text-xl mr-2">02.</span> Where I've Worked
            </h2>

            <div className="flex flex-col md:flex-row gap-5">
                <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b-2 md:border-b-0 md:border-l-2 border-lightest-navy w-full md:w-32 mb-8 md:mb-0 relative font-mono text-sm">
                    {/* Slider Indicator */}
                    <div
                        className="absolute bg-green transition-all duration-300 md:w-[2px] w-full md:h-[42px] h-[2px] top-full md:top-0 left-0"
                        style={{
                            transform: window.innerWidth >= 768 ? `translateY(${activeTabId * 42}px)` : `translateX(${activeTabId * 100}%)`,
                            width: window.innerWidth >= 768 ? '2px' : `${100 / jobs.length}%`
                        }}
                    />

                    {jobs.map((job, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTabId(i)}
                            className={`px-5 py-3 text-left hover:bg-light-navy hover:text-green transition-all whitespace-nowrap ${activeTabId === i ? 'text-green' : 'text-slate'
                                }`}
                        >
                            {job.company}
                        </button>
                    ))}
                </div>

                <div className="w-full">
                    {jobs.map((job, i) => (
                        <div
                            key={i}
                            hidden={activeTabId !== i}
                            className="w-full"
                        >
                            <h3 className="text-xl font-bold text-lightest-slate mb-0.5">
                                <span>{job.title}</span>
                                <span className="text-green">
                                    &nbsp;@&nbsp;
                                    <a href={job.url} className="hover:underline">
                                        {job.company}
                                    </a>
                                </span>
                            </h3>
                            <p className="font-mono text-xs text-slate mb-6">{job.range}</p>

                            <ul className="text-slate space-y-4">
                                {job.duties.map((duty, j) => (
                                    <li key={j} className="relative pl-8 before:content-['▹'] before:text-green before:absolute before:left-0 before:top-0">
                                        {duty}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
