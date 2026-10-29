import { iconBox } from "../lib/styles";

export default function Stat({ icon, label, value }) {
  return (
    <div className="p-5.5 bg-white border border-line grid grid-cols-[45px_1fr] gap-x-[14px] items-center mobile:py-[15px] mobile:px-[18px]">
      <div className={`${iconBox} m-0 row-span-2`}>{icon}</div>
      <span className="text-[11px] text-muted">{label}</span>
      <b className="font-display font-semibold text-[27px] mt-[5px]">{value}</b>
    </div>
  );
}
