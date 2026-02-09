import { config } from "./config";

// Helper to build date strings from config.year
const y = config.year;

// ── Timeline Entries ──
// Customize the message for each day of Valentine Week
export const timelineData = [
  { date: `${y}-02-07`, title: "Rose Day", icon: "🌹", message: "A rose for every reason I love you." },
  { date: `${y}-02-08`, title: "Propose Day", icon: "💍", message: "Will you be mine? (Spoiler: you already are.)" },
  { date: `${y}-02-09`, title: "Chocolate Day", icon: "🍫", message: "Life is sweet, but sweeter with you." },
  { date: `${y}-02-10`, title: "Teddy Day", icon: "🧸", message: "Something soft to hold when I'm not around." },
  { date: `${y}-02-11`, title: "Promise Day", icon: "🤞", message: "I promise to always be your favorite weirdo." },
  { date: `${y}-02-12`, title: "Hug Day", icon: "🤗", message: "Sending you the biggest virtual hug right now." },
  { date: `${y}-02-13`, title: "Kiss Day", icon: "💋", message: "Saving this one for in person." },
  { date: `${y}-02-14`, title: "Valentine's Day", icon: "❤️", message: "You are my today and all of my tomorrows." },
];

// ── Terminal Messages (shown in the web terminal & CLI) ──
// The command field controls what's displayed in the terminal snippet.
// Customize the message for each day — make them personal!
export const terminalMessages: Record<string, { day: string; command: string; message: string }> = {
  [`${y}-02-07`]: { day: "Rose Day", command: config.cliCommand, message: "🌹 You are the rose in my garden — every petal a reason I love you." },
  [`${y}-02-08`]: { day: "Propose Day", command: config.cliCommand, message: "💍 I propose we stay together forever — no conflicts, just love." },
  [`${y}-02-09`]: { day: "Chocolate Day", command: config.cliCommand, message: "🍫 Nothing in this world is as sweet as you." },
  [`${y}-02-10`]: { day: "Teddy Day", command: config.cliCommand, message: "🧸 You are softer than the softest plush — cuddle factor: off the charts." },
  [`${y}-02-11`]: { day: "Promise Day", command: config.cliCommand, message: "🤞 A promise from me to you — I'll love you forever, no take-backs." },
  [`${y}-02-12`]: { day: "Hug Day", command: config.cliCommand, message: "🤗 A thousand hugs queued up — delivering warmth with zero delay." },
  [`${y}-02-13`]: { day: "Kiss Day", command: config.cliCommand, message: "💋 Sending a kiss your way — guaranteed delivery, straight to your heart." },
  [`${y}-02-14`]: { day: "Valentine's Day", command: config.cliCommand, message: "❤️ Of everything in my life, you're my favorite — today and forever." },
};

// ── Quiz Questions ──
// Customize with your own couple trivia! Set correct to the 0-based index
// of the right answer, or -1 with isFinale: true if all answers are "correct".
export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number; // -1 = all correct (finale)
  feedback: { right: string; wrong: string };
  isFinale?: boolean;
}

export const quizData: QuizQuestion[] = [
  {
    q: "What was the first movie we watched together?",
    options: ["Movie A", "Movie B", "Movie C", "Movie D"],
    correct: 0,
    feedback: { right: "You remembered! 🎬", wrong: "Not quite, but we should rewatch them all!" },
  },
  {
    q: "What's my go-to comfort food?",
    options: ["Pizza", "Ramen", "Tacos", "Ice Cream"],
    correct: 1,
    feedback: { right: "You know me so well!", wrong: "Good guess, but that's not THE one!" },
  },
  {
    q: "Which song reminds me of you?",
    options: ["Song A", "Song B", "Song C", "Song D"],
    correct: 0,
    feedback: { right: "That's our song! 🎵", wrong: "Great taste, but that's not the one!" },
  },
  {
    q: "What do I love most about you?",
    options: ["Your smile", "Your laugh", "Your kindness", "Everything"],
    correct: 3,
    feedback: { right: "Obviously! How could I pick just one thing?", wrong: "True, but the real answer is EVERYTHING!" },
  },
  {
    q: "Where would our dream vacation be?",
    options: ["Paris", "Maldives", "Tokyo", "Anywhere with you"],
    correct: 3,
    feedback: { right: "The destination doesn't matter when I'm with you.", wrong: "Sounds amazing, but honestly anywhere with you is perfect." },
  },
  {
    q: "Will you be my Valentine?",
    options: ["Yes! 💕", "Absolutely yes! ❤️"],
    correct: -1,
    isFinale: true,
    feedback: { right: "Yay! You said yes! (Like there was any other option 😉)", wrong: "" },
  },
];

// ── Love Letters ──
// Write a letter for each day. The photo field is optional —
// add your own photos to /public/letters/ and reference them here.
// e.g. photo: "/letters/rose-day.jpeg"
export const lettersData: { date: string; day: string; photo?: string; letter: string }[] = [
  { date: `${y}-02-07`, day: "Rose Day", letter: "Dear love,\n\nWrite your Rose Day letter here.\n\nWith all my love." },
  { date: `${y}-02-08`, day: "Propose Day", letter: "My dearest,\n\nWrite your Propose Day letter here.\n\nForever yours." },
  { date: `${y}-02-09`, day: "Chocolate Day", letter: "Sweet one,\n\nWrite your Chocolate Day letter here.\n\nYour sweetness." },
  { date: `${y}-02-10`, day: "Teddy Day", letter: "My cuddle buddy,\n\nWrite your Teddy Day letter here.\n\nHugs and squeezes." },
  { date: `${y}-02-11`, day: "Promise Day", letter: "My promise,\n\nWrite your Promise Day letter here.\n\nPinky swear, forever." },
  { date: `${y}-02-12`, day: "Hug Day", letter: "My warmth,\n\nWrite your Hug Day letter here.\n\nHolding you close." },
  { date: `${y}-02-13`, day: "Kiss Day", letter: "My heart,\n\nWrite your Kiss Day letter here.\n\nXOXO." },
  { date: `${y}-02-14`, day: "Valentine's Day", letter: "My everything,\n\nWrite your Valentine's Day letter here.\n\nAll my heart, today and always." },
];
