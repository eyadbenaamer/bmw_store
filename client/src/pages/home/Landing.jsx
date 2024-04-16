import { ReactComponent as FacebookIcon } from "assets/icons/facebook.svg";
import { ReactComponent as WhatsappIcon } from "assets/icons/whatsapp.svg";
import { ReactComponent as InstagramIcon } from "assets/icons/instagram.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Landing = () => {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: -0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
      className="landing text-white"
    >
      <div className="flex items-center justify-end md:justify-center w-full md:w-1/2 h-1/2 md:h-full px-4">
        <div className="flex flex-col gap-4 self-end md:self-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
            className="w-full"
          >
            <h1 className="text-2xl md:text-start ">
              شركة <span className="text-primary">أبو شوشع</span> لاستيراد قطع
              غيار سيارات BMW
            </h1>
            <h2 className=" text-start">لسنا الوحيدين لكننا متميزون</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "linear" }}
            className="social flex gap-2 justify-start w-full"
          >
            <Link aria-label={"صفحتنا على فيسبوك"} className="w-8 ">
              <FacebookIcon
                style={{ borderRadius: "50%" }}
                className="transition overflow-hidden hover:fill-[#1877F2] hover:bg-white"
              />
            </Link>
            <Link
              aria-label={"حسابنا على واتساب"}
              to={`https://wa.me/218910996617`}
              className="w-8"
            >
              <WhatsappIcon className="transition hover:fill-[#25D366]" />
            </Link>
            <Link aria-label={"صفحتنا على إنستغرام"} className="w-8 relative">
              <InstagramIcon
                className="absolute transition"
                fill="url(#colored)"
              />
              <InstagramIcon
                className="absolute transition hover:opacity-0"
                fill="white"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;
