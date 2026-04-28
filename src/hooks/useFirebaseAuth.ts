import { useState, useEffect, useMemo } from 'react';
import { auth } from '@/config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getUserProfile } from '@/firebase_Routes/routes';

export interface UserProfile {
  displayName?: string;
  photoURL?: string;
  [key: string]: any;
}

export function useFirebaseAuth() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [firestoreUser, setFirestoreUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;
      
      setFirebaseUser(user);
      
      if (user?.uid) {
        try {
          const { profile } = await getUserProfile(user.uid) as { profile: UserProfile };
          if (isMounted) {
            setFirestoreUser(profile || null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          if (isMounted) setFirestoreUser(null);
        }
      } else {
        if (isMounted) setFirestoreUser(null);
      }
      
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const isLoggedIn = useMemo(() => !!firebaseUser, [firebaseUser]);
  const displayName = useMemo(
    () => firestoreUser?.displayName || firebaseUser?.displayName || "User",
    [firestoreUser?.displayName, firebaseUser?.displayName]
  );
  const photoURL = useMemo(
    () => firestoreUser?.photoURL || firebaseUser?.photoURL || '/images/userprofile.png',
    [firestoreUser?.photoURL, firebaseUser?.photoURL]
  );

  return { firebaseUser, firestoreUser, isLoggedIn, displayName, photoURL, loading };
}
