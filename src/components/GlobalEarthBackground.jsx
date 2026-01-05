import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Preload } from "@react-three/drei";
import EarthCanvas from "./EarthCanvas";

const GlobalEarthBackground = () => {
  return (
    <div className="global-earth-bg">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        {/* Background color */}
        <color attach="background" args={["#0a0a0f"]} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Stars */}
        <Stars
          radius={300}
          depth={60}
          count={4000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Earth */}
        <EarthCanvas />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <Preload all />
      </Canvas>
    </div>
  );
};

export default GlobalEarthBackground;
