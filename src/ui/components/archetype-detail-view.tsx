"use client";

import { useEffect, useState } from "react";
import { ArchetypeArtwork } from "./archetype-artwork";
import type { F8SyncDashboardViewModel, F8SyncElementKey } from "./f8sync-dashboard-types";

type ArchetypeDetailViewProps = {
  open: boolean;
  archetype: F8SyncDashboardViewModel["archetype"];
  onClose: () => void;
};

type ArchetypeContent = {
  id: F8SyncDashboardViewModel["archetype"]["id"];
  name: string;
  baseSymbol: string;
  energyStyle: "CLEAR" | "SUBTLE";
  tagline: string;
  descriptionParagraphs: string[];
  strengths: string[];
  watchOut: string[];
  supportGuidance?: string[];
  methodologyDisclosure: string;
  confidenceDisclosure?: string;
  resultStatus: "COMPLETE" | "PARTIAL" | "INCOMPLETE";
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

const archetypeContent: Record<F8SyncDashboardViewModel["archetype"]["id"], ArchetypeContent> = {
  "ARCH-01": {
    id: "ARCH-01",
    name: "ต้นไม้ใหญ่",
    baseSymbol: "ไม้หยาง",
    energyStyle: "CLEAR",
    tagline: "ชอบการเติบโตที่มั่นคง และมักเป็นที่พึ่งของคนรอบข้าง",
    descriptionParagraphs: [
      "คุณชอบการเติบโตที่มั่นคงมากกว่าความสำเร็จแบบฉับพลัน เมื่อตั้งใจทำอะไร คุณมักเดินหน้าต่อเนื่องและไม่เปลี่ยนทิศง่ายๆ",
      "คนรอบข้างมักมองว่าคุณเป็นคนที่พึ่งพาได้ แต่บางครั้งการรับผิดชอบหลายอย่างพร้อมกันก็ทำให้คุณลืมดูแลตัวเอง"
    ],
    strengths: ["มักเดินหน้าต่อเนื่องจนเห็นผล ไม่ล้มเลิกง่าย", "ตัดสินใจได้ชัดเจนเมื่อรู้ทิศทางแล้ว", "คนรอบข้างมักรู้สึกพึ่งพาได้ในสถานการณ์ที่ต้องการความมั่นคง", "พูดตรงและทำตามที่พูด"],
    watchOut: ["บางครั้งยึดกับแผนเดิมนานเกินไป ลองแยกให้ออกว่ากำลังรักษาความมั่นคงหรือยึดติดกับความคุ้นเคย", "มักเต็มใจช่วยเหลือคนอื่น แต่ควรหยุดถามตัวเองเป็นระยะว่ากำลังเหนื่อยเกินไปหรือไม่"],
    supportGuidance: ["น้ำ — หล่อเลี้ยงให้เติบโต", "ไฟ — ช่วยให้ใช้ความสามารถได้เต็มที่"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-02": {
    id: "ARCH-02",
    name: "ต้นกล้า",
    baseSymbol: "ไม้หยิน",
    energyStyle: "SUBTLE",
    tagline: "ปรับตัวได้ดีในหลายสถานการณ์ และจับอารมณ์คนรอบข้างได้ไว",
    descriptionParagraphs: [
      "คุณอาจไม่ได้เดินหน้าแบบตรงไปตรงมาเสมอไป แต่คุณรู้จักปรับทิศตามสถานการณ์โดยไม่เสียตัวตน เหมือนต้นอ่อนที่โค้งตามลมและค่อยๆ หาทางเติบโต",
      "คุณจับอารมณ์และบรรยากาศได้ไว จึงเข้ากับผู้คนได้ง่าย แต่บางครั้งก็อาจปรับตัวตามคนอื่นมากจนลืมถามว่าตัวเองต้องการอะไร"
    ],
    strengths: ["ปรับตัวกับสถานการณ์ใหม่ได้ค่อนข้างเร็ว", "จับอารมณ์และบรรยากาศรอบตัวได้ไว", "เข้ากับคนใหม่ๆ ได้ค่อนข้างง่าย", "มองเห็นหลายมุมก่อนตัดสินใจ"],
    watchOut: ["ก่อนขอความเห็นจากคนอื่น ลองบอกตัวเองให้ชัดก่อนว่าคุณต้องการอะไร", "สังเกตว่าในบางสถานการณ์คุณกำลังปรับตัวตามคนอื่น หรือเลือกด้วยตัวเอง"],
    supportGuidance: ["น้ำ — ช่วยให้ใจนิ่งขึ้น", "ไม้ — เสริมพลังให้กันและกัน"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-03": {
    id: "ARCH-03",
    name: "เปลวเพลิง",
    baseSymbol: "ไฟหยาง",
    energyStyle: "CLEAR",
    tagline: "คนมักสังเกตเห็นความกระตือรือร้นของคุณ และคุณมักกล้ารับบทนำเมื่อสถานการณ์ต้องการ",
    descriptionParagraphs: [
      "คนมักสังเกตเห็นความกระตือรือร้นและความมั่นใจของคุณได้ไม่ยาก เวลาคนอื่นลังเล คุณมักเป็นคนที่ชวนให้ลองเริ่มก่อน และมองว่าเรื่องยากยังพอมีทางให้ลอง",
      "พลังและความกล้าของคุณช่วยให้เรื่องต่างๆ เคลื่อนไปข้างหน้า แต่บางครั้งคุณอาจเดินเร็วเกินกว่าที่คนรอบข้างจะตามทัน"
    ],
    strengths: ["เริ่มต้นสิ่งใหม่และชวนคนอื่นให้ลงมือได้ดี", "สื่อสารได้ชัดเจนและโน้มน้าวได้ในหลายสถานการณ์", "มองเห็นโอกาสในสถานการณ์ที่คนอื่นยังลังเล", "กล้ารับผิดชอบและนำทางเมื่อทีมยังไม่แน่ใจ"],
    watchOut: ["ก่อนตัดสินใจเรื่องใหญ่ ลองเว้นจังหวะให้คนอื่นได้เสนอความเห็น", "คุณตัดสินใจได้เร็ว แต่บางครั้งอาจเดินเร็วกว่าคนรอบข้าง"],
    supportGuidance: ["ไม้ — เติมพลังให้ไฟลุกต่อ", "ดิน — ช่วยให้มีทิศทางชัดขึ้น"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-04": {
    id: "ARCH-04",
    name: "ประกายไฟ",
    baseSymbol: "ไฟหยิน",
    energyStyle: "SUBTLE",
    tagline: "ให้ความอบอุ่นในแบบเฉพาะของตัวเอง และสังเกตความรู้สึกคนอื่นได้ละเอียด",
    descriptionParagraphs: [
      "คุณไม่ได้แสดงพลังออกมาตรงๆ แต่คนใกล้ตัวมักสัมผัสได้ถึงความอบอุ่นและความใส่ใจของคุณ คุณสังเกตเรื่องเล็กๆ ที่คนอื่นอาจมองข้าม และมักเลือกพูดหรือทำในจังหวะที่เหมาะ",
      "การใส่ใจคนอื่นเป็นจุดเด่นของคุณ แต่ถ้าให้มากเกินไป คุณอาจเหนื่อยโดยไม่รู้ตัว"
    ],
    strengths: ["สังเกตน้ำเสียง สีหน้า และบรรยากาศได้ละเอียด", "สร้างความไว้วางใจได้ในกลุ่มเล็กได้ดี", "คิดรอบคอบก่อนพูดหรือทำ", "สร้างแรงบันดาลใจแบบเงียบๆ ที่คนรอบข้างรู้สึกได้"],
    watchOut: ["คุณเข้าใจความรู้สึกคนอื่นได้ดี แต่ก็อาจรับเรื่องของคนอื่นมาเก็บไว้กับตัวมากเกินไป", "ลองหาเวลาพักและอยู่กับตัวเองบ้าง"],
    supportGuidance: ["ไม้ — เพิ่มพลังงานภายใน", "ทอง — ช่วยให้โฟกัสชัดขึ้น"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-05": {
    id: "ARCH-05",
    name: "ภูเขา",
    baseSymbol: "ดินหยาง",
    energyStyle: "CLEAR",
    tagline: "ในวันที่สถานการณ์ไม่แน่นอน คุณมักเป็นคนที่ยังรักษาจังหวะของตัวเองไว้ได้",
    descriptionParagraphs: [
      "ในวันที่สถานการณ์ไม่แน่นอน คุณมักเป็นคนที่ยังรักษาจังหวะของตัวเองไว้ได้ คนอื่นจึงมักรู้สึกอุ่นใจเมื่อมีคุณอยู่ใกล้ๆ",
      "ความมั่นคงเป็นจุดแข็งของคุณ แต่บางครั้งก็อาจทำให้คุณใช้เวลานานกว่าจะยอมเปลี่ยนทิศทาง"
    ],
    strengths: ["รักษาความสงบในสถานการณ์ที่คนอื่นเริ่มกังวล", "มักเป็นที่พึ่งได้ในสถานการณ์ที่ต้องการความมั่นคง", "ทำตามที่พูดและรับผิดชอบในสิ่งที่รับปากไว้", "ช่วยให้คนรอบข้างรู้สึกมั่นคงขึ้น"],
    watchOut: ["เมื่อแผนเดิมไม่ตอบโจทย์ ลองแยกให้ออกว่ากำลังรักษาความมั่นคงหรือยึดติดกับความคุ้นเคย", "ความมั่นคงเป็นข้อดี แต่บางครั้งก็ทำให้เริ่มต้นสิ่งใหม่ช้ากว่าที่ควร"],
    supportGuidance: ["ไฟ — เพิ่มพลังชีวิตและความอบอุ่น", "ทอง — ช่วยให้ใช้ความสามารถได้เต็มที่"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-06": {
    id: "ARCH-06",
    name: "ผืนดิน",
    baseSymbol: "ดินหยิน",
    energyStyle: "SUBTLE",
    tagline: "ผลงานของคุณเห็นชัดจากความสม่ำเสมอ มากกว่าการพูดถึงตัวเอง",
    descriptionParagraphs: [
      "คุณไม่ได้ต้องการเป็นจุดสนใจตลอดเวลา ผลงานของคุณมักเห็นชัดจากรายละเอียด ความสม่ำเสมอ และการดูแลเรื่องเล็กๆ ให้เรียบร้อย",
      "คุณเก่งกับงานที่ต้องใช้ความอดทน แต่บางครั้งอาจกังวลกับรายละเอียดมากจนเสียพลังเกินจำเป็น"
    ],
    strengths: ["ดูแลรายละเอียดที่คนอื่นมักมองข้ามได้ดี", "มักทำงานที่ต้องใช้ความต่อเนื่องและความใส่ใจได้ดี", "เชื่อถือได้ในระยะยาว ทำสิ่งที่รับปากไว้", "สังเกตสิ่งที่ยังไม่เรียบร้อยได้ก่อนคนอื่น"],
    watchOut: ["ก่อนขอความเห็นจากคนอื่น ลองบอกตัวเองให้ชัดก่อนว่าคุณต้องการอะไร", "คุณมีมาตรฐานสูงกับตัวเอง ซึ่งช่วยให้งานดี แต่บางครั้งทำให้เริ่มต้นช้าหรือไม่พอใจกับตัวเอง"],
    supportGuidance: ["ไฟ — เพิ่มความมั่นใจและพลังงาน", "ไม้ — ช่วยให้โตและขยายตัว"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-07": {
    id: "ARCH-07",
    name: "ดาบ",
    baseSymbol: "ทองหยาง",
    energyStyle: "CLEAR",
    tagline: "เวลาต้องตัดสินใจ คุณมักเลือกทางที่ชัดเจนและตรงประเด็น",
    descriptionParagraphs: [
      "เวลาต้องตัดสินใจ คุณมักเลือกทางที่ชัดเจนและตรงประเด็น คุณไม่ชอบปล่อยปัญหาให้ค้าง และมักกล้าพูดในเรื่องที่คนอื่นหลีกเลี่ยง",
      "ความตรงของคุณช่วยให้หลายเรื่องเดินหน้าเร็ว แต่บางครั้งก็ควรเผื่อพื้นที่ให้ความรู้สึกของคนอื่นด้วย"
    ],
    strengths: ["ตัดสิ่งที่ไม่จำเป็นออกและโฟกัสกับเป้าหมายได้ดี", "ยึดมั่นในหลักการที่ตัวเองเชื่อ", "กล้าพูดในเรื่องที่คนอื่นหลีกเลี่ยง", "กล้ารับผิดชอบและนำทางเมื่อทีมยังไม่แน่ใจ"],
    watchOut: ["ก่อนตัดสินใจเรื่องใหญ่ ลองเว้นจังหวะให้คนอื่นได้เสนอความเห็น", "ความตรงเป็นจุดแข็ง แต่บางสถานการณ์ต้องการพื้นที่ให้ความรู้สึกด้วย"],
    supportGuidance: ["ดิน — สนับสนุนและเสริมความมั่นคง", "น้ำ — ช่วยให้ผ่อนคลายและไหลลื่น"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-08": {
    id: "ARCH-08",
    name: "อัญมณี",
    baseSymbol: "ทองหยิน",
    energyStyle: "SUBTLE",
    tagline: "คุณมักเห็นรายละเอียดที่คนอื่นมองข้าม และรู้ว่าจุดเล็กๆ ไหนทำให้งานดูดีขึ้น",
    descriptionParagraphs: [
      "คุณมักเห็นรายละเอียดที่คนอื่นมองข้าม และรู้ว่าจุดเล็กๆ ไหนทำให้งานดูดีขึ้น คุณให้ความสำคัญกับคุณภาพ ความเรียบร้อย และรสนิยมของตัวเอง",
      "มาตรฐานที่สูงช่วยให้งานออกมาดี แต่บางครั้งก็ทำให้คุณตั้งมาตรฐานกับตัวเองสูงเกินไป"
    ],
    strengths: ["สังเกตจุดที่ยังปรับให้ดีขึ้นได้ก่อนคนอื่น", "ใส่ใจความเรียบร้อยและคุณภาพในงานที่ทำ", "ไม่ค่อยพอใจกับงานที่ยังรู้สึกว่าไม่เรียบร้อย", "มีรสนิยมและมาตรฐานของตัวเองที่ชัดเจน"],
    watchOut: ["คุณมีมาตรฐานสูงกับตัวเอง ซึ่งช่วยให้งานดี แต่บางครั้งทำให้เริ่มต้นช้าหรือไม่พอใจกับตัวเอง", "ลองแยกให้ออกว่าเรื่องไหนควรปรับให้ดีขึ้น และเรื่องไหนดีพอแล้ว"],
    supportGuidance: ["ดิน — เสริมพื้นฐานให้มั่นคง", "น้ำ — ช่วยให้ไหลลื่นและผ่อนคลาย"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-09": {
    id: "ARCH-09",
    name: "มหาสมุทร",
    baseSymbol: "น้ำหยาง",
    energyStyle: "CLEAR",
    tagline: "ลึก กว้าง และเคลื่อนไหวอยู่เสมอ",
    descriptionParagraphs: [
      "คุณมักคิดเป็นภาพใหญ่ และเชื่อมโยงเรื่องที่คนอื่นมองว่าไม่เกี่ยวกันได้ดี เวลาสถานการณ์เปลี่ยน คุณปรับตัวได้ค่อนข้างเร็ว",
      "คนอื่นอาจมองว่าคุณนิ่ง แต่ข้างในมักมีทั้งความคิด แผน และคำถามอยู่หลายชั้น บางครั้งจึงคิดนานกว่าจะเริ่มลงมือ"
    ],
    strengths: ["คิดเป็นภาพใหญ่และมองเห็นความเชื่อมโยงที่ซับซ้อน", "ปรับตัวได้ดีเมื่อสถานการณ์เปลี่ยน", "มักจับทิศทางของสถานการณ์ได้ไว", "เชื่อมโยงผู้คนและความคิดเข้าหากันได้ดี"],
    watchOut: ["คุณคิดได้ลึก แต่บางครั้งคิดนานเกินไปจนเป็นอุปสรรคในการลงมือทำ", "ลองหาเวลาพักจากความคิดบ้าง"],
    supportGuidance: ["ทอง — เพิ่มความชัดเจนและทิศทาง", "ไม้ — ช่วยระบายและใช้พลังที่มีอยู่"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  },
  "ARCH-10": {
    id: "ARCH-10",
    name: "ธารน้ำ",
    baseSymbol: "น้ำหยิน",
    energyStyle: "SUBTLE",
    tagline: "จับอารมณ์และบรรยากาศรอบตัวได้ไว และช่วยให้คนอื่นรู้สึกสบายใจได้",
    descriptionParagraphs: [
      "คุณจับอารมณ์และบรรยากาศรอบตัวได้ไว บางครั้งแค่สีหน้าหรือน้ำเสียงเล็กน้อย คุณก็พอรู้ว่าอีกฝ่ายกำลังรู้สึกอย่างไร",
      "จุดนี้ช่วยให้คนอื่นรู้สึกสบายใจเมื่อคุยกับคุณ แต่ก็อาจทำให้คุณรับอารมณ์ของคนอื่นมาไว้กับตัวมากเกินไป"
    ],
    strengths: ["สังเกตน้ำเสียง สีหน้า และบรรยากาศได้ละเอียด", "คนอื่นมักรู้สึกสบายใจเมื่อคุยด้วย", "คิดวิเคราะห์ได้รอบด้านและลึก", "มีความคิดสร้างสรรค์และจินตนาการที่หลากหลาย"],
    watchOut: ["ความไวต่อความรู้สึกเป็นทั้งจุดแข็งและสิ่งที่ต้องดูแล ลองแยกให้ออกว่าเรื่องไหนควรช่วย และเรื่องไหนไม่จำเป็นต้องรับมาเป็นภาระของตัวเอง", "ก่อนขอความเห็นจากคนอื่น ลองบอกตัวเองให้ชัดก่อนว่าคุณต้องการอะไร"],
    supportGuidance: ["ทอง — เพิ่มความมั่นคงและทิศทาง", "ดิน — ช่วยให้มีฐานที่มั่น"],
    methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง",
    resultStatus: "COMPLETE"
  }
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
  const content = archetypeContent[archetype.id];

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
            <h2 id="f8sync-detail-title">{content.name}</h2>
            <p>{archetype.element === "WATER" ? "ธาตุน้ำ" : archetype.element === "WOOD" ? "ธาตุไม้" : archetype.element === "FIRE" ? "ธาตุไฟ" : archetype.element === "EARTH" ? "ธาตุดิน" : "ธาตุทอง"} · {archetype.strength === "STRONG" ? "พลังเด่น" : "พลังนุ่ม"}</p>
          </div>
        </div>
        <div className="f8sync-detail-body">
          <div className="f8sync-detail-summary">
            <ArchetypeArtwork element={archetype.element} strength={archetype.strength} size={58} />
            <div>
              <strong>{content.tagline}</strong>
              {content.descriptionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="f8sync-detail-columns">
            <section>
              <h3>จุดเด่น</h3>
              <ul>{content.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <h3>จุดที่ควรระวัง</h3>
              <ul>{content.watchOut.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </div>
          <p className="f8sync-methodology-disclosure">{content.methodologyDisclosure}</p>
          <button className="button secondary" type="button" onClick={onClose}>ปิด</button>
        </div>
      </div>
    </div>
  );
}
