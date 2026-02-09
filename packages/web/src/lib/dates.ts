export function isUnlocked(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= new Date(dateStr + "T00:00:00");
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
