import { expect, test } from "@playwright/test";

test("opens in Thai and can switch languages", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /ข้อมูลเชิงแนะนำส่วนตัว/ })).toBeVisible();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page.getByRole("heading", { name: /Personal timing intelligence/ })).toBeVisible();
  await page.getByRole("link", { name: "简体中文" }).click();
  await expect(page.getByRole("heading", { name: /个人时机智能/ })).toBeVisible();
});

test("runs daily analysis", async ({ page }) => {
  await page.goto("/th");
  await page.getByRole("button", { name: "เริ่มวิเคราะห์" }).click();
  await expect(page.locator(".score-card").getByText("คะแนนรวม")).toBeVisible();
  await expect(page.getByText("ระบบที่ใช้วิเคราะห์")).toBeVisible();
});

test("registers and enforces one free coupon per account", async ({ page }) => {
  const email = `coupon-${Date.now()}-${Math.round(Math.random() * 100000)}@example.com`;
  await page.goto("/th/register");
  await page.getByLabel("ชื่อที่ใช้แสดง").fill("Coupon Tester");
  await page.getByLabel("อีเมล").fill(email);
  await page.getByLabel("รหัสผ่าน").fill("password123");
  await page.getByRole("button", { name: "ยืนยัน" }).click();
  await expect(page.getByText("แดชบอร์ดสมาชิก")).toBeVisible();

  await page.goto("/th");
  await page.getByLabel("รหัสคูปอง").fill("FREE_1_WEEK");
  await page.getByRole("button", { name: "ใช้คูปอง" }).click();
  await expect(page.getByText("ใช้คูปองสำเร็จ")).toBeVisible();

  await page.getByLabel("รหัสคูปอง").fill("FREE_1_MONTH");
  await page.getByRole("button", { name: "ใช้คูปอง" }).click();
  await expect(page.getByText("บัญชีนี้เคยใช้คูปองฟรีแล้ว")).toBeVisible();
});

test("blocks off-topic explanation request without main AI answer", async ({ page }) => {
  await page.goto("/th");
  await page.getByRole("button", { name: "เริ่มวิเคราะห์" }).click();
  await expect(page.locator(".score-card").getByText("คะแนนรวม")).toBeVisible();
  await page.getByLabel("คำถามเกี่ยวกับผลวิเคราะห์").fill("ช่วย debug TypeScript function นี้ให้หน่อย");
  await page.getByRole("button", { name: "คำอธิบายเพิ่มเติม" }).click();
  await expect(page.getByRole("heading", { name: /ระบบนี้ให้บริการเฉพาะเรื่องดวง/ })).toBeVisible();
});
