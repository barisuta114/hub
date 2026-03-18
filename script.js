document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // Apply staggered entrance animation class by observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize 3D Tilt Effect and Colors
    cards.forEach(card => {
        // Set bespoke color variables for hover states
        const color = card.getAttribute('data-color');
        card.style.setProperty('--hover-color', color);
        
        // Setup glow color to match
        const glow = card.querySelector('.card-glow');
        glow.style.background = `radial-gradient(circle at center, ${color}33 0%, transparent 60%)`;

        // Intersection Observer
        observer.observe(card);

        // 3D Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation values (max rotation 10deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Adjust glow position
            glow.style.left = `${(x / rect.width) * 100}%`;
            glow.style.top = `${(y / rect.height) * 100}%`;
            glow.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            glow.style.transform = 'translate(-50%, -50%) scale(0)';
            glow.style.left = '50%';
            glow.style.top = '50%';
            
            // Reapply visible animation instantly so it doesn't pop
            card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseenter', () => {
            // Remove transition for instant mouse tracking
            card.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
        });
    });
});
