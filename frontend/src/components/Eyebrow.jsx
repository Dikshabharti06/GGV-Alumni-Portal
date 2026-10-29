import { eyebrowCls } from "../lib/styles";

export default function Eyebrow({ children }) {
  return (
    <div className={eyebrowCls}>
      <span className="h-0.5 w-7.5 bg-coral" /> {children}
    </div>
  );
}
