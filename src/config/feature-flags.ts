export const featureFlags = {
  baziPlugin: process.env.ENABLE_BAZI_PLUGIN !== "false",
  numerologyPlugin: process.env.ENABLE_NUMEROLOGY_PLUGIN !== "false",
  timingPlugin: process.env.ENABLE_TIMING_PLUGIN !== "false"
};
