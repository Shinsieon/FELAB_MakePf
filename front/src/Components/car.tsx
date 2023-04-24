import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { useMemo } from "react";
const SlideWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: JSX.Element[];
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
}
export default function SimpleSlider({
  children,
  className,
  autoplay = true,
  speed = 300,
  loop = true,
}: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 2000 : autoplay,
    }),
    [autoplay, loop, speed]
  );
  return (
    <SlideWrapper>
      <Slider {...settings}>
        {children.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </Slider>
    </SlideWrapper>
  );
}
