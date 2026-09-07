import { useEffect, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   IntroScene — lightweight premium Three.js intro
   - Low poly / low particles, capped pixel ratio
   - Cinematic camera push + ambient glow + rings + nodes
   - "KK" monogram via canvas texture (no font loader needed)
   - Fully disposes GPU resources on unmount
   ========================================================= */

function easeInOutCubic(t) {
  if (t < 0) return 0;
  if (t > 1) return 1;
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t) {
  if (t < 0) return 0;
  if (t > 1) return 1;
  return 1 - Math.pow(1 - t, 3);
}

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(84, 216, 230, 0.55)");
  gradient.addColorStop(0.35, "rgba(84, 216, 230, 0.18)");
  gradient.addColorStop(0.65, "rgba(45, 212, 191, 0.06)");
  gradient.addColorStop(1, "rgba(10, 14, 23, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeMonogramTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Outer thin ring
  ctx.strokeStyle = "rgba(84, 216, 230, 0.85)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 196, 0, Math.PI * 2);
  ctx.stroke();

  // Inner faint ring
  ctx.strokeStyle = "rgba(84, 216, 230, 0.28)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 178, 0, Math.PI * 2);
  ctx.stroke();

  // Corner ticks (engineering feel)
  ctx.strokeStyle = "rgba(238, 244, 244, 0.55)";
  ctx.lineWidth = 2;
  const tickLen = 26;
  const radius = 196;
  for (let i = 0; i < 4; i += 1) {
    const angle = (Math.PI / 2) * i + Math.PI / 4;
    const x1 = size / 2 + Math.cos(angle) * (radius - 14);
    const y1 = size / 2 + Math.sin(angle) * (radius - 14);
    const x2 = size / 2 + Math.cos(angle) * (radius + 14);
    const y2 = size / 2 + Math.sin(angle) * (radius + 14);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // KK letters
  ctx.fillStyle = "#f2f7f7";
  ctx.font = "600 150px Geist, Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("KK", size / 2, size / 2 + 8);

  // Sub-caption
  ctx.fillStyle = "rgba(84, 216, 230, 0.9)";
  ctx.font = "500 30px 'JetBrains Mono', monospace";
  ctx.fillText("· · ·", size / 2, size / 2 + 108);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function randomShellPoint(minRadius, maxRadius, target) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const radius =
    minRadius + Math.random() * (maxRadius - minRadius);
  target.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta) * 0.7,
    radius * Math.cos(phi)
  );
  return target;
}

export default function IntroScene({ exiting }) {
  const mountRef = useRef(null);
  const exitingRef = useRef(exiting);

  exitingRef.current = exiting;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const isMobile =
      window.matchMedia("(max-width: 700px)").matches ||
      window.innerWidth < 700;

    /* ---------- renderer / scene / camera ---------- */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    );
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.05);

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.1,
      60
    );
    const CAM_START = { y: 0.65, z: 9.4 };
    const CAM_END = { y: 0.12, z: isMobile ? 6.4 : 5.4 };
    camera.position.set(0, CAM_START.y, CAM_START.z);
    camera.lookAt(0, 0, 0);

    /* ---------- lights ---------- */

    scene.add(new THREE.AmbientLight(0x8fa3b8, 0.55));

    const keyLight = new THREE.DirectionalLight(0xd8f6ff, 1.15);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x2dd4bf, 28, 24, 1.8);
    rimLight.position.set(-5, 2.5, 3.5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x4cd7f6, 14, 20, 1.8);
    fillLight.position.set(3.5, -2, 4);
    scene.add(fillLight);

    /* ---------- world group ---------- */

    const world = new THREE.Group();
    scene.add(world);

    const fadeMaterials = [];
    const track = (material, baseOpacity) => {
      material.transparent = true;
      material.userData.baseOpacity = baseOpacity;
      material.opacity = 0;
      fadeMaterials.push(material);
      return material;
    };

    // Inner solid core
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x131f26,
          metalness: 0.65,
          roughness: 0.32,
          flatShading: true,
        }),
        1
      )
    );
    world.add(core);

    // Cyan wireframe over the core
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(1.15, 1)
      ),
      track(
        new THREE.LineBasicMaterial({ color: 0x54d8e6 }),
        0.5
      )
    );
    wire.scale.setScalar(1.002);
    world.add(wire);

    // Faint outer shell
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(1.72, 1)
      ),
      track(
        new THREE.LineBasicMaterial({ color: 0x2b5560 }),
        0.22
      )
    );
    world.add(shell);

    // Orbit rings
    const rings = [];
    const ringDefs = [
      { radius: 2.05, tube: 0.008, tiltX: Math.PI / 2.25, tiltY: 0.25, speed: 0.22 },
      { radius: 2.4, tube: 0.006, tiltX: Math.PI / 1.8, tiltY: -0.4, speed: -0.16 },
      { radius: 2.75, tube: 0.005, tiltX: Math.PI / 2.6, tiltY: 0.7, speed: 0.1 },
    ];
    ringDefs.forEach((def) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(def.radius, def.tube, 8, 128),
        track(
          new THREE.MeshBasicMaterial({ color: 0x54d8e6 }),
          0.4
        )
      );
      ring.rotation.x = def.tiltX;
      ring.rotation.y = def.tiltY;
      ring.userData.speed = def.speed;
      rings.push(ring);
      world.add(ring);
    });

    // Orbiting nodes on the first two rings
    const nodeGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMat = track(
      new THREE.MeshBasicMaterial({ color: 0xbdf3ff }),
      0.95
    );
    const orbitNodes = [];
    for (let i = 0; i < 6; i += 1) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.userData = {
        ring: i % 2,
        angle: (i / 6) * Math.PI * 2,
        speed: i % 2 === 0 ? 0.35 : -0.28,
      };
      orbitNodes.push(node);
      world.add(node);
    }

    // Ambient dust (subtle, low count)
    const dustCount = isMobile ? 90 : 180;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVec = new THREE.Vector3();
    for (let i = 0; i < dustCount; i += 1) {
      randomShellPoint(3, 6.5, dustVec);
      dustPositions[i * 3] = dustVec.x;
      dustPositions[i * 3 + 1] = dustVec.y;
      dustPositions[i * 3 + 2] = dustVec.z;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );
    const dust = new THREE.Points(
      dustGeo,
      track(
        new THREE.PointsMaterial({
          color: 0x7dd3e0,
          size: 0.025,
          sizeAttenuation: true,
          depthWrite: false,
        }),
        0.5
      )
    );
    world.add(dust);

    // Technical node field around the core
    const nodeCount = isMobile ? 34 : 60;
    const fieldPositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i += 1) {
      randomShellPoint(1.9, 2.9, dustVec);
      fieldPositions[i * 3] = dustVec.x;
      fieldPositions[i * 3 + 1] = dustVec.y;
      fieldPositions[i * 3 + 2] = dustVec.z;
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(fieldPositions, 3)
    );
    const field = new THREE.Points(
      fieldGeo,
      track(
        new THREE.PointsMaterial({
          color: 0xa9ecf5,
          size: 0.035,
          sizeAttenuation: true,
          depthWrite: false,
        }),
        0.85
      )
    );
    world.add(field);

    // Faint connection paths between a few field nodes
    const linkPositions = [];
    for (let i = 0; i < nodeCount - 1; i += 3) {
      linkPositions.push(
        fieldPositions[i * 3],
        fieldPositions[i * 3 + 1],
        fieldPositions[i * 3 + 2],
        fieldPositions[(i + 1) * 3],
        fieldPositions[(i + 1) * 3 + 1],
        fieldPositions[(i + 1) * 3 + 2]
      );
    }
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(linkPositions),
        3
      )
    );
    const links = new THREE.LineSegments(
      linkGeo,
      track(
        new THREE.LineBasicMaterial({ color: 0x2e6b76 }),
        0.35
      )
    );
    world.add(links);

    // Subtle ground grid
    const grid = new THREE.PolarGridHelper(
      4.4, 12, 5, 48,
      0x1d3a40, 0x122024
    );
    grid.position.y = -2.3;
    grid.material.transparent = true;
    grid.material.opacity = 0;
    grid.material.userData = { baseOpacity: 0.28 };
    fadeMaterials.push(grid.material);
    world.add(grid);

    // Ambient glow sprite behind the core
    const glowTexture = makeGlowTexture();
    const glow = new THREE.Sprite(
      track(
        new THREE.SpriteMaterial({
          map: glowTexture,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        0.85
      )
    );
    glow.scale.setScalar(9);
    glow.position.z = -1.6;
    world.add(glow);

    // KK monogram plane
    const monoTexture = makeMonogramTexture();
    const monogram = new THREE.Mesh(
      new THREE.PlaneGeometry(1.55, 1.55),
      track(
        new THREE.MeshBasicMaterial({
          map: monoTexture,
          depthWrite: false,
        }),
        1
      )
    );
    monogram.position.z = 0.7;
    monogram.scale.setScalar(0.9);
    world.add(monogram);

    /* ---------- animation ---------- */

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;
    let fade = 1;
    const tempVec = new THREE.Vector3();

    const applyFade = () => {
      fadeMaterials.forEach((material) => {
        const base = material.userData.baseOpacity ?? 1;
        material.opacity = base * fade;
      });
    };

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Target fade: dissolve when exiting
      const targetFade = exitingRef.current ? 0 : 1;
      fade += (targetFade - fade) * 0.08;
      if (Math.abs(targetFade - fade) < 0.002) fade = targetFade;

      // Cinematic camera push
      const camProgress = easeInOutCubic(t / 5.2);
      camera.position.z =
        CAM_START.z + (CAM_END.z - CAM_START.z) * camProgress;
      camera.position.y =
        CAM_START.y + (CAM_END.y - CAM_START.y) * camProgress;
      if (exitingRef.current) {
        camera.position.z -= 0.012;
      }
      camera.lookAt(0, 0, 0);

      // Core formation
      const formProgress = easeOutCubic(t / 2.2);
      const groupScale =
        (0.8 + 0.2 * formProgress) *
        (exitingRef.current ? 1 + (1 - fade) * 0.08 : 1);
      world.scale.setScalar(Math.max(0.001, groupScale));
      world.position.y = Math.sin(t * 0.6) * 0.08;

      core.rotation.y = t * 0.16;
      core.rotation.x = Math.sin(t * 0.22) * 0.18;
      wire.rotation.copy(core.rotation);
      shell.rotation.y = -t * 0.08;
      shell.rotation.z = t * 0.05;
      dust.rotation.y = t * 0.02;
      field.rotation.y = t * 0.05;
      links.rotation.y = field.rotation.y;

      rings.forEach((ring) => {
        ring.rotation.z += ring.userData.speed * 0.008;
      });

      // Orbiting nodes follow their rings
      orbitNodes.forEach((node) => {
        node.userData.angle += node.userData.speed * 0.012;
        const ring = rings[node.userData.ring];
        const radius = ringDefs[node.userData.ring].radius;
        tempVec.set(
          Math.cos(node.userData.angle) * radius,
          0,
          Math.sin(node.userData.angle) * radius
        );
        tempVec.applyEuler(ring.rotation);
        node.position.copy(tempVec);
      });

      // Staged material reveals (multiplied by global fade later)
      const staged = (material, from, to, base) => {
        material.userData.baseOpacity =
          base * smoothstep(from, to, t);
      };
      staged(glow.material, 0.1, 1.4, 0.85);
      staged(core.material, 0.25, 1.6, 1);
      staged(wire.material, 0.5, 1.9, 0.5);
      staged(shell.material, 0.9, 2.4, 0.22);
      staged(dust.material, 0.7, 2.2, 0.5);
      staged(field.material, 1.4, 2.8, 0.85);
      staged(links.material, 1.6, 3.0, 0.35);
      staged(grid.material, 1.2, 2.6, 0.28);
      rings.forEach((ring, index) => {
        staged(ring.material, 1.0 + index * 0.3, 2.4 + index * 0.3, 0.4);
      });
      staged(nodeMat, 1.8, 3.0, 0.95);
      staged(monogram.material, 2.0, 3.1, 1);

      const monoScale =
        0.9 + 0.1 * easeOutCubic((t - 2.0) / 1.2);
      monogram.scale.setScalar(Math.max(0.001, monoScale));

      applyFade();
      renderer.render(scene, camera);
    };
    animate();

    /* ---------- resize ---------- */

    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
      );
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
        clock.stop();
      } else {
        clock.start();
        if (!running) {
          running = true;
          animate();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    /* ---------- dispose ---------- */

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      world.traverse((object) => {
        const mesh = object;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        } else if (material) {
          if (material.map) material.map.dispose();
          material.dispose();
        }
      });

      glowTexture.dispose();
      monoTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="opening-canvas-layer"
      aria-hidden="true"
    />
  );
}
