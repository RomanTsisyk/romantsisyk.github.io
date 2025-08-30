// Script to add navigation instructions for all remaining projects
const projects = [
    {
        folder: 'followmymoney-portfolio',
        name: 'FollowMyMoney',
        icon: '📊',
        desc: 'Expense Tracking'
    },
    {
        folder: 'portfolio fels',
        name: 'Fels',
        icon: '🏢',
        desc: 'Business Solutions'
    },
    {
        folder: 'portfolio adapter',
        name: 'Adapter',
        icon: '🔌',
        desc: 'Integration Platform'
    },
    {
        folder: 'netti portfolio-demo',
        name: 'Netti Demo',
        icon: '📱',
        desc: 'App Portfolio Demo'
    }
];

// Instructions for each project
projects.forEach(project => {
    console.log(`
    ===============================
    PROJECT: ${project.name}
    FOLDER: ${project.folder}
    ===============================
    
    1. Add navigation styles before </head>
    2. Add HTML after <body> with current project:
       <div class="project-nav-item current">
           <span class="icon">${project.icon}</span>
           <span class="text">
               <span class="name">${project.name}</span>
               <span class="desc">${project.desc}</span>
           </span>
           <span class="current-indicator">CURRENT</span>
       </div>
    
    3. Add JavaScript before </body>
    `);
});

console.log('Total projects to update:', projects.length);