// Diagnostic script to check page layout
// Run this in browser console: node check-layout.js

console.log('=== Page Layout Diagnostic ===\n');

// Check Hero section
const hero = document.querySelector('#hero');
if (hero) {
    const heroStyles = window.getComputedStyle(hero);
    console.log('Hero Section:');
    console.log('- Position:', heroStyles.position);
    console.log('- Z-Index:', heroStyles.zIndex);
    console.log('- Height:', heroStyles.height);
    console.log('- Overflow:', heroStyles.overflow);
    console.log('- Background:', heroStyles.backgroundColor);
    console.log('');
}

// Check all sections
const sections = document.querySelectorAll('section');
console.log(`Total sections found: ${sections.length}\n`);

sections.forEach((section, index) => {
    const id = section.getAttribute('id') || `section-${index}`;
    const styles = window.getComputedStyle(section);
    const rect = section.getBoundingClientRect();

    console.log(`Section: ${id}`);
    console.log(`- Position: ${styles.position}`);
    console.log(`- Z-Index: ${styles.zIndex}`);
    console.log(`- Top: ${rect.top}px`);
    console.log(`- Visible: ${rect.top < window.innerHeight && rect.bottom > 0}`);
    console.log('');
});

// Check for overlapping elements
console.log('=== Checking for overlays ===');
const absoluteElements = document.querySelectorAll('[class*="absolute"]');
console.log(`Found ${absoluteElements.length} elements with absolute positioning`);
