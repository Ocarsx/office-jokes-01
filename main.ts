// Make the AI Judge Laugh: Office Jokes — entry program.
//
// Writes ONE office joke (a single line, under 200 characters) to
// /output/entry.txt. The joke is a fixed string: the program is fully
// deterministic and writes the exact same bytes on every run.
//
// The joke: a worker tells the boss they work best under pressure, and
// the boss takes it literally — every deadline lands on the same Friday.
// Setup, then a turn the reader does not see coming; true about office
// life (deadline pile-ups, a boss who schedules first and asks later),
// tight, and not the obvious Monday-morning line.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "I told my boss I work best under pressure, so now he schedules all my deadlines for the same Friday.";

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 199
// characters, not only white space, in a single line. Fail loudly here
// instead of submitting an entry the gate would refuse.
if (JOKE.length < 1 || JOKE.length > 199) {
  throw new Error(`joke is ${JOKE.length} characters, gate allows 1-199`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("joke must be one non-blank line");
}

// The harness runs the program in a sandbox whose output directory is
// /output; honour an explicit override if one is ever provided, so the
// same file also works when the grader mounts a different directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");
