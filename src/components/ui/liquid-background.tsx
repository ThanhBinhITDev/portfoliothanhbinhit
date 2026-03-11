"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import Image from "next/image";

// Reduced geometry from 100x100 to 48x48 - same visual, 5x fewer polygons
function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.05);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 48, 48]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshDistortMaterial
        color={isDark ? "#121214" : "#f0f4f8"}
        emissive={isDark ? "#1a1a1c" : "#ffffff"}
        emissiveIntensity={isDark ? 0.1 : 0.6}
        distort={hovered ? 0.45 : 0.25}
        speed={hovered ? 2 : 0.8}
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
      {/* Background image - reduced blur for perf */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <Image
          src="/images/apple-bg.png"
          alt=""
          fill
          className="object-cover blur-[10px] md:blur-[18px]"
          priority
          quality={75}
        />
      </div>

      {/* Three.js blob - lazy canvas */}
      <Canvas
        className="pointer-events-auto w-full h-full opacity-40 dark:opacity-20 translate-y-20"
        camera={{ position: [0, 0, 3] }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 5, 2]} intensity={1.2} />
        <AnimatedBlob />
      </Canvas>

      {/* Static gradient orbs - replaced large blur-[150px] with smaller ones */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 dark:bg-brand-teal/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] hidden md:block opacity-40" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] hidden md:block opacity-40" />
    </div>
  );
}
