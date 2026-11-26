"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF, Center } from "@react-three/drei";
import CanvasLoader from "./Loader";

const SwordModel = () => {
  const sword = useGLTF("/sword.glb");

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.45}>
      <Center>
        <primitive
          object={sword.scene}
          scale={2.2}
          rotation={[0.2, 0.4, 0.5]}
        />
      </Center>
    </Float>
  );
};

export default function SwordHero() {
  return (
    <div data-cursor="precision" className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Subtle Neo-Tokyo Halo Backdrop behind the 3D model */}
      <div
        aria-hidden="true"
        className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,42,109,0.16)_0%,rgba(0,229,255,0.08)_45%,transparent_72%)] blur-2xl pointer-events-none"
      />

      <Canvas
        frameloop="always"
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Neo-Tokyo Rim + Key Lighting Schema */}
        <ambientLight intensity={0.65} />
        <hemisphereLight intensity={0.45} color="#00e5ff" groundColor="#05070a" />
        <directionalLight
          position={[8, 10, 8]}
          intensity={1.9}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[-8, 4, -6]}
          intensity={1.6}
          color="#ff2a6d"
        />
        <pointLight position={[4, -4, 5]} intensity={1.8} color="#00e5ff" />
        <pointLight position={[-4, 3, 3]} intensity={1.4} color="#ff2a6d" />

        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.9}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <SwordModel />
        </Suspense>

        <Preload all />
      </Canvas>

      {/* Subtle Orbit Hint */}
      <div className="absolute bottom-3 right-3 pointer-events-none px-2.5 py-1 rounded-full bg-black/45 border border-white/10 font-mono text-[10px] tracking-widest text-white/50">
        DRAG TO ORBIT // 3D
      </div>
    </div>
  );
}

useGLTF.preload("/sword.glb");
