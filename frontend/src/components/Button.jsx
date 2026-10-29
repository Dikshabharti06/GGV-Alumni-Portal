import { btnCls } from "../lib/styles";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  ...props
}) {
  return (
    <button className={btnCls({ variant, size, block })} {...props}>
      {children}
    </button>
  );
}
