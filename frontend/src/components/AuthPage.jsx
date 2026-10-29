import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { api } from "../lib/api";
import { heroImage } from "../lib/assets";
import { kicker, errorBox, field, formLabel } from "../lib/styles";
import Brand from "./Brand";
import Button from "./Button";
import Eyebrow from "./Eyebrow";

export default function AuthPage({ mode }) {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const u =
        mode === "login"
          ? await api.login({
              email: form.email,
              password: form.password,
              role: form.role,
            })
          : await api.register(form);
      if (mode === "login" && u.role !== form.role) {
        await api.logout();
        throw new Error(
          `This account is registered as ${u.role}. Choose that role and sign in again.`,
        );
      }
      nav(u.role === "admin" ? "/admin" : "/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="min-h-screen grid grid-cols-[1fr_1fr] bg-white mobile:grid-cols-[1fr]">
      <div
        className="bg-cover bg-center flex flex-col justify-between py-[42px] px-[8%] text-white min-h-screen mobile:hidden"
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(9,31,52,.9),rgba(9,31,52,.35)),url("${heroImage}")`,
        }}
      >
        <Brand />
        <div className="max-w-[540px] my-[50px]">
          <Eyebrow>YOUR GGV COMMUNITY</Eyebrow>
          <h1 className="font-display font-semibold text-[length:clamp(38px,4.5vw,64px)] leading-[1.08] mt-0 mb-5">
            {mode === "login"
              ? "Welcome back."
              : "Your next chapter starts here."}
          </h1>
          <p className="text-[#dbe5e9] leading-[1.8] max-w-[430px]">
            One campus. Many journeys. Stay connected to the people and
            possibilities of GGV.
          </p>
        </div>
        <small className="text-[9px] tracking-[1.5px] text-[#c2d2da]">
          GURU GHASIDAS VISHWAVIDYALAYA · BILASPUR
        </small>
      </div>

      <div className="py-[35px] px-[9%] flex flex-col mobile:min-h-screen mobile:py-[25px] mobile:px-[23px]">
        <Link to="/" className="text-muted text-[12px]">
          ← Back to home
        </Link>
        <div className="w-full max-w-[420px] m-auto mobile:py-10 mobile:px-0">
          <div className={kicker}>
            {mode === "login" ? "MEMBER ACCESS" : "JOIN THE NETWORK"}
          </div>
          <h2 className="font-display font-semibold text-[36px] mt-0 mb-2 mobile:text-[31px]">
            {mode === "login"
              ? "Sign in to your network"
              : "Create your account"}
          </h2>
          <p className="text-muted text-[13px] mt-[1em] mb-7">
            {mode === "login"
              ? "Continue your GGV journey."
              : "Connect with your university community."}
          </p>
          <form onSubmit={submit} className="grid gap-4">
            {mode === "register" && (
              <label className={formLabel}>
                Full name
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  minLength="2"
                  placeholder="Your full name"
                  className={field}
                />
              </label>
            )}
            <label className={formLabel}>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
                placeholder="you@example.com"
                className={field}
              />
            </label>
            <label className={formLabel}>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={update}
                required
                minLength="6"
                placeholder="At least 6 characters"
                className={field}
              />
            </label>
            <label className={formLabel}>
              Sign in as
              <select
                name="role"
                value={form.role}
                onChange={update}
                className={field}
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="college faculty">College Faculty</option>
                {mode === "login" && (
                  <option value="admin">Administrator</option>
                )}
              </select>
            </label>
            {error && <div className={errorBox}>{error}</div>}
            <Button type="submit" disabled={busy} block>
              {busy
                ? "Please wait…"
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}{" "}
              <ArrowRight size={17} />
            </Button>
          </form>
          <div className="text-center text-[12px] text-muted mt-[23px]">
            {mode === "login" ? "New to the network?" : "Already a member?"}{" "}
            <Link
              to={mode === "login" ? "/register" : "/login"}
              className="text-teal font-bold"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </Link>
          </div>
          <p className="flex items-center justify-center gap-[7px] text-[13px] text-muted mt-[35px] mb-7">
            <ShieldCheck size={15} /> Your account role and permissions are
            enforced by the server.
          </p>
        </div>
      </div>
    </div>
  );
}
