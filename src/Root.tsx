import { Composition } from "remotion";
import { HelloKacica, helloKacicaSchema } from "./HelloKacica";

// 영상(Composition)을 여기에 등록합니다. 새 영상을 만들면 아래에 하나씩 추가하세요.
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HelloKacica"
      component={HelloKacica}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
      schema={helloKacicaSchema}
      defaultProps={{
        title: "AI 실무 교육",
        subtitle: "현장에서 바로 쓰는 생성형 AI",
        presenter: "강사 이름",
      }}
    />
  );
};
