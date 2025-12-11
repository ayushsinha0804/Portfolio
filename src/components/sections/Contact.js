import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="max-w-[600px] mx-auto py-24 text-center mb-20 px-6 md:px-12">
            <p className="font-mono text-green text-base mb-5">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6">Get In Touch</h2>
            <p className="text-slate text-lg leading-relaxed mb-12">
                I'm currently looking for new opportunities and my inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushsinhaa007@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-green text-green px-8 py-5 rounded hover:bg-green/10 transition-colors font-mono text-sm"
            >
                Say Hello
            </a>
        </section>
    );
};

export default Contact;
