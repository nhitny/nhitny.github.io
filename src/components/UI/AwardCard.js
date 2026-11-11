import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import AWARDS from "../../data/awards.json";

// digit shown on the medal, e.g. "Top 3" → "3", "1st" → "1"
function medalDigit(rank = "") {
  const m = String(rank).match(/\d+/);
  return m ? m[0] : "★";
}

// Highlight card for a competition result.
export function AwardCard({ award }) {
  return (
    <article className="st-award">
      <div className="st-award-medal" aria-hidden="true">
        <span className="st-award-rank">{medalDigit(award.rank)}</span>
        <span className="st-award-ribbon" />
      </div>
      <div className="st-award-body">
        <div className="st-pub-meta">
          {award.rank && <span className="st-badge rose">{award.rank}</span>}
          {award.event && <span className="st-badge">{award.event}</span>}
          {(award.tags || []).length > 0 && <span className="st-badge">{award.tags.join(" · ")}</span>}
        </div>
        <h3>
          {award.rank && <b>{award.rank}</b>} {award.rank && "at"} {award.event}
          {award.task && <> — {award.task}</>}
        </h3>
        {award.desc && <p className="st-body">{award.desc}</p>}
        {award.url && (
          <a href={award.url} target="_blank" rel="noreferrer" className="st-link">
            About the competition <FiArrowUpRight />
          </a>
        )}
      </div>
    </article>
  );
}

// All awards from src/data/awards.json (newest first).
function AwardList({ limit }) {
  const items = limit ? AWARDS.slice(0, limit) : AWARDS;
  return items.map((a) => <AwardCard key={a.id || a.event} award={a} />);
}

export default AwardList;
