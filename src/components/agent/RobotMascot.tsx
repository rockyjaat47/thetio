import waveImg from "@/assets/robot/robot-wave.png";
import walkImg from "@/assets/robot/robot-walk.png";
import happyImg from "@/assets/robot/robot-happy.png";
import pointImg from "@/assets/robot/robot-point.png";

export type RobotPose = "wave" | "walk" | "happy" | "point";

const POSE_SRC: Record<RobotPose, string> = {
  wave: waveImg,
  walk: walkImg,
  happy: happyImg,
  point: pointImg,
};

export function RobotMascot({ pose = "wave", size = 96 }: { pose?: RobotPose; size?: number }) {
  return (
    <img
      src={POSE_SRC[pose]}
      alt="Teo the AI assistant"
      width={size}
      height={size}
      draggable={false}
      className="select-none drop-shadow-[0_12px_24px_rgba(30,90,200,0.35)]"
      style={{ width: size, height: size }}
    />
  );
}
