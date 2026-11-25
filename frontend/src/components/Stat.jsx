import { iconBox } from "../lib/styles";

export default function Stat({ icon, label, value }) {
  return (
    <div className="p-5.5 bg-white border border-line grid grid-cols-[45px_1fr] gap-x-3.5 items-center mobile:py-3.75 mobile:px-4.5">
      <div className={`${iconBox} m-0 row-span-2`}>{icon}</div>
      <span className="text-[11px] text-muted">{label}</span>
      <b className="font-display font-semibold text-[27px] mt-1.25">{value}</b>
    </div>
  );
}
