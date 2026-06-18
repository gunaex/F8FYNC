import { ArchetypeArtwork } from "./archetype-artwork";
import type { F8SyncDashboardViewModel } from "./f8sync-dashboard-types";

type ArchetypeCardProps = {
  archetype: F8SyncDashboardViewModel["archetype"];
  onOpenDetail: () => void;
};

const elementLabel: Record<F8SyncDashboardViewModel["archetype"]["element"], string> = {
  WOOD: "ธาตุไม้",
  FIRE: "ธาตุไฟ",
  EARTH: "ธาตุดิน",
  METAL: "ธาตุทอง",
  WATER: "ธาตุน้ำ"
};

export function ArchetypeCard({ archetype, onOpenDetail }: ArchetypeCardProps) {
  return (
    <button className="f8sync-archetype-card" type="button" onClick={onOpenDetail} aria-label="ดูตัวตนแบบเต็ม">
      <span className="f8sync-archetype-eyebrow">ต้นแบบของคุณ</span>
      <strong>{archetype.nameTh}</strong>
      <span className="f8sync-archetype-subtitle">พลังหลัก: {elementLabel[archetype.element]} · {archetype.strength === "STRONG" ? "พลังเด่น" : "พลังนุ่ม"}</span>
      <span className="f8sync-archetype-divider" aria-hidden="true" />
      <span className="f8sync-archetype-note">ตัวตนนี้เป็นชั้นการตีความของ F8SYNC ไม่ใช่ธาตุเดียวทั้งหมด</span>
      <span className="f8sync-archetype-action">ดูตัวตนแบบเต็ม →</span>
      <span className="f8sync-archetype-art">
        <ArchetypeArtwork element={archetype.element} strength={archetype.strength} />
      </span>
    </button>
  );
}
