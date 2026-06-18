import type { F8SyncDashboardViewModel } from "./f8sync-dashboard-types";

type PillarDetailSheetProps = {
  pillar: F8SyncDashboardViewModel["pillars"][number] | null;
  onClose: () => void;
};

export function PillarDetailSheet({ pillar, onClose }: PillarDetailSheetProps) {
  if (!pillar) return null;

  return (
    <div className="f8sync-sheet-overlay" role="dialog" aria-modal="true" aria-labelledby="f8sync-pillar-sheet-title">
      <div className="f8sync-pillar-sheet">
        <div className="f8sync-sheet-handle" aria-hidden="true" />
        <h2 id="f8sync-pillar-sheet-title">{pillar.labelTh}</h2>
        {pillar.state === "KNOWN" ? (
          <div className="f8sync-pillar-detail-grid">
            <div>
              <span>ฟ้า</span>
              <strong>{pillar.stemChinese} — {pillar.stemLabelTh}</strong>
            </div>
            <div>
              <span>ดิน</span>
              <strong>{pillar.branchChinese} — {pillar.animalTh} / {pillar.branchLabelTh}</strong>
            </div>
            {pillar.hiddenStems?.length ? (
              <div className="f8sync-hidden-stems">
                <span>ธาตุที่ซ่อนอยู่</span>
                <ul>
                  {pillar.hiddenStems.map((stem) => (
                    <li key={`${stem.stemChinese}-${stem.roleTh}`}>
                      {stem.stemChinese} {stem.label} ({stem.elementTh}) · {stem.roleTh}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
        {pillar.state === "UNKNOWN" ? (
          <p className="muted">ยังไม่ทราบเวลาเกิด จึงแสดงเสาชั่วโมงแบบเต็มไม่ได้</p>
        ) : null}
        {pillar.state === "BOUNDARY_DISPUTED" ? (
          <div className="f8sync-alternatives">
            <p>เวลานี้อยู่ใกล้ขอบเขต จึงมี 2 ตัวเลือกที่ต้องตรวจสอบ</p>
            <ul>
              {(pillar.alternatives ?? []).map((alternative) => <li key={alternative}>{alternative}</li>)}
            </ul>
          </div>
        ) : null}
        <button className="button secondary" type="button" onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
}
