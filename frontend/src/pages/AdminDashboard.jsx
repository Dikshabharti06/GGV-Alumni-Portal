import { useEffect, useState } from "react";
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { api } from "../lib/api";
import { kicker, fieldNoFocus, field, formLabel, emptyCls, noteCls } from "../lib/styles";
import Button from "../components/Button";
import Stat from "../components/Stat";
import PageHeader from "../components/PageHeader";

export default function Admin() {
  const [stats, setStats] = useState(null),
    [pending, setPending] = useState([]),
    [title, setTitle] = useState(""),
    [body, setBody] = useState(""),
    [category, setCategory] = useState("Community"),
    [msg, setMsg] = useState("");
  async function refresh() {
    try {
      const s = await api.stats();
      setStats(s);
    } catch (e) {
      setMsg(e.message);
    }
    try {
      setPending(await api.pending());
    } catch (e) {}
  }
  useEffect(() => {
    refresh();
  }, []);
  async function publish(e) {
    e.preventDefault();
    try {
      await api.publish({ title, body, category });
      setTitle("");
      setBody("");
      setMsg("Announcement published.");
    } catch (e) {
      setMsg(e.message);
    }
  }
  async function approve(id) {
    try {
      await api.approve(id);
      setMsg("Graduation transition approved.");
      refresh();
    } catch (e) {
      setMsg(e.message);
    }
  }
  return (
    <>
      <PageHeader
        kicker="PORTAL ADMINISTRATION"
        title="Admin desk"
        subtitle="Manage community updates and review student-to-alumni transitions."
      />
      <div className="grid grid-cols-[repeat(3,1fr)] gap-4 my-5.5 mobile:grid-cols-[1fr] mobile:gap-2.5">
        <Stat
          icon={<Users />}
          label="Alumni profiles"
          value={stats?.total_alumni ?? "—"}
        />
        <Stat
          icon={<ShieldCheck />}
          label="Registered users"
          value={stats?.total_users ?? "—"}
        />
        <Stat
          icon={<GraduationCap />}
          label="Students"
          value={stats?.students ?? "—"}
        />
      </div>
      <div className="grid grid-cols-[1.2fr_.8fr] gap-4.5 mt-5 tablet:grid-cols-[1fr]">
        <section className="p-6.25 bg-white border border-line min-w-0 mobile:p-5">
          <div className={kicker}>COMMUNITY UPDATES</div>
          <h2 className="font-display font-semibold text-[25px] mt-0 mb-5">
            Publish an announcement
          </h2>
          <form className="grid gap-4 mt-5" onSubmit={publish}>
            <label className={formLabel}>
              Title
              <input
                className={field}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength="120"
              />
            </label>
            <label className={formLabel}>
              Category
              <select
                className={fieldNoFocus}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Community</option>
                <option>Reunion</option>
                <option>Mentorship</option>
                <option>Workshop</option>
                <option>Industry</option>
              </select>
            </label>
            <label className={formLabel}>
              Message
              <textarea
                className={`${field} resize-y`}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows="4"
              />
            </label>
            <Button block>
              Publish update <ArrowRight size={16} />
            </Button>
          </form>
        </section>
        <section className="p-6.25 bg-white border border-line min-w-0 mobile:p-5">
          <div className={kicker}>VERIFICATION QUEUE</div>
          <h2 className="font-display font-semibold text-[25px] mt-0 mb-5">
            Graduation requests
          </h2>
          {pending.length ? (
            pending.map((p) => (
              <div
                className="flex justify-between items-center gap-2.5 border-t border-line py-3.75 mobile:items-start"
                key={p.id}
              >
                <div className="grid gap-1.25 min-w-0">
                  <b className="text-[12px]">{p.name}</b>
                  <small className="text-[10px] text-muted wrap-anywhere">
                    {p.email}
                  </small>
                </div>
                <Button size="sm" onClick={() => approve(p.id)}>
                  Approve
                </Button>
              </div>
            ))
          ) : (
            <p className={emptyCls}>
              No pending requests or the verification endpoint is unavailable.
            </p>
          )}
        </section>
      </div>
      {msg && <p className={`${noteCls} leading-[1.6] text-teal`}>{msg}</p>}
    </>
  );
}
