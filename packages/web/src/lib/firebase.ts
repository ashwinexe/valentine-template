import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp() {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

let db: Database | null = null;

function getDb(): Database | null {
  // Only initialize if config is present
  if (!firebaseConfig.databaseURL) return null;
  if (!db) {
    db = getDatabase(getFirebaseApp());
  }
  return db;
}

export async function saveReply(date: string, text: string): Promise<void> {
  const database = getDb();
  if (!database) {
    // Fallback to localStorage if Firebase not configured
    localStorage.setItem(`loveReply_${date}`, text);
    return;
  }
  const replyRef = ref(database, `replies/${date}`);
  await set(replyRef, { text, updatedAt: Date.now() });
}

export function subscribeToReplies(
  callback: (replies: Record<string, string>) => void
): () => void {
  const database = getDb();
  if (!database) {
    // Fallback: load from localStorage
    const replies: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("loveReply_")) {
        const date = key.replace("loveReply_", "");
        replies[date] = localStorage.getItem(key) || "";
      }
    }
    callback(replies);
    return () => {};
  }

  const repliesRef = ref(database, "replies");
  const unsubscribe = onValue(repliesRef, (snapshot) => {
    const data = snapshot.val() || {};
    const replies: Record<string, string> = {};
    for (const [date, val] of Object.entries(data)) {
      replies[date] = (val as { text: string }).text;
    }
    callback(replies);
  });

  return () => unsubscribe();
}
