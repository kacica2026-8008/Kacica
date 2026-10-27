import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

// Studio 오른쪽 패널에서 이 값들을 바로 바꿔 볼 수 있습니다.
export const helloKacicaSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  presenter: z.string(),
});

export const HelloKacica: React.FC<z.infer<typeof helloKacicaSchema>> = ({
  title,
  subtitle,
  presenter,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const subtitleIn = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const presenterOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        color: "white",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 800,
          transform: `translateY(${interpolate(titleIn, [0, 1], [60, 0])}px)`,
          opacity: titleIn,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 56,
          color: "#93c5fd",
          transform: `translateY(${interpolate(subtitleIn, [0, 1], [40, 0])}px)`,
          opacity: subtitleIn,
        }}
      >
        {subtitle}
      </div>
      <div style={{ marginTop: 80, fontSize: 40, opacity: presenterOpacity }}>
        {presenter}
      </div>
    </AbsoluteFill>
  );
};
