"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import Image from "next/image";

function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const blobColor = isDark ? "#121214" : "#f0f4f8";
  const emissiveColor = isDark ? "#1a1a1c" : "#ffffff";

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      
      const targetScale = hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 100, 100]}
      scale={1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshDistortMaterial
        color={blobColor}
        emissive={emissiveColor}
        emissiveIntensity={isDark ? 0.1 : 0.6}
        attach="material"
        distort={hovered ? 0.5 : 0.3}
        speed={hovered ? 2.5 : 1}
        roughness={0}
        metalness={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

export function LiquidBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-white dark:bg-[#050505]">
      {/* 3D Refined Corner Asset Layer */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 contrast-[1.05]">
        <Image
          src="/images/apple-bg.png"
          alt="Refined Apple Design Background"
          fill
          className="object-cover scale-100 blur-[15px] md:blur-[25px]"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-background/5 backdrop-blur-[5px] z-10"></div>
      
      <Canvas 
        className="pointer-events-auto w-full h-full opacity-40 dark:opacity-20 translate-y-20"
        camera={{ position: [0, 0, 3] }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <directionalLight position={[-2, -5, -2]} intensity={0.5} />
        <AnimatedBlob />
      </Canvas>
      {/* Fallback minimalist gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-teal/10 dark:bg-brand-teal/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] hidden md:block opacity-50" />
      <div className="absolute bottom-0 left-0 w-[900px] h-[900px] bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] hidden md:block opacity-50" />
    </div>
  );
}
