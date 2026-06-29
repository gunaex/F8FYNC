"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ForecastDisciplineId, ForecastDomain, ForecastReading, HourForecast, PlanetaryRuler } from "@/core/forecast/types";
import { Card } from "@/ui/primitives";

const DOMAIN_META: Record<ForecastDomain, { color: string }> = {
  money: { color: "#d4a437" },
  career: { color: "#1f9c95" },
  luck: { color: "#8a6bd1" },
  opportunity: { color: "#e08a3c" },
  love: { color: "#e0638a" }
};

const DOMAIN_ORDER: ForecastDomain[] = ["money", "career", "luck", "opportunity", "love"];
const DISCIPLINE_ORDER: ForecastDisciplineId[] = ["planetary", "thai", "bazi"];

const DISCIPLINE_META: Record<ForecastDisciplineId, { color: string; fill: string; delay: string }> = {
  planetary: { color: "#9a78ff", fill: "rgba(154, 120, 255, 0.22)", delay: "0s" },
  thai: { color: "#1fb7ad", fill: "rgba(31, 183, 173, 0.2)", delay: "0.18s" },
  bazi: { color: "#f09542", fill: "rgba(240, 149, 66, 0.2)", delay: "0.36s" }
};

const RULER_GLYPH: Record<PlanetaryRuler, string> = {
  sun: "☉",
  moon: "☾",
  mars: "♂",
  mercury: "☿",
  jupiter: "♃",
  venus: "♀",
  saturn: "♄"
};

export type ForecastPanelLabels = {
  title: string;
  subtitle: string;
  trialBadge: string;
  loading: string;
  error: string;
  hourNow: string;
  hourLabel: (offset: number) => string;
  disciplines: Record<ForecastDisciplineId, string>;
  domains: Record<ForecastDomain, string>;
  ruler: string;
  score: string;
  safety: string;
  refresh: string;
};

type ForecastPanelProps = {
  requestId: string;
  contextTimezone: string;
  birthProfile?: { birthDate: string; birthTime?: string; birthTimezone: string };
  labels: ForecastPanelLabels;
};

export function ForecastPanel({ requestId, contextTimezone, birthProfile, labels }: ForecastPanelProps) {
  const [reading, setReading] = useState<ForecastReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);
  const refreshTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hourRefreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          contextTime: new Date().toISOString(),
          contextTimezone,
          birthProfile
        })
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.error?.messageKey ?? "common.error");
      setReading(json.data);
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    refreshTimer.current = setInterval(() => setTick((value) => value + 1), 30_000);
    const scheduleHourlyRefresh = () => {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(now.getHours() + 1, 0, 2, 0);
      hourRefreshTimer.current = setTimeout(() => {
        void load();
        scheduleHourlyRefresh();
      }, Math.max(1_000, nextHour.getTime() - now.getTime()));
    };
    scheduleHourlyRefresh();
    return () => {
      if (refreshTimer.current) clearInterval(refreshTimer.current);
      if (hourRefreshTimer.current) clearTimeout(hourRefreshTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId, contextTimezone, birthProfile?.birthDate, birthProfile?.birthTime, birthProfile?.birthTimezone]);

  // liveMinutes advances the "now" pointer smoothly between server refreshes.
  const liveMinutes = useMemo(() => {
    void tick;
    return new Date().getMinutes() + new Date().getSeconds() / 60;
  }, [tick]);

  return (
    <div className="forecast-panel" id="forecast-panel">
      <Card className="forecast-header-card">
        <span className="badge accent">{labels.trialBadge}</span>
        <h2>{labels.title}</h2>
        <p className="muted">{labels.subtitle}</p>
        <button type="button" className="forecast-refresh" onClick={() => void load()} disabled={loading}>
          {loading ? labels.loading : labels.refresh}
        </button>
      </Card>

      {error ? <p className="field-error">{error}</p> : null}

      {reading ? (
        <div className="forecast-visual">
          <StarWheel reading={reading} liveMinutes={liveMinutes} labels={labels} />
          <ForecastDisciplineStage reading={reading} contextTimezone={contextTimezone} labels={labels} />
        </div>
      ) : (
        <Card className="forecast-placeholder">
          <div className="forecast-spinner" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="muted">{loading ? labels.loading : labels.error}</p>
        </Card>
      )}

      {reading ? (
        <>
          <DomainScoreRibbon reading={reading} labels={labels} />
          <Card className="forecast-safety-card">
            <p className="muted">{labels.safety}</p>
          </Card>
        </>
      ) : null}
    </div>
  );
}

/** Rotating celestial wheel showing the real planetary longitudes and a live "now" pointer. */
function StarWheel({ reading, liveMinutes, labels }: { reading: ForecastReading; liveMinutes: number; labels: ForecastPanelLabels }) {
  const size = 240;
  const center = size / 2;
  const ringRadius = 96;
  const nowAngle = (liveMinutes / 60) * 30 - 90; // 30 deg per hour, 12 o'clock = top

  return (
    <div className="forecast-wheel">
      <svg viewBox={`0 0 ${size} ${size}`} className="forecast-wheel-svg" role="img" aria-label={labels.title}>
        <defs>
          <radialGradient id="wheel-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(138, 107, 209, 0.22)" />
            <stop offset="70%" stopColor="rgba(31, 156, 149, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r={ringRadius + 14} fill="url(#wheel-glow)" />
        <circle cx={center} cy={center} r={ringRadius} className="wheel-ring" />
        <circle cx={center} cy={center} r={ringRadius - 18} className="wheel-ring-inner" />

        <g className="wheel-rotate">
          {reading.sky.bodies.map((body, index) => {
            const angle = (body.eclipticLongitude - 90) * (Math.PI / 180);
            const x = center + Math.cos(angle) * ringRadius;
            const y = center + Math.sin(angle) * ringRadius;
            return (
              <g key={body.ruler} className="wheel-body" style={{ animationDelay: `${index * 0.4}s` }}>
                <circle cx={x} cy={y} r={5} className={`wheel-body-dot wheel-body-${body.ruler}`} />
                <text x={x} y={y - 9} className="wheel-body-glyph" textAnchor="middle">
                  {RULER_GLYPH[body.ruler]}
                </text>
              </g>
            );
          })}
        </g>

        {/* live "now" pointer */}
        <g className="wheel-now" transform={`rotate(${nowAngle} ${center} ${center})`}>
          <line x1={center} y1={center - ringRadius - 10} x2={center} y2={center - ringRadius + 8} className="wheel-now-line" />
          <circle cx={center} cy={center - ringRadius - 10} r={4} className="wheel-now-dot" />
        </g>
        <circle cx={center} cy={center} r={4} className="wheel-core" />
      </svg>
      <p className="muted forecast-wheel-caption">{labels.ruler}: {reading.hours[0].planetaryRuler}</p>
    </div>
  );
}

/** Animated 3D stage: one ribbon per forecasting discipline across the hourly horizon. */
function ForecastDisciplineStage({
  reading,
  contextTimezone,
  labels
}: {
  reading: ForecastReading;
  contextTimezone: string;
  labels: ForecastPanelLabels;
}) {
  return (
    <div className="forecast-stage">
      <div className="forecast-stage-labels" aria-label={labels.score}>
        {DISCIPLINE_ORDER.map((discipline) => (
          <span key={discipline} style={{ "--discipline-color": DISCIPLINE_META[discipline].color } as CSSProperties}>
            {labels.disciplines[discipline]}
          </span>
        ))}
      </div>
      <ForecastTerrainCanvas reading={reading} contextTimezone={contextTimezone} labels={labels} />
    </div>
  );
}

function normalizeDisciplineScore(rawAverage: number): number {
  return Math.max(14, Math.min(92, 52 + rawAverage * 2.2));
}

function ForecastTerrainCanvas({
  reading,
  contextTimezone,
  labels
}: {
  reading: ForecastReading;
  contextTimezone: string;
  labels: ForecastPanelLabels;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const terrain = useMemo(() => buildTerrain(reading), [reading]);
  const hourLabels = useMemo(() => reading.hours.map((hour) => formatHourLabel(hour.isoStart, contextTimezone)), [contextTimezone, reading]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationId = 0;
    const render = () => {
      frame += 0.018;
      drawTerrain(context, canvas, terrain, hourLabels, labels, frame);
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [hourLabels, labels, terrain]);

  return <canvas ref={canvasRef} className="forecast-terrain-canvas" width={920} height={520} aria-label={labels.score} />;
}

function formatHourLabel(isoStart: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone
    }).format(new Date(isoStart));
  } catch {
    return new Intl.DateTimeFormat("th-TH", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(isoStart));
  }
}

type Terrain = {
  xSteps: number;
  zSteps: number;
  heights: number[][];
  ridges: Array<{ discipline: ForecastDisciplineId; z: number; series: number[]; peakIndex: number }>;
};

type ProjectedPoint = { x: number; y: number; depth: number };

const RIDGE_Z: Record<ForecastDisciplineId, number> = {
  planetary: 0.24,
  thai: 0.52,
  bazi: 0.8
};

function buildTerrain(reading: ForecastReading): Terrain {
  const xSteps = 76;
  const zSteps = 34;
  const ridges = DISCIPLINE_ORDER.map((discipline) => {
    const series = reading.hours.map((hour) => {
      const rawAverage = DOMAIN_ORDER.reduce((sum, domain) => sum + hour.scores[domain].sources[discipline], 0) / DOMAIN_ORDER.length;
      return normalizeDisciplineScore(rawAverage) / 100;
    });
    const peakIndex = series.reduce((best, value, index) => value > series[best] ? index : best, 0);
    return { discipline, z: RIDGE_Z[discipline], series, peakIndex };
  });

  const heights = Array.from({ length: zSteps }, (_, zIndex) => {
    const z = zIndex / (zSteps - 1);
    return Array.from({ length: xSteps }, (_, xIndex) => {
      const x = xIndex / (xSteps - 1);
      let weighted = 0;
      let weightTotal = 0;
      for (const ridge of ridges) {
        const distance = z - ridge.z;
        const weight = Math.exp(-(distance * distance) / 0.018);
        weighted += interpolateSeries(ridge.series, x) * weight;
        weightTotal += weight;
      }
      const base = weightTotal ? weighted / weightTotal : 0.36;
      const fineWave = 0.025 * Math.sin(x * 42 + z * 16) + 0.018 * Math.sin(x * 91 - z * 23);
      const ridgeEnergy = ridges.reduce((sum, ridge) => sum + Math.exp(-((z - ridge.z) ** 2) / 0.008), 0) * 0.035;
      return clamp01(base * 0.78 + fineWave + ridgeEnergy);
    });
  });

  return { xSteps, zSteps, heights, ridges };
}

function interpolateSeries(series: number[], x: number) {
  if (series.length === 1) return series[0];
  const scaled = x * (series.length - 1);
  const left = Math.floor(scaled);
  const right = Math.min(series.length - 1, left + 1);
  const t = smoothStep(scaled - left);
  return series[left] * (1 - t) + series[right] * t;
}

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function drawTerrain(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  terrain: Terrain,
  hourLabels: string[],
  labels: ForecastPanelLabels,
  frame: number
) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const targetWidth = Math.max(1, Math.floor(rect.width * dpr));
  const targetHeight = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);
  drawTerrainBackground(context, width, height);

  const projected = terrain.heights.map((row, zIndex) => {
    const z = zIndex / (terrain.zSteps - 1);
    return row.map((heightValue, xIndex) => {
      const x = xIndex / (terrain.xSteps - 1);
      const animatedHeight = clamp01(heightValue + Math.sin(frame + x * 8 + z * 4) * 0.012);
      return projectTerrainPoint(x, z, animatedHeight, width, height);
    });
  });

  for (let zIndex = terrain.zSteps - 2; zIndex >= 0; zIndex -= 1) {
    for (let xIndex = 0; xIndex < terrain.xSteps - 1; xIndex += 1) {
      const p1 = projected[zIndex][xIndex];
      const p2 = projected[zIndex][xIndex + 1];
      const p3 = projected[zIndex + 1][xIndex + 1];
      const p4 = projected[zIndex + 1][xIndex];
      const averageHeight = (
        terrain.heights[zIndex][xIndex]
        + terrain.heights[zIndex][xIndex + 1]
        + terrain.heights[zIndex + 1][xIndex + 1]
        + terrain.heights[zIndex + 1][xIndex]
      ) / 4;
      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.lineTo(p3.x, p3.y);
      context.lineTo(p4.x, p4.y);
      context.closePath();
      context.fillStyle = terrainColor(averageHeight, zIndex / terrain.zSteps);
      context.fill();
      if (xIndex % 5 === 0 || zIndex % 5 === 0) {
        context.strokeStyle = "rgba(148, 209, 255, 0.075)";
        context.lineWidth = 0.7 * (window.devicePixelRatio || 1);
        context.stroke();
      }
    }
  }

  drawRidgeHighlights(context, terrain, width, height, frame);
  drawHourAxis(context, terrain, hourLabels, width, height);
  drawPeakLabels(context, terrain, hourLabels, labels, width, height, frame);
}

function projectTerrainPoint(x: number, z: number, y: number, width: number, height: number): ProjectedPoint {
  const centeredX = x - 0.5;
  const depth = z;
  const screenX = width * 0.5 + centeredX * width * 0.84 - (depth - 0.5) * width * 0.34;
  const baseY = height * 0.75 - depth * height * 0.31;
  const screenY = baseY - y * height * 0.43;
  return { x: screenX, y: screenY, depth };
}

function terrainColor(heightValue: number, z: number) {
  const hue = 214 - heightValue * 82 + z * 18;
  const lightness = 15 + heightValue * 34 - z * 5;
  const alpha = 0.72 + heightValue * 0.22;
  return `hsla(${hue}, 88%, ${lightness}%, ${alpha})`;
}

function drawTerrainBackground(context: CanvasRenderingContext2D, width: number, height: number) {
  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#070a18");
  background.addColorStop(0.46, "#0a1433");
  background.addColorStop(1, "#161037");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.52, height * 0.3, 0, width * 0.52, height * 0.3, width * 0.62);
  glow.addColorStop(0, "rgba(45, 221, 203, 0.18)");
  glow.addColorStop(0.44, "rgba(37, 105, 255, 0.1)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawRidgeHighlights(context: CanvasRenderingContext2D, terrain: Terrain, width: number, height: number, frame: number) {
  for (const ridge of terrain.ridges) {
    const meta = DISCIPLINE_META[ridge.discipline];
    context.beginPath();
    ridge.series.forEach((value, index) => {
      const x = index / (ridge.series.length - 1);
      const pulse = Math.sin(frame + index * 0.8) * 0.018;
      const point = projectTerrainPoint(x, ridge.z, clamp01(value + pulse), width, height);
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.strokeStyle = meta.color;
    context.lineWidth = 3.2 * (window.devicePixelRatio || 1);
    context.shadowColor = meta.color;
    context.shadowBlur = 18 * (window.devicePixelRatio || 1);
    context.stroke();
    context.shadowBlur = 0;
  }
}

function drawHourAxis(context: CanvasRenderingContext2D, terrain: Terrain, hourLabels: string[], width: number, height: number) {
  context.save();
  context.fillStyle = "rgba(224, 232, 255, 0.72)";
  context.font = `${12 * (window.devicePixelRatio || 1)}px ui-sans-serif, system-ui`;
  context.textAlign = "center";
  context.textBaseline = "top";
  hourLabels.forEach((label, index) => {
    const x = index / Math.max(1, hourLabels.length - 1);
    const point = projectTerrainPoint(x, 0.06, 0.02, width, height);
    context.fillText(label, point.x, point.y + height * 0.075);
  });
  context.restore();
  void terrain;
}

function drawPeakLabels(
  context: CanvasRenderingContext2D,
  terrain: Terrain,
  hourLabels: string[],
  labels: ForecastPanelLabels,
  width: number,
  height: number,
  frame: number
) {
  const dpr = window.devicePixelRatio || 1;
  context.save();
  context.font = `${11 * dpr}px ui-sans-serif, system-ui`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  const placed: Array<{ x: number; y: number; width: number; height: number }> = [];
  const orderedRidges = [...terrain.ridges].sort((a, b) => b.series[b.peakIndex] - a.series[a.peakIndex]);
  orderedRidges.forEach((ridge, ridgeIndex) => {
    const index = ridge.peakIndex;
    const x = index / Math.max(1, ridge.series.length - 1);
    const y = clamp01(ridge.series[index] + 0.02 * Math.sin(frame * 1.4 + index));
    const point = projectTerrainPoint(x, ridge.z, y, width, height);
    const label = `${labels.disciplines[ridge.discipline]} ${hourLabels[index]}`;
    const textWidth = context.measureText(label).width;
    const boxWidth = Math.min(width * 0.54, textWidth + 18 * dpr);
    const boxHeight = 24 * dpr;
    const stagger = (ridgeIndex - 1) * 20 * dpr;
    const boxX = Math.max(8 * dpr, Math.min(width - boxWidth - 8 * dpr, point.x - boxWidth / 2));
    const boxY = Math.max(10 * dpr, Math.min(height * 0.5, point.y - 52 * dpr + stagger));
    const labelCenterX = boxX + boxWidth / 2;
    const box = { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
    if (placed.some((other) => boxesOverlap(box, other, 8 * dpr))) return;
    placed.push(box);

    context.strokeStyle = `${DISCIPLINE_META[ridge.discipline].color}88`;
    context.lineWidth = 1 * dpr;
    context.beginPath();
    context.moveTo(point.x, point.y - 4 * dpr);
    context.lineTo(labelCenterX, boxY + boxHeight);
    context.stroke();

    context.fillStyle = "rgba(7, 12, 28, 0.78)";
    roundRect(context, boxX, boxY, boxWidth, boxHeight, 7 * dpr);
    context.fill();
    context.strokeStyle = "rgba(210, 232, 255, 0.2)";
    context.stroke();
    context.fillStyle = "rgba(232, 244, 255, 0.92)";
    context.fillText(label, labelCenterX, boxY + boxHeight / 2, boxWidth - 12 * dpr);
  });
  context.restore();
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function boxesOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
  padding: number
) {
  return !(
    a.x + a.width + padding < b.x
    || b.x + b.width + padding < a.x
    || a.y + a.height + padding < b.y
    || b.y + b.height + padding < a.y
  );
}

/** Compact per-domain average score chips rendered beneath the wave. */
function DomainScoreRibbon({ reading, labels }: { reading: ForecastReading; labels: ForecastPanelLabels }) {
  const averages = DOMAIN_ORDER.map((domain) => {
    const total = reading.hours.reduce((sum, hour: HourForecast) => sum + hour.scores[domain].score, 0);
    return { domain, average: Math.round(total / reading.hours.length) };
  });
  return (
    <Card className="forecast-ribbon">
      <p className="muted forecast-ribbon-title">{labels.score}</p>
      <div className="forecast-ribbon-grid">
        {averages.map(({ domain, average }) => (
          <div key={domain} className="forecast-ribbon-chip">
            <span className="forecast-ribbon-dot" style={{ background: DOMAIN_META[domain].color }} />
            <span className="forecast-ribbon-label">{labels.domains[domain]}</span>
            <strong style={{ color: DOMAIN_META[domain].color }}>{average}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
