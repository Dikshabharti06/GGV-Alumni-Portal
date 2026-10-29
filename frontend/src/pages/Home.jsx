import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, GraduationCap, ShieldCheck, Users, Handshake } from "lucide-react";
import { request } from "../lib/api";
import { heroImage } from "../lib/assets";
import { kicker, accent, iconBox, sectionPad, sectionH2, textLink, btnCls } from "../lib/styles";
import { initials } from "../lib/utils";
import Brand from "../components/Brand";
import Eyebrow from "../components/Eyebrow";

export default function Landing() {
  const [stats, setStats] = useState(null);
  const [spotlight, setSpotlight] = useState([]);
  useEffect(() => {
    request("/dashboard/public")
      .then(setStats)
      .catch(() => {});
    request("/alumni/spotlight")
      .then(setSpotlight)
      .catch(() => {});
  }, []);
  return (
    <div className="bg-white">
      <header className="h-22.5 absolute z-2 top-0 left-0 right-0 flex justify-between items-center max-w-355 m-auto px-[5.5%] mobile:h-19 mobile:px-5.5">
        <Brand />
        <nav className="flex items-center gap-8.5 text-[#e5edf1] text-[13px] mobile:gap-3.5">
          <a
            href="https://ggu.ac.in"
            target="_blank"
            rel="noreferrer"
            className="mobile:hidden"
          >
            Official website
          </a>
          <Link
            className="border border-[#ffffff66] py-3.25 px-4.5 flex items-center gap-3.5 hover:bg-[#ffffff16]"
            to="/login"
          >
            Sign in <ArrowRight size={16} />
          </Link>
        </nav>
      </header>
      <section
        className="min-h-185 h-[min(90vh,840px)] relative flex items-center bg-cover bg-center text-white pt-30 pb-15 px-[max(5.5%,calc((100%-1340px)/2))] tablet:min-h-170 mobile:h-auto mobile:min-h-172.5 mobile:pt-32.5 mobile:pb-11.25 mobile:px-6 mobile:bg-position-[58%_center]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(9,31,52,.98) 0%,rgba(9,31,52,.84) 34%,rgba(9,31,52,.25) 74%,rgba(9,31,52,.12) 100%),linear-gradient(0deg,rgba(9,31,52,.55),transparent 40%),url("${heroImage}")`,
        }}
      >
        <div className="max-w-185 relative z-1 mt-1.25">
          <Eyebrow>A LIVING UNIVERSITY NETWORK</Eyebrow>
          <h1 className="font-display font-semibold text-[clamp(48px,6.2vw,86px)] leading-[1.03] tracking-[-1.6px] mt-0 mb-5.75 mobile:text-[clamp(47px,12vw,68px)]">
            One campus.
            <br />
            <em className={accent}>Many journeys.</em>
          </h1>
          <p className="max-w-117.5 text-[17px] leading-[1.7] text-[#dce6ea] mt-0 mb-8 mobile:text-[15px]">
            Connect with the people who make Guru Ghasidas Vishwavidyalaya a
            lifelong community.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link className={btnCls()} to="/register">
              Join the network <ArrowRight size={17} />
            </Link>
            <Link className={btnCls({ variant: "ghost" })} to="/login">
              Member sign in
            </Link>
          </div>
          <div className="flex gap-11.25 mt-13.5 pt-6 border-t border-[#ffffff40] max-w-172.5 mobile:gap-4.25 mobile:flex-wrap mobile:mt-10">
            {[
              ["NAAC A++", "ACCREDITED UNIVERSITY"],
              ["Bilaspur", "CHHATTISGARH, INDIA"],
              ["Since 1983", "A CENTRAL UNIVERSITY"],
            ].map(([b, s]) => (
              <div key={b} className="flex flex-col gap-1.25">
                <b className="font-display font-semibold text-[20px] mobile:text-[17px]">
                  {b}
                </b>
                <span className="text-[10px] tracking-[.5px] text-[#c2d0d7] mobile:text-[8px]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-[5.5%] bottom-8.5 text-right text-[#e1e7e8] text-[9px] leading-[1.9] tracking-[1.4px] mobile:right-6 mobile:bottom-4 mobile:text-[8px]">
          GURU GHASIDAS VISHWAVIDYALAYA
          <br />
          <span className="text-[#f2a38e]">Central University · Bilaspur</span>
        </div>
      </section>

      <section className={sectionPad}>
        <div className={kicker}>A COMMUNITY THAT CONTINUES</div>
        <h2 className={sectionH2}>Your GGV story doesn't end at graduation.</h2>
        <p className="max-w-167.5 text-muted leading-[1.8] my-0 mx-auto">
          A dedicated space for students, alumni and university teams to build
          meaningful connections across batches, disciplines and careers.
        </p>
        <div className="grid grid-cols-[repeat(4,1fr)] gap-4.25 mt-13.5 text-left tablet:grid-cols-[repeat(2,1fr)] mobile:grid-cols-[1fr]">
          <Feature
            icon={<Users />}
            title="One connected network"
            text="Discover a professional community dedicated to Guru Ghasidas Vishwavidyalaya."
          />
          <Feature
            icon={<Handshake />}
            title="Mentorship that matters"
            text="Find alumni willing to share experience, career guidance and industry insight."
          />
          <Feature
            icon={<ShieldCheck />}
            title="Trust by design"
            text="Role-based access, private contact details and profile ownership checks."
          />
          <Feature
            icon={<CalendarDays />}
            title="Campus, beyond campus"
            text="A foundation for reunions, guest lectures, workshops and industry interactions."
          />
        </div>
      </section>

      <section className="py-22.5 px-[max(5.5%,calc((100%-1240px)/2))] bg-[#102b43] text-white grid grid-cols-[1fr_.8fr] items-center gap-20 tablet:gap-8.75 mobile:py-16.25 mobile:px-5.5 mobile:grid-cols-[1fr] mobile:gap-8.75">
        <div>
          <div className={kicker}>THE CAREER BRIDGE</div>
          <h2 className="font-display font-semibold text-[clamp(38px,4.4vw,60px)] leading-[1.03] tracking-[-1.6px] mt-0 mb-5.5">
            Learn from those
            <br />
            <em className={accent}>who walked before you.</em>
          </h2>
          <p className="max-w-122.5 text-[#c3d1d9] leading-[1.8] text-[14px] mt-[1em] mb-7">
            Students can connect with willing alumni, explore professional
            journeys and build relationships that last beyond a degree.
          </p>
          <Link to="/register" className={textLink}>
            Become part of the network <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="p-8.75 bg-[#183a54] border border-[#ffffff1c] mobile:p-6.25">
          <div className="w-14 h-14 bg-[#ffffff14] grid place-items-center text-[#f3a18b] mb-6">
            <GraduationCap size={27} />
          </div>
          <span className="text-[9px] tracking-[1.5px] text-[#a8c0cd] font-bold">
            BUILT FOR THE GGV COMMUNITY
          </span>
          <h3 className="font-display font-semibold text-[28px] leading-tight mt-3.75 mb-6.25">
            From campus connections to lifelong collaboration.
          </h3>
          <div className="grid gap-3.25 text-[#d3e0e6] text-[12px]">
            {[
              "Student-to-alumni career bridge",
              "Alumni-led mentorship",
              "Verified alumni transition",
            ].map((t) => (
              <span
                key={t}
                className="flex gap-2.5 items-center [&_svg]:text-[#f2a18a] [&_svg]:w-4"
              >
                <CheckCircle2 /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {spotlight.length > 0 && (
        <section className={`${sectionPad} bg-[#f7f8f8]`}>
          <div className={kicker}>COMMUNITY SPOTLIGHT</div>
          <h2 className={sectionH2}>Journeys that inspire.</h2>
          <div className="grid grid-cols-[repeat(4,1fr)] gap-4.25 mt-8.75 text-left mobile:grid-cols-[repeat(2,1fr)]">
            {spotlight.slice(0, 4).map((a) => (
              <div className="p-6 bg-white border border-line" key={a.id}>
                <div className="h-13.5 w-13.5 rounded-[50%] grid place-items-center bg-[#e7efef] text-[#24485b] font-bold text-[15px]">
                  {initials(a.full_name)}
                </div>
                <h3 className="text-[14px] mt-4.5 mb-1.25">
                  {a.full_name}
                </h3>
                <p className="text-muted text-[12px] leading-normal mt-0 mb-1.5">
                  {a.current_position || "GGV Alumni"}
                </p>
                <small className="text-muted text-[12px] leading-normal">
                  {a.organization || a.department || "GGV Network"}
                </small>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="py-7.5 px-[5.5%] flex items-center justify-between gap-5 border-t border-line mobile:py-6.25 mobile:px-5.5 mobile:flex-wrap">
        <Brand variant="footer" />
        <span className="text-[11px] text-muted mobile:hidden">
          Once a GGVian, always a part of the story.
        </span>
        <a
          href="https://ggu.ac.in"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-muted flex items-center gap-1.5"
        >
          Guru Ghasidas Vishwavidyalaya <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <article className="border border-line py-6.25 px-5.75 bg-white min-h-52.5 mobile:min-h-auto">
      <div className={`${iconBox} mb-5 [&_svg]:w-5.25`}>{icon}</div>
      <h3 className="text-[15px] mt-0 mb-2.5">{title}</h3>
      <p className="text-[13px] leading-[1.7] text-muted m-0">{text}</p>
    </article>
  );
}
