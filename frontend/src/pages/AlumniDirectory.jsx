import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, Search, Handshake } from "lucide-react";
import { api } from "../lib/api";
import { tag, errorBox, fieldBase, emptyCls } from "../lib/styles";
import { initials } from "../lib/utils";
import PageHeader from "../components/PageHeader";

export default function Directory() {
  const [items, setItems] = useState([]),
    [q, setQ] = useState(""),
    [department, setDepartment] = useState(""),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .alumni(q, department)
      .then((r) => {
        if (alive) setItems(Array.isArray(r) ? r : r.items || []);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [q, department]);
  const departments = [
    ...new Set(items.map((a) => a.department).filter(Boolean)),
  ];
  return (
    <>
      <PageHeader
        kicker="PEOPLE & POSSIBILITIES"
        title="Alumni directory"
        subtitle="Discover the people, paths and professional experience that make the GGV network unique."
      />
      <div className="flex gap-3 mb-5.5 mobile:flex-col">
        <div className="flex items-center gap-2.5 flex-1 bg-white border border-line px-3.25 [&_svg]:w-4.25 [&_svg]:text-[#718794]">
          <Search />
          <input
            className="border-0 outline-none py-3.5 px-0 w-full min-w-0"
            placeholder="Search name, company or role…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          className={`${fieldBase} w-auto min-w-46.25 mobile:w-full`}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
      {error && <div className={errorBox}>{error}</div>}
      {loading ? (
        <p className={emptyCls}>Loading community members…</p>
      ) : items.length === 0 ? (
        <p className={emptyCls}>No alumni found. Try another search.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 tablet:grid-cols-2 mobile:grid-cols-[1fr]">
          {items.map((a) => (
            <article
              className="p-5.5 bg-white border border-line min-w-0"
              key={a.id}
            >
              <div className="flex justify-between items-start">
                <div className="h-13.5 w-13.5 rounded-[50%] grid place-items-center bg-[#e7efef] text-[#24485b] font-bold text-[15px]">
                  {initials(a.name || a.full_name)}
                </div>
                {a.mentorship && (
                  <span className={tag}>
                    <Handshake size={13} /> Mentor
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-[20px] mt-4.25 mb-1.5">
                {a.name || a.full_name}
              </h3>
              <p className="text-[12px] mt-0 mb-1">
                {a.headline || a.current_position || "GGV Alumni"}
              </p>
              <p className="text-[12px] text-muted mt-0 mb-3.75">
                {a.company || a.organization || "Professional network"}
              </p>
              <div className="grid gap-1.75 text-[#71818d] text-[10px]">
                {a.department && (
                  <span className="flex gap-1.25 items-center">
                    {a.department}
                  </span>
                )}
                {(a.graduation_year || a.year) && (
                  <span className="flex gap-1.25 items-center">
                    Batch {a.graduation_year || a.year}
                  </span>
                )}
                {(a.location || a.city) && (
                  <span className="flex gap-1.25 items-center">
                    <MapPin size={13} />
                    {a.location || a.city}
                  </span>
                )}
              </div>
              {a.mentorship && (
                <div className="flex items-center gap-1.5 text-teal text-[10px] border-t border-line pt-3.25 mt-4">
                  <CheckCircle2 size={15} /> Open to mentorship
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
