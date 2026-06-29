export const featureFlags = {
  baziPlugin: process.env.ENABLE_BAZI_PLUGIN !== "false",
  numerologyPlugin: process.env.ENABLE_NUMEROLOGY_PLUGIN !== "false",
  timingPlugin: process.env.ENABLE_TIMING_PLUGIN !== "false",
  v8Identity: process.env.ENABLE_V8_IDENTITY !== "false",
  v8Cards: process.env.ENABLE_V8_CARDS === "true",
  v8Collection: process.env.ENABLE_V8_COLLECTION === "true",
  v8Packs: process.env.ENABLE_V8_PACKS === "true",
  v8PhysicalProducts: process.env.ENABLE_V8_PHYSICAL_PRODUCTS === "true",
  v8Notifications: process.env.ENABLE_V8_NOTIFICATIONS === "true",
  paidRandomPacks: process.env.ENABLE_PAID_RANDOM_PACKS === "true",
  realFulfillment: process.env.ENABLE_REAL_FULFILLMENT === "true",
  // 6-hour blended forecast: enabled by default during development so guests can try it.
  // In production set ENABLE_FORECAST_6H=false to require a subscription.
  forecast6h: process.env.ENABLE_FORECAST_6H !== "false",
  forecastDevBypass: process.env.ENABLE_FORECAST_DEV_BYPASS !== "false"
};
