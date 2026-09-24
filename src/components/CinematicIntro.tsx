import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ChevronRight,
  Play,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  AnimationStateMachine,
  CharacterActionState,
  MovementDirection8Way,
} from './game/AnimationStateMachine';
import { gameAudio } from './game/AudioSystem';

interface CinematicIntroProps {
  onComplete: (targetSection?: string) => void;
}

type IntroStage =
  | 'INIT_DARK'        // Scene 1: Dark cyber room, distant silhouette
  | 'PATH_FWD_1'       // Scene 2 & 3: AAA Walk Forward
  | 'PATH_FWD_LEFT'    // Walk Forward-Left
  | 'PATH_FWD_2'       // Walk Forward
  | 'PATH_FWD_RIGHT'   // Walk Forward-Right
  | 'STOP_TURN'        // Decelerate & Turn toward camera
  | 'ARRIVED_IDLE'     // Stand confidently facing viewer
  | 'TRANSITION_RISE'; // Camera rises upward into portfolio

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentStage, setCurrentStage] = useState<IntroStage>('INIT_DARK');
  const [activeAnimState, setActiveAnimState] = useState<CharacterActionState>('IDLE');
  const [initLine, setInitLine] = useState<string>('INITIALIZING UDAY_OS...');
  const [showIdentity, setShowIdentity] = useState<boolean>(false);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Mutable refs for 60fps render loop
  const loopStateRef = useRef<{
    stage: IntroStage;
    isExiting: boolean;
    mouse: { x: number; y: number };
    progress: number;
  }>({
    stage: 'INIT_DARK',
    isExiting: false,
    mouse: { x: 0, y: 0 },
    progress: 0,
  });

  // Mouse tracking for subtle 2.5D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      loopStateRef.current.mouse = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check prefers-reduced-motion: if enabled, skip directly to arrived state
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentStage('ARRIVED_IDLE');
      loopStateRef.current.stage = 'ARRIVED_IDLE';
      setShowIdentity(true);
      setShowSubtitle(true);
      setShowTags(true);
      setShowActions(true);
    }
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (currentStage === 'ARRIVED_IDLE') {
          handleEnter();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage]);

  // Stage timeline dispatcher
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Line 1 -> Line 2
    const tLine2 = setTimeout(() => {
      setInitLine('LOADING DEVELOPER PROFILE...');
    }, 400);

    // Boot complete -> Start Walk Forward
    const tWalk1 = setTimeout(() => {
      setInitLine('SYSTEM STATUS: ONLINE');
      setCurrentStage('PATH_FWD_1');
      loopStateRef.current.stage = 'PATH_FWD_1';
    }, 850);

    // Path 2: Forward-Left
    const tWalkLeft = setTimeout(() => {
      setCurrentStage('PATH_FWD_LEFT');
      loopStateRef.current.stage = 'PATH_FWD_LEFT';
    }, 1800);

    // Path 3: Forward
    const tWalk2 = setTimeout(() => {
      setCurrentStage('PATH_FWD_2');
      loopStateRef.current.stage = 'PATH_FWD_2';
    }, 2800);

    // Path 4: Forward-Right
    const tWalkRight = setTimeout(() => {
      setCurrentStage('PATH_FWD_RIGHT');
      loopStateRef.current.stage = 'PATH_FWD_RIGHT';
    }, 3800);

    // Stop & Turn
    const tStop = setTimeout(() => {
      setCurrentStage('STOP_TURN');
      loopStateRef.current.stage = 'STOP_TURN';
    }, 4900);

    // Arrive in front & idle
    const tIdle = setTimeout(() => {
      setCurrentStage('ARRIVED_IDLE');
      loopStateRef.current.stage = 'ARRIVED_IDLE';
    }, 5400);

    // Sequential text reveal
    const tName = setTimeout(() => setShowIdentity(true), 5650);
    const tTitle = setTimeout(() => setShowSubtitle(true), 6100);
    const tTags = setTimeout(() => setShowTags(true), 6550);
    const tActions = setTimeout(() => setShowActions(true), 6900);

    return () => {
      clearTimeout(tLine2);
      clearTimeout(tWalk1);
      clearTimeout(tWalkLeft);
      clearTimeout(tWalk2);
      clearTimeout(tWalkRight);
      clearTimeout(tStop);
      clearTimeout(tIdle);
      clearTimeout(tName);
      clearTimeout(tTitle);
      clearTimeout(tTags);
      clearTimeout(tActions);
    };
  }, []);

  const handleSkip = () => {
    loopStateRef.current.isExiting = true;
    onComplete();
  };

  const handleEnter = (sectionId?: string) => {
    setCurrentStage('TRANSITION_RISE');
    loopStateRef.current.stage = 'TRANSITION_RISE';
    loopStateRef.current.isExiting = true;

    setTimeout(() => {
      onComplete(sectionId);
    }, 850);
  };

  // Main Three.js Rendering & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080d);
    scene.fog = new THREE.FogExp2(0x06080d, 0.048);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );
    camera.position.set(0, 1.45, 4.5);

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Lighting (Blue / Cyan / Emerald Rim)
    const ambientLight = new THREE.AmbientLight(0x0a101d, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.2);
    keyLight.position.set(2, 5, 4);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanRim.position.set(-5, 3, -5);
    scene.add(cyanRim);

    const emeraldRim = new THREE.DirectionalLight(0x00ff88, 4.0);
    emeraldRim.position.set(5, 3, -5);
    scene.add(emeraldRim);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(70, 70, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = 0;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    scene.add(gridHelper);

    // Subtle reflective floor plane
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x06080d,
      transparent: true,
      opacity: 0.85,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    // Ambient floating particles
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 18;
      particlePos[i + 1] = Math.random() * 4.5 + 0.1;
      particlePos[i + 2] = (Math.random() - 0.5) * 28 - 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // Footstep shockwave rings
    const footstepRings: Array<{ mesh: THREE.Mesh; scale: number; opacity: number }> = [];
    const ringGeo = new THREE.RingGeometry(0.12, 0.22, 32);

    const spawnFootstep = (x: number, z: number) => {
      gameAudio.playFootstep(1.0);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.set(x, 0.02, z);
      scene.add(ringMesh);
      footstepRings.push({ mesh: ringMesh, scale: 0.3, opacity: 0.8 });
    };

    // Character Rig & Mesh Setup
    const characterRoot = new THREE.Group();
    const startZ = -22.0;
    const arrivalZ = -2.85;
    characterRoot.position.set(0, 0, startZ);
    scene.add(characterRoot);

    const textureLoader = new THREE.TextureLoader();
    const charHeight = 2.45;
    const charWidth = (charHeight * 768) / 1376;
    const charGeo = new THREE.PlaneGeometry(charWidth, charHeight);

    const charTexture = textureLoader.load(
      '/images/uday-profile.png',
      undefined,
      undefined,
      () => {
        textureLoader.load('/images/uday_cutout.png', (cutoutFallback) => {
          cutoutFallback.colorSpace = THREE.SRGBColorSpace;
          charMat.map = cutoutFallback;
          rimAuraMat.map = cutoutFallback;
          charMat.needsUpdate = true;
          rimAuraMat.needsUpdate = true;
        }, undefined, () => {
          textureLoader.load('/images/uday_portrait.jpg', (fallback) => {
            fallback.colorSpace = THREE.SRGBColorSpace;
            charMat.map = fallback;
            charMat.needsUpdate = true;
          });
        });
      }
    );
    charTexture.colorSpace = THREE.SRGBColorSpace;

    const charMat = new THREE.MeshStandardMaterial({
      map: charTexture,
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.45,
      metalness: 0.15,
      side: THREE.FrontSide,
    });

    const characterMesh = new THREE.Mesh(charGeo, charMat);
    characterMesh.position.set(0, charHeight / 2, 0);
    characterRoot.add(characterMesh);

    // Rim Aura
    const rimAuraGeo = new THREE.PlaneGeometry(charWidth * 1.05, charHeight * 1.04);
    const rimAuraMat = new THREE.MeshBasicMaterial({
      map: charTexture,
      transparent: true,
      opacity: 0.28,
      color: 0x00f0ff,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rimAuraMesh = new THREE.Mesh(rimAuraGeo, rimAuraMat);
    rimAuraMesh.position.set(0, charHeight / 2, -0.04);
    characterRoot.add(rimAuraMesh);

    // Realistic Floor Shadow
    const shadowGeo = new THREE.PlaneGeometry(charWidth * 0.85, 0.45);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020408,
      transparent: true,
      opacity: 0.85,
    });
    const floorShadow = new THREE.Mesh(shadowGeo, shadowMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.set(0, 0.015, 0);
    characterRoot.add(floorShadow);

    // Kinematics & Path State
    let walkCycle = 0;
    let lastStep = 0;
    let currentX = 0;
    let currentZ = startZ;
    let currentYaw = 0;
    let currentRoll = 0;

    const clock = new THREE.Clock();

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsedTime = clock.getElapsedTime();
      const stage = loopStateRef.current.stage;

      particleCloud.rotation.y = elapsedTime * 0.025;

      // Update footstep rings
      for (let i = footstepRings.length - 1; i >= 0; i--) {
        const item = footstepRings[i];
        item.scale += delta * 1.6;
        item.opacity -= delta * 0.85;
        item.mesh.scale.set(item.scale, item.scale, item.scale);
        (item.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, item.opacity);
        if (item.opacity <= 0) {
          scene.remove(item.mesh);
          footstepRings.splice(i, 1);
        }
      }

      // ==========================================
      // 8-DIRECTIONAL SCRIPTED AAA PATH CHOREOGRAPHY
      // Forward → Forward-Left → Forward → Forward-Right → Stop & Turn
      // ==========================================
      let targetYaw = 0;
      let targetRoll = 0;
      let isMoving = false;
      let speed = 3.6;

      if (stage === 'INIT_DARK') {
        currentX = 0;
        currentZ = startZ;
        camera.position.set(0, 1.45, 4.5);
        characterMesh.position.y = charHeight / 2 + Math.sin(elapsedTime * 1.8) * 0.005;
        setActiveAnimState('IDLE');
      } else if (stage === 'PATH_FWD_1') {
        // Walk Forward: -22 -> -16
        isMoving = true;
        speed = 3.8;
        currentZ += delta * speed;
        targetYaw = 0;
        targetRoll = 0;
        setActiveAnimState('WALK_FORWARD');
      } else if (stage === 'PATH_FWD_LEFT') {
        // Walk Forward-Left: -16 -> -11, x: 0 -> -2.0
        isMoving = true;
        speed = 3.8;
        currentZ += delta * speed;
        currentX -= delta * 1.8;
        targetYaw = -Math.PI / 5; // -36 deg turn
        targetRoll = 0.04; // Banking lean into turn
        setActiveAnimState('WALK_DIAGONAL');
      } else if (stage === 'PATH_FWD_2') {
        // Walk Forward: -11 -> -6.5, x: -2.0 -> -0.8
        isMoving = true;
        speed = 3.8;
        currentZ += delta * speed;
        currentX += delta * 0.9;
        targetYaw = 0;
        targetRoll = 0;
        setActiveAnimState('WALK_FORWARD');
      } else if (stage === 'PATH_FWD_RIGHT') {
        // Walk Forward-Right: -6.5 -> arrivalZ (-2.85), x: -0.8 -> 0.0
        isMoving = true;
        speed = 3.6;
        currentZ += delta * speed;
        if (currentZ > arrivalZ) currentZ = arrivalZ;
        currentX += delta * 0.8;
        if (currentX > 0) currentX = 0;
        targetYaw = Math.PI / 6; // +30 deg turn
        targetRoll = -0.035;
        setActiveAnimState('WALK_DIAGONAL');
      } else if (stage === 'STOP_TURN') {
        // Decelerate & Turn smoothly to face viewer
        isMoving = false;
        currentX += (0 - currentX) * 0.1;
        currentZ += (arrivalZ - currentZ) * 0.1;
        targetYaw = 0; // Face camera
        targetRoll = 0;
        setActiveAnimState('STOP');
      } else if (stage === 'ARRIVED_IDLE') {
        isMoving = false;
        currentX += (0 - currentX) * 0.12;
        currentZ += (arrivalZ - currentZ) * 0.12;
        targetYaw = 0;
        targetRoll = 0;
        setActiveAnimState('IDLE');
      }

      // Smooth Angular Yaw and Banking Roll Interpolation
      currentYaw += (targetYaw - currentYaw) * Math.min(1, delta * 7.5);
      currentRoll += (targetRoll - currentRoll) * Math.min(1, delta * 8.0);

      characterRoot.position.set(currentX, 0, currentZ);
      characterRoot.rotation.y = currentYaw;
      characterMesh.rotation.z = currentRoll;

      // Kinematic Walk Bounce & Lateral Weight Shift
      if (isMoving) {
        walkCycle += delta * 6.8;
        const bob = Math.abs(Math.sin(walkCycle * 2)) * 0.038;
        const sway = Math.sin(walkCycle) * 0.024;

        characterMesh.position.y = charHeight / 2 + bob;
        characterMesh.position.x = sway;
        floorShadow.scale.set(1 + bob * 2, 1 - bob * 2, 1);

        // Footstep timing
        const step = Math.sin(walkCycle);
        if (step > 0.88 && lastStep !== 1) {
          spawnFootstep(currentX - 0.16, currentZ + 0.05);
          lastStep = 1;
        } else if (step < -0.88 && lastStep !== -1) {
          spawnFootstep(currentX + 0.16, currentZ + 0.05);
          lastStep = -1;
        }

        // Camera smoothly follows with cinematic damping
        const progress = Math.min(1, (currentZ - startZ) / (arrivalZ - startZ));
        camera.position.z = 4.5 + progress * 0.9;
        camera.position.y = 1.45 + progress * 0.15;
        camera.lookAt(currentX * 0.3, 1.35, currentZ * 0.3);
      } else if (stage === 'ARRIVED_IDLE') {
        // Natural confident breathing in idle
        const breath = Math.sin(elapsedTime * 1.8) * 0.012;
        characterMesh.position.y = charHeight / 2 + breath;
        characterMesh.position.x += (0 - characterMesh.position.x) * 0.1;
        floorShadow.scale.set(1, 1, 1);

        // Interactive mouse parallax
        const mouseX = loopStateRef.current.mouse.x;
        const mouseY = loopStateRef.current.mouse.y;
        characterMesh.rotation.y += (mouseX * 0.12 - characterMesh.rotation.y) * 0.06;
        characterMesh.rotation.x += (-mouseY * 0.08 - characterMesh.rotation.x) * 0.06;

        rimAuraMesh.position.x = characterMesh.position.x - mouseX * 0.03;
        rimAuraMesh.position.y = characterMesh.position.y - mouseY * 0.02;

        camera.position.x = Math.sin(elapsedTime * 0.5) * 0.04;
        camera.position.y = 1.55 + Math.sin(elapsedTime * 0.7) * 0.02;
        camera.lookAt(0, 1.35, arrivalZ);
      } else if (stage === 'TRANSITION_RISE') {
        // Camera rises upward into portfolio
        camera.position.y += delta * 3.2;
        camera.position.z += delta * 1.8;
        camera.lookAt(0, 1.2, arrivalZ);

        characterRoot.position.y -= delta * 0.8;
        charMat.opacity = Math.max(0, charMat.opacity - delta * 1.2);
        gridHelper.scale.multiplyScalar(1 + delta * 0.35);
        particleCloud.position.y += delta * 1.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-[#06080d] select-none transition-opacity duration-700 font-mono ${
        currentStage === 'TRANSITION_RISE' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-default" />

      {/* Cyber Vignette & Scanlines */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-[#06080d]/85 pointer-events-none" />

      {/* TOP BAR: Header & [ SKIP INTRO → ] */}
      <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex items-center justify-between pointer-events-auto z-20">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold tracking-wider">UDAY_OS // CINEMATIC REEL</span>
          </div>

          <button
            onClick={() => {
              const muted = !isMuted;
              setIsMuted(muted);
              gameAudio.isMuted = muted;
            }}
            className="p-1.5 rounded-lg cyber-glass border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute footstep audio' : 'Mute footstep audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="group px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/60 text-xs text-slate-200 hover:text-emerald-300 transition-all flex items-center gap-2 backdrop-blur-md shadow-lg cursor-pointer"
          title="Skip intro and immediately open developer portfolio (Press ESC)"
        >
          <span className="font-semibold">SKIP INTRO</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:bg-emerald-900 group-hover:text-emerald-200 border border-slate-700/50">
            ESC
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* SCENE 1 INITIALIZATION HUD */}
      {currentStage === 'INIT_DARK' && (
        <div className="absolute bottom-12 left-6 md:left-12 max-w-md z-20 pointer-events-none">
          <div className="cyber-glass p-4 rounded-xl border border-slate-800 backdrop-blur-md shadow-2xl font-mono">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{`> ${initLine}`}</span>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 2 & 3: 8-WAY PATH MOTION TELEMETRY */}
      {(currentStage.startsWith('PATH_') || currentStage === 'STOP_TURN') && (
        <div className="absolute bottom-10 left-6 md:left-12 max-w-xs z-20 pointer-events-none">
          <div className="cyber-glass px-3.5 py-2 rounded-lg border border-slate-800/90 backdrop-blur-md text-xs text-slate-400 flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-bold">STATE: {activeAnimState}</span>
            <span className="text-slate-600">|</span>
            <span>8-WAY KINEMATICS</span>
          </div>
        </div>
      )}

      {/* SCENE 4: ARRIVAL & CONFIDENT DEVELOPER PRESENTATION */}
      {(currentStage === 'ARRIVED_IDLE' || currentStage === 'TRANSITION_RISE') && (
        <div className="absolute inset-x-0 bottom-8 md:bottom-14 flex flex-col items-center justify-center p-4 z-20 pointer-events-auto">
          <div className="w-full max-w-xl text-center">
            {/* System Status Online Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs mb-3 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold tracking-wider">SYSTEM STATUS: ONLINE</span>
            </div>

            {/* UDAY KUMAR */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-cyber drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-all duration-700 ${
                showIdentity ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              UDAY KUMAR
            </h1>

            {/* SOFTWARE ENGINEER */}
            <p
              className={`text-lg sm:text-xl md:text-2xl text-emerald-400 font-bold tracking-widest uppercase mt-1.5 drop-shadow transition-all duration-700 ${
                showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              SOFTWARE ENGINEER
            </p>

            {/* Full-Stack Developer • AI • DSA • Scalable Systems */}
            <p
              className={`text-xs sm:text-sm text-cyan-300 font-mono mt-2 tracking-wider transition-all duration-700 ${
                showTags ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              Full-Stack Developer • AI • DSA • Scalable Systems
            </p>

            {/* Official Introduction Statement */}
            <p
              className={`text-xs sm:text-sm text-slate-200 mt-3 max-w-xl mx-auto leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-700/80 backdrop-blur-md shadow-lg transition-all duration-700 ${
                showTags ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              &ldquo;Hi, I&apos;m Uday Kumar &mdash; a Computer Science developer passionate about DSA, full-stack engineering, scalable systems, and AI. I build real-world software that turns complex problems into practical solutions.&rdquo;
            </p>

            {/* Actions: ENTER PORTFOLIO | VIEW PROJECTS */}
            <div
              className={`mt-6 flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ${
                showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Primary Enter Portfolio Button */}
              <button
                onClick={() => handleEnter()}
                className="group px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_0_25px_rgba(0,255,136,0.35)] hover:shadow-[0_0_35px_rgba(0,255,136,0.6)] flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>ENTER PORTFOLIO</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct View Projects Jump Button */}
              <button
                onClick={() => handleEnter('projects')}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 font-medium text-sm tracking-wider uppercase transition-all duration-200 backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>VIEW PROJECTS</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 font-mono mt-4">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ENTER</kbd> to explore or{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ESC</kbd> to skip intro
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
