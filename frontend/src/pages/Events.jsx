import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { api } from "../lib/api";
import { tag, errorBox, emptyCls } from "../lib/styles";
import PageHeader from "../components/PageHeader";

export default function Events() {
  const [items, setItems] = useState([]),
    [error, setError] = useState("");
  useEffect(() => {
    api
      .events()
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <PageHeader
        kicker="MEET, LEARN & COLLABORATE"
        title="Events & circles"
        subtitle="A foundation for reunions, guest lectures, workshops, mentorship activities and university–industry interactions."
      />
      <div className="grid grid-cols-2 gap-4.25 mobile:grid-cols-[1fr]">
        {items.map((ev) => (
          <article className="bg-white border border-line p-6.5" key={ev.id}>
            <div className="flex gap-2.5 items-center text-teal text-[12px] mb-5.5">
              <CalendarDays />
              <span>{ev.date}</span>
            </div>
            <span className={tag}>{ev.type || "Community"}</span>
            <h3 className="font-display font-semibold text-[24px] my-3.5">
              {ev.title}
            </h3>
            <p className="flex items-center gap-1.75 text-muted text-[12px] my-3">
              <MapPin size={15} />
              {ev.location || "GGV Community"}
            </p>
            <span className="block border-t border-line pt-3.25 mt-4.5 text-[#8b9aa4] text-[10px] leading-normal">
              Event details are illustrative until confirmed by the university.
            </span>
          </article>
        ))}
      </div>
      {error && <div className={errorBox}>{error}</div>}
      {!items.length && !error && <p className={emptyCls}>Loading events…</p>}
    </>
  );
}
