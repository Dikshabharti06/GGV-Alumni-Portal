// Shared Tailwind class sets. Breakpoints `tablet:` (<=1050px) and `mobile:` (<=700px) are defined in index.css.
export const kicker = "text-[10px] tracking-[2px] font-bold text-teal mb-[13px]";
export const kickerOnDark =
  "text-[10px] tracking-[2px] font-bold text-[#b5d1d5] mb-[13px]";
export const eyebrowCls =
  "flex items-center gap-[11px] text-[#c4d9df] mb-[22px] text-[10px] tracking-[2px] font-bold";
export const accent = "text-[#f49c86] italic";
export const iconBox =
  "h-[43px] w-[43px] grid place-items-center bg-[#e9f3f1] text-teal";
export const tag =
  "inline-flex items-center gap-1.25 text-teal bg-[#eaf4f1] py-[6px] px-2 text-[10px] font-bold";
export const errorBox =
  "py-3 px-[14px] bg-[#fff0ed] border border-[#f5c9be] text-[#9a3523] text-[12px] my-3";
export const fieldBase =
  "border border-[#d9e1e6] bg-white py-[13px] px-3 outline-none text-ink rounded-none";
export const field = `${fieldBase} w-full focus:border-teal`;
export const fieldNoFocus = `${fieldBase} w-full`;
export const formLabel = "grid gap-[7px] text-[12px] font-bold text-[#324a5d]";
export const sectionPad =
  "py-[100px] px-[max(5.5%,calc((100%_-_1240px)_/_2))] text-center mobile:py-[68px] mobile:px-[22px]";
export const sectionH2 =
  "font-display font-semibold text-[length:clamp(32px,4vw,48px)] leading-[1.15] mx-auto mt-0 mb-[17px] max-w-[760px]";
export const textLink =
  "text-coral inline-flex gap-2.5 items-center font-bold text-[13px]";
export const emptyCls = "text-[12px] text-muted py-[22px] my-3";
export const noteCls = "text-[12px] bg-[#eaf5f2] p-3 mt-[14px] mb-3";

export function btnCls({ variant = "primary", size = "md", block = false } = {}) {
  const base =
    "inline-flex items-center justify-center gap-[13px] border font-bold transition-[transform,background] duration-200 ease-[ease] hover:[transform:translateY(-1px)]";
  const variants = {
    primary: "bg-coral border-coral text-white hover:bg-[#db6249]",
    ghost: "bg-transparent border-[#ffffff70] text-white hover:bg-[#db6249]",
    light: "bg-transparent border-line text-ink mt-2 hover:bg-[#f4f7f7]",
  };
  const sizes = {
    md: "py-[14px] px-5 text-[13px]",
    sm: "py-[10px] px-3 text-[11px] shrink-0",
  };
  return `${base} ${variants[variant]} ${sizes[size]} ${block ? "w-full mt-1" : ""}`;
}
