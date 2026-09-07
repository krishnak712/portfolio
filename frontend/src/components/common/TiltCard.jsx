import { useTilt } from "../../hooks/useTilt";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 4,
  perspective = 1000,
  scale = 1.02,
  speed = 300,
  disabled = false,
  onTiltChange,
  style,
  ...props
}) {
  const { ref, tilt, isHovering } = useTilt({
    maxTilt,
    perspective,
    scale,
    speed,
    disabled,
    onTiltChange,
  });

  const cardStyle = {
    ...style,
    transformStyle: "preserve-3d",
    willChange: "transform",
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${isHovering ? "tilt-card-hover" : ""} ${className}`.trim()}
      style={cardStyle}
      {...props}
    >
      {children}
    </div>
  );
}