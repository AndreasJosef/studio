#!/usr/bin/env bun
import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { parseLine } from "./parser";
import * as View from "./view";

const rl = createInterface({ input: stdin, output: stdout, terminal: false });

// --- CONFIG ---
// If a "Start" happens within 1.5s of the previous one,
// we assume it is the 2nd half of the SAME save. We don't clear.
const COMPOSITE_TIMEOUT = 1500;

// --- STATE ---
let lastClearTime = 0;
let successTimer: ReturnType<typeof setTimeout> | null = null;
let errorCount = 0;

// THE MEMORY
// We store the unique signature of every error we print.
// We wipe this memory only on a "New Save" (Start).
const seenErrors = new Set<string>();

rl.on("line", (rawLine) => {
  if (!rawLine) return;

  const action = parseLine(rawLine);
  const now = Date.now();

  // --- 1. START SIGNAL ---
  if (action.type === "start") {
    // Kill any pending "Success" message so it doesn't flash.
    if (successTimer) clearTimeout(successTimer);

    // LOGIC: Is this a NEW save? Or just the 2nd project starting?
    if (now - lastClearTime > COMPOSITE_TIMEOUT) {
      // It's been a while. This is a NEW USER SAVE.
      View.clearScreen();
      lastClearTime = now;

      // Wipe the memory. We are ready for fresh errors.
      seenErrors.clear();
      errorCount = 0;
    }
    // If it's been < 1.5s, we do NOTHING.
    // We don't clear. We don't wipe memory.
    // We let the errors pile up nicely.
  }

  // --- 2. ERROR SIGNAL (With De-Duplication) ---
  if (action.type === "error") {
    if (successTimer) clearTimeout(successTimer);

    // Create a unique fingerprint: "App.tsx:10:5-TS2322"
    const sig = `${action.payload.file}:${action.payload.line}:${action.payload.code}`;

    // THE FIX: If we have seen this error already in this cycle, ignore it.
    if (!seenErrors.has(sig)) {
      seenErrors.add(sig);
      View.printError(action.payload);
      errorCount++;
    }
  }

  // --- 3. COMPLETE SIGNAL ---
  if (action.type === "complete") {
    if (successTimer) clearTimeout(successTimer);

    // Wait 600ms. If silence remains, AND we found no errors, show Green.
    successTimer = setTimeout(() => {
      if (errorCount === 0) {
        View.printSuccess();
      }
    }, 600);
  }
});
