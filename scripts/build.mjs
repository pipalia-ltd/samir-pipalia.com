import { spawnSync } from "node:child_process";
import path from "node:path";

process.env.ASTRO_TELEMETRY_DISABLED = "1";

const astroBin = path.join(process.cwd(), "node_modules", "astro", "astro.js");

for (const args of [["check"], ["build"]]) {
  const result = spawnSync(process.execPath, [astroBin, ...args], {
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
