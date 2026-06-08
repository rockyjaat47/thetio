import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { TeoModel, type TeoPose } from "./TeoModel";

type Props = {
  pose?: TeoPose;
  facing?: 1 | -1;
  lookTarget?: { x: number; y: number };
  size?: number;
};

export function TeoCanvas({ pose = "idle", facing = 1, lookTarget, size = 140 }: Props) {
  return (
    <div style={{ width: size, height: size }} className="pointer-events-none select-none">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        camera={{ position: [0, 0.3, 3.2], fov: 30 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color="#fff5e6" />
        <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#a8c8ff" />
        <pointLight position={[0, 1.5, 2]} intensity={0.4} color="#ffffff" />
        <TeoModel pose={pose} facing={facing} lookTarget={lookTarget} />
      </Canvas>
    </div>
  );
}
