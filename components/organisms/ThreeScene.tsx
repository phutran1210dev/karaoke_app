'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { CuteGirl } from '@/components/atoms/CuteGirl';
import { MagicalParticles } from '@/components/atoms/MagicalParticles';
import type { GirlAnimationState } from '@/types/karaoke';

interface ThreeSceneProps {
  animationState: GirlAnimationState;
  isPlaying: boolean;
  className?: string;
}

const Scene: React.FC<{ animationState: GirlAnimationState; isPlaying: boolean }> = ({ 
  animationState, 
  isPlaying 
}) => {
  return (
    <>
      {/* Ambient lighting with warm pink tone */}
      <ambientLight intensity={0.8} color="#FFE4E6" />
      
      {/* Main key light */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight 
        position={[-5, 8, 3]} 
        intensity={0.6}
        color="#FFB3E6"
      />
      
      {/* Rim lighting for beautiful silhouette */}
      <directionalLight 
        position={[0, 5, -10]} 
        intensity={0.8}
        color="#E879F9"
      />
      
      {/* Accent lights for magical atmosphere */}
      <pointLight position={[-8, 3, -15]} color="#FF69B4" intensity={0.7} />
      <pointLight position={[8, 3, -15]} color="#DA70D6" intensity={0.7} />
      <pointLight position={[0, -2, 5]} color="#FFB6C1" intensity={0.5} />
      
      {/* Spot light for dramatic effect when dancing */}
      {isPlaying && (
        <spotLight
          position={[0, 8, 0]}
          angle={0.6}
          penumbra={0.5}
          intensity={1.5}
          color="#FF1493"
          castShadow
        />
      )}
      
      {/* Cute girl character */}
      <CuteGirl animationState={animationState} isPlaying={isPlaying} />
      
      {/* Magical particles */}
      <MagicalParticles count={800} isPlaying={isPlaying} />
      
      {/* Enhanced sparkly background */}
      <Stars 
        radius={150} 
        depth={80} 
        count={2000} 
        factor={6} 
        saturation={0.3} 
        fade 
        speed={0.5}
      />
      
      {/* Beautiful environment for reflections and lighting */}
      <Environment 
        preset="city"
        environmentIntensity={0.3}
      />
      
      {/* Controls for user interaction */}
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={12}
        minDistance={3}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={!isPlaying}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const ThreeScene: React.FC<ThreeSceneProps> = ({ 
  animationState, 
  isPlaying, 
  className = '' 
}) => {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene animationState={animationState} isPlaying={isPlaying} />
        </Suspense>
      </Canvas>
    </div>
  );
};