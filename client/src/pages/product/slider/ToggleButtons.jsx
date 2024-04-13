import { ReactComponent as NextIcon } from "assets/icons/arrow-left.svg";
import { ReactComponent as PrevIcon } from "assets/icons/arrow-right.svg";
const ToggleButtons = (props) => {
  const { currentSlide, setCurrentSlide, slidesCount } = props;
  return (
    <>
      {currentSlide > 0 && (
        <button
          onClick={() => setCurrentSlide(currentSlide - 1)}
          className="absolute right-2 top-1/2 -translate-y-1.5 w-9 circle bg-200"
        >
          <PrevIcon className="hovered" />
        </button>
      )}
      {currentSlide !== slidesCount - 1 && (
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          className="absolute left-2 top-1/2 -translate-y-1.5 w-9 circle bg-200"
        >
          <NextIcon className="hovered" />
        </button>
      )}
    </>
  );
};

export default ToggleButtons;
