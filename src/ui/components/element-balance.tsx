import type { F8SyncDashboardViewModel } from "./f8sync-dashboard-types";

type ElementBalanceProps = {
  elements: F8SyncDashboardViewModel["elements"];
};

export function ElementBalance({ elements }: ElementBalanceProps) {
  return (
    <section className="f8sync-section" aria-labelledby="f8sync-elements-title">
      <h2 id="f8sync-elements-title" className="f8sync-section-title">สมดุลธาตุ</h2>
      <div className="f8sync-element-grid">
        {elements.map((element) => (
          <div key={element.key} className={`f8sync-element-tile f8sync-element-tile--${element.key.toLowerCase()}`}>
            <span>{element.labelTh}</span>
            <strong>{element.percentage}%</strong>
            <small>{element.statusTh}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
