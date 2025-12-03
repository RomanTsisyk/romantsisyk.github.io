const fs = require('fs');
const path = require('path');

// Mapping of old folder names to new standardized names
const folderMapping = {
    'netti portfolio-demo': 'netti',
    'poly lens portfolio': 'poly-lens', 
    'earnly portfolio': 'earnly',
    'portfolio kasa stefczyka': 'kasa-stefczyka',
    'portfolio-adapter': 'mercedes-adapter',
    'followmymoney-portfolio': 'followmymoney',
    'portfolio fels': 'fels'
};

const projectsDir = path.join(__dirname, 'projects');

// Rename folders
Object.entries(folderMapping).forEach(([oldName, newName]) => {
    const oldPath = path.join(projectsDir, oldName);
    const newPath = path.join(projectsDir, newName);
    
    if (fs.existsSync(oldPath)) {
        try {
            fs.renameSync(oldPath, newPath);
            console.log(`✅ Renamed: ${oldName} → ${newName}`);
        } catch (error) {
            console.error(`❌ Error renaming ${oldName}:`, error.message);
        }
    } else {
        console.log(`⚠️ Folder not found: ${oldName}`);
    }
});

console.log('\n📁 Folder renaming complete!');
