"use client";

import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-2.5 font-mono select-none pointer-events-none">
        <div className="w-8 h-8 rounded-full border-2 border-cyber-pink/25 border-t-cyber-cyan animate-spin shadow-neon-cyan" />
        <p className="text-[11px] font-semibold tracking-widest text-cyber-cyan whitespace-nowrap">
          LOADING_3D // {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

export default Loader;
