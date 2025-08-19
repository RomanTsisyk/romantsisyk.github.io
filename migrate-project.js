/**
 * Migration Script for Portfolio Projects
 * Адаптує існуючі проекти до нової навігаційної системи
 * 
 * Usage: node migrate-project.js [project-name]
 */

const fs = require('fs');
const path = require('path');

// Конфігурація проектів для міграції
const projectsToMigrate = [
    {
        source: 'earnly portfolio',
        target: 'earnly',
        name: 'Earnly',
        color: '#00C853',
        type: 'Finance Platform',
        description: 'Smart investment and savings platform'
    },
    {
        source: 'poly lens portfolio',
        target: 'poly-lens',
        name: 'Poly Lens',
        color: '#9C27B0',
        type: 'AI Vision App',
        description: 'Advanced image recognition and analysis'
    },
    {
        source: 'portfolio adapter',
        target: 'portfolio-adapter',
        name: 'Portfolio Adapter',
        color: '#FF9800',
        type: 'Developer Tool',
        description: 'Portfolio generation and management system'
    },
    {
        source: 'portfolio fels',
        target: 'fels',
        name: 'Fels',
        color: '#2196F3',
        type: 'E-commerce Platform',
        description: 'Modern online shopping experience'
    },
    {
        source: 'portfolio kasa stefczyka',
        target: 'kasa-stefczyka',
        name: 'Kasa Stefczyka',
        color: '#4CAF50',
        type: 'Banking App',
        description: 'Digital banking and financial services'
    }
];

// HTML шаблон для навігації
const navigationTemplate = `
    <!-- Global Styles -->
    <link rel="stylesheet" href="../../assets/css/variables.css">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/components.css">
    <link rel="stylesheet" href="../../assets/css/project-page.css">
`;

const scriptsTemplate = `
    <!-- Global Scripts -->
    <script src="../../assets/js/global.js"></script>
    <script src="../../assets/js/navigation.js"></script>
`;

// Функція для створення адаптованого HTML
function createAdaptedHTML(originalHTML, projectConfig) {
    let adapted = originalHTML;
    
    // Додаємо data-project атрибут до body
    adapted = adapted.replace(
        '<body>',
        `<body data-project="${projectConfig.target}">`
    );
    
    // Додаємо глобальні стилі після <title>
    const titleEnd = adapted.indexOf('</title>') + 8;
    adapted = adapted.slice(0, titleEnd) + '\n' + navigationTemplate + adapted.slice(titleEnd);
    
    // Додаємо project-specific CSS змінні
    const projectStyles = `
    <style>
        :root {
            --project-primary: ${projectConfig.color};
            --project-secondary: #FE6D33;
        }
    </style>
    `;
    
    const headEnd = adapted.indexOf('</head>');
    adapted = adapted.slice(0, headEnd) + projectStyles + adapted.slice(headEnd);
    
    // Додаємо коментар про навігацію після відкриття body
    const bodyStart = adapted.indexOf('<body');
    const bodyTagEnd = adapted.indexOf('>', bodyStart) + 1;
    adapted = adapted.slice(0, bodyTagEnd) + 
              '\n    <!-- Navigation will be injected by navigation.js -->\n' + 
              adapted.slice(bodyTagEnd);
    
    // Додаємо скрипти перед закриттям body
    const bodyEnd = adapted.lastIndexOf('</body>');
    adapted = adapted.slice(0, bodyEnd) + scriptsTemplate + '\n' + adapted.slice(bodyEnd);
    
    // Оновлюємо title
    adapted = adapted.replace(
        /<title>.*?<\/title>/,
        `<title>${projectConfig.name} - Portfolio Project</title>`
    );
    
    // Додаємо meta description
    const metaDescription = `<meta name="description" content="${projectConfig.description}">`;
    const charsetEnd = adapted.indexOf('charset="UTF-8">') + 16;
    adapted = adapted.slice(0, charsetEnd) + '\n    ' + metaDescription + adapted.slice(charsetEnd);
    
    return adapted;
}

// Функція для міграції одного проекту
function migrateProject(projectConfig) {
    console.log(`📦 Migrating ${projectConfig.name}...`);
    
    // Створюємо папку для проекту
    const targetDir = path.join('projects', projectConfig.target);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`  ✅ Created directory: ${targetDir}`);
    }
    
    // Копіюємо файли
    const sourceDir = projectConfig.source;
    if (fs.existsSync(sourceDir)) {
        const files = fs.readdirSync(sourceDir);
        
        files.forEach(file => {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            
            if (file === 'index.html') {
                // Адаптуємо HTML
                const originalHTML = fs.readFileSync(sourcePath, 'utf8');
                const adaptedHTML = createAdaptedHTML(originalHTML, projectConfig);
                fs.writeFileSync(targetPath, adaptedHTML);
                console.log(`  ✅ Adapted and copied: ${file}`);
            } else if (file.endsWith('.css') || file.endsWith('.js')) {
                // Копіюємо стилі та скрипти
                fs.copyFileSync(sourcePath, targetPath);
                console.log(`  ✅ Copied: ${file}`);
            }
        });
    } else {
        console.log(`  ⚠️  Source directory not found: ${sourceDir}`);
    }
    
    console.log(`  ✅ Migration complete for ${projectConfig.name}\n`);
}

// Головна функція
function main() {
    console.log('🚀 Starting Portfolio Migration\n');
    console.log('================================\n');
    
    // Перевіряємо чи існує папка projects
    if (!fs.existsSync('projects')) {
        fs.mkdirSync('projects');
        console.log('✅ Created projects directory\n');
    }
    
    // Отримуємо аргумент з командного рядка
    const projectName = process.argv[2];
    
    if (projectName) {
        // Мігруємо конкретний проект
        const project = projectsToMigrate.find(p => p.target === projectName);
        if (project) {
            migrateProject(project);
        } else {
            console.error(`❌ Project not found: ${projectName}`);
            console.log('\nAvailable projects:');
            projectsToMigrate.forEach(p => console.log(`  - ${p.target}`));
        }
    } else {
        // Мігруємо всі проекти
        console.log(`Found ${projectsToMigrate.length} projects to migrate\n`);
        
        projectsToMigrate.forEach(project => {
            migrateProject(project);
        });
        
        console.log('================================\n');
        console.log('✅ All projects migrated successfully!');
        console.log('\nNext steps:');
        console.log('1. Review the migrated files in the projects/ directory');
        console.log('2. Test navigation between projects');
        console.log('3. Customize content and styles as needed');
        console.log('4. Update links on the main portfolio page');
    }
}

// Запускаємо міграцію
main();