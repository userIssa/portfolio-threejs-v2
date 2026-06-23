"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Center } from "@react-three/drei";
import CanvasLoader from "./Loader";

// Subcomponent to load and center the GLB sword model
const SwordModel = () => {
  const sword = useGLTF("/sword.glb");

  return (
    <Center>
      <primitive
        object={sword.scene}
        scale={2.2}
        rotation={[0.2, 0.4, 0.5]} // default dynamic float angle pose
      />
    </Center>
  );
};

export default function SwordHero() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Balanced Cyber/Tech Lighting Schema */}
        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.45} groundColor="black" />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.8}
          castShadow
        />
        <directionalLight
          position={[-10, 5, -10]}
          intensity={1.0}
        />
        <pointLight position={[5, -5, 5]} intensity={1.2} />

        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.0}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <SwordModel />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}

// Pre-declare preloader assets to enable smooth rendering
useGLTF.preload("/sword.glb");
