'use client';

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
}

// 3D Polyhedron vertices & edges generator
function createIcosahedron(radius: number): { vertices: Point3D[]; edges: [number, number][] } {
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = radius / Math.sqrt(1 + phi * phi);
  const b = a * phi;

  const vertices: Point3D[] = [
    { x: -a, y: b, z: 0 },
    { x: a, y: b, z: 0 },
    { x: -a, y: -b, z: 0 },
    { x: a, y: -b, z: 0 },
    { x: 0, y: -a, z: b },
    { x: 0, y: a, z: b },
    { x: 0, y: -a, z: -b },
    { x: 0, y: a, z: -b },
    { x: b, y: 0, z: -a },
    { x: b, y: 0, z: a },
    { x: -b, y: 0, z: -a },
    { x: -b, y: 0, z: a }
  ];

  const edges: [number, number][] = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [1, 9], [1, 8], [1, 7],
    [2, 11], [2, 4], [2, 3], [2, 6], [2, 10],
    [3, 4], [3, 9], [3, 8], [3, 6],
    [4, 11], [4, 5], [4, 9],
    [5, 11], [5, 9],
    [6, 10], [6, 7], [6, 8],
    [7, 10], [7, 8],
    [8, 9],
    [10, 11]
  ];

  return { vertices, edges };
}

function createOctahedron(radius: number): { vertices: Point3D[]; edges: [number, number][] } {
  const vertices: Point3D[] = [
    { x: radius, y: 0, z: 0 },
    { x: -radius, y: 0, z: 0 },
    { x: 0, y: radius, z: 0 },
    { x: 0, y: -radius, z: 0 },
    { x: 0, y: 0, z: radius },
    { x: 0, y: 0, z: -radius },
  ];

  const edges: [number, number][] = [
    [0, 2], [2, 1], [1, 3], [3, 0], // equator
    [4, 0], [4, 1], [4, 2], [4, 3], // top pyramid
    [5, 0], [5, 1], [5, 2], [5, 3]  // bottom pyramid
  ];

  return { vertices, edges };
}

function createCube(size: number): { vertices: Point3D[]; edges: [number, number][] } {
  const s = size / 2;
  const vertices: Point3D[] = [
    { x: -s, y: -s, z: -s },
    { x: s, y: -s, z: -s },
    { x: s, y: s, z: -s },
    { x: -s, y: s, z: -s },
    { x: -s, y: -s, z: s },
    { x: s, y: -s, z: s },
    { x: s, y: s, z: s },
    { x: -s, y: s, z: s },
  ];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ];

  return { vertices, edges };
}

export const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with smooth damping (lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) / (width / 2);
      targetMouseY = (e.clientY - height / 2) / (height / 2);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 3D Particles
    const PARTICLE_COUNT = 90;
    const particles: (Point3D & { vx: number; vy: number; vz: number; size: number; color: string })[] = [];
    const colors = ['#6366f1', '#10b981', '#3b82f6', '#ec4899', '#06b6d4', '#8b5cf6'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1400,
        y: (Math.random() - 0.5) * 900,
        z: Math.random() * 800 - 300,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // 3D Shapes
    const icosahedron = createIcosahedron(110);
    const octahedron = createOctahedron(90);
    const cube1 = createCube(100);
    const cube2 = createCube(70);

    let angle = 0;
    let gridOffset = 0;

    // 3D rotation projection helper
    const project = (p: Point3D, cx: number, cy: number, rotX: number, rotY: number, rotZ: number): ProjectedPoint => {
      // Rotation around X
      let y1 = p.y * Math.cos(rotX) - p.z * Math.sin(rotX);
      let z1 = p.y * Math.sin(rotX) + p.z * Math.cos(rotX);

      // Rotation around Y
      let x2 = p.x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -p.x * Math.sin(rotY) + z1 * Math.cos(rotY);

      // Rotation around Z
      let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
      let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

      // Perspective projection
      const fov = 450;
      const cameraDistance = 550;
      const scale = fov / (fov + z2 + cameraDistance);

      return {
        x: cx + x3 * scale,
        y: cy + y3 * scale,
        scale: Math.max(0.1, scale)
      };
    };

    const render = () => {
      angle += 0.008;
      gridOffset = (gridOffset + 0.6) % 40;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Dynamic Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(0.5, '#f1f5f9');
      bgGrad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Glowing atmospheric radial orbs
      // Orb 1: Indigo glow on top-left
      const orb1 = ctx.createRadialGradient(
        width * 0.2 + mouseX * 40,
        height * 0.25 + mouseY * 40,
        10,
        width * 0.2,
        height * 0.25,
        380
      );
      orb1.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
      orb1.addColorStop(0.6, 'rgba(99, 102, 241, 0.05)');
      orb1.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, width, height);

      // Orb 2: Emerald glow on bottom-right
      const orb2 = ctx.createRadialGradient(
        width * 0.8 - mouseX * 40,
        height * 0.75 - mouseY * 40,
        10,
        width * 0.8,
        height * 0.75,
        420
      );
      orb2.addColorStop(0, 'rgba(16, 185, 129, 0.16)');
      orb2.addColorStop(0.6, 'rgba(16, 185, 129, 0.04)');
      orb2.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = orb2;
      ctx.fillRect(0, 0, width, height);

      // Orb 3: Soft Amber glow behind center
      const orb3 = ctx.createRadialGradient(
        width * 0.5 + mouseX * 20,
        height * 0.5 + mouseY * 20,
        20,
        width * 0.5,
        height * 0.5,
        500
      );
      orb3.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
      orb3.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = orb3;
      ctx.fillRect(0, 0, width, height);

      // 3. 3D Perspective Cyber Horizon Grid at the bottom
      const horizonY = height * 0.68 + mouseY * 25;
      const fovY = 220;
      ctx.lineWidth = 1;

      // Longitudinal perspective lines
      const totalVLines = 26;
      for (let i = 0; i <= totalVLines; i++) {
        const xOffset = ((i - totalVLines / 2) / (totalVLines / 2)) * (width * 0.9);
        const startX = width / 2 + mouseX * 60;
        const endX = width / 2 + xOffset * 2.2 + mouseX * 120;
        
        const grad = ctx.createLinearGradient(startX, horizonY, endX, height);
        grad.addColorStop(0, 'rgba(99, 102, 241, 0)');
        grad.addColorStop(0.4, 'rgba(99, 102, 241, 0.07)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0.18)');
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Latitudinal grid lines moving forward
      for (let z = 30; z < 500; z += 35) {
        const effectiveZ = (z + gridOffset) % 470 + 30;
        const scale = fovY / (fovY + effectiveZ);
        const y = horizonY + (height - horizonY) * (1 - scale * 1.6);

        if (y > horizonY && y < height) {
          const alpha = Math.min(0.22, ((y - horizonY) / (height - horizonY)) * 0.28);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 4. Floating 3D Geometric Objects

      // Left Shape: Floating 3D Icosahedron
      const leftCenterX = width * 0.16 + mouseX * 50;
      const leftCenterY = height * 0.38 + Math.sin(angle * 1.2) * 22 + mouseY * 40;
      const leftRotX = angle * 0.9 + mouseY * 0.5;
      const leftRotY = angle * 1.3 + mouseX * 0.5;
      const leftRotZ = angle * 0.6;

      const projectedIco = icosahedron.vertices.map((v) =>
        project(v, leftCenterX, leftCenterY, leftRotX, leftRotY, leftRotZ)
      );

      // Draw edges of Icosahedron
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.45)';
      icosahedron.edges.forEach(([i, j]) => {
        const p1 = projectedIco[i];
        const p2 = projectedIco[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertices of Icosahedron with glow
      projectedIco.forEach((p) => {
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Right Shape: Floating 3D Octahedron
      const rightCenterX = width * 0.84 - mouseX * 50;
      const rightCenterY = height * 0.42 + Math.cos(angle * 1.1) * 25 - mouseY * 40;
      const rightRotX = -angle * 1.2 + mouseY * 0.6;
      const rightRotY = angle * 0.8 - mouseX * 0.6;
      const rightRotZ = angle * 0.5;

      const projectedOcta = octahedron.vertices.map((v) =>
        project(v, rightCenterX, rightCenterY, rightRotX, rightRotY, rightRotZ)
      );

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      octahedron.edges.forEach(([i, j]) => {
        const p1 = projectedOcta[i];
        const p2 = projectedOcta[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      projectedOcta.forEach((p) => {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Top Right: Floating Small 3D Cube
      const trCenterX = width * 0.76 + mouseX * 30;
      const trCenterY = height * 0.16 + Math.sin(angle * 1.5) * 15;
      const projectedCube1 = cube1.vertices.map((v) =>
        project(v, trCenterX, trCenterY, angle * 1.4, -angle * 0.9, angle * 0.4)
      );

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
      cube1.edges.forEach(([i, j]) => {
        const p1 = projectedCube1[i];
        const p2 = projectedCube1[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Bottom Left: Floating Small 3D Cube
      const blCenterX = width * 0.22 - mouseX * 30;
      const blCenterY = height * 0.78 + Math.cos(angle * 1.3) * 15;
      const projectedCube2 = cube2.vertices.map((v) =>
        project(v, blCenterX, blCenterY, -angle * 0.8, angle * 1.1, angle * 0.7)
      );

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      cube2.edges.forEach(([i, j]) => {
        const p1 = projectedCube2[i];
        const p2 = projectedCube2[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 5. Interactive 3D Particles & Connecting Neural Lines
      const projectedParticles: (ProjectedPoint & { color: string; size: number })[] = [];

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < -700) p.x = 700;
        if (p.x > 700) p.x = -700;
        if (p.y < -450) p.y = 450;
        if (p.y > 450) p.y = -450;
        if (p.z < -300) p.z = 500;
        if (p.z > 500) p.z = -300;

        const proj = project(p, width / 2 + mouseX * 70, height / 2 + mouseY * 70, 0, 0, 0);
        projectedParticles.push({
          ...proj,
          color: p.color,
          size: p.size
        });
      });

      // Draw connecting lines between nearby 3D particles
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      projectedParticles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(0.8, p.scale * 1.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
};

export default ThreeDBackground;
