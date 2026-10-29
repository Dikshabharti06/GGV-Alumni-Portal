import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, ChevronRight, GraduationCap, Search, ShieldCheck, Sparkles, Users, Handshake, Bell } from "lucide-react";
import { api } from "../lib/api";
import { kickerOnDark, kicker, accent, iconBox, errorBox, textLink, noteCls } from "../lib/styles";
import Button from "../components/Button";
import Stat from "../components/Stat";

export default function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    api
      .dashboard()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <div className="bg-navy text-white py-9.5 px-10.5 flex items-center justify-between relative overflow-hidden mobile:py-7 mobile:px-5.75">
        <div>
          <div className={kickerOnDark}>YOUR COMMUNITY, AT A GLANCE</div>
          <h1 className="font-display font-semibold text-[40px] leading-[1.05] mt-0 mb-3 mobile:text-[34px]">
            Welcome back,
            <br />
            <em className={accent}>{user.name.split(" ")[0]}.</em>
          </h1>
          <p className="text-[13px] text-[#c6d6de] m-0">
            Every GGV connection is a chance to learn, share and grow.
          </p>
        </div>
        <div className="text-[#ffffff18] py-3.75 px-8.75 mobile:hidden">
          <GraduationCap size={60} />
        </div>
      </div>
      {error && <div className={errorBox}>{error}</div>}
      <div className="grid grid-cols-[repeat(3,1fr)] gap-4 my-5.5 mobile:grid-cols-[1fr] mobile:gap-2.5">
        <Stat
          icon={<Users />}
          label="Alumni in network"
          value={data?.alumni_count ?? "—"}
        />
        <Stat
          icon={<Handshake />}
          label="Open to mentorship"
          value={data?.mentor_count ?? "—"}
        />
        <Stat
          icon={<Bell />}
          label="Announcements"
          value={data?.announcement_count ?? "—"}
        />
      </div>
      <div className="grid grid-cols-[1.2fr_.8fr] gap-4.5 mt-5 tablet:grid-cols-[1fr]">
        <section className="p-6.25 bg-white border border-line min-w-0 mobile:p-5">
          <div className="flex justify-between items-center [&>svg]:text-coral">
            <div>
              <span className={kicker}>GET CONNECTED</span>
              <h2 className="font-display font-semibold text-[25px] mt-0 mb-5">
                Make your next move.
              </h2>
            </div>
            <Sparkles />
          </div>
          <div className="grid">
            {[
              [
                "/directory",
                <Search />,
                "Explore the alumni directory",
                "Find people, career paths and mentors.",
              ],
              [
                "/events",
                <CalendarDays />,
                "Discover events and circles",
                "Stay connected with the GGV community.",
              ],
              [
                "/announcements",
                <BookOpen />,
                "Read community announcements",
                "Updates, workshops and opportunities.",
              ],
            ].map(([to, icon, t, s]) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3.25 py-3.75 border-t border-[#e9eef0] [&>svg]:text-[#8093a0] [&>svg]:w-4.25"
              >
                <span className={`${iconBox} m-0 shrink-0`}>{icon}</span>
                <span className="grid gap-1.25 flex-1">
                  <b className="text-[12px]">{t}</b>
                  <small className="text-[11px] text-muted">{s}</small>
                </span>
                <ChevronRight />
              </Link>
            ))}
          </div>
        </section>
        <section className="p-6.25 bg-white border border-line min-w-0 mobile:p-5">
          <div className={kicker}>YOUR MEMBERSHIP</div>
          <div className="inline-flex items-center gap-1.75 py-2.25 px-2.75 bg-[#e9f3f1] text-teal text-[10px] font-bold tracking-[.6px] mt-1.25 mb-4">
            <ShieldCheck size={19} />
            {user.role.toUpperCase()}
          </div>
          <h3 className="font-display font-semibold text-[23px] leading-tight mt-0 mb-3">
            {user.role === "student"
              ? "Your career bridge starts here"
              : user.role === "alumni"
                ? "Your experience can open doors"
                : user.role === "college faculty"
                  ? "Support the GGV community"
                  : "Help steward the GGV network"}
          </h3>
          <p className="text-[12px] leading-[1.7] text-muted my-3">
            {user.role === "student"
              ? "Explore alumni journeys and connect with mentors who volunteer their time."
              : user.role === "alumni"
                ? "Share your professional profile and choose whether you're willing to mentor students."
                : user.role === "college faculty"
                  ? "Support students through academic guidance, guest lectures, workshops and university–industry collaboration."
                  : "Manage alumni records and review verified transition requests."}
          </p>
          {user.role === "student" && (
            <>
              <Button
                variant="light"
                onClick={async () => {
                  try {
                    const r = await api.graduate();
                    setMessage(r.message);
                  } catch (e) {
                    setMessage(e.message);
                  }
                }}
              >
                Request alumni status <ArrowRight size={16} />
              </Button>
              {message && (
                <p className={`${noteCls} leading-[1.7] text-muted`}>
                  {message}
                </p>
              )}
            </>
          )}
          {user.role === "alumni" && (
            <Link className={textLink} to="/directory">
              Explore your network <ArrowRight size={16} />
            </Link>
          )}
        </section>
      </div>
    </>
  );
}
