"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  return (
    <div data-cursor="precision" className="absolute inset-0 w-full h-full">
      <Canvas
        shadows="percentage"
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.8}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          <ambientLight intensity={1.2} />
          <directionalLight intensity={2.0} position={[5, 5, 5]} color="#ffffff" />
          <pointLight intensity={1.4} position={[-6, -3, 4]} color="#ff2a6d" />
          <pointLight intensity={1.2} position={[6, 2, -4]} color="#00e5ff" />
          <Earth />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/planet/scene.gltf");

export default EarthCanvas;
