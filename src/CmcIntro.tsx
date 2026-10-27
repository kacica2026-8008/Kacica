import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

// 가톨릭중앙의료원 강의 인트로 — Studio 오른쪽 패널에서 문구를 바로 바꿀 수 있습니다.
export const cmcIntroSchema = z.object({
  organization: z.string(),
  titleLines: z.array(z.string()),
  presenter: z.string(),
});

const ACCENT = "#60a5fa";

export const CmcIntro: React.FC<z.infer<typeof cmcIntroSchema>> = ({
  organization,
  titleLines,
  presenter,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 0~1초: 기관명 등장
  const orgIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  // 1~1.7초: 강조선이 왼쪽에서 늘어남
  const lineWidth = interpolate(frame, [25, 50], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // 1.5초~: 제목이 한 줄씩 아래에서 올라옴
  const titleStart = 45;
  const titleGap = 12;
  // 3초~: 강사명 등장
  const presenterIn = spring({ frame: frame - 95, fps, config: { damping: 200 } });
  // 마지막 0.7초: 전체 페이드아웃
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // 배경 원이 천천히 커짐
  const glowScale = interpolate(frame, [0, durationInFrames], [0.9, 1.15]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0b1220 0%, #13254a 100%)",
        fontFamily: "sans-serif",
        color: "white",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -200,
          top: -200,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
          transform: `scale(${glowScale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: 4,
            color: ACCENT,
            opacity: orgIn,
            transform: `translateX(${interpolate(orgIn, [0, 1], [-40, 0])}px)`,
          }}
        >
          {organization}
        </div>
        <div
          style={{
            marginTop: 28,
            marginBottom: 40,
            height: 6,
            width: lineWidth,
            borderRadius: 3,
            backgroundColor: ACCENT,
          }}
        />
        {titleLines.map((line, i) => {
          const lineIn = spring({
            frame: frame - titleStart - i * titleGap,
            fps,
            config: { damping: 200 },
          });
          return (
            <div key={i} style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 120,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  opacity: lineIn,
                  transform: `translateY(${interpolate(lineIn, [0, 1], [100, 0])}%)`,
                }}
              >
                {line}
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 70,
            fontSize: 48,
            fontWeight: 500,
            opacity: presenterIn,
            transform: `translateY(${interpolate(presenterIn, [0, 1], [30, 0])}px)`,
          }}
        >
          강사 <span style={{ fontWeight: 800 }}>{presenter}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
