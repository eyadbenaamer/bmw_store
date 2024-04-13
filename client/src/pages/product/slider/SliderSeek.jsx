const SliderSeek = (props) => {
  const { slides, currentSlide, setCurrentSlide } = props;
  return (
    <div className="slider-seek">
      <div className="w-max h-[50px]">
        {slides?.map((slide, i) => (
          <button
            aria-label={`شريحة رقم ${i + 1}`}
            className={`slide-preview ${i === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(i)}
          >
            <div className="slide">
              {slide.fileType === "photo" ? (
                <img src={slide.path} alt={`صورة ${i + 1}`} srcset="" />
              ) : (
                <video src={slide.path} alt={`فيديو ${i + 1}`} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SliderSeek;
