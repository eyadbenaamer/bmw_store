const SliderSeek = (props) => {
  const { slides, currentSlide, setCurrentSlide } = props;
  return (
    <div className="slider-seek">
      <div className="w-max h-[50px]">
        {slides?.map((slide, i) => (
          <button
            className={`slide-preview ${i === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(i)}
          >
            <div className="slide">
              {slide.fileType === "photo" ? (
                <img src={slide.path} alt={slide.name} srcset="" />
              ) : (
                <video src={slide.path} alt={slide.name} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SliderSeek;
