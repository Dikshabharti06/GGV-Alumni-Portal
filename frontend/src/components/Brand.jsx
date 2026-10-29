import { Link } from "react-router-dom";
import { logo } from "../lib/assets";

export default function Brand({ light = true, variant }) {
  const sidebar = variant === "sidebar",
    footer = variant === "footer";
  const color = footer || !light ? "text-navy" : "text-white";
  const smallColor = footer ? "text-muted" : light ? "text-[#a9bdca]" : "";
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.75 w-max ${color} ${sidebar ? "px-2.5 pt-0 pb-7 border-b border-[#ffffff1a]" : ""}`}
    >
      <img
        src={logo}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        alt="GGV crest"
        className={`object-contain ${sidebar ? "h-9.75 w-9.75" : "h-11 w-11 mobile:h-[38px] mobile:w-[38px]"}`}
      />
      <span className="flex flex-col">
        <b
          className={`font-display font-bold leading-[1.05] tracking-[.4px] ${sidebar ? "text-[21px]" : "text-[23px] mobile:text-[20px]"}`}
        >
          GGV
        </b>
        <small
          className={`font-bold tracking-[1.5px] mt-1 ${sidebar ? "text-[8px]" : "text-[9px] mobile:text-[8px]"} ${smallColor}`}
        >
          ALUMNI NETWORK
        </small>
      </span>
    </Link>
  );
}
