const fs = require('fs');
const path = require('path');

// Конфігурація проектів для міграції
const projects = [
    { 
        oldPath: 'earnly portfolio',
        newPath: 'projects/earnly',
        name: 'Earnly',
        description: 'Smart financial management platform',
        type: 'FinTech App',
        color: '#00C853',
        techStack: ['React Native', 'Node.js', 'MongoDB', 'Stripe API', 'Chart.js', 'Redux'],
        github: 'https://github.com/yourusername/earnly',
        demo: 'https://earnly.app'
    },
    {
        oldPath: 'poly lens portfolio',
        newPath: 'projects/poly-lens',
        name: 'Poly Lens',
        description: 'AR-powered language learning application',
        type: 'EdTech Platform',
        color: '#9C27B0',
        techStack: ['Unity', 'ARCore', 'C#', 'Firebase', 'TensorFlow', 'Google Cloud'],
        github: 'https://github.com/yourusername/poly-lens',
        demo: 'https://poly-lens.app'
    },
    {
        oldPath: 'job-recruiter-portfolio.html',
        newPath: 'projects/job-recruiter',
        name: 'Job Recruiter',
        description: 'AI-powered recruitment and talent matching platform',
        type: 'HR Tech',
        color: '#FF5722',
        techStack: ['React', 'Python', 'Django', 'PostgreSQL', 'OpenAI API', 'Docker'],
        github: 'https://github.com/yourusername/job-recruiter',
        demo: 'https://jobrecruiter.ai',
        isSingleFile: true
    },
    {
        oldPath: 'portfolio adapter',
        newPath: 'projects/portfolio-adapter',
        name: 'Portfolio Adapter',
        description: 'Dynamic portfolio generator with multiple themes',
        type: 'Developer Tool',
        color: '#FF9800',
        techStack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Vercel'],
        github: 'https://github.com/yourusername/portfolio-adapter',
        demo: 'https://portfolio-adapter.dev'
    },
    {
        oldPath: 'portfolio fels',
        newPath: 'projects/fels',
        name: 'Fels',
        description: 'Modern e-commerce platform for fashion brands',
        type: 'E-Commerce',
        color: '#2196F3',
        techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'AWS'],
        github: 'https://github.com/yourusername/fels',
        demo: 'https://fels.store'
    },
    {
        oldPath: 'portfolio kasa stefczyka',
        newPath: 'projects/kasa-stefczyka',
        name: 'Kasa Stefczyka',
        description: 'Digital banking solution for credit unions',
        type: 'Banking Platform',
        color: '#4CAF50',
        techStack: ['Angular', 'Java', 'Spring Boot', 'Oracle DB', 'Kubernetes', 'Azure'],
        github: 'https://github.com/yourusername/kasa-stefczyka',
        demo: 'https://kasa-stefczyka.pl'
    }
];

// HTML template для адаптації проектів
function generateAdaptedHTML(project, originalContent) {
    // Витягуємо оригінальний контент між <body> тегами
    const bodyMatch = originalContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : originalContent;
    
    // Видаляємо старі скрипти навігації якщо є
    const cleanedContent = bodyContent
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<link[^>]*navigation[^>]*>/gi, '');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name} - Portfolio Project</title>
    <meta name="description" content="${project.description}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🚀%3C/text%3E%3C/svg%3E">
    
    <!-- Global Styles -->
    <link rel="stylesheet" href="../../assets/css/variables.css">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/components.css">
    <link rel="stylesheet" href="../../assets/css/project-page.css">
    
    <!-- Original Project Styles -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Project Color Theme -->
    <style>
        :root {
            --project-primary: ${project.color};
            --project-current: ${project.name.toLowerCase().replace(/\s+/g, '-')};
        }
        
        /* Preserve original animations */
        .gradient-orb, .floating-element {
            animation-play-state: running !important;
        }
    </style>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body data-project="${project.name.toLowerCase().replace(/\s+/g, '-')}">
    <!-- Navigation will be injected by JavaScript -->
    
    <!-- Original Content -->
    ${cleanedContent}
    
    <!-- Navigation Scripts -->
    <script src="../../assets/js/navigation.js"></script>
    <script src="../../assets/js/global.js"></script>
    
    <!-- Original Project Scripts -->
    <script src="script.js"></script>
    
    <!-- Smooth transitions -->
    <script>
        // Page load animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
        
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    </script>
</body>
</html>`;
}

// Функція для створення проекту з single HTML файлу
function createProjectFromSingleFile(project) {
    const htmlContent = fs.readFileSync(project.oldPath, 'utf8');
    
    // Створюємо папку проекту
    const projectDir = project.newPath;
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }
    
    // Витягуємо стилі
    const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    let styles = '';
    if (styleMatch) {
        styleMatch.forEach(match => {
            const content = match.replace(/<\/?style[^>]*>/gi, '');
            styles += content + '\n';
        });
    }
    
    // Зберігаємо стилі
    fs.writeFileSync(path.join(projectDir, 'styles.css'), styles);
    
    // Зберігаємо адаптований HTML
    const adaptedHTML = generateAdaptedHTML(project, htmlContent);
    fs.writeFileSync(path.join(projectDir, 'index.html'), adaptedHTML);
    
    // Створюємо порожній script.js якщо потрібно
    if (!fs.existsSync(path.join(projectDir, 'script.js'))) {
        fs.writeFileSync(path.join(projectDir, 'script.js'), '// Project specific scripts\n');
    }
    
    console.log(`✅ Migrated single file: ${project.name}`);
}

// Функція для міграції проекту
function migrateProject(project) {
    try {
        // Якщо це single HTML файл
        if (project.isSingleFile) {
            createProjectFromSingleFile(project);
            return;
        }
        
        // Перевіряємо чи існує стара папка
        if (!fs.existsSync(project.oldPath)) {
            console.log(`⚠️ Skipping ${project.name} - folder not found`);
            return;
        }
        
        // Створюємо нову папку якщо не існує
        const newDir = project.newPath;
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }
        
        // Копіюємо файли
        const files = fs.readdirSync(project.oldPath);
        files.forEach(file => {
            const oldFile = path.join(project.oldPath, file);
            const newFile = path.join(newDir, file);
            
            if (file === 'index.html') {
                // Адаптуємо HTML файл
                const content = fs.readFileSync(oldFile, 'utf8');
                const adaptedContent = generateAdaptedHTML(project, content);
                fs.writeFileSync(newFile, adaptedContent);
            } else {
                // Копіюємо інші файли
                if (fs.lstatSync(oldFile).isFile()) {
                    fs.copyFileSync(oldFile, newFile);
                }
            }
        });
        
        console.log(`✅ Migrated: ${project.name} to ${project.newPath}`);
        
    } catch (error) {
        console.error(`❌ Error migrating ${project.name}:`, error.message);
    }
}

// Оновлюємо navigation.js з правильним списком проектів
function updateNavigationJS() {
    const navigationPath = 'assets/js/navigation.js';
    let content = fs.readFileSync(navigationPath, 'utf8');
    
    // Оновлюємо масив проектів
    const projectsArray = projects.map(p => {
        const id = p.name.toLowerCase().replace(/\s+/g, '-');
        const path = p.newPath.replace('projects/', '');
        return `            { id: '${id}', name: '${p.name}', path: '${path}', color: '${p.color}' }`;
    }).join(',\n');
    
    // Додаємо Netti на початок (вже мігрований)
    const fullProjectsArray = `            { id: 'netti', name: 'Netti', path: 'netti', color: '#007AFF' },\n${projectsArray}`;
    
    // Замінюємо масив проектів
    content = content.replace(
        /this\.projects = \[[\s\S]*?\];/,
        `this.projects = [\n${fullProjectsArray}\n        ];`
    );
    
    fs.writeFileSync(navigationPath, content);
    console.log('✅ Updated navigation.js with all projects');
}

// Переносимо головну сторінку
function moveMainPortfolio() {
    if (fs.existsSync('main-portfolio/index.html')) {
        const content = fs.readFileSync('main-portfolio/index.html', 'utf8');
        
        // Оновлюємо шляхи до проектів
        let updatedContent = content
            .replace(/href="[^"]*netti[^"]*"/g, 'href="projects/netti/"')
            .replace(/href="[^"]*earnly[^"]*"/g, 'href="projects/earnly/"')
            .replace(/href="[^"]*poly[^"]*lens[^"]*"/g, 'href="projects/poly-lens/"')
            .replace(/href="[^"]*job[^"]*recruiter[^"]*"/g, 'href="projects/job-recruiter/"')
            .replace(/href="[^"]*portfolio[^"]*adapter[^"]*"/g, 'href="projects/portfolio-adapter/"')
            .replace(/href="[^"]*fels[^"]*"/g, 'href="projects/fels/"')
            .replace(/href="[^"]*kasa[^"]*stefczyka[^"]*"/g, 'href="projects/kasa-stefczyka/"');
        
        // Копіюємо стилі та скрипти
        if (fs.existsSync('main-portfolio/global.css')) {
            fs.copyFileSync('main-portfolio/global.css', 'assets/css/main.css');
            updatedContent = updatedContent.replace('global.css', 'assets/css/main.css');
        }
        
        if (fs.existsSync('main-portfolio/global.js')) {
            fs.copyFileSync('main-portfolio/global.js', 'assets/js/main.js');
            updatedContent = updatedContent.replace('global.js', 'assets/js/main.js');
        }
        
        fs.writeFileSync('index.html', updatedContent);
        console.log('✅ Moved main portfolio to root');
    }
}

// Виконуємо міграцію
console.log('🚀 Starting portfolio migration...\n');

// 1. Переносимо головну сторінку
moveMainPortfolio();

// 2. Мігруємо всі проекти
projects.forEach(migrateProject);

// 3. Оновлюємо navigation.js
updateNavigationJS();

// 4. Створюємо README для projects папки
const projectsReadme = `# Portfolio Projects

## Structure
Each project follows the same structure:
- \`index.html\` - Main project page with navigation
- \`styles.css\` - Project-specific styles
- \`script.js\` - Project-specific JavaScript

## Navigation
All projects include unified navigation system:
- Header with project switcher
- Bottom navigation (prev/next)
- Keyboard shortcuts (Ctrl + arrows)
- Mobile swipe gestures

## Projects List
${projects.map(p => `- **${p.name}** - ${p.description}`).join('\n')}
`;

fs.writeFileSync('projects/README.md', projectsReadme);

console.log('\n✅ Migration complete!');
console.log('📝 Next steps:');
console.log('1. Run: npm install -g http-server');
console.log('2. Run: http-server -p 8080');
console.log('3. Open: http://localhost:8080');
console.log('4. Test navigation between projects');
