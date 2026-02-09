#!/usr/bin/env node

import chalk from "chalk";
import { getFrames, FRAME_DELAY, ANIMATION_LOOPS, FRAME_COUNT } from "./heart.js";
import { getMessagesUpToToday, getSecretSentence, getTodayKey } from "./messages.js";

const SITE_URL = "https://your-site.vercel.app"; // ← Update with your deployed URL

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[0f");
}

async function animateHeart() {
  const frames = getFrames();
  const totalFrames = FRAME_COUNT * ANIMATION_LOOPS;

  for (let i = 0; i < totalFrames; i++) {
    clearScreen();
    const frame = frames[i % FRAME_COUNT];
    const colored = frame.replace(/@/g, chalk.red("❤"));
    process.stdout.write(colored);
    await sleep(FRAME_DELAY);
  }
}

async function main() {
  await animateHeart();
  clearScreen();

  console.log(chalk.red.bold("\n  ❤️  valentine-cli  ❤️\n"));

  const allDays = getMessagesUpToToday();
  const todayKey = getTodayKey();
  const isValentine = todayKey === "02-14";

  for (const entry of allDays) {
    if (entry.unlocked) {
      if (entry.isToday) {
        console.log(chalk.magenta.bold(`  ✨ >>> ${entry.day} (TODAY) <<<`));
      } else {
        console.log(chalk.magenta(`  📅 ${entry.day}`));
      }
      console.log(chalk.white(`  ${entry.message}`));
      console.log();
    } else {
      console.log(chalk.gray(`  🔒 ${entry.day} — unlocks Feb ${entry.key.split("-")[1]}`));
      console.log();
    }
  }

  // Reveal the secret on Valentine's Day
  if (isValentine) {
    console.log(chalk.gray("  ─────────────────────────────────"));
    console.log(chalk.yellow.bold("\n  ✨ Read the first word of each day...\n"));
    console.log(chalk.red.bold(`     ${getSecretSentence()} ❤️\n`));
  }

  console.log(chalk.gray("  ─────────────────────────────────"));
  console.log(chalk.cyan(`\n  🌐 Visit your Valentine surprise:`));
  console.log(chalk.cyan.underline(`     ${SITE_URL}\n`));
}

main().catch(console.error);
