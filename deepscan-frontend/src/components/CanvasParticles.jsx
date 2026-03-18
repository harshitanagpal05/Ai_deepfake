import React, { useEffect, useRef } from 'react';

export default function CanvasParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let particles = [];
    // Number of particles based on screen size: 30 for mobile, 80 for desktop
    const numParticles = window.innerWidth < 768 ? 30 : 80;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse interaction
    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // 1px - 3px
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#0066ff';
        this.baseVelocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        };
      }

      update() {
        // Gravity towards center orb
        // Assuming orb is around center bottom of the hero section
        const centerX = canvas.width / 2;
        // On homepage, orb is lower part of screen, let's use some fixed center offset
        const centerY = canvas.height * 0.4; // rough estimate of landing hero bottom
        
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distToCenter = Math.sqrt(dx * dx + dy * dy);
        
        // Very slight pull to center
        if (distToCenter > 0) {
          this.x += (dx / distToCenter) * 0.05;
          this.y += (dy / distToCenter) * 0.05;
        }

        // Add base velocity drift
        this.x += this.baseVelocity.x;
        this.y += this.baseVelocity.y;

        // Repel from mouse
        if (mouse.x !== null && mouse.y !== null) {
          const mx = this.x - mouse.x;
          const my = this.y - mouse.y;
          const mouseDist = Math.sqrt(mx * mx + my * my);
          if (mouseDist < 120) {
            const force = (120 - mouseDist) / 120;
            this.x += (mx / mouseDist) * force * 3;
            this.y += (my / mouseDist) * force * 3;
          }
        }

        // Screen wrap
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Init particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Pause if tab is hidden
      if (!document.hidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
