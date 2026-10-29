import { kicker } from "../lib/styles";

export default function PageHeader({ kicker: k, title, subtitle }) {
  return (
    <div className="mt-1 mb-7">
      <span className={kicker}>{k}</span>
      <h1 className="font-display font-semibold text-[length:clamp(33px,4vw,45px)] leading-[1.1] mt-0 mb-3 mobile:text-[35px]">
        {title}
      </h1>
      <p className="text-muted text-[13px] leading-[1.7] max-w-[650px] m-0">
        {subtitle}
      </p>
    </div>
  );
}
