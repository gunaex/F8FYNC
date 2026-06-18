import type { F8SyncDashboardViewModel, F8SyncPillarKey } from "./f8sync-dashboard-types";

type FourPillarsRowProps = {
  pillars: F8SyncDashboardViewModel["pillars"];
  onSelectPillar: (pillarKey: F8SyncPillarKey) => void;
};

export function FourPillarsRow({ pillars, onSelectPillar }: FourPillarsRowProps) {
  return (
    <section className="f8sync-section" aria-labelledby="f8sync-pillars-title">
      <h2 id="f8sync-pillars-title" className="f8sync-section-title">เสาหลักทั้งสี่</h2>
      <div className="f8sync-pillars">
        {pillars.map((pillar) => (
          <button
            key={pillar.key}
            className={`f8sync-pillar-card f8sync-pillar-card--${pillar.state.toLowerCase()}`}
            type="button"
            onClick={() => onSelectPillar(pillar.key)}
            aria-label={`ดูรายละเอียด${pillar.labelTh}`}
          >
            <span className="f8sync-pillar-label">{pillar.labelTh}</span>
            {pillar.state === "KNOWN" ? (
              <>
                <span className="f8sync-pillar-sub">ฟ้า · ดิน</span>
                <span className="f8sync-pillar-stem">{pillar.stemChinese}</span>
                <span className="f8sync-pillar-branch">{pillar.branchChinese}</span>
                <span className="f8sync-pillar-animal">{pillar.animalTh}</span>
              </>
            ) : null}
            {pillar.state === "UNKNOWN" ? (
              <>
                <span className="f8sync-pillar-icon" aria-hidden="true">?</span>
                <span className="f8sync-pillar-unknown">ไม่ทราบเวลาเกิด</span>
              </>
            ) : null}
            {pillar.state === "BOUNDARY_DISPUTED" ? (
              <>
                <span className="f8sync-pillar-icon" aria-hidden="true">?</span>
                <span className="f8sync-pillar-unknown">2 ตัวเลือก</span>
              </>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
