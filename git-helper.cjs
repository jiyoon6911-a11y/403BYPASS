const { execSync } = require('child_process');
const fs = require('fs');

try {
  const content = execSync('git show HEAD:src/App.tsx', { encoding: 'utf8' });
  fs.writeFileSync('src/App_backup.tsx', content);
  console.log('Success - wrote App_backup.tsx');
} catch (e) {
  console.error('Error running git show:', e.message);
}
