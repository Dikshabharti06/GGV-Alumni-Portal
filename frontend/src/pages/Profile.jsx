import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import { errorBox, field, formLabel, noteCls } from "../lib/styles";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

const readOnlyField =
  "w-full border border-[#d9e1e6] bg-[#f4f7f8] py-[13px] px-3 outline-none text-muted rounded-none";

export default function Profile({ user, onSaved }) {
  const needsEnrollment = user.role === "student" || user.role === "alumni";
  const [name, setName] = useState(user.name || "");
  const [enrollment, setEnrollment] = useState(user.enrollment || "");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    setBusy(true);
    try {
      const updated = await api.updateProfile(
        needsEnrollment ? { name, enrollment } : { name },
      );
      onSaved(updated);
      setMsg("Your profile has been updated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        kicker="YOUR ACCOUNT"
        title="My profile"
        subtitle="Keep your details up to date. Your email and role are managed by the portal."
      />
      <section className="p-6.25 bg-white border border-line max-w-140 mobile:p-5">
        <form className="grid gap-4" onSubmit={save}>
          <label className={formLabel}>
            Full name
            <input
              className={field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength="2"
            />
          </label>
          {needsEnrollment && (
            <label className={formLabel}>
              Enrollment number
              <input
                className={field}
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                required
                placeholder="e.g. GGV/20/1234"
              />
            </label>
          )}
          <label className={formLabel}>
            Email address
            <input className={readOnlyField} value={user.email} readOnly />
          </label>
          <label className={formLabel}>
            Role
            <input
              className={`${readOnlyField} capitalize`}
              value={user.role}
              readOnly
            />
          </label>
          {error && <div className={errorBox}>{error}</div>}
          {msg && <p className={`${noteCls} leading-[1.6] text-teal`}>{msg}</p>}
          <Button type="submit" disabled={busy} block>
            {busy ? "Saving…" : "Save changes"} <ArrowRight size={16} />
          </Button>
        </form>
      </section>
    </>
  );
}