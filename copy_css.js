const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\HP\\Desktop\\shefinaware\\she.html', 'utf8');
const styleMatch = html.match(/<style>\s*([\s\S]*?)\s*<\/style>/);
if (styleMatch) {
  fs.writeFileSync('c:\\Users\\HP\\Desktop\\shefinaware\\frontend\\src\\app\\globals.css', styleMatch[1]);
  console.log('Extracted CSS successfully');
} else {
  console.log('No style tag found');
}
