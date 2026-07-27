import React, { useEffect, useRef } from 'react';
import './CursorEffect.css';

const CursorEffect = () => {
    const canvasRef = useRef(null);
    const mouseStateRef = useRef({ isOverButton: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let time = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Particle class with circular motion
        class Particle {
            constructor(x, y, index) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3.5 + 1.5;
                this.index = index;
                this.orbitRadius = Math.random() * 15 + 5;
                this.speed = Math.random() * 0.03 + 0.02;
                this.offset = Math.random() * Math.PI * 2;
                this.repelDistance = 0;
                this.repelForce = 0;
                this.opacity = 0.05;
                this.activeRadius = 150;
                this.isDarkArea = false;
                this.color = '';
            }

            // Detect if area is dark or light based on pixel data
            detectSurfaceColor(ctx, x, y) {
                try {
                    const imageData = ctx.getImageData(x, y, 1, 1);
                    const data = imageData.data;
                    // Calculate brightness
                    const brightness = (data[0] + data[1] + data[2]) / 3;
                    this.isDarkArea = brightness < 100; // Dark if brightness < 100
                } catch (e) {
                    this.isDarkArea = false; // Default to light
                }
                this.updateColor();
            }

            updateColor() {
                if (this.isDarkArea) {
                    // Bright white/light colors for dark surfaces
                    const brightColors = ['#FFFFFF', '#E0F0FF', '#F0FFF0'];
                    this.color = brightColors[Math.floor(Math.random() * brightColors.length)];
                } else {
                    // Theme colors: Green and Blue only
                    const themeColors = ['#24a513', '#133f79', '#0EA5E9', '#1a6b2a', '#0D2D57'];
                    this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
                }
            }

            update(mouseX, mouseY, time, ctx) {
                const dx = this.baseX - mouseX;
                const dy = this.baseY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Detect surface color periodically
                if (time % 30 === 0) {
                    this.detectSurfaceColor(ctx, this.baseX, this.baseY);
                }

                // Opacity based on distance from cursor
                if (distance < this.activeRadius) {
                    const opacityFactor = 1 - (distance / this.activeRadius);
                    // Much higher opacity - VISIBLE on light surfaces
                    const maxOpacity = this.isDarkArea ? 0.8 : 1.0; // Full opacity on light!
                    this.opacity = 0.05 + opacityFactor * maxOpacity; // 0.05 to 1.0
                } else {
                    this.opacity = 0.02; // Nearly transparent when far from cursor
                }

                // Repel from cursor
                if (distance < 120) {
                    const angle = Math.atan2(dy, dx);
                    const force = (120 - distance) / 120;
                    this.repelDistance = force * 40;
                    this.repelForce = force;
                } else {
                    this.repelDistance *= 0.92;
                    this.repelForce *= 0.92;
                }

                // Circular motion around base position
                const orbitAngle = time * this.speed + this.offset;
                const orbitX = Math.cos(orbitAngle) * this.orbitRadius;
                const orbitY = Math.sin(orbitAngle) * this.orbitRadius;

                // Repulsion direction
                let repelX = 0;
                let repelY = 0;
                if (distance > 0 && distance < 120) {
                    repelX = (dx / distance) * this.repelDistance;
                    repelY = (dy / distance) * this.repelDistance;
                }

                // Combine orbital motion with repulsion
                this.x = this.baseX + orbitX + repelX;
                this.y = this.baseY + orbitY + repelY;
            }

            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create initial particles (denser grid)
        const createParticles = () => {
            particles.length = 0;
            const spacing = 25;
            let index = 0;
            for (let x = 0; x < canvas.width; x += spacing) {
                for (let y = 0; y < canvas.height; y += spacing) {
                    if (Math.random() > 0.3) {
                        particles.push(
                            new Particle(
                                x + Math.random() * 20 - 10,
                                y + Math.random() * 20 - 10,
                                index++
                            )
                        );
                    }
                }
            }
        };

        createParticles();

        // Mouse move
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Check if hovering over clickable element
            const element = document.elementFromPoint(e.clientX, e.clientY);
            const isClickable =
                element?.tagName === 'BUTTON' ||
                element?.tagName === 'A' ||
                element?.getAttribute('role') === 'button' ||
                element?.tagName === 'INPUT' ||
                element?.closest('button') ||
                element?.closest('a') ||
                element?.classList?.contains('clickable');

            mouseStateRef.current.isOverButton = isClickable;
        };

        // Resize handler
        const handleResize = () => {
            resizeCanvas();
            createParticles();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;

            time += 1;

            // Update and draw particles
            for (let particle of particles) {
                particle.update(mouseX, mouseY, time, ctx);
                particle.draw(ctx);
            }

            // Draw custom cursor
            if (mouseStateRef.current.isOverButton) {
                drawHandCursor(ctx, mouseX, mouseY);
            } else {
                drawArrowCursor(ctx, mouseX, mouseY);
            }

            animationId = requestAnimationFrame(animate);
        };

        // Draw arrow cursor
        const drawArrowCursor = (ctx, x, y) => {
            ctx.globalAlpha = 1;
            ctx.save();

            // Arrow shape - Professional pointer
            const arrowSize = 16;
            ctx.fillStyle = '#133f79'; // Primary blue
            ctx.strokeStyle = '#FFFFFF'; // White outline
            ctx.lineWidth = 2;

            // Draw arrow
            ctx.beginPath();
            ctx.moveTo(x, y); // Tip
            ctx.lineTo(x + arrowSize, y + arrowSize * 0.6); // Right
            ctx.lineTo(x + arrowSize * 0.5, y + arrowSize * 0.6); // Indent
            ctx.lineTo(x + arrowSize * 0.4, y + arrowSize); // Bottom
            ctx.lineTo(x - arrowSize * 0.1, y + arrowSize * 0.8); // Left indent
            ctx.lineTo(x, y + arrowSize * 0.3); // Left
            ctx.closePath();

            ctx.fill();
            ctx.stroke();

            ctx.restore();
        };

        // Draw hand cursor
        const drawHandCursor = (ctx, x, y) => {
            ctx.globalAlpha = 1;
            ctx.save();

            const handSize = 18;
            ctx.fillStyle = '#24a513'; // Accent green
            ctx.strokeStyle = '#FFFFFF'; // White outline
            ctx.lineWidth = 2;

            // Draw simplified hand pointer
            ctx.beginPath();
            // Palm base
            ctx.ellipse(x, y + handSize * 0.3, handSize * 0.4, handSize * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Fingers - pointing up
            ctx.beginPath();
            ctx.moveTo(x - handSize * 0.3, y - handSize * 0.3);
            ctx.lineTo(x - handSize * 0.3, y - handSize);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y - handSize * 0.2);
            ctx.lineTo(x, y - handSize * 1.1);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + handSize * 0.3, y - handSize * 0.3);
            ctx.lineTo(x + handSize * 0.3, y - handSize);
            ctx.stroke();

            ctx.restore();
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="cursor-effect-canvas" />;
};

export default CursorEffect;
