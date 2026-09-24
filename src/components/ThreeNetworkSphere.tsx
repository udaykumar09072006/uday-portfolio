import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Activity, Sparkles } from 'lucide-react';

interface NetworkNodeData {
  id: string;
  name: string;
  layer: string;
  color: string;
  position: [number, number, number];
}

const KEY_LAYERS: NetworkNodeData[] = [
  { id: 'fe', name: 'Frontend', layer: 'React / Next / Three.js', color: '#00ff88', position: [0, 2.2, 0.4] },
  { id: 'be', name: 'Backend', layer: 'Node.js / Express / Go', color: '#00f0ff', position: [1.8, 1.2, -0.6] },
  { id: 'api', name: 'API', layer: 'REST / GraphQL / gRPC', color: '#38bdf8', position: [-1.9, 0.9, 0.8] },
  { id: 'db', name: 'Database', layer: 'PostgreSQL / Redis / MongoDB', color: '#a855f7', position: [1.5, -1.3, 1.2] },
  { id: 'ai', name: 'AI', layer: 'Gemini / LLM / Vector Embeddings', color: '#00ffaa', position: [-1.4, -1.5, -0.8] },
  { id: 'cloud', name: 'Cloud', layer: 'GCP / Docker / Kubernetes', color: '#06b6d4', position: [0.2, -2.1, 0.3] },
  { id: 'sys', name: 'System Design', layer: 'Distributed / Low-Latency / Caching', color: '#f59e0b', position: [-0.3, 0.2, 2.2] },
];

export const ThreeNetworkSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<NetworkNodeData | null>(KEY_LAYERS[0]);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Setup Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 7;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Network group for rotation & mouse parallax
      const networkGroup = new THREE.Group();
      scene.add(networkGroup);

      // Inner wireframe sphere
      const sphereGeo = new THREE.IcosahedronGeometry(2.2, 2);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
      const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
      networkGroup.add(wireframeSphere);

      // Core pulsating point
      const coreGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const coreSphere = new THREE.Mesh(coreGeo, coreMat);
      networkGroup.add(coreSphere);

      // Distribute nodes around the sphere
      const nodeCount = 45;
      const nodePositions: THREE.Vector3[] = [];
      const nodeGeometries: THREE.Mesh[] = [];

      // Key architectural layer nodes
      KEY_LAYERS.forEach((kl) => {
        const pos = new THREE.Vector3(kl.position[0], kl.position[1], kl.position[2]);
        nodePositions.push(pos);

        const keyNodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const keyNodeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(kl.color),
        });
        const keyNode = new THREE.Mesh(keyNodeGeo, keyNodeMat);
        keyNode.position.copy(pos);
        keyNode.userData = kl;
        networkGroup.add(keyNode);
        nodeGeometries.push(keyNode);

        // Glowing outer halo
        const haloGeo = new THREE.RingGeometry(0.18, 0.22, 16);
        const haloMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(kl.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(pos);
        halo.lookAt(0, 0, 0);
        networkGroup.add(halo);
      });

      // Supplementary network nodes on Fibonacci sphere
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < nodeCount; i++) {
        const y = 1 - (i / (nodeCount - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        const sphereRadius = 2.2 + (Math.random() * 0.2 - 0.1);
        const pos = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);
        nodePositions.push(pos);

        const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
        const nodeMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x00ff88 : 0x00f0ff,
          transparent: true,
          opacity: 0.75,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(pos);
        networkGroup.add(nodeMesh);
      }

      // Connecting network lines between close nodes
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const maxDistance = 1.45;

      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < maxDistance) {
            linePositions.push(
              nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
              nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
            );

            // Subtle cyan to emerald line blend
            const isGreen = (i + j) % 2 === 0;
            const r = isGreen ? 0 : 0;
            const g = isGreen ? 1.0 : 0.85;
            const b = isGreen ? 0.5 : 1.0;
            lineColors.push(r, g, b, r, g, b);
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.25,
      });
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      networkGroup.add(lines);

      // Data flow particles floating along
      const particleCount = 120;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const r = 2.0 + Math.random() * 0.8;
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phiAngle = Math.acos(2.0 * v - 1.0);
        const sinPhi = Math.sin(phiAngle);
        particlePositions[i] = r * sinPhi * Math.cos(theta);
        particlePositions[i + 1] = r * sinPhi * Math.sin(theta);
        particlePositions[i + 2] = r * Math.cos(phiAngle);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 0.055,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      networkGroup.add(particleSystem);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = mouseX * 0.6;
        targetRotationX = -mouseY * 0.4;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Resize Handler
      const handleResize = () => {
        if (!container || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);

      // Render loop with smooth damping
      const clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Base continuous subtle rotation
        networkGroup.rotation.y += 0.0035;
        networkGroup.rotation.x += 0.0015;

        // Smooth mouse damping
        networkGroup.rotation.y += (targetRotationY - networkGroup.rotation.y * 0.1) * 0.02;
        networkGroup.rotation.x += (targetRotationX - networkGroup.rotation.x * 0.1) * 0.02;

        // Core pulse
        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
        coreSphere.scale.set(pulse, pulse, pulse);

        // Particle subtle drift
        particleSystem.rotation.y -= 0.002;

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer?.dispose();
        scene.clear();
      };
    } catch (e) {
      console.warn('WebGL initialization failed, switching to 2D canvas fallback:', e);
      setHasWebGL(false);
    }
  }, []);

  // 2D Canvas fallback if WebGL is unsupported or disabled
  useEffect(() => {
    if (hasWebGL) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render2D = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) * 0.75;

      angle += 0.01;

      // Draw cyber circle & nodes
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      KEY_LAYERS.forEach((node, idx) => {
        const curAngle = angle + (idx * Math.PI * 2) / KEY_LAYERS.length;
        const x = cx + Math.cos(curAngle) * r;
        const y = cy + Math.sin(curAngle) * r * 0.6;

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animId = requestAnimationFrame(render2D);
    };
    render2D();

    return () => cancelAnimationFrame(animId);
  }, [hasWebGL]);

  return (
    <div ref={containerRef} className="relative w-full h-[460px] md:h-[580px] flex items-center justify-center">
      {/* Three.js / Canvas Target */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Subtle background radial aura */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-emerald-500/5 to-transparent pointer-events-none -z-10" />

      {/* Floating Network Overlay Info Badge */}
      <div className="absolute top-4 left-4 md:left-6 z-10">
        <div className="cyber-glass px-3.5 py-2 rounded-lg border border-slate-700/60 shadow-lg text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="font-semibold tracking-wider">3D_SYSTEM_TOPOLOGY</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
            <span>7 DISTRIBUTED NODES</span>
            <span>·</span>
            <span>REAL-TIME GRAPH</span>
          </div>
        </div>
      </div>

      {/* Layer selector tabs at the bottom of the 3D scene */}
      <div className="absolute bottom-4 inset-x-4 md:inset-x-6 z-10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800/90 text-xs font-mono">
          {KEY_LAYERS.map((layer) => {
            const isSelected = activeNode?.id === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveNode(layer)}
                className={`px-2.5 py-1 rounded transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="font-medium">{layer.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Layer detail chip */}
        {activeNode && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeNode.layer}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Synchronized State</span>
          </div>
        )}
      </div>
    </div>
  );
};
