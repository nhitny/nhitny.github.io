import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ThreeScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Move camera deeper to be IN the shapes initially
    camera.position.z = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x4f46e5, 3, 50);
    pointLight1.position.set(-10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9333ea, 3, 50);
    pointLight2.position.set(10, -10, 10);
    scene.add(pointLight2);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500; // More particles
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position - Spread wide but denser near center
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 80;

      // Color (vibrant purple/pink for visibility in both modes)
      const color = new THREE.Color();
      color.setHSL(0.75 + Math.random() * 0.15, 1.0, 0.5); // More saturated, consistent brightness
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15, // Slightly larger
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create geometric shapes floating around
    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.8), // Larger shapes
      new THREE.TetrahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.8),
    ];

    for (let i = 0; i < 20; i++) { // More shapes
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x4f46e5 : 0x9333ea,
        emissive: Math.random() > 0.5 ? 0x4f46e5 : 0x9333ea,
        emissiveIntensity: 1.2, // Brighter for light mode
        transparent: true,
        opacity: 0.95, // More opaque
        wireframe: Math.random() > 0.5,
      });
      const shape = new THREE.Mesh(geometry, material);

      shape.position.set(
        (Math.random() - 0.5) * 30, // Wider spread
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );

      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(shape);
      scene.add(shape);
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Rotate particles slowly
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1);

        // Floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      // Animate lights
      pointLight1.position.x = Math.sin(Date.now() * 0.001) * 10;
      pointLight1.position.z = Math.cos(Date.now() * 0.001) * 10;

      pointLight2.position.x = Math.cos(Date.now() * 0.0015) * 10;
      pointLight2.position.z = Math.sin(Date.now() * 0.0015) * 10;

      renderer.render(scene, camera);
    };

    animate();

    // GSAP ScrollTrigger animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
        markers: false, // Set to true to see scroll zones for debugging
        onUpdate: (self) => {
          // Debug: log scroll progress
          console.log('3D Scroll Progress:', self.progress.toFixed(2));
        }
      },
    });

    // Dramatic camera journey deep into the particle field
    timeline
      .to(camera.position, {
        x: 0,
        y: 0,
        z: -30, // Move VERY deep into the scene
        duration: 10,
        ease: "none", // Linear movement for consistent speed
      })
      // Add rotation to camera for a "pilot" feel
      .to(camera.rotation, {
        z: Math.PI * 0.5, // Rotate 90 degrees as we fly
        duration: 20,
        ease: "none",
      }, 0);

    // Also move the particles against the camera for enhanced speed sensation
    timeline.to(scene.rotation, {
      z: Math.PI, // Rotate entire scene
      duration: 10,
      ease: "none",
    }, 0);

    // Force ScrollTrigger refresh after a short delay
    setTimeout(() => {
      ScrollTrigger.refresh();
      console.log('3D ScrollTrigger initialized and refreshed');
    }, 100);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="three-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}

export default ThreeScene;
