// ─── Career-specific roadmap data ────────────────────────────────────────────
// Each career has: label, emoji, phases[], each phase has items[]

export const careerMeta = {
    fullstack: { label: 'Full Stack Dev', emoji: '⚡', color: 'var(--cyan)', salary: '₹6L – ₹14L' },
    aiml:      { label: 'AI / ML Engineer', emoji: '🧠', color: 'var(--purple)', salary: '₹8L – ₹18L' },
    data:      { label: 'Data Science', emoji: '📊', color: '#F59E0B', salary: '₹7L – ₹15L' },
    devops:    { label: 'Cloud & DevOps', emoji: '☁️', color: '#10B981', salary: '₹7L – ₹14L' },
    cyber:     { label: 'Cybersecurity', emoji: '🛡️', color: '#F72585', salary: '₹6L – ₹13L' },
    mobile:    { label: 'Mobile Dev', emoji: '📱', color: '#8B5CF6', salary: '₹5L – ₹12L' },
};

export const roadmapData = {
    fullstack: [
        {
            phase: 'Foundation',
            color: 'var(--green)',
            items: [
                { id: 'fs1', title: 'HTML & CSS Fundamentals', xp: 200, time: '2 weeks', resources: ['FreeCodeCamp HTML/CSS', 'CSS Tricks Guide', 'Kevin Powell YouTube'] },
                { id: 'fs2', title: 'JavaScript Essentials', xp: 350, time: '3 weeks', resources: ['javascript.info', 'Akshay Saini JS Playlist', 'You Don\'t Know JS (Book)'] },
                { id: 'fs3', title: 'Git & Version Control', xp: 150, time: '1 week', resources: ['Git Documentation', 'The Odin Project Git'] },
            ]
        },
        {
            phase: 'Frontend',
            color: 'var(--cyan)',
            items: [
                { id: 'fs4', title: 'React & Hooks', xp: 500, time: '4 weeks', resources: ['React Docs (react.dev)', 'Scrimba React Course', 'Jack Herrington YouTube'] },
                { id: 'fs5', title: 'State Management (Redux / Zustand)', xp: 350, time: '2 weeks', resources: ['Redux Toolkit Docs', 'Zustand GitHub README'] },
                { id: 'fs6', title: 'TypeScript Basics', xp: 300, time: '2 weeks', resources: ['TypeScript Handbook', 'Matt Pocock YouTube'] },
            ]
        },
        {
            phase: 'Backend',
            color: 'var(--purple)',
            items: [
                { id: 'fs7', title: 'Node.js & Express', xp: 450, time: '3 weeks', resources: ['Node.js Docs', 'Traversy Media Node Crash Course'] },
                { id: 'fs8', title: 'REST API Design', xp: 300, time: '2 weeks', resources: ['REST API Tutorial', 'Postman Learning Center'] },
                { id: 'fs9', title: 'Databases (SQL + MongoDB)', xp: 400, time: '3 weeks', resources: ['SQLZoo', 'MongoDB University', 'Prisma ORM Docs'] },
            ]
        },
        {
            phase: 'Advanced',
            color: '#F59E0B',
            items: [
                { id: 'fs10', title: 'Authentication & Security', xp: 350, time: '2 weeks', resources: ['JWT.io', 'OWASP Top 10', 'Fireship Auth Video'] },
                { id: 'fs11', title: 'System Design Basics', xp: 600, time: '4 weeks', resources: ['Gaurav Sen YouTube', 'Designing Data-Intensive Apps'] },
                { id: 'fs12', title: 'DSA for Interviews', xp: 700, time: '6 weeks', resources: ['Striver A-Z Sheet', 'NeetCode.io', 'LeetCode Top 150'] },
            ]
        },
    ],

    aiml: [
        {
            phase: 'Math & Python Foundation',
            color: 'var(--green)',
            items: [
                { id: 'ai1', title: 'Python for Data Science', xp: 300, time: '3 weeks', resources: ['Python.org Docs', 'CS50P Harvard', 'Mosh Python Course'] },
                { id: 'ai2', title: 'Linear Algebra & Statistics', xp: 400, time: '3 weeks', resources: ['3Blue1Brown Linear Algebra', 'StatQuest YouTube', 'Khan Academy'] },
                { id: 'ai3', title: 'NumPy & Pandas', xp: 250, time: '2 weeks', resources: ['Kaggle Pandas Course', 'NumPy Docs Tutorial'] },
            ]
        },
        {
            phase: 'Machine Learning',
            color: 'var(--purple)',
            items: [
                { id: 'ai4', title: 'Supervised Learning (Regression, Classification)', xp: 500, time: '4 weeks', resources: ['Andrew Ng ML Course', 'Scikit-Learn Docs', 'StatQuest ML Playlist'] },
                { id: 'ai5', title: 'Unsupervised Learning & Clustering', xp: 400, time: '3 weeks', resources: ['Google ML Crash Course', 'Kaggle ML Courses'] },
                { id: 'ai6', title: 'Model Evaluation & Feature Engineering', xp: 350, time: '2 weeks', resources: ['Kaggle Feature Engineering Course'] },
            ]
        },
        {
            phase: 'Deep Learning',
            color: 'var(--cyan)',
            items: [
                { id: 'ai7', title: 'Neural Networks & Deep Learning', xp: 600, time: '5 weeks', resources: ['Deep Learning Specialization (Coursera)', 'fast.ai', '3Blue1Brown Neural Nets'] },
                { id: 'ai8', title: 'NLP & Transformers', xp: 550, time: '4 weeks', resources: ['HuggingFace Course', 'Jay Alammar Blog', 'Andrej Karpathy YouTube'] },
                { id: 'ai9', title: 'Computer Vision (CNN)', xp: 500, time: '3 weeks', resources: ['CS231n Stanford', 'PyTorch Vision Docs'] },
            ]
        },
        {
            phase: 'MLOps & Applications',
            color: '#F59E0B',
            items: [
                { id: 'ai10', title: 'LangChain & LLM Apps', xp: 600, time: '3 weeks', resources: ['LangChain Docs', 'LlamaIndex', 'Deeplearning.ai Short Courses'] },
                { id: 'ai11', title: 'MLOps & Model Deployment', xp: 500, time: '3 weeks', resources: ['MLflow Docs', 'Weights & Biases', 'FastAPI for ML'] },
                { id: 'ai12', title: 'Kaggle Competitions', xp: 700, time: 'Ongoing', resources: ['Kaggle.com', 'Kaggle Notebooks'] },
            ]
        },
    ],

    data: [
        {
            phase: 'Data Foundation',
            color: 'var(--green)',
            items: [
                { id: 'ds1', title: 'Python & Pandas', xp: 300, time: '3 weeks', resources: ['Kaggle Pandas Course', 'Real Python', 'Python Docs'] },
                { id: 'ds2', title: 'SQL Mastery', xp: 350, time: '3 weeks', resources: ['Mode SQL Tutorial', 'SQLZoo', 'LeetCode SQL'] },
                { id: 'ds3', title: 'Statistics & Probability', xp: 400, time: '3 weeks', resources: ['StatQuest YouTube', 'Khan Academy Stats', 'Think Stats (Book)'] },
            ]
        },
        {
            phase: 'Data Analysis',
            color: '#F59E0B',
            items: [
                { id: 'ds4', title: 'Data Visualization (Matplotlib, Seaborn, Plotly)', xp: 300, time: '2 weeks', resources: ['Matplotlib Docs', 'Plotly Python', 'Data Viz Course Kaggle'] },
                { id: 'ds5', title: 'Exploratory Data Analysis (EDA)', xp: 400, time: '3 weeks', resources: ['Kaggle EDA Notebooks', 'Pandas Profiling'] },
                { id: 'ds6', title: 'Excel & Google Sheets for Data', xp: 200, time: '1 week', resources: ['Excel for Data Analysis (YouTube)'] },
            ]
        },
        {
            phase: 'Machine Learning',
            color: 'var(--purple)',
            items: [
                { id: 'ds7', title: 'Scikit-Learn ML Pipeline', xp: 500, time: '4 weeks', resources: ['Scikit-Learn Docs', 'Kaggle ML Courses', 'Andrew Ng Coursera'] },
                { id: 'ds8', title: 'Feature Engineering', xp: 350, time: '2 weeks', resources: ['Kaggle Feature Engineering'] },
                { id: 'ds9', title: 'Time Series Analysis', xp: 400, time: '2 weeks', resources: ['Prophet Docs', 'Time Series Kaggle Course'] },
            ]
        },
        {
            phase: 'Big Data & Tools',
            color: 'var(--cyan)',
            items: [
                { id: 'ds10', title: 'Power BI / Tableau', xp: 350, time: '2 weeks', resources: ['Power BI Microsoft Learn', 'Tableau Free Training'] },
                { id: 'ds11', title: 'Apache Spark Basics', xp: 500, time: '3 weeks', resources: ['Spark Docs', 'Databricks Community'] },
                { id: 'ds12', title: 'Data Engineering Fundamentals', xp: 600, time: '4 weeks', resources: ['Data Engineering Zoomcamp', 'dbt Docs'] },
            ]
        },
    ],

    devops: [
        {
            phase: 'Linux & Networking',
            color: 'var(--green)',
            items: [
                { id: 'do1', title: 'Linux Command Line', xp: 300, time: '2 weeks', resources: ['Linux Journey', 'OverTheWire (Bandit)', 'Ryan\'s Tutorials'] },
                { id: 'do2', title: 'Networking Fundamentals', xp: 350, time: '2 weeks', resources: ['Professor Messer', 'NetworkChuck YouTube', 'Cisco CCNA free'] },
                { id: 'do3', title: 'Shell Scripting (Bash)', xp: 250, time: '2 weeks', resources: ['Bash Manual', 'ShellScripting.sh'] },
            ]
        },
        {
            phase: 'Containers & CI/CD',
            color: 'var(--cyan)',
            items: [
                { id: 'do4', title: 'Docker & Docker Compose', xp: 400, time: '3 weeks', resources: ['Docker Docs', 'TechWorld with Nana', 'Play with Docker'] },
                { id: 'do5', title: 'Kubernetes', xp: 600, time: '5 weeks', resources: ['Kubernetes Docs', 'TechWorld with Nana K8s', 'KodeKloud'] },
                { id: 'do6', title: 'CI/CD with GitHub Actions / Jenkins', xp: 400, time: '3 weeks', resources: ['GitHub Actions Docs', 'Jenkins Docs', 'KodeKloud'] },
            ]
        },
        {
            phase: 'Cloud Platforms',
            color: '#F59E0B',
            items: [
                { id: 'do7', title: 'AWS Fundamentals (EC2, S3, Lambda)', xp: 500, time: '4 weeks', resources: ['AWS Skill Builder', 'A Cloud Guru', 'AWS Free Tier'] },
                { id: 'do8', title: 'Infrastructure as Code (Terraform)', xp: 500, time: '3 weeks', resources: ['Terraform Docs', 'HashiCorp Learn'] },
                { id: 'do9', title: 'Monitoring (Prometheus, Grafana)', xp: 400, time: '2 weeks', resources: ['Prometheus Docs', 'Grafana Labs'] },
            ]
        },
        {
            phase: 'Advanced DevOps',
            color: 'var(--purple)',
            items: [
                { id: 'do10', title: 'GitOps & ArgoCD', xp: 500, time: '3 weeks', resources: ['ArgoCD Docs', 'GitOps Book'] },
                { id: 'do11', title: 'Security in DevOps (DevSecOps)', xp: 450, time: '2 weeks', resources: ['OWASP DevSecOps', 'Snyk'] },
                { id: 'do12', title: 'AWS/Azure Certification Prep', xp: 700, time: '4 weeks', resources: ['Stephane Maarek Udemy', 'ExamTopics', 'Tutorials Dojo'] },
            ]
        },
    ],

    cyber: [
        {
            phase: 'Foundations',
            color: 'var(--green)',
            items: [
                { id: 'cy1', title: 'Networking & Protocols (TCP/IP, HTTP, DNS)', xp: 400, time: '3 weeks', resources: ['Professor Messer', 'NetworkChuck', 'Cisco NetAcad'] },
                { id: 'cy2', title: 'Linux for Security', xp: 350, time: '2 weeks', resources: ['OverTheWire Bandit', 'TryHackMe Pre-Security'] },
                { id: 'cy3', title: 'Cryptography Basics', xp: 300, time: '2 weeks', resources: ['CryptoHack', 'Coursera Crypto I (Dan Boneh)'] },
            ]
        },
        {
            phase: 'Ethical Hacking',
            color: '#F72585',
            items: [
                { id: 'cy4', title: 'Web Application Security (OWASP Top 10)', xp: 500, time: '4 weeks', resources: ['PortSwigger Web Security Academy', 'OWASP Juice Shop'] },
                { id: 'cy5', title: 'Network Penetration Testing', xp: 550, time: '4 weeks', resources: ['TryHackMe', 'HackTheBox', 'eJPT Cert'] },
                { id: 'cy6', title: 'Vulnerability Assessment & Scanning', xp: 400, time: '2 weeks', resources: ['Nmap Docs', 'Metasploit Unleashed'] },
            ]
        },
        {
            phase: 'Specialization',
            color: 'var(--cyan)',
            items: [
                { id: 'cy7', title: 'Malware Analysis & Reverse Engineering', xp: 600, time: '5 weeks', resources: ['Malware Unicorn', 'Any.run Sandbox', 'x64dbg'] },
                { id: 'cy8', title: 'Cloud Security', xp: 500, time: '3 weeks', resources: ['AWS Security Specialty', 'Cloud Security Alliance'] },
                { id: 'cy9', title: 'Incident Response & Forensics', xp: 500, time: '3 weeks', resources: ['BlueTeamLabs', 'SANS Reading Room'] },
            ]
        },
        {
            phase: 'Certifications',
            color: 'var(--purple)',
            items: [
                { id: 'cy10', title: 'CompTIA Security+', xp: 600, time: '4 weeks', resources: ['Professor Messer S+', 'ExamCompass Practice'] },
                { id: 'cy11', title: 'CEH or eJPT Certification', xp: 700, time: '6 weeks', resources: ['EC-Council CEH', 'INE eJPT'] },
                { id: 'cy12', title: 'Bug Bounty on HackerOne/Bugcrowd', xp: 800, time: 'Ongoing', resources: ['HackerOne', 'Bugcrowd', 'NahamCon Talks'] },
            ]
        },
    ],

    mobile: [
        {
            phase: 'Programming Foundation',
            color: 'var(--green)',
            items: [
                { id: 'mb1', title: 'JavaScript / TypeScript Basics', xp: 300, time: '3 weeks', resources: ['javascript.info', 'TypeScript Handbook'] },
                { id: 'mb2', title: 'UI & UX Design Principles', xp: 200, time: '1 week', resources: ['Google Material Design', 'Apple HIG', 'Refactoring UI (Book)'] },
                { id: 'mb3', title: 'Git & Project Setup', xp: 150, time: '1 week', resources: ['Git Documentation', 'Expo Docs'] },
            ]
        },
        {
            phase: 'React Native / Flutter',
            color: '#8B5CF6',
            items: [
                { id: 'mb4', title: 'React Native Core Concepts', xp: 500, time: '4 weeks', resources: ['React Native Docs', 'William Candillon (YouTube)', 'Expo Docs'] },
                { id: 'mb5', title: 'Navigation & State Management', xp: 400, time: '3 weeks', resources: ['React Navigation Docs', 'Zustand for Mobile'] },
                { id: 'mb6', title: 'Native APIs (Camera, GPS, Push Notifs)', xp: 350, time: '2 weeks', resources: ['Expo SDK Docs', 'React Native Community'] },
            ]
        },
        {
            phase: 'Backend Integration',
            color: 'var(--cyan)',
            items: [
                { id: 'mb7', title: 'Firebase / Supabase for Mobile', xp: 400, time: '3 weeks', resources: ['Firebase Docs', 'Supabase Docs', 'Fireship YouTube'] },
                { id: 'mb8', title: 'REST & GraphQL API Calls', xp: 300, time: '2 weeks', resources: ['Axios Docs', 'Apollo Client Docs'] },
                { id: 'mb9', title: 'Offline Storage & Caching', xp: 350, time: '2 weeks', resources: ['MMKV', 'WatermelonDB', 'AsyncStorage Docs'] },
            ]
        },
        {
            phase: 'Publishing & Advanced',
            color: '#F59E0B',
            items: [
                { id: 'mb10', title: 'App Store & Play Store Deployment', xp: 400, time: '2 weeks', resources: ['Apple App Store Connect', 'Google Play Console', 'Expo EAS Build'] },
                { id: 'mb11', title: 'Performance Optimization', xp: 500, time: '3 weeks', resources: ['Flipper Debugger', 'React Native Performance Docs'] },
                { id: 'mb12', title: 'Animation (Reanimated 3)', xp: 550, time: '3 weeks', resources: ['React Native Reanimated Docs', 'William Candillon Courses'] },
            ]
        },
    ],
};

// Helper: get first locked node (the one to work on next) for a career & completedIds set
export function getNextNode(career, completedIds = []) {
    const phases = roadmapData[career] || roadmapData.fullstack;
    for (const phase of phases) {
        for (const item of phase.items) {
            if (!completedIds.includes(item.id)) return item;
        }
    }
    return null;
}

// Helper: compute overall progress %
export function getProgress(career, completedIds = []) {
    const phases = roadmapData[career] || roadmapData.fullstack;
    const all = phases.flatMap(p => p.items);
    return all.length ? Math.round((completedIds.length / all.length) * 100) : 0;
}
