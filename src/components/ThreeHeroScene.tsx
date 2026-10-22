import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeHeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL or WebGL support
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D illustration:', e);
      setHasWebGlError(true);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x07152f, 1.4);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0x145dff, 2.2);
    dirLight.position.set(5, 7, 6);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x8bd9ff, 1.8);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2.5, 12);
    pointLight.position.set(0, 0.5, 0);
    scene.add(pointLight);

    // ROOT GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. PROCEDURAL 3D HARDCOVER BOOK
    const bookGroup = new THREE.Group();

    // Cover material
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x0f2d5f,
      roughness: 0.35,
      metalness: 0.25
    });

    // Page material
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.85,
      metalness: 0.05
    });

    // Gold trim material
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.85
    });

    // Back cover
    const backCover = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.06, 2.9), coverMat);
    backCover.position.set(0, -0.22, 0);
    bookGroup.add(backCover);

    // Front cover
    const frontCover = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.06, 2.9), coverMat);
    frontCover.position.set(0, 0.22, 0);
    bookGroup.add(frontCover);

    // Spine
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 2.9), coverMat);
    spine.position.set(-1.05, 0, 0);
    bookGroup.add(spine);

    // Inner Pages block
    const pages = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.38, 2.75), pagesMat);
    pages.position.set(0.05, 0, 0);
    bookGroup.add(pages);

    // Spine gold emblem band
    const goldBand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 1.2), goldMat);
    goldBand.position.set(-1.06, 0, 0);
    bookGroup.add(goldBand);

    // Bookmark ribbon
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 1.4), goldMat);
    ribbon.position.set(0.4, -0.24, 1.2);
    ribbon.rotation.x = 0.3;
    bookGroup.add(ribbon);

    bookGroup.position.set(-1.6, -0.3, 0.2);
    bookGroup.rotation.set(0.4, 0.6, -0.2);
    mainGroup.add(bookGroup);

    // 2. PROCEDURAL 3D GRADUATION CAP (Mortarboard)
    const capGroup = new THREE.Group();

    const capMat = new THREE.MeshStandardMaterial({
      color: 0x07152f,
      roughness: 0.4,
      metalness: 0.3
    });

    // Skull cap base
    const skullCap = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.5, 0.45, 16), capMat);
    skullCap.position.set(0, -0.22, 0);
    capGroup.add(skullCap);

    // Mortarboard square top
    const capTop = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 1.8), capMat);
    capTop.position.set(0, 0.03, 0);
    capGroup.add(capTop);

    // Center button
    const capButton = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), goldMat);
    capButton.position.set(0, 0.08, 0);
    capGroup.add(capButton);

    // Tassel cord
    const tasselCord = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.6), goldMat);
    tasselCord.position.set(0.3, 0.07, 0.3);
    tasselCord.rotation.y = 0.8;
    capGroup.add(tasselCord);

    // Hanging tassel tip
    const tasselTip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.08, 0.3, 8), goldMat);
    tasselTip.position.set(0.6, -0.08, 0.6);
    capGroup.add(tasselTip);

    capGroup.position.set(1.5, 1.2, -0.3);
    capGroup.rotation.set(0.35, -0.5, 0.15);
    mainGroup.add(capGroup);

    // 3. GLOWING MATHEMATICAL ICOSAHEDRON (Polyhedral Geometry)
    const polyGroup = new THREE.Group();

    const polyGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const polyWire = new THREE.Mesh(polyGeo, wireframeMat);
    polyGroup.add(polyWire);

    // Core glowing orb
    const coreGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x145dff,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.8
    });
    const coreOrb = new THREE.Mesh(coreGeo, coreMat);
    polyGroup.add(coreOrb);

    polyGroup.position.set(1.7, -1.1, 0.5);
    mainGroup.add(polyGroup);

    // 4. ATOM / ORBIT RINGS
    const ringGroup = new THREE.Group();

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x8bd9ff,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.8
    });
    const ringGeo1 = new THREE.TorusGeometry(1.6, 0.025, 12, 48);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo1, ringMat1);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Orbiting particle beads
    const beadGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x145dff,
      emissiveIntensity: 0.9
    });
    const bead1 = new THREE.Mesh(beadGeo, beadMat);
    bead1.position.set(1.6, 0, 0);
    ring1.add(bead1);

    const bead2 = new THREE.Mesh(beadGeo, beadMat);
    bead2.position.set(-1.6, 0, 0);
    ring2.add(bead2);

    ringGroup.position.set(-0.2, 0.4, -0.6);
    mainGroup.add(ringGroup);

    // 5. FLOATING PARTICLES
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8bd9ff,
      size: 0.07,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer parallax handling
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.25;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const renderTick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera/group parallax damping
      mouseX += (targetX - mouseX) * (1 - Math.exp(-6 * delta));
      mouseY += (targetY - mouseY) * (1 - Math.exp(-6 * delta));

      mainGroup.rotation.y = mouseX * 0.8;
      mainGroup.rotation.x = -mouseY * 0.6;

      // Floating book animation
      bookGroup.position.y = -0.3 + Math.sin(time * 1.5) * 0.08;
      bookGroup.rotation.y = 0.6 + Math.sin(time * 0.8) * 0.05;

      // Floating cap animation
      capGroup.position.y = 1.2 + Math.cos(time * 1.4) * 0.07;
      capGroup.rotation.y = -0.5 + Math.sin(time * 0.7) * 0.06;

      // Rotating polyhedral geometry
      polyGroup.rotation.x += 0.4 * delta;
      polyGroup.rotation.y += 0.6 * delta;
      polyGroup.position.y = -1.1 + Math.sin(time * 1.7 + 1) * 0.07;

      // Orbit rings spin
      ring1.rotation.z += 0.5 * delta;
      ring2.rotation.z -= 0.6 * delta;

      // Gentle particle drift
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderTick);
    };

    animId = requestAnimationFrame(renderTick);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bookGroup.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
        }
      });
      capGroup.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
        }
      });
      polyGroup.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
        }
      });
      ringGroup.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
        }
      });
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (hasWebGlError) {
    return (
      <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F2D5F] via-[#07152F] to-[#040D1D] border border-[#38BDF8]/20 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#145DFF]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-4 shadow-lg shadow-[#145DFF]/20">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-white mb-2">V.G TUTORIAL DEWAS</h4>
        <p className="text-sm text-slate-300 max-w-sm">Concept-based coaching and mentoring by Swapnil Sir in Dewas, Madhya Pradesh.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Subtle depth lighting backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-[#145DFF]/15 via-transparent to-transparent -z-10" />
    </div>
  );
};
