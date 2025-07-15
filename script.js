document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js for cosmic background
    initStarBackground();
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 2rem';
            navbar.style.background = 'rgba(12, 12, 25, 0.95)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.background = 'rgba(12, 12, 25, 0.9)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.project-card, .skill-category, .achievement-item, .education-item, .interest-item').forEach(element => {
        observer.observe(element);
    });
});

// Three.js cosmic background
function initStarBackground() {
    const container = document.getElementById('stars-container');
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Add larger glowing stars
    const largeStarsMaterial = new THREE.PointsMaterial({
        color: 0xa970ff,
        size: 4,
        transparent: true
    });
    
    const largeStarsVertices = [];
    for (let i = 0; i < 100; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        largeStarsVertices.push(x, y, z);
    }
    
    const largeStarsGeometry = new THREE.BufferGeometry();
    largeStarsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(largeStarsVertices, 3));
    const largeStars = new THREE.Points(largeStarsGeometry, largeStarsMaterial);
    scene.add(largeStars);
    
    // Add nebula effect
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaMaterial = new THREE.PointsMaterial({
        color: 0x8e44ad,
        size: 6,
        transparent: true,
        opacity: 0.4
    });
    
    const nebulaVertices = [];
    for (let i = 0; i < 200; i++) {
        const x = (Math.random() - 0.5) * 1500;
        const y = (Math.random() - 0.5) * 1500;
        const z = -Math.random() * 1500;
        nebulaVertices.push(x, y, z);
    }
    
    nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
    
    camera.position.z = 1;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate stars
        stars.rotation.x += 0.0003;
        stars.rotation.y += 0.0002;
        
        // Rotate large stars
        largeStars.rotation.x -= 0.0002;
        largeStars.rotation.y += 0.0001;
        
        // Rotate nebula
        nebula.rotation.x -= 0.0001;
        nebula.rotation.y += 0.0002;
        
        renderer.render(scene, camera);
    }
    
    animate();
}