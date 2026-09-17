"use client";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseApp, isFirebaseConfigured } from "./firebase-app";

export function getClientAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export function useAuthUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setUser(null);
      return;
    }

    return onAuthStateChanged(auth, setUser);
  }, []);

  return {
    user,
    loading: user === undefined,
    configured: isFirebaseConfigured(),
  };
}

export async function loginWithEmail(email: string, password: string) {
  const auth = getClientAuth();
  if (!auth) {
    throw new Error("Firebase no está configurado.");
  }
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  const auth = getClientAuth();
  if (!auth) return;
  await signOut(auth);
}
