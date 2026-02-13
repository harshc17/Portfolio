/* ===== PORTFOLIO JAVASCRIPT — Premium Cinematic Edition ===== */
(function () {
    'use strict';

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initGSAP();
        }, 2400);
    });
    document.body.style.overflow = 'hidden';

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ===== ENHANCED CURSOR =====
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');
    let mx = 0, my = 0, gx = 0, gy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (cursorDot) { cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px'; }
    });

    (function animCursor() {
        gx += (mx - gx) * 0.06;
        gy += (my - gy) * 0.06;
        if (cursorGlow) { cursorGlow.style.left = gx + 'px'; cursorGlow.style.top = gy + 'px'; }
        requestAnimationFrame(animCursor);
    })();

    // Cursor scale on interactive elements
    document.addEventListener('DOMContentLoaded', () => {
        const interactives = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-card, .tech-chip, .lang-chip');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
                if (cursorGlow) cursorGlow.style.opacity = '0.7';
            });
            el.addEventListener('mouseleave', () => {
                if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                if (cursorGlow) cursorGlow.style.opacity = '1';
            });
        });
    });

    // ===== MAGNETIC BUTTONS =====
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.btn, .social-icon, .theme-toggle');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    });

    // ===== NAVBAR =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkEls = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinkEls.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });
    sections.forEach(s => navObserver.observe(s));

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (hamburger) { hamburger.classList.remove('active'); navLinks.classList.remove('active'); }
        });
    });

    // ===== TYPEWRITER =====
    const typewriterEl = document.getElementById('typewriter');
    const roles = ['Scalable Systems', 'Full Stack Applications', 'AI-Driven Products', 'MERN Stack Solutions', 'Production-Grade Software'];
    let ri = 0, ci = 0, deleting = false;

    function typewrite() {
        if (!typewriterEl) return;
        const word = roles[ri];
        typewriterEl.textContent = deleting ? word.substring(0, ci - 1) : word.substring(0, ci + 1);
        ci = deleting ? ci - 1 : ci + 1;
        let speed = deleting ? 35 : 70;
        if (!deleting && ci === word.length) { speed = 2200; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; speed = 400; }
        setTimeout(typewrite, speed);
    }
    typewrite();

    // ===== THREE.JS — ENHANCED PARTICLE FIELD =====
    function initThreeJS() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 60;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // === Enhanced particle system (multi-color, more particles) ===
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 200 : 500; // Reduced for mobile performance
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const palette = [
            { r: 59 / 255, g: 130 / 255, b: 246 / 255 },    // blue #3b82f6
            { r: 96 / 255, g: 165 / 255, b: 250 / 255 },    // light blue #60a5fa
            { r: 147 / 255, g: 197 / 255, b: 253 / 255 },   // pale blue #93c5fd
            { r: 37 / 255, g: 99 / 255, b: 235 / 255 },     // deep blue #2563eb
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles wider on mobile to cover taller screen
            pos[i3] = (Math.random() - 0.5) * (isMobile ? 120 : 180);
            pos[i3 + 1] = (Math.random() - 0.5) * (isMobile ? 180 : 130);
            pos[i3 + 2] = (Math.random() - 0.5) * 100;
            vel[i3] = (Math.random() - 0.5) * 0.008;
            vel[i3 + 1] = (Math.random() - 0.5) * 0.008;
            vel[i3 + 2] = (Math.random() - 0.5) * 0.004;

            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i3] = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({
            size: 0.4,
            transparent: true,
            opacity: 0.35,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });
        const particles = new THREE.Points(geo, mat);
        scene.add(particles);

        // === Connection lines (constellation effect) ===
        const lineGeo = new THREE.BufferGeometry();
        const maxLines = isMobile ? 100 : 300;
        const linePositions = new Float32Array(maxLines * 6);
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeo.setDrawRange(0, 0);

        const lineMat = new THREE.LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.06,
            blending: THREE.AdditiveBlending
        });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(lines);

        // === Floating geometric shapes ===
        const shapeMat1 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.04 });
        const shapeMat2 = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.035 });
        const shapeMat3 = new THREE.MeshBasicMaterial({ color: 0x93c5fd, wireframe: true, transparent: true, opacity: 0.03 });

        const shape1 = new THREE.Mesh(new THREE.IcosahedronGeometry(6, 1), shapeMat1);
        shape1.position.set(25, -8, -15);
        scene.add(shape1);

        const shape2 = new THREE.Mesh(new THREE.OctahedronGeometry(4, 0), shapeMat2);
        shape2.position.set(-30, 10, -10);
        scene.add(shape2);

        const shape3 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.8, 8, 16), shapeMat3);
        shape3.position.set(10, 20, -20);
        scene.add(shape3);

        // Mouse tracking for camera + particle repulsion
        let mouseX = 0, mouseY = 0;
        let tRx = 0, tRy = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            tRx = mouseY * 0.08;
            tRy = mouseX * 0.08;
        });

        function animate() {
            requestAnimationFrame(animate);
            const p = particles.geometry.attributes.position.array;

            // Move particles
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                p[i3] += vel[i3];
                p[i3 + 1] += vel[i3 + 1];
                p[i3 + 2] += vel[i3 + 2];
                if (Math.abs(p[i3]) > 90) vel[i3] *= -1;
                if (Math.abs(p[i3 + 1]) > 65) vel[i3 + 1] *= -1;
                if (Math.abs(p[i3 + 2]) > 50) vel[i3 + 2] *= -1;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Connection lines between nearby particles
            let lineIdx = 0;
            const lp = lines.geometry.attributes.position.array;
            const threshold = 18;
            for (let i = 0; i < count && lineIdx < maxLines; i++) {
                for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
                    const dx = p[i * 3] - p[j * 3];
                    const dy = p[i * 3 + 1] - p[j * 3 + 1];
                    const dz = p[i * 3 + 2] - p[j * 3 + 2];
                    const dist = dx * dx + dy * dy + dz * dz;
                    if (dist < threshold * threshold) {
                        const li = lineIdx * 6;
                        lp[li] = p[i * 3]; lp[li + 1] = p[i * 3 + 1]; lp[li + 2] = p[i * 3 + 2];
                        lp[li + 3] = p[j * 3]; lp[li + 4] = p[j * 3 + 1]; lp[li + 5] = p[j * 3 + 2];
                        lineIdx++;
                    }
                }
            }
            lines.geometry.setDrawRange(0, lineIdx * 2);
            lines.geometry.attributes.position.needsUpdate = true;

            // Camera follows mouse
            particles.rotation.x += (tRx - particles.rotation.x) * 0.01;
            particles.rotation.y += (tRy - particles.rotation.y) * 0.01;

            // Rotate shapes
            shape1.rotation.x += 0.002; shape1.rotation.y += 0.003;
            shape2.rotation.x -= 0.0015; shape2.rotation.y += 0.002;
            shape3.rotation.x += 0.001; shape3.rotation.z += 0.002;

            // Subtle camera parallax
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.01;
            camera.position.y += (-mouseY * 2 - camera.position.y) * 0.01;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    initThreeJS();

    // ===== GSAP ANIMATIONS =====
    function initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance — staggered cinematic reveal
        const heroTL = gsap.timeline({ delay: 0.2 });
        heroTL.from('.hero-photo-wrapper', { opacity: 0, scale: 0.7, duration: 1, ease: 'back.out(1.3)' })
            .from('.hero-name', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .from('.hero-title', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4')
            .from('.hero-description', { opacity: 0, y: 25, duration: 0.7, ease: 'power3.out' }, '-=0.3')
            .from('.hero-buttons', { opacity: 0, y: 25, duration: 0.6, ease: 'power3.out' }, '-=0.2')
            .from('.hero-social', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.2')
            .from('.float-card', { opacity: 0, scale: 0.3, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, '-=0.3')
            .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2');

        // Section headers — fade up with blur
        gsap.utils.toArray('.section-header').forEach(h => {
            gsap.from(h, {
                scrollTrigger: { trigger: h, start: 'top 85%' },
                opacity: 0, y: 50, filter: 'blur(8px)', duration: 0.8, ease: 'power3.out'
            });
        });

        // About
        gsap.from('.about-text-col', {
            scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
            opacity: 0, x: -50, filter: 'blur(5px)', duration: 0.9, ease: 'power3.out'
        });
        gsap.from('.about-skills-col', {
            scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
            opacity: 0, x: 50, filter: 'blur(5px)', duration: 0.9, delay: 0.2, ease: 'power3.out'
        });

        // Stat counters — dramatic glow
        gsap.utils.toArray('.counter').forEach(el => {
            const target = parseInt(el.dataset.target);
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 90%' },
                textContent: target, duration: 2.5, snap: { textContent: 1 }, ease: 'power2.out'
            });
        });

        // Stat cards entrance
        gsap.utils.toArray('.stat-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%' },
                opacity: 0, y: 30, scale: 0.9, duration: 0.6, delay: i * 0.1, ease: 'back.out(1.5)'
            });
        });

        // Skill bars with neon glow trail
        gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 92%' },
                width: bar.dataset.width + '%', duration: 1.6, ease: 'power2.out'
            });
        });

        // Project cards — stagger with blur
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                opacity: 0, y: 60, filter: 'blur(6px)', duration: 0.8, delay: i * 0.1, ease: 'power3.out'
            });
        });

        // Skill categories
        gsap.utils.toArray('.skill-category').forEach((cat, i) => {
            gsap.from(cat, {
                scrollTrigger: { trigger: cat, start: 'top 88%' },
                opacity: 0, y: 35, duration: 0.6, delay: i * 0.08, ease: 'power3.out'
            });
        });

        // 3D Cube Removed
        // gsap.from('.cube-section', { ... });

        // Timeline — from left with stagger
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 85%' },
                opacity: 0, x: -50, filter: 'blur(4px)', duration: 0.7, delay: i * 0.1, ease: 'power3.out'
            });
        });

        // Contact cards
        gsap.utils.toArray('.contact-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%' },
                opacity: 0, x: -30, duration: 0.5, delay: i * 0.08, ease: 'power3.out'
            });
        });

        // Contact form
        gsap.from('.glass-form', {
            scrollTrigger: { trigger: '.glass-form', start: 'top 85%' },
            opacity: 0, y: 40, filter: 'blur(6px)', duration: 0.8, ease: 'power3.out'
        });

        // Parallax on scroll for shapes
        gsap.to('.hero-visual', {
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
            y: -80, ease: 'none'
        });
        gsap.to('.hero-text', {
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
            y: -40, ease: 'none'
        });
    }

    // ===== VANILLA TILT =====
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof VanillaTilt !== 'undefined') {
            document.querySelectorAll('[data-tilt]').forEach(el => {
                VanillaTilt.init(el, { max: 8, speed: 400, glare: true, 'max-glare': 0.15, scale: 1.02 });
            });
        }
    });

    // ===== CONTACT FORM =====
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) return;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

            btn.classList.add('loading');
            try {
                const res = await fetch(this.action, { method: 'POST', body: new FormData(this), headers: { 'Accept': 'application/json' } });
                if (res.ok) { this.reset(); formSuccess.classList.add('show'); setTimeout(() => formSuccess.classList.remove('show'), 4000); }
            } catch (err) { console.error('Form error:', err); }
            finally { btn.classList.remove('loading'); }
        });
    }

})();
