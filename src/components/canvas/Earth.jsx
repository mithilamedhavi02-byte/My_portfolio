import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  return <primitive object={earth.scene} scale={[3]} position-y={0} rotation={0}/>;
};

const EarthCanvas = () => {
  return <Canvas></Canvas>;
};
export default Earth;