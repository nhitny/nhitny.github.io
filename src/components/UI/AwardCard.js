import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

export const VLSP_2026 = {
  rank: "Top 3",
  event: "VLSP 2026",
  task: "Task 3 · Speech Quality Assessment",
  desc:
    "Reference-free speech quality assessment: predict an overall quality score (1–5) for degraded recordings and detect and localise what went wrong — noise, distortion and unnatural pauses.",
  url: "https://vlsp.org.vn/vlsp2026/eval/sqa",
};

// Highlight card for a competition result.
function AwardCard({ award = VLSP_2026 }) {
  return (
    <article className="st-award">
      <div className="st-award-medal" aria-hidden="true">
        <span className="st-award-rank">3</span>
        <span className="st-award-ribbon" />
      </div>
      <div className="st-award-body">
        <div className="st-pub-meta">
          <span className="st-badge rose">{award.rank}</span>
          <span className="st-badge">{award.event}</span>
          <span className="st-badge">Speech · Audio</span>
        </div>
        <h3>
          <b>{award.rank}</b> at {award.event} — {award.task}
        </h3>
        <p className="st-body">{award.desc}</p>
        <a href={award.url} target="_blank" rel="noreferrer" className="st-link">
          About the task <FiArrowUpRight />
        </a>
      </div>
    </article>
  );
}

export default AwardCard;
