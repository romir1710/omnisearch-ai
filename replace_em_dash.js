const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.push('./README.md');

let totalReplaced = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('—')) {
        const count = (content.match(/—/g) || []).length;
        content = content.replace(/—/g, '-');
        fs.writeFileSync(file, content);
        totalReplaced += count;
        console.log(`Replaced ${count} occurrences in ${file}`);
    }
});

console.log(`Total occurrences replaced: ${totalReplaced}`);
