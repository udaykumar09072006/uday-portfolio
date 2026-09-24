import * as THREE from 'three';

export interface CameraConfig {
  defaultDistance: number; // Distance behind character
  runDistance: number;     // Distance when running
  heightOffset: number;    // Look-at height above character
  pitchAngle: number;      // Tilt angle in radians
  damping: number;         // Camera tracking damping
}

export class ThirdPersonCamera {
  public camera: THREE.PerspectiveCamera;
  public currentDistance: number = 4.8;
  public targetDistance: number = 4.8;
  public yawAngle: number = 0; // Camera yaw rotation around character
  public pitchAngle: number = 0.22; // Pitch angle in radians
  public isUserOrbiting: boolean = false;

  private config: CameraConfig = {
    defaultDistance: 4.8,
    runDistance: 6.2,
    heightOffset: 1.45,
    pitchAngle: 0.24,
    damping: 5.5,
  };

  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 1.4, 0);
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 1.4, 0);
  private currentCameraPos: THREE.Vector3 = new THREE.Vector3(0, 2.0, 5.0);
  private bobTimer: number = 0;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.currentCameraPos.copy(camera.position);
  }

  // Update loop called each frame
  public update(
    delta: number,
    characterPosition: THREE.Vector3,
    characterYaw: number,
    characterSpeed: number,
    isInteracting: boolean = false
  ) {
    delta = Math.min(delta, 0.1);

    // Dynamic Camera Distance:
    // Tightens on interaction, expands when running, neutral when walking/idle
    if (isInteracting) {
      this.targetDistance = 3.2;
    } else if (characterSpeed > 3.8) {
      this.targetDistance = this.config.runDistance;
    } else {
      this.targetDistance = this.config.defaultDistance;
    }

    // Smoothly interpolate distance
    this.currentDistance += (this.targetDistance - this.currentDistance) * Math.min(1, delta * 4.0);

    // Auto-adjust camera yaw to align behind character when actively moving forward
    if (!this.isUserOrbiting && characterSpeed > 0.5) {
      // Calculate angle diff between camera yaw and character facing direction
      let diff = characterYaw - this.yawAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;

      // Smoothly rotate camera yaw behind player
      this.yawAngle += diff * Math.min(1, delta * 2.8);
    }

    // Subtle walking camera bob & cinematic sway
    let bobX = 0;
    let bobY = 0;
    if (characterSpeed > 0.3) {
      this.bobTimer += delta * (characterSpeed > 4.0 ? 11.5 : 7.2);
      bobY = Math.sin(this.bobTimer * 2) * 0.024;
      bobX = Math.cos(this.bobTimer) * 0.018;
    }

    // Calculate desired camera position in world space
    const horizontalDistance = this.currentDistance * Math.cos(this.pitchAngle);
    const verticalDistance = this.currentDistance * Math.sin(this.pitchAngle);

    const targetX = characterPosition.x - Math.sin(this.yawAngle) * horizontalDistance + bobX;
    const targetZ = characterPosition.z - Math.cos(this.yawAngle) * horizontalDistance;
    const targetY = Math.max(0.6, characterPosition.y + this.config.heightOffset + verticalDistance + bobY);

    // Exponential smoothing (spring damping)
    const dampFactor = 1.0 - Math.exp(-this.config.damping * delta);
    this.currentCameraPos.x += (targetX - this.currentCameraPos.x) * dampFactor;
    this.currentCameraPos.y += (targetY - this.currentCameraPos.y) * dampFactor;
    this.currentCameraPos.z += (targetZ - this.currentCameraPos.z) * dampFactor;

    this.camera.position.copy(this.currentCameraPos);

    // Target Look-At (focus on character upper chest/head with subtle lead)
    this.targetLookAt.set(
      characterPosition.x,
      characterPosition.y + this.config.heightOffset,
      characterPosition.z
    );

    this.currentLookAt.lerp(this.targetLookAt, Math.min(1, delta * 8.0));
    this.camera.lookAt(this.currentLookAt);
  }

  // Handle user mouse / touch orbit drag
  public onOrbitDrag(deltaX: number, deltaY: number) {
    this.isUserOrbiting = true;
    const sensitivity = 0.0035;

    this.yawAngle -= deltaX * sensitivity;
    this.pitchAngle += deltaY * sensitivity;

    // Clamp pitch angle so camera doesn't flip or go under floor
    this.pitchAngle = Math.max(0.05, Math.min(1.15, this.pitchAngle));
  }

  public endOrbitDrag() {
    this.isUserOrbiting = false;
  }
}
