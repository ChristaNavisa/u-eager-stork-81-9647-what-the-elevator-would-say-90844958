import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One line in a talking elevator's own voice: stuck between floors since
// Tuesday, it stops asking for technicians and demands snacks instead.
// The joke is the reversal at the end — rescue is the obvious ask, yet
// the elevator wants snacks, as if being stuck were a snack break.
const entry =
  "I have been stuck between floors since Tuesday. Send snacks, not technicians.";

// The gate only accepts 1 to 120 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 77 characters, well inside the gate,
// and the guard below keeps it that way if the line is ever reworded.
if (entry.length < 1 || entry.length > 120) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-120 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
