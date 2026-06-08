import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type TeoPose = "idle" | "walk" | "wave";

type Props = {
  pose?: TeoPose;
  facing?: 1 | -1;
  lookTarget?: { x: number; y: number };
};

const BODY_COLOR = "#cfe8ff";
const BODY_COLOR_DARK = "#a8d2f5";
const EYE_COLOR = "#1f2937";
const CHEEK_COLOR = "#f8b6c4";

export function TeoModel({ pose = "idle", facing = 1, lookTarget }: Props) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const footFL = useRef<THREE.Mesh>(null);
  const footFR = useRef<THREE.Mesh>(null);
  const footBL = useRef<THREE.Mesh>(null);
  const footBR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!root.current || !body.current || !head.current) return;

    // Face direction (Y rotation): facing=1 looks toward camera (slightly), -1 flips
    const targetYaw = facing === 1 ? 0 : Math.PI;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      targetYaw,
      6,
      state.clock.getDelta() + 0.016,
    );

    // Cursor look — small head/body tilt
    const lx = lookTarget?.x ?? 0;
    const ly = lookTarget?.y ?? 0;
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, lx * 0.35, 0.12);
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -ly * 0.25, 0.12);

    // Breathing
    const breathe = 1 + Math.sin(t * 2.2) * 0.025;
    body.current.scale.set(breathe, 2 - breathe, breathe);

    if (pose === "walk") {
      // Bob + slight forward tilt
      root.current.position.y = Math.abs(Math.sin(t * 7)) * 0.08 - 0.02;
      body.current.rotation.z = Math.sin(t * 7) * 0.05;
      body.current.rotation.x = 0.08;
      // Feet alternation
      const a = Math.sin(t * 7);
      const b = Math.sin(t * 7 + Math.PI);
      if (footFL.current) footFL.current.position.y = -0.62 + Math.max(0, a) * 0.08;
      if (footFR.current) footFR.current.position.y = -0.62 + Math.max(0, b) * 0.08;
      if (footBL.current) footBL.current.position.y = -0.62 + Math.max(0, b) * 0.08;
      if (footBR.current) footBR.current.position.y = -0.62 + Math.max(0, a) * 0.08;
      // Arms swing
      if (leftArm.current) leftArm.current.rotation.z = 0.4 + Math.sin(t * 7) * 0.35;
      if (rightArm.current) rightArm.current.rotation.z = -0.4 - Math.sin(t * 7) * 0.35;
    } else if (pose === "wave") {
      root.current.position.y = Math.sin(t * 3) * 0.04;
      body.current.rotation.z = 0;
      body.current.rotation.x = 0;
      if (leftArm.current) leftArm.current.rotation.z = 0.4;
      if (rightArm.current) {
        rightArm.current.rotation.z = -1.6 + Math.sin(t * 10) * 0.4;
        rightArm.current.rotation.x = -0.4;
      }
      [footFL, footFR, footBL, footBR].forEach((f) => {
        if (f.current) f.current.position.y = -0.62;
      });
    } else {
      // idle
      root.current.position.y = Math.sin(t * 2) * 0.04;
      body.current.rotation.z = Math.sin(t * 1.4) * 0.03;
      body.current.rotation.x = 0;
      if (leftArm.current) leftArm.current.rotation.z = 0.45 + Math.sin(t * 1.6) * 0.08;
      if (rightArm.current) {
        rightArm.current.rotation.z = -0.45 - Math.sin(t * 1.6) * 0.08;
        rightArm.current.rotation.x = 0;
      }
      [footFL, footFR, footBL, footBR].forEach((f) => {
        if (f.current) f.current.position.y = -0.62;
      });
    }
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Body group (squashed sphere blob) */}
      <group ref={body}>
        {/* Main body */}
        <mesh castShadow receiveShadow scale={[1, 0.92, 1]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial
            color={BODY_COLOR}
            roughness={0.45}
            metalness={0.05}
            emissive={BODY_COLOR_DARK}
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Head subgroup (for cursor look) */}
        <group ref={head} position={[0, 0.05, 0]}>
          {/* Eyes */}
          <mesh position={[-0.22, 0.05, 0.72]} scale={[1, 1.25, 1]}>
            <sphereGeometry args={[0.07, 32, 32]} />
            <meshStandardMaterial color={EYE_COLOR} roughness={0.3} />
          </mesh>
          <mesh position={[0.22, 0.05, 0.72]} scale={[1, 1.25, 1]}>
            <sphereGeometry args={[0.07, 32, 32]} />
            <meshStandardMaterial color={EYE_COLOR} roughness={0.3} />
          </mesh>

          {/* Smile — torus arc */}
          <mesh position={[0, -0.1, 0.74]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.12, 0.022, 16, 32, Math.PI]} />
            <meshStandardMaterial color={EYE_COLOR} roughness={0.4} />
          </mesh>

          {/* Cheeks */}
          <mesh position={[-0.38, -0.05, 0.62]}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshStandardMaterial color={CHEEK_COLOR} transparent opacity={0.55} roughness={0.7} />
          </mesh>
          <mesh position={[0.38, -0.05, 0.62]}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshStandardMaterial color={CHEEK_COLOR} transparent opacity={0.55} roughness={0.7} />
          </mesh>
        </group>

        {/* Arms */}
        <group ref={leftArm} position={[-0.72, -0.15, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial
              color={BODY_COLOR}
              roughness={0.5}
              emissive={BODY_COLOR_DARK}
              emissiveIntensity={0.08}
            />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.72, -0.15, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial
              color={BODY_COLOR}
              roughness={0.5}
              emissive={BODY_COLOR_DARK}
              emissiveIntensity={0.08}
            />
          </mesh>
        </group>

        {/* Feet — four little nubs at base */}
        <mesh ref={footFL} position={[-0.32, -0.62, 0.32]} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.5} />
        </mesh>
        <mesh ref={footFR} position={[0.32, -0.62, 0.32]} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.5} />
        </mesh>
        <mesh ref={footBL} position={[-0.32, -0.62, -0.32]} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.5} />
        </mesh>
        <mesh ref={footBR} position={[0.32, -0.62, -0.32]} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={BODY_COLOR} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
