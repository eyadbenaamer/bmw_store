import { useEffect, useMemo, useRef, useState } from "react";
import SliderSeek from "./SliderSeek";
import noProductPhoto from "assets/no-product.jpg";
import ToggleButtons from "./ToggleButtons";
import { useWindowWidth } from "hooks/useWindowWidth";

const Slider = (props) => {
  const { files } = props;
  const slider = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const windowWidth = useWindowWidth();
  const [slideWidth, setSlideWidth] = useState(slider.current?.clientWidth);
  useEffect(() => {
    setSlideWidth(slider.current?.clientWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (slider) {
      slider.current.addEventListener("scrollend", () => {
        const scroll = Math.round(slider.current.scrollLeft * -1);
        if (scroll / slideWidth == Math.round(scroll / slideWidth)) {
          setCurrentSlide(Math.round(scroll / slideWidth));
        }
      });
      slider.current.scrollTo({
        left: -currentSlide * slideWidth,
        behavior: "smooth",
      });
    }
    const sliderSeek = document.querySelector(".slider-seek");
    const activeSlidePreveiw = document.querySelector(".slide-preview.active");
    sliderSeek.scrollTo({
      left: activeSlidePreveiw?.offsetLeft - 50,
      behavior: "smooth",
    });
  }, [slider.current?.clientWidth, currentSlide]);
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full mx-auto">
        {windowWidth > 768 && (
          <ToggleButtons
            slidesCount={files?.length}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        )}
        <div
          ref={slider}
          className="slider w-full border-2 border-[var(--primary-color)]"
        >
          {!files && (
            <div className="h-[200px] sm:h-[400px] w-full">
              <div className="slide">
                <img src={noProductPhoto} />
              </div>
            </div>
          )}
          {files && slideWidth && (
            <div className="w-max h-[200px] sm:h-[400px]">
              {files.map((file, i) => (
                <div
                  className="inline-block h-full"
                  style={{ width: slideWidth }}
                >
                  <div className="slide">
                    {file.fileType === "photo" ? (
                      <img src={file.path} alt={`صورة ${i + 1}`} />
                    ) : (
                      <video controls alt={`فيديو ${i + 1}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SliderSeek
        slides={files}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
};

export default Slider;
