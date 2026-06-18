import type { F8SyncDashboardViewModel } from "./f8sync-dashboard-types";

type DailyTimingCardProps = {
  daily: F8SyncDashboardViewModel["daily"];
};

export function DailyTimingCard({ daily }: DailyTimingCardProps) {
  return (
    <section className="f8sync-daily-card" aria-labelledby="f8sync-daily-title">
      <span className="f8sync-daily-date">วันนี้ · {daily.localDateLabel} · {daily.timezoneLabel}</span>
      <div className="f8sync-daily-heading">
        <h2 id="f8sync-daily-title">{daily.headline}</h2>
        <span>{daily.statusTag}</span>
      </div>
      <p>{daily.summary}</p>
      <strong>แนะนำวันนี้</strong>
      <ul className="f8sync-activity-list" aria-label="กิจกรรมที่แนะนำ">
        {daily.activities.slice(0, 3).map((activity) => <li key={activity}>{activity}</li>)}
      </ul>
      <button className="f8sync-link-button" type="button">ดูช่วงเวลาที่เหมาะ →</button>
    </section>
  );
}
