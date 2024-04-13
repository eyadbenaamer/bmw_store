import { useEffect, useRef, useState } from "react";
import SliderSeek from "./SliderSeek";
import noProductPhoto from "assets/no-product.jpg";

const Slider = (props) => {
  const { files } = props;
  const slider = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (slider) {
      const slidesCount = slider.current.children[0].children.length;
      const sildeWidth = slider.current.children[0].offsetWidth / slidesCount;
      slider.current.addEventListener("scroll", () => {
        const scroll = slider.current.scrollLeft * -1;
        if (scroll / sildeWidth == Math.ceil(scroll / sildeWidth)) {
          setCurrentSlide(scroll / sildeWidth);
        }
      });
      slider.current.scrollTo({
        left: -currentSlide * sildeWidth,
        behavior: "smooth",
      });
    }
    const sliderSeek = document.querySelector(".slider-seek");
    const activeSlidePreveiw = document.querySelector(".slide-preview.active");
    sliderSeek.scrollTo({
      left: activeSlidePreveiw?.offsetLeft - 50,
      behavior: "smooth",
    });
  }, [slider.current, currentSlide]);
  return (
    <div className="flex flex-col">
      <div
        ref={slider}
        className="slider border-2 border-[var(--primary-color)]"
      >
        <div className="w-max h-[200px] sm:h-[400px]">
          {!files && (
            <div className="inline-block h-full">
              <div className="slide">
                <img src={noProductPhoto} />
              </div>
            </div>
          )}
          {files?.map((file) => (
            <div className="inline-block h-full">
              <div className="slide">
                {file.fileType === "photo" ? (
                  <img src={file.path} alt={file.name} />
                ) : (
                  <video controls src={file.path} />
                )}
              </div>
            </div>
          ))}
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
