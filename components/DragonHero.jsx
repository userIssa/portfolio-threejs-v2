"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DragonHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE & CAMERA
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // MOUSE PARALLAX TRACKING
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to range [-1, 1]
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // DRAGON CONSTRUCTION GROUP
    const dragonGroup = new THREE.Group();
    scene.add(dragonGroup);

    // Arrays to collect geometries and materials for absolute disposal on unmount
    const geometries = [];
    const materials = [];

    // Helper to register geometries/materials for disposal
    const track = (geometry, material) => {
      geometries.push(geometry);
      materials.push(material);
      return { geometry, material };
    };

    // Shared Wireframe & Points Material (cyan-green glow)
    const wireColor = "#00ffcc";
    const lineMat = new THREE.LineBasicMaterial({ color: wireColor });
    const pointsMat = new THREE.PointsMaterial({ color: wireColor, size: 0.03 });
    materials.push(lineMat, pointsMat);

    // Helper function to build a low-poly wireframe part with vertex points
    const buildPart = (baseGeo, position = [0, 0, 0], rotation = [0, 0, 0]) => {
      geometries.push(baseGeo);

      // Apply initial positioning/rotation to the base geometry
      if (rotation[0] !== 0) baseGeo.rotateX(rotation[0]);
      if (rotation[1] !== 0) baseGeo.rotateY(rotation[1]);
      if (rotation[2] !== 0) baseGeo.rotateZ(rotation[2]);
      if (position[0] !== 0 || position[1] !== 0 || position[2] !== 0) {
        baseGeo.translate(position[0], position[1], position[2]);
      }

      // 1. Wireframe lines
      const wireGeo = new THREE.WireframeGeometry(baseGeo);
      geometries.push(wireGeo);
      const lines = new THREE.LineSegments(wireGeo, lineMat);

      // 2. Vertex dots
      const points = new THREE.Points(baseGeo, pointsMat);

      // Add both representation forms to the group
      dragonGroup.add(lines);
      dragonGroup.add(points);
    };

    // --- Programmatic Low-Poly Dragon Construction ---

    // 1. Body (Cone pointing forward horizontally)
    const bodyGeo = new THREE.ConeGeometry(0.5, 1.8, 5, 2);
    buildPart(bodyGeo, [0, 0, 0], [Math.PI / 2, 0, 0]);

    // 2. Neck (Cylinder extending up and forward)
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.22, 1.0, 5, 2);
    buildPart(neckGeo, [0, 0.45, 0.5], [Math.PI / 4, 0, 0]);

    // 3. Head & Snout (Sphere + Cone pointing forward)
    const headGeo = new THREE.SphereGeometry(0.28, 5, 5);
    buildPart(headGeo, [0, 0.9, 0.85]);

    const snoutGeo = new THREE.ConeGeometry(0.14, 0.45, 4, 1);
    buildPart(snoutGeo, [0, 0.9, 1.15], [Math.PI / 2, 0, 0]);

    // 4. Tail (Tapered cone extending backward and curving slightly down)
    const tailGeo = new THREE.ConeGeometry(0.16, 1.6, 4, 3);
    buildPart(tailGeo, [0, -0.3, -1.25], [-Math.PI / 2.1, 0, 0]);

    // 5. Wings (Twin Plane Geometries angled outward and back)
    const leftWingGeo = new THREE.PlaneGeometry(1.6, 0.9, 3, 2);
    // Align left wing: scale outward, tilt backward and angle upward
    buildPart(
      leftWingGeo, 
      [-0.9, 0.5, -0.2], 
      [-Math.PI / 6, -Math.PI / 6, Math.PI / 8]
    );

    const rightWingGeo = new THREE.PlaneGeometry(1.6, 0.9, 3, 2);
    // Align right wing: scale outward, tilt backward and angle upward
    buildPart(
      rightWingGeo, 
      [0.9, 0.5, -0.2], 
      [-Math.PI / 6, Math.PI / 6, -Math.PI / 8]
    );

    // 6. Legs (Four small cylinder legs)
    const legRadius = 0.07;
    const legHeight = 0.7;
    
    // Front Left Leg
    const flLegGeo = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 4, 1);
    buildPart(flLegGeo, [-0.35, -0.5, 0.4]);
    
    // Front Right Leg
    const frLegGeo = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 4, 1);
    buildPart(frLegGeo, [0.35, -0.5, 0.4]);

    // Back Left Leg
    const blLegGeo = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 4, 1);
    buildPart(blLegGeo, [-0.35, -0.5, -0.4]);

    // Back Right Leg
    const brLegGeo = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 4, 1);
    buildPart(brLegGeo, [0.35, -0.5, -0.4]);

    // --- Animation loop ---
    const clock = new THREE.Clock();
    let frameId;
    let baseRotY = 0;

    // Position group slightly down to center
    dragonGroup.position.y = -0.2;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Slow continuous Y-axis rotation (0.003 rad/frame)
      baseRotY += 0.003;

      // Gentle floating: sine wave on Y position (amplitude 0.1, speed 0.8)
      const elapsedTime = clock.getElapsedTime();
      dragonGroup.position.y = -0.2 + Math.sin(elapsedTime * 0.8) * 0.1;

      // Mouse Parallax: Dragon subtly tilts toward mouse (max 15 degrees / 0.26 radians)
      const maxTilt = 15 * (Math.PI / 180);
      const targetParallaxX = mouseY * maxTilt;
      const targetParallaxY = mouseX * maxTilt;

      // Smooth lerp interpolation for parallax angles
      dragonGroup.rotation.x += (targetParallaxX - dragonGroup.rotation.x) * 0.05;
      
      // Combine base auto-rotation and mouse Y parallax
      const currentParallaxY = dragonGroup.rotation.y - baseRotY;
      const nextParallaxY = currentParallaxY + (targetParallaxY - currentParallaxY) * 0.05;
      dragonGroup.rotation.y = baseRotY + nextParallaxY;

      renderer.render(scene, camera);
    };
    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Remove canvas from DOM
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries
      geometries.forEach((g) => g.dispose());

      // Dispose materials
      materials.forEach((m) => m.dispose());

      // Dispose WebGLRenderer
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Absolute canvas mount target */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
