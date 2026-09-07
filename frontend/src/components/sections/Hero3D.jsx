import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./css/Hero3D.css";

/* =========================================================
   Hero3D — small decorative 3D satellite beside the Hero
   profile image. Rendered ONLY inside Hero.jsx.
   ---------------------------------------------------------
   - 5 lightweight meshes: matte core, cyan wireframe shell,
     one orbit ring, a few service nodes, soft glow sprite.
   - Slow rotation + gentle float; subtly follows the cursor
     over the Hero and eases larger on wrapper hover.
   - pointer-events: none — never blocks buttons/links/text.
   - Profile image is untouched (separate layer, never rotated).
   - Static single frame under prefers-reduced-motion;
     simplified geometry + pixelRatio 1 on mobile.
   - Fully disposes Three.js resources on unmount.
   ========================================================= */

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(84, 216, 230, 0.35)");
  gradient.addColorStop(0.5, "rgba(84, 216, 230, 0.1)");
  gradient.addColorStop(1, "rgba(10, 14, 23, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile =
      window.matchMedia("(max-width: 700px)").matches ||
      window.innerWidth < 700;
    const canHover = window.matchMedia(
      "(hover: hover)"
    ).matches;

    /* ---------- renderer / scene / camera ---------- */

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.1,
      30
    );
    camera.position.set(0, 0.2, 5.2);
    camera.lookAt(0, 0, 0);

    /* ---------- lights ---------- */

    scene.add(
      new THREE.HemisphereLight(0x9db8c0, 0x0a0e17, 0.6)
    );
    const keyLight = new THREE.DirectionalLight(
      0xd8f6ff,
      1.0
    );
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    if (!isMobile) {
      const rimLight = new THREE.PointLight(
        0x2dd4bf,
        8,
        12,
        1.8
      );
      rimLight.position.set(-2.5, 1.5, 2.5);
      scene.add(rimLight);
    }

    /* ---------- satellite group ---------- */

    const group = new THREE.Group();
    scene.add(group);

    const tilt = new THREE.Group();
    group.add(tilt);

    // Matte dark core.
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.MeshStandardMaterial({
        color: 0x16211f,
        metalness: 0.4,
        roughness: 0.55,
        flatShading: true,
      })
    );
    tilt.add(core);

    // Cyan wireframe shell.
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(0.72, 0)
      ),
      new THREE.LineBasicMaterial({
        color: 0x54d8e6,
        transparent: true,
        opacity: 0.35,
      })
    );
    tilt.add(shell);

    // Single orbit ring.
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.012, 8, 64),
      new THREE.MeshBasicMaterial({
        color: 0x54d8e6,
        transparent: true,
        opacity: 0.4,
      })
    );
    ring.rotation.x = Math.PI / 2.2;
    ring.rotation.y = 0.3;
    tilt.add(ring);

    // Service nodes riding the ring.
    const nodeCount = isMobile ? 4 : 6;
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x86ccd6,
    });
    for (let i = 0; i < nodeCount; i += 1) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      node.position.set(
        Math.cos(angle) * 1.0,
        0,
        Math.sin(angle) * 1.0
      );
      // Match the ring tilt so nodes sit on the ring.
      node.position.applyEuler(ring.rotation);
      nodeGroup.add(node);
    }
    tilt.add(nodeGroup);

    // Soft glow backdrop.
    const glowTexture = makeGlowTexture();
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })
    );
    glow.scale.setScalar(3.2);
    glow.position.z = -0.8;
    group.add(glow);

    /* ---------- cursor interaction (hero-level) ---------- */

    const hero = mount.closest(".hero");
    const wrapper = mount.closest(".hero-profile-wrapper");
    const cursor = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      hoverT: 0,
      hovering: false,
    };

    const onMouseMove = (event) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      cursor.tx =
        ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      cursor.ty =
        ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    };
    const onEnter = () => {
      cursor.hovering = true;
    };
    const onLeave = () => {
      cursor.hovering = false;
      cursor.tx = 0;
      cursor.ty = 0;
    };

    if (canHover && !reducedMotion) {
      hero?.addEventListener("mousemove", onMouseMove);
      wrapper?.addEventListener("mouseenter", onEnter);
      wrapper?.addEventListener("mouseleave", onLeave);
    }

    /* ---------- shared loop state (declared before both paths) ---------- */

    const clock = new THREE.Clock();
    const spin = isMobile ? 0.16 : 0.26;
    let rafId = 0;
    let running = true;

    const handleResize = () => {
      camera.aspect =
        mount.clientWidth / Math.max(1, mount.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    function dispose() {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
      hero?.removeEventListener("mousemove", onMouseMove);
      wrapper?.removeEventListener("mouseenter", onEnter);
      wrapper?.removeEventListener("mouseleave", onLeave);

      group.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        const material = object.material;
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
      nodeGeo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    }

    /* ---------- static frame for reduced motion ---------- */

    const renderStatic = () => {
      group.rotation.set(0.3, 0.9, 0);
      tilt.rotation.set(0, 0, 0);
      group.scale.setScalar(1);
      renderer.render(scene, camera);
    };

    /* ---------- live loop: slow spin + float + cursor ---------- */

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      const dt = Math.min(0.05, clock.getDelta());
      const elapsed = clock.elapsedTime;
      const k = 1 - Math.exp(-dt * 4);

      cursor.x += (cursor.tx - cursor.x) * k;
      cursor.y += (cursor.ty - cursor.y) * k;
      cursor.hoverT +=
        ((cursor.hovering ? 1 : 0) - cursor.hoverT) * k;

      group.rotation.y += dt * spin * (1 + cursor.hoverT * 0.7);
      tilt.rotation.x = cursor.y * 0.32;
      tilt.rotation.y = cursor.x * 0.45;
      group.position.y = Math.sin(elapsed * 0.9) * 0.09;
      group.scale.setScalar(1 + cursor.hoverT * 0.12);

      core.rotation.y -= dt * 0.12;
      shell.rotation.y += dt * 0.08;
      nodeGroup.rotation.y -= dt * 0.22;
      ring.rotation.z += dt * 0.1;

      renderer.render(scene, camera);
    };

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

    if (reducedMotion) {
      renderStatic();

      const onResize = () => {
        handleResize();
        renderStatic();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        dispose();
      };
    }

    animate();
    window.addEventListener("resize", handleResize);
    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return dispose;
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-3d"
      aria-hidden="true"
    />
  );
}
