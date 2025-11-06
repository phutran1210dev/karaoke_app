'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MagicalParticlesProps {
  count?: number;
  isPlaying: boolean;
}

export const MagicalParticles: React.FC<MagicalParticlesProps> = ({ 
  count = 1000, 
  isPlaying 
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Use a seeded random function for consistency
    let seed = 12345;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    for (let i = 0; i < count; i++) {
      // Create particles in a sphere around the character
      const radius = 8 + random() * 10;
      const theta = random() * Math.PI * 2;
      const phi = random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Pink and purple colors
      const color = new THREE.Color();
      const hue = 0.8 + random() * 0.2; // Pink to purple range
      const saturation = 0.7 + random() * 0.3;
      const lightness = 0.6 + random() * 0.4;
      color.setHSL(hue, saturation, lightness);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate particles around the character
    pointsRef.current.rotation.y = time * 0.1;
    
    if (isPlaying) {
      // More active movement when playing
      pointsRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      pointsRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      pointsRef.current.scale.setScalar(scale);
    } else {
      // Gentle movement when idle
      pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        alphaTest={0.01}
      />
    </Points>
  );
};