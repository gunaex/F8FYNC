import type { F8SyncElementKey } from "./f8sync-dashboard-types";

type ArchetypeArtworkProps = {
  element: F8SyncElementKey;
  strength: "STRONG" | "WEAK";
  size?: number;
};

const elementColors: Record<F8SyncElementKey, { primary: string; secondary: string; soft: string }> = {
  WOOD: { primary: "#3B6D11", secondary: "#639922", soft: "#C0DD97" },
  FIRE: { primary: "#993C1D", secondary: "#D85A30", soft: "#FAC775" },
  EARTH: { primary: "#854F0B", secondary: "#BA7517", soft: "#FAC775" },
  METAL: { primary: "#5F5E5A", secondary: "#888780", soft: "#D3D1C7" },
  WATER: { primary: "#534AB7", secondary: "#7F77DD", soft: "#AFA9EC" }
};

export function ArchetypeArtwork({ element, strength, size = 88 }: ArchetypeArtworkProps) {
  const colors = elementColors[element];
  const strokeWidth = strength === "STRONG" ? 4 : 2.6;
  const opacity = strength === "STRONG" ? 0.98 : 0.72;

  return (
    <svg className="f8sync-archetype-artwork" width={size} height={size} viewBox="0 0 88 88" aria-hidden="true">
      {element === "WATER" ? (
        <>
          <circle cx="44" cy="44" r="31" fill="none" stroke={colors.soft} strokeWidth="2" opacity="0.7" />
          <circle cx="44" cy="44" r="21" fill="none" stroke={colors.secondary} strokeWidth={strokeWidth} opacity={opacity} />
          <path d="M20 43c8-8 16 8 24 0s16 8 24 0" fill="none" stroke={colors.primary} strokeLinecap="round" strokeWidth={strokeWidth} />
          <path d="M24 56c7-6 13 6 20 0s13 6 20 0" fill="none" stroke={colors.secondary} strokeLinecap="round" strokeWidth="2.4" opacity={opacity} />
          {[14, 26, 62, 74].map((x, index) => <circle key={x} cx={x} cy={index % 2 === 0 ? 30 : 62} r="2.5" fill={colors.primary} opacity="0.8" />)}
        </>
      ) : null}
      {element === "WOOD" ? (
        <>
          <circle cx="44" cy="46" r="6" fill={colors.primary} opacity={opacity} />
          {[[44, 46, 44, 15], [44, 46, 22, 28], [44, 46, 66, 26], [44, 46, 25, 65], [44, 46, 63, 66]].map((line) => (
            <path key={line.join("-")} d={`M${line[0]} ${line[1]} L${line[2]} ${line[3]}`} stroke={colors.primary} strokeLinecap="round" strokeWidth={strokeWidth} />
          ))}
          {[44, 22, 66, 25, 63].map((x, index) => <ellipse key={`${x}-${index}`} cx={x} cy={[15, 28, 26, 65, 66][index]} rx="6" ry="3.5" fill={index % 2 ? colors.soft : colors.secondary} transform={`rotate(${index * 28} ${x} ${[15, 28, 26, 65, 66][index]})`} />)}
        </>
      ) : null}
      {element === "FIRE" ? (
        <>
          <path d="M44 13c16 16 2 22 13 33 7 7 7 20-2 26-9 7-26 7-35-2 14-4 8-18 16-27 7-8 5-18 8-30Z" fill={colors.soft} opacity="0.8" />
          <path d="M47 21c10 12 1 18 9 27 6 7 3 18-8 22-13 5-26-5-22-19 4 3 9 1 10-5 2-10 7-13 11-25Z" fill={colors.secondary} opacity={opacity} />
          <path d="M45 39c7 8 7 18-1 22-8-4-9-13-2-22Z" fill={colors.primary} />
          {[24, 66, 58].map((x, index) => <circle key={x} cx={x} cy={[24, 24, 14][index]} r="2.2" fill={colors.primary} opacity="0.75" />)}
        </>
      ) : null}
      {element === "EARTH" ? (
        <>
          <path d="M44 13 73 68H15L44 13Z" fill={colors.soft} opacity="0.75" />
          <path d="M44 25 63 64H25L44 25Z" fill="none" stroke={colors.secondary} strokeWidth={strokeWidth} />
          <path d="M44 38 55 61H33L44 38Z" fill={colors.primary} opacity={opacity} />
          <path d="M25 70h38M31 59h26M36 49h16" stroke={colors.primary} strokeLinecap="round" strokeWidth="2.4" opacity="0.72" />
        </>
      ) : null}
      {element === "METAL" ? (
        <>
          <path d="M44 11 72 27v34L44 77 16 61V27L44 11Z" fill="none" stroke={colors.soft} strokeWidth="2" />
          <path d="M44 22 62 32v22L44 65 26 54V32L44 22Z" fill="none" stroke={colors.secondary} strokeWidth={strokeWidth} />
          <path d="M44 34 53 39v10l-9 6-9-6V39l9-5Z" fill={colors.primary} opacity={opacity} />
          {[[44, 11, 44, 23], [72, 27, 62, 33], [72, 61, 61, 54], [44, 77, 44, 65], [16, 61, 26, 54], [16, 27, 26, 33]].map((line) => (
            <path key={line.join("-")} d={`M${line[0]} ${line[1]} L${line[2]} ${line[3]}`} stroke={colors.primary} strokeLinecap="round" strokeWidth="2" opacity="0.65" />
          ))}
        </>
      ) : null}
    </svg>
  );
}
