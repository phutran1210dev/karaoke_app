'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cone, Torus, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { GirlAnimationState } from '@/types/karaoke';

interface CuteGirlProps {
  animationState: GirlAnimationState;
  isPlaying: boolean;
}

export const CuteGirl: React.FC<CuteGirlProps> = ({ animationState, isPlaying }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const dressRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Group>(null);

  // Beautiful anime-style materials with soft pastel colors
  const materials = useMemo(() => ({
    // Skin tone - soft and warm
    head: new THREE.MeshToonMaterial({ 
      color: '#FFEBEE', // Very light peachy pink
      emissive: '#FFE4E1',
      emissiveIntensity: 0.2
    }),
    body: new THREE.MeshToonMaterial({ 
      color: '#FCE4EC', // Light pink body
      emissive: '#F8BBD9',
      emissiveIntensity: 0.25
    }),
    limbs: new THREE.MeshToonMaterial({ 
      color: '#FFEBEE', // Match head color
      emissive: '#FFE4E1',
      emissiveIntensity: 0.15
    }),
    // Hair - beautiful purple like in the image
    hair: new THREE.MeshToonMaterial({ 
      color: '#C8A2C8', // Soft lavender purple
      emissive: '#DDA0DD',
      emissiveIntensity: 0.3
    }),
    hairHighlight: new THREE.MeshToonMaterial({ 
      color: '#E6D7FF', // Light purple highlight
      emissive: '#DCD0FF',
      emissiveIntensity: 0.4
    }),
    // Dress - elegant and flowing
    dress: new THREE.MeshToonMaterial({ 
      color: '#F8F8FF', // Ghost white dress
      emissive: '#F0F8FF',
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.95
    }),
    dressAccent: new THREE.MeshToonMaterial({ 
      color: '#FF69B4', // Hot pink accents like in image
      emissive: '#FF1493',
      emissiveIntensity: 0.5
    }),
    // Accessories
    accessory: new THREE.MeshToonMaterial({ 
      color: '#FF4081', // Bright pink accessories
      emissive: '#FF1744',
      emissiveIntensity: 0.6
    }),
    // Face features
    eyes: new THREE.MeshBasicMaterial({ 
      color: '#2C2C2C' // Dark eyes
    }),
    eyeShine: new THREE.MeshBasicMaterial({ 
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.95
    }),
    eyeHighlight: new THREE.MeshBasicMaterial({ 
      color: '#E3F2FD',
      transparent: true,
      opacity: 0.8
    }),
    blush: new THREE.MeshBasicMaterial({ 
      color: '#FFB6C1', 
      transparent: true, 
      opacity: 0.7 
    }),
    mouth: new THREE.MeshBasicMaterial({ 
      color: '#FF6B9D', 
      transparent: true, 
      opacity: 0.8 
    })
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (!groupRef.current) return;

    // Only show enhanced animations when playing
    if (!isPlaying) {
      // Minimal idle animation when paused - gentle breathing
      groupRef.current.position.y = Math.sin(time * 1) * 0.03 + 0.05;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.03;

      // Gentle head breathing
      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(time * 1.2) * 0.02;
        headRef.current.position.y = Math.sin(time * 1.5) * 0.02;
      }

      // Subtle hair movement
      if (hairRef.current) {
        hairRef.current.rotation.z = Math.sin(time * 1) * 0.03;
      }

      // Gentle dress sway
      if (dressRef.current) {
        dressRef.current.rotation.z = Math.sin(time * 0.8) * 0.03;
      }
      
      return; // Stop here when not playing
    }

    // Enhanced base idle animation when playing
    groupRef.current.position.y = Math.sin(time * 2) * 0.12 + 0.08;
    groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.12;

    // Beautiful head animations
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(time * 3) * 0.06;
      headRef.current.position.y = Math.sin(time * 4) * 0.06;
      headRef.current.rotation.x = Math.sin(time * 2.5) * 0.04;
    }

    // Hair flowing animation - more pronounced
    if (hairRef.current) {
      hairRef.current.rotation.z = Math.sin(time * 2.5) * 0.08;
      hairRef.current.position.y = Math.sin(time * 3) * 0.04;
      hairRef.current.rotation.x = Math.cos(time * 2) * 0.03;
    }

    // Dress swaying elegantly
    if (dressRef.current) {
      dressRef.current.rotation.z = Math.sin(time * 2) * 0.1;
      dressRef.current.scale.x = 1 + Math.sin(time * 4) * 0.04;
    }

    // Different animations based on state
    if (animationState.mood === 'dancing') {
      // Enhanced dancing animation with graceful movements
      const danceIntensity = animationState.intensity;
      const danceSpeed = 5 + (danceIntensity * 3); // Smoother speed variation
      
      // Main body dancing with elegant hip swaying
      groupRef.current.position.y += Math.sin(time * 6) * 0.3 * danceIntensity;
      groupRef.current.rotation.z = Math.sin(time * danceSpeed) * 0.25 * danceIntensity;
      groupRef.current.rotation.x = Math.cos(time * 3) * 0.12 * danceIntensity;
      groupRef.current.rotation.y += Math.sin(time * 2.5) * 0.15 * danceIntensity;
      
      // Graceful side-to-side movement
      groupRef.current.position.x = Math.sin(time * 3.5) * 0.25 * danceIntensity;
      
      // Arms dancing gracefully like a ballet dancer
      if (leftArmRef.current && rightArmRef.current) {
        // Flowing arm movements
        leftArmRef.current.rotation.z = Math.sin(time * danceSpeed) * 0.8 * danceIntensity;
        leftArmRef.current.rotation.x = Math.cos(time * 3) * 0.3 * danceIntensity;
        leftArmRef.current.rotation.y = Math.sin(time * 2.5) * 0.25 * danceIntensity;
        
        rightArmRef.current.rotation.z = -Math.sin(time * danceSpeed + Math.PI/3) * 0.8 * danceIntensity;
        rightArmRef.current.rotation.x = Math.cos(time * 3 + Math.PI) * 0.3 * danceIntensity;
        rightArmRef.current.rotation.y = -Math.sin(time * 2.5 + Math.PI/2) * 0.25 * danceIntensity;
        
        // Elegant arm lifting for high energy
        if (danceIntensity > 0.7) {
          leftArmRef.current.position.y = 0.4 + Math.abs(Math.sin(time * 8)) * 0.15;
          rightArmRef.current.position.y = 0.4 + Math.abs(Math.cos(time * 8)) * 0.15;
        }
      }
      
      // Graceful leg movements
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(time * 6) * 0.4 * danceIntensity;
        rightLegRef.current.rotation.x = -Math.sin(time * 6) * 0.4 * danceIntensity;
        leftLegRef.current.rotation.z = Math.cos(time * 4) * 0.2 * danceIntensity;
        rightLegRef.current.rotation.z = -Math.cos(time * 4) * 0.2 * danceIntensity;
        
        // Gentle stepping effect
        leftLegRef.current.position.y = -1.3 + Math.max(0, Math.sin(time * 6)) * 0.15 * danceIntensity;
        rightLegRef.current.position.y = -1.3 + Math.max(0, Math.sin(time * 6 + Math.PI)) * 0.15 * danceIntensity;
      }

      // Dress flowing dramatically with dance
      if (dressRef.current) {
        dressRef.current.rotation.z = Math.sin(time * 4) * 0.3 * danceIntensity;
        dressRef.current.rotation.y = Math.cos(time * 2.5) * 0.15 * danceIntensity;
        dressRef.current.scale.setScalar(1 + Math.sin(time * 6) * 0.12 * danceIntensity);
      }
      
      // Hair flowing with dance energy
      if (hairRef.current) {
        hairRef.current.rotation.z = Math.sin(time * 3) * 0.15 * danceIntensity;
        hairRef.current.rotation.x = Math.cos(time * 4) * 0.1 * danceIntensity;
        hairRef.current.position.y = 1.5 + Math.sin(time * 8) * 0.08 * danceIntensity;
      }
      
    } else if (animationState.mood === 'singing') {
      // Gentle singing animation with microphone holding pose
      if (headRef.current) {
        headRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.02);
        headRef.current.rotation.y = Math.sin(time * 2.5) * 0.12;
        headRef.current.rotation.x = Math.sin(time * 3) * 0.06;
      }
      
      // Gentle swaying like holding a microphone
      groupRef.current.rotation.x = Math.sin(time * 2) * 0.08;
      groupRef.current.rotation.z = Math.cos(time * 2.5) * 0.06;
      
      // One arm up as if holding microphone
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.4 + Math.sin(time * 3) * 0.15;
        rightArmRef.current.rotation.x = 0.2 + Math.cos(time * 2.5) * 0.08;
      }
      
    } else if (animationState.mood === 'excited') {
      // Excited bouncing with more energy
      groupRef.current.position.y += Math.sin(time * 12) * 0.25;
      groupRef.current.scale.setScalar(1 + Math.sin(time * 10) * 0.08);
      groupRef.current.rotation.y = Math.sin(time * 8) * 0.2;
      groupRef.current.rotation.z = Math.cos(time * 6) * 0.12;
      
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(time * 8) * 0.3;
        headRef.current.position.y += Math.sin(time * 12) * 0.1;
      }
      
      // Arms expressing excitement
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = Math.sin(time * 10) * 0.7;
        rightArmRef.current.rotation.z = -Math.sin(time * 10 + Math.PI/2) * 0.7;
        leftArmRef.current.rotation.y = Math.cos(time * 6) * 0.25;
        rightArmRef.current.rotation.y = -Math.cos(time * 6) * 0.25;
      }
      
    } else if (animationState.mood === 'headbanging') {
      // Rock style headbanging but still cute
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(time * 10) * 0.3;
        headRef.current.position.y = 1.3 + Math.abs(Math.sin(time * 10)) * 0.12;
      }
      
      // Hair flying with headbanging
      if (hairRef.current) {
        hairRef.current.rotation.x = Math.sin(time * 10 + Math.PI/4) * 0.25;
        hairRef.current.position.y = 1.5 + Math.sin(time * 10) * 0.15;
      }
      
      // Body pumping motion
      groupRef.current.rotation.x = Math.sin(time * 5) * 0.15;
      groupRef.current.scale.setScalar(1 + Math.abs(Math.sin(time * 10)) * 0.06);
      
    } else if (animationState.mood === 'spinning') {
      // Graceful spinning dance like a ballerina
      groupRef.current.rotation.y += 0.04;
      groupRef.current.position.y += Math.sin(time * 3) * 0.08;
      
      // Arms extended during spin
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = 0.6;
        rightArmRef.current.rotation.z = -0.6;
        leftArmRef.current.rotation.y = 0.25;
        rightArmRef.current.rotation.y = -0.25;
      }
      
      // Dress twirling beautifully
      if (dressRef.current) {
        dressRef.current.scale.x = 1 + Math.sin(time * 6) * 0.18;
        dressRef.current.scale.z = 1 + Math.sin(time * 6) * 0.18;
      }
    }

    // Smooth color transitions (only when playing)
    if (isPlaying && animationState.color && materials.body.emissive) {
      const targetColor = new THREE.Color(animationState.color);
      materials.body.emissive.lerp(targetColor, 0.02);
      materials.dress.emissive.lerp(targetColor, 0.015);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Anime-style body with perfect proportions */}
      <RoundedBox 
        ref={bodyRef} 
        args={[0.6, 0.9, 0.45]} 
        radius={0.12}
        position={[0, 0.15, 0]} 
        material={materials.body} 
      />
      
      {/* Beautiful flowing dress like in the image */}
      <group ref={dressRef}>
        {/* Main dress layer - elegant and full */}
        <Cone args={[1.2, 1.0, 16]} position={[0, -0.6, 0]} material={materials.dress} />
        {/* Inner dress layer with pink accents */}
        <Cone args={[1.0, 0.8, 12]} position={[0, -0.55, 0]} material={materials.dressAccent} />
        {/* Dress details and ruffles */}
        <Torus args={[1.1, 0.05, 8, 20]} position={[0, -0.3, 0]} material={materials.accessory} />
        <Torus args={[0.9, 0.04, 8, 16]} position={[0, -0.5, 0]} material={materials.accessory} />
        <Torus args={[0.7, 0.03, 8, 12]} position={[0, -0.7, 0]} material={materials.accessory} />
        {/* Dress bow at waist */}
        <Box args={[0.25, 0.1, 0.1]} position={[0, 0.25, 0.28]} material={materials.accessory} />
        <Sphere args={[0.05]} position={[0, 0.25, 0.33]} material={materials.eyeShine} />
      </group>
      
      {/* Larger anime-style head */}
      <Sphere ref={headRef} args={[0.6]} position={[0, 1.25, 0]} material={materials.head} />
      
      {/* Beautiful anime hair design like in the image */}
      <group ref={hairRef} position={[0, 1.45, 0]}>
        {/* Main hair volume - soft and voluminous */}
        <Sphere args={[0.65]} position={[0, 0, -0.12]} material={materials.hair} />
        {/* Cute anime-style bangs */}
        <Sphere args={[0.32]} position={[0, -0.18, 0.42]} material={materials.hair} />
        <Sphere args={[0.22]} position={[-0.22, -0.12, 0.45]} material={materials.hair} />
        <Sphere args={[0.22]} position={[0.22, -0.12, 0.45]} material={materials.hair} />
        {/* Side hair volumes - flowing */}
        <Sphere args={[0.35]} position={[-0.45, -0.15, 0.08]} material={materials.hair} />
        <Sphere args={[0.35]} position={[0.45, -0.15, 0.08]} material={materials.hair} />
        {/* Long flowing hair */}
        <Sphere args={[0.28]} position={[-0.6, -0.4, -0.15]} material={materials.hair} />
        <Sphere args={[0.28]} position={[0.6, -0.4, -0.15]} material={materials.hair} />
        <Sphere args={[0.22]} position={[-0.7, -0.7, -0.25]} material={materials.hair} />
        <Sphere args={[0.22]} position={[0.7, -0.7, -0.25]} material={materials.hair} />
        {/* Hair highlights for depth */}
        <Sphere args={[0.12]} position={[-0.25, 0.08, 0.18]} material={materials.hairHighlight} />
        <Sphere args={[0.12]} position={[0.25, 0.08, 0.18]} material={materials.hairHighlight} />
        <Sphere args={[0.1]} position={[0, 0.15, 0.25]} material={materials.hairHighlight} />
      </group>
      
      {/* Large expressive anime eyes */}
      <group position={[0, 1.25, 0.52]}>
        {/* Eye base */}
        <Sphere args={[0.14]} position={[-0.18, 0.06, 0]} material={materials.eyes} />
        <Sphere args={[0.14]} position={[0.18, 0.06, 0]} material={materials.eyes} />
        
        {/* Main eye shine - large and bright */}
        <Sphere args={[0.055]} position={[-0.16, 0.09, 0.04]} material={materials.eyeShine} />
        <Sphere args={[0.055]} position={[0.2, 0.09, 0.04]} material={materials.eyeShine} />
        
        {/* Secondary shine */}
        <Sphere args={[0.025]} position={[-0.19, 0.03, 0.04]} material={materials.eyeHighlight} />
        <Sphere args={[0.025]} position={[0.17, 0.03, 0.04]} material={materials.eyeHighlight} />
        
        {/* Cute eyelashes effect */}
        <Box args={[0.02, 0.08, 0.01]} position={[-0.25, 0.12, 0.02]} material={materials.eyes} />
        <Box args={[0.02, 0.08, 0.01]} position={[0.25, 0.12, 0.02]} material={materials.eyes} />
      </group>
      
      {/* Sweet blush */}
      <group position={[0, 1.15, 0.5]}>
        <Sphere args={[0.08]} position={[-0.35, 0, 0]} material={materials.blush} />
        <Sphere args={[0.08]} position={[0.35, 0, 0]} material={materials.blush} />
      </group>
      
      {/* Cute smile */}
      <RoundedBox 
        args={[0.12, 0.03, 0.02]} 
        radius={0.015}
        position={[0, 1.08, 0.55]} 
        material={materials.mouth} 
      />
      
      {/* Arms with graceful proportions */}
      <RoundedBox 
        ref={leftArmRef} 
        args={[0.15, 0.7, 0.15]} 
        radius={0.08}
        position={[-0.45, 0.4, 0]} 
        material={materials.limbs} 
      />
      <RoundedBox 
        ref={rightArmRef} 
        args={[0.15, 0.7, 0.15]} 
        radius={0.08}
        position={[0.45, 0.4, 0]} 
        material={materials.limbs} 
      />
      
      {/* Legs - elegant and proportioned */}
      <RoundedBox 
        ref={leftLegRef} 
        args={[0.18, 0.8, 0.18]} 
        radius={0.09}
        position={[-0.2, -1.3, 0]} 
        material={materials.limbs} 
      />
      <RoundedBox 
        ref={rightLegRef} 
        args={[0.18, 0.8, 0.18]} 
        radius={0.09}
        position={[0.2, -1.3, 0]} 
        material={materials.limbs} 
      />
      
      {/* Beautiful hair accessories */}
      <group position={[0, 1.65, 0]}>
        {/* Large decorative hair bow */}
        <Box args={[0.4, 0.15, 0.15]} position={[0, 0, 0]} material={materials.accessory} />
        <Sphere args={[0.08]} position={[0, 0, 0]} material={materials.eyeShine} />
        {/* Bow ribbons */}
        <Cone args={[0.2, 0.35, 6]} position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI/4]} material={materials.accessory} />
        <Cone args={[0.2, 0.35, 6]} position={[0.28, 0, 0]} rotation={[0, 0, -Math.PI/4]} material={materials.accessory} />
        {/* Small hair clips */}
        <Sphere args={[0.06]} position={[-0.5, -0.25, 0]} material={materials.accessory} />
        <Sphere args={[0.06]} position={[0.5, -0.25, 0]} material={materials.accessory} />
      </group>

      {/* Magical sparkles around the character */}
      <group>
        {[...Array(10)].map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const radius = 2.2;
          const height = Math.sin(angle * 2.5) * 0.6;
          return (
            <Sphere 
              key={i}
              args={[0.035]} 
              position={[
                Math.cos(angle) * radius, 
                height + 1.0, 
                Math.sin(angle) * radius * 0.5
              ]} 
              material={materials.eyeShine} 
            />
          );
        })}
      </group>
    </group>
  );
};
