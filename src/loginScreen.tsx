import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SignageLoginBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#07101f", 8, 28);

    const camera = new THREE.PerspectiveCamera(46, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.2, 12.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor("#07101f", 1);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#d8eaff", 0.55);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight("#58dcff", 18, 22, 2);
    cyanLight.position.set(-4, 2.5, 5);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight("#5b86ff", 12, 18, 2);
    blueLight.position.set(4.5, -2, 4);
    scene.add(blueLight);

    const softTopLight = new THREE.PointLight("#b8f1ff", 10, 16, 2);
    softTopLight.position.set(0, 4, 3);
    scene.add(softTopLight);

    const screenGroup = new THREE.Group();
    scene.add(screenGroup);

    type ScreenUnit = {
      root: THREE.Group;
      frame: THREE.Mesh;
      inner: THREE.Mesh;
      glow: THREE.Mesh;
      progress: THREE.Mesh;
      bars: THREE.Mesh[];
      preview: THREE.Mesh;
      previewAccent: THREE.Mesh;
      seed: number;
      speed: number;
      baseRotationX: number;
      baseRotationY: number;
      baseRotationZ: number;
    };

    const screens: ScreenUnit[] = [];
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(9999, 9999);
    let hoveredScreenIndex = -1;

    const layout = [
      // cluster left-top
      { x: -9.4, y: 4.8, z: -7.2, w: 1.45, h: 2.35, color: "#79e7ff" },
      { x: -7.1, y: 2.6, z: -5.1, w: 2.9, h: 1.7, color: "#91f0ff" },
      { x: -5.3, y: 5.9, z: -8.8, w: 1.25, h: 2.05, color: "#71d8ff" },
      { x: -3.8, y: 3.4, z: -6.3, w: 2.4, h: 1.45, color: "#7cecff" },
      { x: -8.5, y: 0.4, z: -8.9, w: 1.15, h: 1.9, color: "#84dcff" },

      // cluster center
      { x: -1.8, y: 5.7, z: -9.3, w: 1.1, h: 1.85, color: "#7bdfff" },
      { x: 0.6, y: 3.6, z: -5.0, w: 3.15, h: 1.95, color: "#8bb5ff" },
      { x: 2.2, y: 0.8, z: -4.4, w: 2.8, h: 1.7, color: "#66dfff" },
      { x: -0.9, y: -2.6, z: -4.2, w: 1.4, h: 2.3, color: "#82ebff" },
      { x: 1.5, y: -4.8, z: -7.9, w: 2.2, h: 1.3, color: "#8aaeff" },
      { x: -2.7, y: -5.6, z: -8.6, w: 1.2, h: 2.0, color: "#90eeff" },

      // cluster right
      { x: 5.2, y: 4.9, z: -8.7, w: 2.0, h: 1.2, color: "#8edfff" },
      { x: 7.0, y: 1.7, z: -6.0, w: 1.35, h: 2.15, color: "#7a8fff" },
      { x: 9.1, y: 3.0, z: -9.5, w: 1.1, h: 1.85, color: "#79e7ff" },
      { x: 8.7, y: -1.8, z: -7.3, w: 2.4, h: 1.45, color: "#72e3ff" },
      { x: 6.1, y: -4.9, z: -8.9, w: 1.25, h: 2.05, color: "#89b9ff" },
      { x: 10.0, y: -4.1, z: -9.8, w: 1.05, h: 1.7, color: "#6fe5ff" },
    ];

    layout.forEach((item, index) => {
      const root = new THREE.Group();
      root.position.set(item.x, item.y, item.z);
      const baseRotationZ = (index % 2 === 0 ? -1 : 1) * 0.05;
      const baseRotationY = (index % 2 === 0 ? -1 : 1) * 0.12;
      const baseRotationX = ((index % 3) - 1) * 0.04;
      root.rotation.z = baseRotationZ;
      root.rotation.y = baseRotationY;
      root.rotation.x = baseRotationX;

      const frame = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w, item.h, 1, 1),
        new THREE.MeshBasicMaterial({
          color: "#0e1a30",
          transparent: true,
          opacity: 0.88,
          depthWrite: false,
        }),
      );
      root.add(frame);

      const inner = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w * 0.9, item.h * 0.82, 1, 1),
        new THREE.MeshBasicMaterial({
          color: "#112644",
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
        }),
      );
      inner.position.z = 0.01;
      root.add(inner);

      const preview = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w * 0.56, item.h * 0.3, 1, 1),
        new THREE.MeshBasicMaterial({
          color: "#1a3558",
          transparent: true,
          opacity: 0,
          depthWrite: false,
        }),
      );
      preview.position.set(0.02, item.h * 0.08, 0.025);
      root.add(preview);

      const previewAccent = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w * 0.22, item.h * 0.18, 1, 1),
        new THREE.MeshBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        }),
      );
      previewAccent.position.set(item.w * 0.14, item.h * 0.08, 0.03);
      root.add(previewAccent);

      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w * 1.08, item.h * 1.08, 1, 1),
        new THREE.MeshBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: 0.08,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      glow.position.z = -0.02;
      root.add(glow);

      const bars: THREE.Mesh[] = [];
      for (let i = 0; i < 4; i++) {
        const bar = new THREE.Mesh(
          new THREE.PlaneGeometry(item.w * (0.35 + Math.random() * 0.25), item.h * 0.08),
          new THREE.MeshBasicMaterial({
            color: i === 0 ? item.color : "#6b88b8",
            transparent: true,
            opacity: 0,
            depthWrite: false,
          }),
        );
        bar.position.set(-item.w * 0.22 + Math.random() * item.w * 0.14, item.h * 0.2 - i * item.h * 0.17, 0.02);
        root.add(bar);
        bars.push(bar);
      }

      const progressTrack = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w * 0.62, item.h * 0.06),
        new THREE.MeshBasicMaterial({
          color: "#22395f",
          transparent: true,
          opacity: 0.82,
          depthWrite: false,
        }),
      );
      progressTrack.position.set(0, -item.h * 0.24, 0.02);
      root.add(progressTrack);

      const progress = new THREE.Mesh(
        new THREE.PlaneGeometry(item.w * 0.32, item.h * 0.06),
        new THREE.MeshBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        }),
      );
      progress.position.set(-item.w * 0.15, -item.h * 0.24, 0.03);
      root.add(progress);

      screenGroup.add(root);
      screens.push({
        root,
        frame,
        inner,
        glow,
        progress,
        bars,
        preview,
        previewAccent,
        seed: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.16,
        baseRotationX,
        baseRotationY,
        baseRotationZ,
      });
    });

    const linkMaterial = new THREE.LineBasicMaterial({
      color: "#69dcff",
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linkPositions: number[] = [];
    const linkPairs = [
      [0, 1],
      [1, 3],
      [3, 4],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [11, 12],
      [12, 14],
      [14, 15],
      [15, 16],
      [1, 6],
      [7, 12],
      [3, 8],
    ];
    linkPairs.forEach(([ai, bi]) => {
      const a = layout[ai];
      const b = layout[bi];
      linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });

    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linkPositions, 3));
    const links = new THREE.LineSegments(linkGeometry, linkMaterial);
    scene.add(links);

    const particleCount = 1800;
    const starCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBase = new Float32Array(particleCount * 3);
    const particleSeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 13;
      const z = -1 - Math.random() * 10;

      particlePositions[i3] = x;
      particlePositions[i3 + 1] = y;
      particlePositions[i3 + 2] = z;

      particleBase[i3] = x;
      particleBase[i3 + 1] = y;
      particleBase[i3 + 2] = z;
      particleSeeds[i] = Math.random() * Math.PI * 2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: "#d4f8ff",
        size: 0.045,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 34;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 20;
      starPositions[i3 + 2] = -8 - Math.random() * 14;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: "#dff7ff",
        size: 0.05,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    scene.add(stars);
    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      pointer.x = 9999;
      pointer.y = 9999;
      hoveredScreenIndex = -1;
    };

    const projectedScreenPosition = new THREE.Vector3();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(
        screens.map((screen) => screen.frame),
        false,
      );
      hoveredScreenIndex =
        intersections.length > 0 ? screens.findIndex((screen) => screen.frame === intersections[0].object) : -1;

      screens.forEach((screen, index) => {
        const drift = Math.sin(t * screen.speed + screen.seed);
        const sway = Math.cos(t * (screen.speed * 0.8) + screen.seed * 1.2);

        projectedScreenPosition.copy(screen.root.position);
        projectedScreenPosition.project(camera);

        const dx = projectedScreenPosition.x - pointer.x;
        const dy = projectedScreenPosition.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 0.58);
        const repelX = distance > 0.0001 ? (dx / distance) * influence * 0.42 : 0;
        const repelY = distance > 0.0001 ? (dy / distance) * influence * 0.26 : 0;
        const repelZ = influence * -0.28;

        screen.root.position.y = layout[index].y + drift * 0.12 + repelY;
        screen.root.position.x = layout[index].x + sway * 0.08 + repelX;
        screen.root.position.z = layout[index].z + repelZ;
        const isHovered = hoveredScreenIndex === index;

        screen.root.rotation.z = screen.baseRotationZ * 0.8 + drift * 0.03 + (isHovered ? 0.035 : 0);
        screen.root.rotation.y = screen.baseRotationY * 0.85 + sway * 0.03 + (isHovered ? 0.08 : 0);
        screen.root.rotation.x =
          screen.baseRotationX * 0.9 + Math.sin(t * 0.45 + screen.seed) * 0.015 - (isHovered ? 0.03 : 0);

        const targetScale = isHovered ? 1.04 : 1;
        screen.root.scale.x += (targetScale - screen.root.scale.x) * 0.12;
        screen.root.scale.y += (targetScale - screen.root.scale.y) * 0.12;
        screen.root.scale.z += (targetScale - screen.root.scale.z) * 0.12;

        const glowMat = screen.glow.material as THREE.MeshBasicMaterial;
        const baseGlowOpacity = 0.05 + (Math.sin(t * 0.9 + screen.seed) + 1) * 0.025;
        glowMat.opacity = baseGlowOpacity + (isHovered ? 0.14 : 0);

        const frameMat = screen.frame.material as THREE.MeshBasicMaterial;
        frameMat.opacity += ((isHovered ? 1 : 0.88) - frameMat.opacity) * 0.14;

        const innerMat = screen.inner.material as THREE.MeshBasicMaterial;
        innerMat.color.set(isHovered ? "#2f68b3" : "#062755");
        innerMat.opacity += ((isHovered ? 0.98 : 0.92) - innerMat.opacity) * 0.14;

        const previewMat = screen.preview.material as THREE.MeshBasicMaterial;
        previewMat.opacity += ((isHovered ? 0.92 : 0) - previewMat.opacity) * 0.16;
        previewMat.color.set(isHovered ? "#18355c" : "#1a3558");

        const previewAccentMat = screen.previewAccent.material as THREE.MeshBasicMaterial;
        previewAccentMat.opacity += ((isHovered ? 0.95 : 0) - previewAccentMat.opacity) * 0.18;
        screen.previewAccent.scale.x = 0.9 + Math.sin(t * 1.2 + screen.seed) * 0.08 + (isHovered ? 0.18 : 0);

        screen.bars.forEach((bar, barIndex) => {
          const barMat = bar.material as THREE.MeshBasicMaterial;
          barMat.opacity += ((isHovered ? (barIndex === 0 ? 0.8 : 0.42) : 0) - barMat.opacity) * 0.16;
          bar.scale.x = 0.88 + Math.sin(t * 0.8 + screen.seed + barIndex) * 0.08 + (isHovered ? 0.12 : 0);
          const targetX = isHovered
            ? [-0.06, -0.14, -0.02, -0.18][barIndex] ?? -0.08
            : [-0.18, -0.12, -0.16, -0.1][barIndex] ?? -0.12;
          bar.position.x += (targetX - bar.position.x) * 0.16;
        });

        const progressMat = screen.progress.material as THREE.MeshBasicMaterial;
        progressMat.opacity += ((isHovered ? 0.9 : 0) - progressMat.opacity) * 0.16;
        screen.progress.scale.x = 0.75 + (Math.sin(t * 0.7 + screen.seed) + 1) * 0.18 + (isHovered ? 0.18 : 0);
      });

      const attr = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const seed = particleSeeds[i];
        const bx = particleBase[i3];
        const by = particleBase[i3 + 1];
        const bz = particleBase[i3 + 2];

        attr.setX(i, bx + Math.sin(t * 0.16 + seed) * 0.14);
        attr.setY(i, by + Math.cos(t * 0.18 + seed * 1.3) * 0.12);
        attr.setZ(i, bz + Math.sin(t * 0.12 + seed * 0.8) * 0.2);
      }
      attr.needsUpdate = true;

      links.rotation.z = Math.sin(t * 0.08) * 0.03;
      stars.rotation.z = Math.sin(t * 0.03) * 0.02;
      stars.rotation.y = t * 0.01;

      camera.position.x = Math.sin(t * 0.08) * 0.28;
      camera.position.y = Math.cos(t * 0.06) * 0.22;
      camera.lookAt(0, 0, -6.8);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(frameId);

      screens.forEach((screen) => {
        screen.root.children.forEach((child) => {
          const mesh = child as THREE.Mesh;
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
      });

      linkGeometry.dispose();
      linkMaterial.dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      starGeometry.dispose();
      (stars.material as THREE.Material).dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(circle at 20% 15%, #153052 0%, #0b1b33 28%, #07101f 68%, #040913 100%)",
      }}
    >
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(circle at 14% 24%, rgba(88, 220, 255, 0.14), transparent 20%)",
            "radial-gradient(circle at 86% 58%, rgba(91, 134, 255, 0.12), transparent 22%)",
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 20%, rgba(0,0,0,0.12) 100%)",
            "radial-gradient(circle at center, transparent 42%, rgba(3, 7, 16, 0.14) 72%, rgba(3, 7, 16, 0.48) 100%)",
          ].join(","),
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: [
            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 18%, rgba(0,0,0,0.08) 100%)",
            "radial-gradient(circle at center, transparent 46%, rgba(3, 7, 16, 0.12) 72%, rgba(3, 7, 16, 0.38) 100%)",
          ].join(","),
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "min(100%, 430px)",
            borderRadius: 28,
            padding: "2rem",
            background: "linear-gradient(180deg, rgba(9, 16, 29, 0.82), rgba(8, 13, 24, 0.62))",
            border: "1px solid rgba(131, 214, 255, 0.14)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.36), 0 0 36px rgba(88, 220, 255, 0.08)",
            backdropFilter: "blur(14px)",
            color: "rgba(241, 247, 255, 0.95)",
            fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          }}
        >
          <div
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(148, 228, 255, 0.78)",
              marginBottom: "0.9rem",
            }}
          >
            Screen orchestration
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              margin: "0.9rem 0 1.6rem",
              lineHeight: 1.6,
              color: "rgba(220, 231, 245, 0.74)",
            }}
          >
            Sign in to manage screens, playlists and content distribution.
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: "0.95rem" }}>
            <label style={{ display: "grid", gap: "0.45rem" }}>
              <span style={{ fontSize: "0.92rem", color: "rgba(214, 227, 243, 0.84)" }}>Email</span>
              <input
                type="email"
                placeholder="you@company.com"
                defaultValue="admin@eyeflow.io"
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 14,
                  border: "1px solid rgba(130, 182, 255, 0.14)",
                  background: "rgba(18, 33, 58, 0.9)",
                  color: "rgba(241, 247, 255, 0.95)",
                  padding: "0 1rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: "0.45rem" }}>
              <span style={{ fontSize: "0.92rem", color: "rgba(214, 227, 243, 0.84)" }}>Password</span>
              <input
                type="password"
                placeholder="••••••••••••"
                defaultValue="password"
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 14,
                  border: "1px solid rgba(130, 182, 255, 0.14)",
                  background: "rgba(18, 33, 58, 0.9)",
                  color: "rgba(241, 247, 255, 0.95)",
                  padding: "0 1rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                marginTop: "0.2rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  fontSize: "0.92rem",
                  color: "rgba(214, 227, 243, 0.76)",
                }}
              >
                <input type="checkbox" defaultChecked />
                Remember me
              </label>

              <a
                href="#"
                style={{
                  color: "rgba(124, 236, 255, 0.9)",
                  textDecoration: "none",
                  fontSize: "0.92rem",
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                height: 52,
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #72e8ff 0%, #57c9ff 100%)",
                color: "#0b2034",
                fontWeight: 700,
                fontSize: "0.98rem",
                cursor: "pointer",
                marginTop: "0.35rem",
                boxShadow: "0 12px 28px rgba(87, 201, 255, 0.22)",
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
