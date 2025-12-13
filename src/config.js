export const config = {
    email: 'ayushsinhaa007@gmail.com',

    socialMedia: [
        {
            name: 'GitHub',
            url: 'https://github.com/ayushsinha0804',
        },
        {
            name: 'Linkedin',
            url: 'https://www.linkedin.com/in/ayushsxnha/',
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/ayushsxnha',
        },
    ],

    navLinks: [
        {
            name: 'About',
            url: '#about',
        },
        {
            name: 'Experience',
            url: '#jobs',
        },
        {
            name: 'Work',
            url: '#projects',
        },
        {
            name: 'Contact',
            url: '#contact',
        },
    ],

    colors: {
        green: '#64ffda',
        navy: '#0a192f',
        darkNavy: '#020c1b',
    },

    jobs: [
        {
            company: 'Electronic Point',
            title: 'Web Developer (MERN Stack)',
            range: 'October 2024 - Current',
            url: 'https://www.ayushsinha0804.github.io/Electronic-Point-Website',
            duties: [
                'Designed and developed a dynamic website using ReactJS with essential pages containing information and contact details about the company.',
                'Built a news page that uses an API to fetch the latest industry updates which improves user’s knowledge and engagement.',
                'Built a Queries page that enables users to submit inquiries, and automated the process of forwarding user concerns and their contact details to the company for further communication.',
                'Optimized website performance and UI/UX.',
            ],
        },
        {
            company: 'Ernst and Young',
            title: 'Cyber Security Trainee',
            range: 'July 2023 - August 2023',
            url: '#',
            duties: [
                'Learned foundational cybersecurity concepts, including 12 cryptographic encryption and decryption techniques.',
                'Developed anomaly detection model for web services using supervised machine learning with 91% accuracy.',
                'Implemented Data Structures and Algorithms to create a python package consisting of 12 different encryption and decryption codes for privacy.',
            ],
        },
        {
            company: 'High Radius',
            title: 'Intern',
            range: 'June 2023 - July 2023',
            url: '#',
            duties: [
                'Collaborated on challenging technical projects, contributing to 2 major initiatives.',
                'Conducted data research and analysis using company specific tools to support project coordinators in 3 projects.',
            ],
        },
    ],

    projects: [
        {
            title: 'Real-Time Messaging Application',
            description:
                'Designed and created a ReactJS front-end and a NodeJS backend with Socket.io for real-time communication. Implemented MongoDB for efficient data storage, checked up to 20 user entries.',
            tech: ['ReactJS', 'NodeJS', 'Socket.io', 'MongoDB'],
            github: '#',
            external: '#',
            image: '',
            color: '#64ffda'
        },
        {
            title: 'Full Stack Image Captioning System',
            description:
                'Built a system using LSTM, CNN and RNN for accurate image captioning. Processed an 8000-image dataset and trained an encoder-decoder model to achieve BLEU-1 score of 0.52',
            tech: ['Python', 'LSTM', 'CNN', 'RNN', 'Deep Learning'],
            github: '#',
            external: '#',
            image: '/imgcap.png',
            color: '#64ffda'
        },
        {
            title: 'Heart Disease Predictor',
            description:
                'Trained a supervised learning model using Logistic Regression to predict heart diseases. Analyzed a Kaggle dataset of 1000 entries and achieved an accuracy of 82%.',
            tech: ['Python', 'Machine Learning', 'Logistic Regression'],
            github: '#',
            external: '#',
            image: '',
            color: '#64ffda'
        },
        {
            title: 'DDoS Attack Detection',
            description:
                'Built a machine learning-driven classification model to detect DDoS attacks. Used python, processed a dataset of 100,000 entries and implemented Decision Tree and achieved accuracy of 91%.',
            tech: ['Python', 'Machine Learning', 'Decision Tree'],
            github: '#',
            external: '#',
            image: '',
            color: '#64ffda'
        },
    ],
};
