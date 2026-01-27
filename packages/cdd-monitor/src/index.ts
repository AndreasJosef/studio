#!/usr/bin/env bun
import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { parseLine } from "./parser";
import * as View from "./view";

// Setup Input Stream
const rl = createInterface({
  input: stdin,
  output: stdout,
  terminal: false,
});

// Stabilizer - Hold lines in a bucket until the stream pauses.
let buffer: string[] = [];
let debounceTimer: ReturnType<typeof setTimeout>;

const DEBOUNCE_MS = 60; // 60ms is roughly 4 frames of video (imperceptible latency)

// The Loop throught the input
rl.on("line", (rawLine) => {
  if (!rawLine) return;

  buffer.push(rawLine);

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    processBatch();
  }, DEBOUNCE_MS);
  // Transform input into action
});

function processBatch() {
  // We look at everything that happened in the last 60ms
  // and decide the "Net Result".

  for (const line of buffer) {
    const action = parseLine(line);

    switch (action.type) {
      case "start":
        // Logic: If we receive multiple starts in a batch,
        // it just means "Reset", so calling it multiple times
        // in one tick is fine (the user won't see the flicker).
        View.clearScreen();
        break;

      case "success":
        View.printSuccess();
        break;

      case "error":
        View.printError(action.payload);
        break;

      case "ignore":
        break;
    }
  }

  // Empty the bucket for the next wave
  buffer = [];
}
