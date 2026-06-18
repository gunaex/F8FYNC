"use client";

import { useEffect, useState } from "react";
import { ArchetypeArtwork } from "./archetype-artwork";
import type { F8SyncDashboardViewModel, F8SyncElementKey } from "./f8sync-dashboard-types";

type ArchetypeDetailViewProps = {
  open: boolean;
  archetype: F8SyncDashboardViewModel["archetype"];
  onClose: () => void;
};

const fallbackGradients: Record<F8SyncElementKey, string> = {
  WOOD: "linear-gradient(160deg, #173404, #3B6D11)",
  FIRE: "linear-gradient(160deg, #4A1B0C, #993C1D)",
  EARTH: "linear-gradient(160deg, #412402, #854F0B)",
  METAL: "linear-gradient(160deg, #2C2C2A, #5F5E5A)",
  WATER: "linear-gradient(160deg, #042C53, #185FA5)"
};

const imageSlugs: Record<F8SyncDashboardViewModel["archetype"]["id"], string> = {
  "ARCH-01": "wood-strong",
  "ARCH-02": "wood-weak",
  "ARCH-03": "fire-strong",
  "ARCH-04": "fire-weak",
  "ARCH-05": "earth-strong",
  "ARCH-06": "earth-weak",
  "ARCH-07": "metal-strong",
  "ARCH-08": "metal-weak",
  "ARCH-09": "water-strong",
  "ARCH-10": "water-weak"
};

export function ArchetypeDetailView({ open, archetype, onClose }: ArchetypeDetailViewProps) {
  const [imageAvailable, setImageAvailable] = useState(true);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  useEffect(() => {
    setImageAvailable(true);
  }, [archetype.id]);

  if (!open) return null;

  const imageNumber = archetype.id.replace("ARCH-", "").padStart(2, "0");
  const imagePath = `/archetypes/arch-${imageNumber}-${imageSlugs[archetype.id]}.jpg`;

  return (
    <div className="f8sync-detail-overlay" role="dialog" aria-modal="true" aria-labelledby="f8sync-detail-title">
      <div className="f8sync-detail-sheet">
        <div className="f8sync-detail-hero" style={{ background: fallbackGradients[archetype.element] }}>
          {imageAvailable ? (
            <img
              src={imagePath}
              alt=""
              aria-hidden="true"
              onError={() => setImageAvailable(false)}
            />
          ) : null}
          <button className="f8sync-close-button" type="button" onClick={onClose} aria-label="ปิด">×</button>
          <div>
            <h2 id="f8sync-detail-title">{archetype.nameTh}</h2>
            <p>{archetype.element === "WATER" ? "ธาตุน้ำ" : archetype.element === "WOOD" ? "ธาตุไม้" : archetype.element === "FIRE" ? "ธาตุไฟ" : archetype.element === "EARTH" ? "ธาตุดิน" : "ธาตุทอง"} · {archetype.strength === "STRONG" ? "พลังเด่น" : "พลังนุ่ม"}</p>
          </div>
        </div>
        <div className="f8sync-detail-body">
          <div className="f8sync-detail-summary">
            <ArchetypeArtwork element={archetype.element} strength={archetype.strength} size={58} />
            <div>
              <strong>{archetype.summary}</strong>
              <p>{archetype.detail}</p>
            </div>
          </div>
          <div className="f8sync-detail-columns">
            <section>
              <h3>จุดเด่น</h3>
              <ul>{archetype.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <h3>จุดที่ควรระวัง</h3>
              <ul>{archetype.cautions.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </div>
          <section>
            <h3>ธาตุที่เสริม</h3>
            <div className="f8sync-supporting-elements">
              {archetype.supportingElements.map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>
          <button className="button secondary" type="button" onClick={onClose}>ปิด</button>
        </div>
      </div>
    </div>
  );
}
