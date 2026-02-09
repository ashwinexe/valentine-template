// Ordered array so we can iterate in sequence
// Customize these messages for your partner!
export const days = [
  {
    key: "02-07",
    day: "Rose Day",
    message: `🌹 You are the rose in my garden — every petal a reason I love you.`,
  },
  {
    key: "02-08",
    day: "Propose Day",
    message: `💍 I propose we stay together forever — no conflicts, just love.`,
  },
  {
    key: "02-09",
    day: "Chocolate Day",
    message: `🍫 Nothing in this world is as sweet as you.`,
  },
  {
    key: "02-10",
    day: "Teddy Day",
    message: `🧸 You are softer than the softest plush — cuddle factor: off the charts.`,
  },
  {
    key: "02-11",
    day: "Promise Day",
    message: `🤞 A promise from me to you — I'll love you forever, no take-backs.`,
  },
  {
    key: "02-12",
    day: "Hug Day",
    message: `🤗 A thousand hugs queued up — delivering warmth with zero delay.`,
  },
  {
    key: "02-13",
    day: "Kiss Day",
    message: `💋 Sending a kiss your way — guaranteed delivery, straight to your heart.`,
  },
  {
    key: "02-14",
    day: "Valentine's Day",
    message: `❤️ Of everything in my life, you're my favorite — today and forever.`,
  },
];

export function getTodayKey() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getMessagesUpToToday() {
  const todayKey = getTodayKey();
  const todayIndex = days.findIndex((d) => d.key === todayKey);

  return days.map((d, i) => {
    const isToday = d.key === todayKey;
    const unlocked = todayIndex >= 0 ? i <= todayIndex : todayKey >= d.key;
    return { ...d, unlocked, isToday };
  });
}

export function getSecretSentence() {
  // Customize this with your own secret message!
  // Tip: make the first word of each day's message spell out a sentence
  return "YOUR SECRET MESSAGE HERE";
}
