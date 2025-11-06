export interface KaraokeState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  youtubeUrl: string;
}

export interface GirlAnimationState {
  mood: 'happy' | 'excited' | 'dancing' | 'singing' | 'idle' | 'headbanging' | 'spinning';
  intensity: number;
  color: string;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface AnimationSettings {
  bounceIntensity: number;
  rotationSpeed: number;
  colorTransition: boolean;
  particleEffect: boolean;
}