import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseApp } from "./firebase-app";

export type InquiryPayload = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  photographer: string;
};

export type Inquiry = InquiryPayload & {
  id: string;
  source?: string;
  createdAt: Date | null;
};

function getDb() {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

function inquiriesCollection() {
  return process.env.NEXT_PUBLIC_FIRESTORE_COLLECTION ?? "inquiries";
}

export async function submitInquiry(payload: InquiryPayload) {
  const db = getDb();
  if (!db) {
    return { ok: true as const, demo: true as const };
  }

  await addDoc(collection(db, inquiriesCollection()), {
    ...payload,
    source:
      typeof window !== "undefined" ? window.location.hostname : "unknown",
    createdAt: serverTimestamp(),
  });

  return { ok: true as const, demo: false as const };
}

export async function listInquiries(): Promise<Inquiry[]> {
  const db = getDb();
  if (!db) return [];

  const snap = await getDocs(collection(db, inquiriesCollection()));

  return snap.docs
    .map((item) => {
      const data = item.data();
      return {
        id: item.id,
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        projectType: String(data.projectType ?? ""),
        message: String(data.message ?? ""),
        photographer: String(data.photographer ?? ""),
        source: data.source ? String(data.source) : undefined,
        createdAt: data.createdAt?.toDate?.() ?? null,
      };
    })
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
}

export async function deleteInquiry(id: string) {
  const db = getDb();
  if (!db) return;
  await deleteDoc(doc(db, inquiriesCollection(), id));
}
