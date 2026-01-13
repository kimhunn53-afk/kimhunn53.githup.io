const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testResumeWebsite() {
    console.log('Starting Playwright test for Resume Website...');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const errors = [];
    const warnings = [];
    
    // Collect console messages
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(`Console Error: ${msg.text()}`);
        } else if (msg.type() === 'warning') {
            warnings.push(`Console Warning: ${msg.text()}`);
        } else {
            console.log(`Console [${msg.type()}]: ${msg.text()}`);
        }
    });
    
    // Collect page errors
    page.on('pageerror', err => {
        errors.push(`Page Error: ${err.message}`);
    });
    
    try {
        // Navigate to the HTML file
        const htmlPath = path.join(__dirname, 'index.html');
        const fileUrl = `file://${htmlPath}`;
        
        console.log(`Loading: ${fileUrl}`);
        await page.goto(fileUrl, { waitUntil: 'networkidle' });
        
        // Wait for content to load
        await page.waitForTimeout(1000);
        
        // Check if key elements exist
        const checks = [
            { selector: '.navbar', name: 'Navigation bar' },
            { selector: '.hero', name: 'Hero section' },
            { selector: '#about', name: 'About section' },
            { selector: '#experience', name: 'Experience section' },
            { selector: '#education', name: 'Education section' },
            { selector: '#skills', name: 'Skills section' },
            { selector: '#contact', name: 'Contact section' },
            { selector: '.footer', name: 'Footer' }
        ];
        
        console.log('\n--- Element Checks ---');
        for (const check of checks) {
            const element = await page.$(check.selector);
            if (element) {
                console.log(`✓ ${check.name} found`);
            } else {
                errors.push(`Missing element: ${check.name} (${check.selector})`);
            }
        }
        
        // Check page title
        const title = await page.title();
        console.log(`\nPage Title: ${title}`);
        
        // Check responsive meta tag
        const viewportMeta = await page.$('meta[name="viewport"]');
        if (viewportMeta) {
            console.log('✓ Viewport meta tag found (responsive)');
        } else {
            errors.push('Missing viewport meta tag');
        }
        
        // Check CSS file link
        const cssLink = await page.$('link[href="style.css"]');
        if (cssLink) {
            console.log('✓ CSS file linked correctly');
        } else {
            errors.push('CSS file not linked');
        }
        
        // Check JS file link
        const jsLink = await page.$('script[src="script.js"]');
        if (jsLink) {
            console.log('✓ JavaScript file linked correctly');
        } else {
            errors.push('JavaScript file not linked');
        }
        
        // Check Google Fonts
        const fontsLink = await page.$('link[href*="fonts.googleapis"]');
        if (fontsLink) {
            console.log('✓ Google Fonts linked');
        }
        
        // Test navigation links
        console.log('\n--- Navigation Test ---');
        const navLinks = await page.$$('.nav-links a');
        console.log(`Found ${navLinks.length} navigation links`);
        
        // Test smooth scroll on mobile menu
        const hamburger = await page.$('.hamburger');
        if (hamburger) {
            console.log('✓ Mobile hamburger menu present');
        }
        
        // Report results
        console.log('\n========================================');
        console.log('TEST RESULTS');
        console.log('========================================');
        
        if (errors.length === 0) {
            console.log('✓ All tests passed! No errors found.');
        } else {
            console.log(`✗ Found ${errors.length} error(s):`);
            errors.forEach(err => console.log(`  - ${err}`));
        }
        
        if (warnings.length > 0) {
            console.log(`\nWarnings (${warnings.length}):`);
            warnings.forEach(warn => console.log(`  - ${warn}`));
        }
        
        // Get page structure info
        const htmlContent = await page.content();
        const sections = (htmlContent.match(/<section/g) || []).length;
        console.log(`\n--- Page Statistics ---`);
        console.log(`Total sections: ${sections}`);
        
        const totalLinks = (htmlContent.match(/<a /g) || []).length;
        console.log(`Total links: ${totalLinks}`);
        
        const totalButtons = (htmlContent.match(/class="btn/g) || []).length;
        console.log(`Total buttons: ${totalButtons}`);
        
    } catch (err) {
        console.error('Test failed with error:', err.message);
        errors.push(`Test execution error: ${err.message}`);
    } finally {
        await browser.close();
    }
    
    // Exit with appropriate code
    if (errors.length > 0) {
        console.log('\n✗ Test FAILED');
        process.exit(1);
    } else {
        console.log('\n✓ Test PASSED');
        process.exit(0);
    }
}

testResumeWebsite().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
