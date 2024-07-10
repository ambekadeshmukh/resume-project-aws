const experienceData = [
    {
        date: 'April 2022 - Present',
        title: 'DevOps Engineer',
        company: 'RightRev Inc, Santa Clara',
        description: `
        <ul>
            <li>Increased application scalability and reliability by 40% through orchestrating containerization with Kubernetes, including designing and installing clusters, running jobs, and deploying pods.</li>
            <li>Reduced operational costs by 20% by designing and managing Auto Scaling for EKS nodes using cluster auto scaler, HPA, and VPA for multiple microservices.</li>
            <li>Enhanced infrastructure security by installing sealed secret controllers in EKS and encrypting secret manifests using kubeseal, reducing security breaches by 30%.</li>
            <li>Implemented IAM solutions across all services, resulting in a 25% reduction in unauthorized access incidents.</li>
            <li>Resolved over 180 incidents and tickets, improving operational efficiency by 35% through effective incident and problem response processes.</li>
            <li>Executed end-to-end Agile processes, serving as Scrum Master for 35 sprints for the DevOps team, enhancing project delivery timelines by 25%.</li>
            <li>Managed Wazuh as the primary endpoint security tool, forwarding logs to detect and report security events.</li>
            <li>Utilized Snowflake's cloud-based data warehousing platform, improving data management efficiency by 30%.</li>
            <li>Monitored and maintained Sigma deployments, driving data-driven decision-making.</li>
            <li>Contributed to two SOC 2 audit processes, achieving a successful audit outcome.</li>
            <li>Implemented Slack API integrations, improving response times by 40%.</li>
            <li>Developed and maintained CI/CD pipelines using Jenkins, reducing deployment times by 30%.</li>
            <li>Automated repetitive tasks in Jira with custom scripts, improving workflow efficiency by 40%.</li>
        </ul>`
    },
    {
        date: 'January 2021 - March 2022',
        title: 'Digital Marketing Analyst',
        company: 'RightRev Inc, Santa Clara',
        description: `
        <ul>
            <li>Boosted website conversions by 25% through the implementation of advanced Google Analytics and Google Tag Manager strategies.</li>
            <li>Increased lead generation through in-depth market research and competitive analysis.</li>
            <li>Improved organic search traffic by collaborating with the content team to create SEO-optimized blog posts and web pages.</li>
            <li>Enhanced customer engagement and increased marketing-qualified leads through personalized email nurturing campaigns using marketing automation tools.</li>
        </ul>`
    },
    {
        date: 'November 2017 - December 2020',
        title: 'Manager - Hotel Operations & Marketing',
        company: 'The Metroplace Hotels, Chennai',
        description: 'Managed hotel operations and marketing strategies.'
    },
    {
        date: 'November 2015 - February 2017',
        title: 'Marketing Manager',
        company: 'The Metroplace Hotels (Formerly Asiana Place), Chennai',
        description: 'Oversaw marketing initiatives for the hotel.'
    },
    {
        date: 'January 2013 - April 2015',
        title: 'Assistant Manager - Operations',
        company: 'The Star Residency, Madurai',
        description: 'Assisted in managing hotel operations.'
    },
    {
        date: 'March 2010 - August 2012',
        title: 'Managing Partner',
        company: '50 BUCKS Restaurant, Chennai',
        description: 'Managed restaurant operations as a partner.'
    }
];

function createExperienceCards() {
    const container = document.getElementById('experience-container');
    
    experienceData.forEach((data) => {
        const card = document.createElement('div');
        card.classList.add('experience-card');
        
        card.innerHTML = `
            <h3>${data.title}</h3>
            <h4>${data.company}</h4>
            <p>${data.date}</p>
            ${data.description}
        `;
        
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createExperienceCards);

function updateVisitorCount() {
    fetch('https://zapr2dk5t5.execute-api.us-east-1.amazonaws.com/deploy1/visitorcount')
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitor-count').textContent = data.count;
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    createTimelineItems();
    updateVisitorCount();
});