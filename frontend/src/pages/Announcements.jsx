import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { api } from "../lib/api";
import { iconBox, tag, errorBox, emptyCls } from "../lib/styles";
import PageHeader from "../components/PageHeader";

export default function Announcements() {
  const [items, setItems] = useState([]),
    [error, setError] = useState("");
  useEffect(() => {
    api
      .announcements()
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <PageHeader
        kicker="STAY IN THE LOOP"
        title="Announcements"
        subtitle="News and updates from across the GGV alumni community."
      />
      {error && <div className={errorBox}>{error}</div>}
      <div className="grid gap-3.5 max-w-212.5">
        {items.map((n) => (
          <article
            className="flex gap-4.5 p-6 bg-white border border-line mobile:p-4.5 mobile:gap-3"
            key={n.id}
          >
            <div className={`${iconBox} shrink-0 m-0`}>
              <Bell />
            </div>
            <div>
              <span className={tag}>{n.category || "Community"}</span>
              <h3 className="font-display font-semibold text-[22px] mt-3 mb-2 mobile:text-[19px]">
                {n.title}
              </h3>
              <p className="text-[13px] leading-[1.7] text-muted mt-0 mb-3">
                {n.body}
              </p>
              <small className="text-[10px] text-[#8b9aa4]">
                {n.date || "GGV Alumni Network"}
              </small>
            </div>
          </article>
        ))}
      </div>
      {!items.length && !error && (
        <p className={emptyCls}>Loading announcements…</p>
      )}
    </>
  );
}
