import { ReactComponent as FacebookIcon } from "assets/icons/facebook.svg";
import { ReactComponent as WhatsappIcon } from "assets/icons/whatsapp.svg";
import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SocialLinks = () => {
  const mode = useSelector((state) => state.mode);
  const svgFill = mode === "light" ? "#2a2d3d" : "#f4f5f9";

  return (
    <div className="my-5">
      <div className="my-4 bold">للحجز أو الطلب تواصل معنا عبر :</div>
      <div className="social flex gap-2">
        <Link aria-label="راسلنا عبر فيسبوك" className="w-10 ">
          <FacebookIcon
            fill={svgFill}
            style={{ borderRadius: "50%" }}
            className="transition overflow-hidden hover:fill-[#1877F2] hover:bg-white"
          />
        </Link>
        <Link
          aria-label="اطلب عبر واتساب"
          to={`https://wa.me/218910996617?text=${window.location.href}`}
          className="w-10"
        >
          <WhatsappIcon
            fill={svgFill}
            className="transition hover:fill-[#25D366]"
          />
        </Link>
        <Link aria-label="راسلنا عبر إنستغرام" className="w-10 relative">
          <InstagramIcon className="absolute transition" fill="url(#colored)" />
          <InstagramIcon
            fill={svgFill}
            className="absolute transition hover:opacity-0"
          />
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
