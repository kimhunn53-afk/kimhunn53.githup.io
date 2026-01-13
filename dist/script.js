// ===================================
// JavaScript for Resume Website
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    // Scroll Animation using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sectionsArray = Array.from(sections);
    const navLinksArray = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sectionsArray.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add stagger animation to skill badges
    const skillBadges = document.querySelectorAll('.skill-badges .badge, .timeline-tags span');
    skillBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.05}s`;
    });

    // Add animation to interest cards
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Typing effect for job title (optional enhancement)
    const jobTitle = document.querySelector('.job-title');
    if (jobTitle) {
        const originalText = jobTitle.textContent;
        jobTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                jobTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }

    // Counter animation for stats (if added in future)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-marker').style.transform = 'scale(1.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-marker').style.transform = 'scale(1)';
        });
    });

    // Parallax effect for hero section (subtle)
    const hero = document.querySelector('.hero');
    const profileContainer = document.querySelector('.profile-container');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            profileContainer.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });

    // Add click to copy email functionality
    const emailLink = document.querySelector('.hero-social a[href="mailto:kimhunn53@gmail.com"], .footer-social a[href="mailto:kimhunn53@gmail.com"]');
    const contactEmail = document.querySelector('.contact-item a[href="mailto:kimhunn53@gmail.com"]');
    
    [emailLink, contactEmail].forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                // You can add a toast notification here
                console.log('Email copied or mail client opened');
            });
        }
    });

    // Console log for verification
    console.log('Nuttapon Kimhun - Resume Website Loaded Successfully');
    console.log('Designed for Software Tester Position');
});
