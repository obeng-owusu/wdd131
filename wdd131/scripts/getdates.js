// Dynamic copyright year
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Last modified date
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}

// Additional console log for debugging
console.log('WDD131 Page Loaded Successfully');
console.log(`Current Year: ${new Date().getFullYear()}`);
console.log(`Last Modified: ${document.lastModified}`);