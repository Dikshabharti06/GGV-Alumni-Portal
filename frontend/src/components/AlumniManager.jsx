import { useEffect, useState } from "react";
import { ArrowRight, Plus, Search } from "lucide-react";
import { api } from "../lib/api";
import { kicker, field, formLabel, errorBox, noteCls } from "../lib/styles";
import Button from "./Button";

const emptyForm = {
  name: "",
  department: "",
  graduation_year: "",
  program: "",
  company: "",
  headline: "",
  location: "",
  email: "",
  contact: "",
  enrollment: "",
  address: "",
  bio: "",
  mentorship: false,
};

const rowBtn =
  "border py-2 px-3 text-[11px] font-bold hover:bg-[#f4f7f7] transition-[background] duration-200";

export default function AlumniManager() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null); // null = list, "new" or an alumni id = form
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setItems(await api.adminAlumni());
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);

  function openForm(record) {
    setError("");
    setMsg("");
    setForm(record ? { ...emptyForm, ...record } : emptyForm);
    setEditing(record ? record.id : "new");
  }

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function save(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { id, verified, claimed, source, created_at, ...data } = form;
    try {
      if (editing === "new") await api.addAlumni(data);
      else await api.editAlumni(editing, data);
      setMsg(
        editing === "new" ? "Alumni record added." : "Alumni record updated.",
      );
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(a) {
    if (!window.confirm(`Remove ${a.name} from the alumni directory?`)) return;
    setError("");
    setMsg("");
    try {
      await api.deleteAlumni(a.id);
      setMsg(`${a.name} was removed.`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const needle = q.trim().toLowerCase();
  const shown = items.filter(
    (a) =>
      !needle ||
      [a.name, a.company, a.headline, a.department, a.location].some((v) =>
        (v || "").toLowerCase().includes(needle),
      ),
  );

  const text = (name, label, extra = {}) => (
    <label className={formLabel}>
      {label}
      <input
        className={field}
        name={name}
        value={form[name]}
        onChange={set}
        {...extra}
      />
    </label>
  );

  return (
    <section className="p-6.25 bg-white border border-line mt-4.5 min-w-0 mobile:p-5">
      <div className="flex justify-between items-start gap-3 flex-wrap">
        <div>
          <div className={kicker}>ALUMNI DIRECTORY</div>
          <h2 className="font-display font-semibold text-[25px] mt-0 mb-5">
            Manage alumni records
          </h2>
        </div>
        {editing === null && (
          <Button onClick={() => openForm(null)}>
            <Plus size={16} /> Add alumni
          </Button>
        )}
      </div>

      {error && <div className={errorBox}>{error}</div>}
      {msg && <p className={`${noteCls} leading-[1.6] text-teal`}>{msg}</p>}

      {editing === null ? (
        <>
          <div className="flex items-center gap-2.5 bg-white border border-line px-3.25 mb-4 [&_svg]:w-4.25 [&_svg]:text-[#718794]">
            <Search />
            <input
              className="border-0 outline-none py-3.5 px-0 w-full min-w-0"
              placeholder="Search name, company, role, department or city…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="text-[11px] text-muted mb-2">
            {shown.length} of {items.length} records
          </div>
          <div>
            {shown.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-center gap-2.5 border-t border-line py-3.25 mobile:flex-col mobile:items-start"
              >
                <div className="grid gap-0.75 min-w-0">
                  <b className="text-[13px]">{a.name}</b>
                  <small className="text-[11px] text-muted">
                    {[a.headline, a.company].filter(Boolean).join(" · ") ||
                      "No position added"}
                    {a.graduation_year ? ` · Batch ${a.graduation_year}` : ""}
                  </small>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    className={`${rowBtn} border-line text-ink`}
                    onClick={() => openForm(a)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${rowBtn} border-[#f5c9be] text-[#9a3523]`}
                    onClick={() => remove(a)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {!shown.length && (
              <p className="text-[12px] text-muted py-5.5 my-3">
                No alumni records found.
              </p>
            )}
          </div>
        </>
      ) : (
        <form className="grid gap-4" onSubmit={save}>
          <div className="text-[13px] font-bold">
            {editing === "new" ? "Add a new alumni record" : `Edit ${form.name}`}
          </div>
          <div className="grid grid-cols-2 gap-4 mobile:grid-cols-[1fr]">
            {text("name", "Full name", { required: true, minLength: 2 })}
            {text("department", "Department")}
            {text("graduation_year", "Year of degree")}
            {text("program", "Program")}
            {text("company", "Organization")}
            {text("headline", "Current position")}
            {text("location", "City / location")}
            {text("email", "Email (private)", { type: "email" })}
            {text("contact", "Mobile number (private)")}
            {text("enrollment", "Enrollment number (private)")}
          </div>
          <label className={formLabel}>
            Address for correspondence (private)
            <textarea
              className={`${field} resize-y`}
              name="address"
              value={form.address}
              onChange={set}
              rows="2"
            />
          </label>
          <label className={formLabel}>
            Bio
            <textarea
              className={`${field} resize-y`}
              name="bio"
              value={form.bio}
              onChange={set}
              rows="3"
            />
          </label>
          <label className="flex items-center gap-2 text-[12px] font-bold text-[#324a5d]">
            <input
              type="checkbox"
              checked={form.mentorship}
              onChange={(e) =>
                setForm({ ...form, mentorship: e.target.checked })
              }
            />
            Open to mentorship
          </label>
          <div className="text-[11px] text-muted">
            Fields marked private are only visible to administrators.
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save record"} <ArrowRight size={16} />
            </Button>
            <button
              type="button"
              className="inline-flex items-center justify-center border border-line bg-white text-ink py-3.5 px-5 text-[13px] font-bold hover:bg-[#f4f7f7] transition-[background] duration-200"
              onClick={() => {
                setEditing(null);
                setError("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}