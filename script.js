document.addEventListener('DOMContentLoaded', () => {
    class Ball {
        constructor(container) {
            this.element = document.createElement('div');
            this.element.className = 'ball';
            
            // Increased random size variation between 8 and 60 pixels
            this.size = Math.random() * 52 + 8;
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            
            // Even more vibrant colors with dynamic transparency and color shifting
            this.hue = Math.random() * 360;
            this.hueChange = (Math.random() - 0.5) * 2;
            this.saturation = Math.random() * 30 + 70; // 70-100%
            this.lightness = Math.random() * 30 + 35;  // 35-65%
            this.alpha = Math.random() * 0.5 + 0.2;    // 0.2-0.7
            this.updateColor();
            
            // Random starting position with offset from edges
            const margin = this.size * 2;
            this.x = margin + Math.random() * (window.innerWidth - margin * 2);
            this.y = margin + Math.random() * (window.innerHeight - margin * 2);
            
            // More varied velocity with random direction changes
            this.vx = (Math.random() - 0.5) * 12;  // Increased speed range
            this.vy = (Math.random() - 0.5) * 12;
            this.acceleration = 0.2;
            this.maxSpeed = 15;
            
            // Enhanced rotation with dynamic speed changes
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 6;
            this.rotationAccel = (Math.random() - 0.5) * 0.1;
            
            // Enhanced pulsing effect
            this.scale = 1;
            this.scaleSpeed = (Math.random() - 0.5) * 0.03;
            this.minScale = 0.7;
            this.maxScale = 1.3;
            
            // Add mouse interaction properties
            this.mouseDistance = 0;
            this.mouseRepelStrength = 5;
            this.mouseRepelRadius = 150;
            
            container.appendChild(this.element);
        }
        
        updateColor() {
            // Shift color gradually
            this.hue = (this.hue + this.hueChange) % 360;
            this.element.style.backgroundColor = 
                `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
        }
        
        handleMouseInteraction(mouseX, mouseY) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            this.mouseDistance = Math.sqrt(dx * dx + dy * dy);
            
            if (this.mouseDistance < this.mouseRepelRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouseRepelRadius - this.mouseDistance) / this.mouseRepelRadius;
                this.vx += Math.cos(angle) * force * this.mouseRepelStrength;
                this.vy += Math.sin(angle) * force * this.mouseRepelStrength;
            }
        }
        
        update(mouseX, mouseY) {
            // Handle mouse interaction
            if (mouseX !== undefined && mouseY !== undefined) {
                this.handleMouseInteraction(mouseX, mouseY);
            }
            
            // Apply velocity with dynamic acceleration
            this.vx += (Math.random() - 0.5) * this.acceleration;
            this.vy += (Math.random() - 0.5) * this.acceleration;
            
            // Limit maximum speed
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > this.maxSpeed) {
                this.vx = (this.vx / speed) * this.maxSpeed;
                this.vy = (this.vy / speed) * this.maxSpeed;
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Enhanced bounce behavior with energy preservation
            if (this.x < 0 || this.x > window.innerWidth) {
                this.vx *= -0.8; // Lose some energy on bounce
                this.vy *= 0.95; // Slight friction
                this.x = Math.max(0, Math.min(this.x, window.innerWidth));
                this.rotationSpeed += (Math.random() - 0.5) * 2;
            }
            if (this.y < 0 || this.y > window.innerHeight) {
                this.vy *= -0.8; // Lose some energy on bounce
                this.vx *= 0.95; // Slight friction
                this.y = Math.max(0, Math.min(this.y, window.innerHeight));
                this.rotationSpeed += (Math.random() - 0.5) * 2;
            }
            
            // Update rotation with acceleration
            this.rotationSpeed += this.rotationAccel;
            this.rotationSpeed = Math.max(Math.min(this.rotationSpeed, 8), -8);
            this.rotation += this.rotationSpeed;
            
            // Update scale (pulsing effect)
            this.scale += this.scaleSpeed;
            if (this.scale > this.maxScale || this.scale < this.minScale) {
                this.scaleSpeed *= -1;
                this.scaleSpeed += (Math.random() - 0.5) * 0.01;
            }
            
            // Update color
            this.updateColor();
            
            // Apply all transforms
            this.element.style.transform = `
                translate(${this.x}px, ${this.y}px)
                rotate(${this.rotation}deg)
                scale(${this.scale})
            `;
        }
    }

    // Initialize Navigation Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Initialize Balls Animation
    const container = document.querySelector('.ball-container');
    if (container) {
        // Create balls for animation
        const balls = Array.from({ length: 75 }, () => new Ball(container));
        
        // Track mouse position
        let mouseX, mouseY;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Single animation function
        function animate() {
            balls.forEach(ball => ball.update(mouseX, mouseY));
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Enhanced window resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                balls.forEach(ball => {
                    if (ball.x > window.innerWidth) ball.x = window.innerWidth - ball.size;
                    if (ball.y > window.innerHeight) ball.y = window.innerHeight - ball.size;
                });
            }, 250);
        });
    }

    // Hamburger Menu Toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }

    // Mobile Dropdown Handlers
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownLink && dropdownContent) {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Dropdown Content Link Handlers
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Handle internal links
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu
                    hamburger.classList.remove('open');
                    navLinks.classList.remove('active');
                    
                    // Close all dropdowns
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Close mobile menu for all link types
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Outside Click Handler
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});