import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    User,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, updateDoc, query, where, getDocs, collection } from "firebase/firestore";
import { ref, set, get, push as refPush } from "firebase/database";
import { auth, db, database } from "../config/firebase";

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ─── Get Current User Profile from Firestore ──────────────────────────────────
export const getUserProfile = async (uid: string) => {
    try {
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) return { profile: snap.data(), error: null };
        return { profile: null, error: "User not found" };
    } catch (error: any) {
        return { profile: null, error: error.message };
    }
};

// ─── Lead Data Shape ──────────────────────────────────────────────────────────
export interface LeadData {
    leadName: string;
    email: string;
    phone: string;
    leadSource: string;
    priority: string;
    eventDate: string;
    status: string;
    notes: string;
}

// ─── Add Lead ─────────────────────────────────────────────────────────────────
// Saves lead to:
//   RTDB  → users/{uid}/leads/{leadId}
//   Firestore → leads/{leadId}  (with userId field linking back to user)
export const addLead = async (uid: string, leadData: LeadData) => {
    try {
        // 1. Generate a unique id using the RTDB push key
        const leadRef = ref(database, `users/${uid}/leads`);
        const newLeadRef = refPush(leadRef); // uses firebase push to get a unique key
        const leadId = newLeadRef.key as string;

        const payload = {
            ...leadData,
            id: leadId,
            userId: uid,
            createdAt: new Date().toISOString(),
        };

        // 2. Save to RTDB under users/{uid}/leads/{leadId}
        await set(newLeadRef, payload);

        // 3. Save to Firestore leads collection with userId reference
        await setDoc(doc(db, "leads", leadId), {
            ...payload,
            userRef: doc(db, "users", uid),   // Firestore document reference to user
            createdAt: serverTimestamp(),      // Firestore native timestamp
        });

        return { leadId, error: null };
    } catch (error: any) {
        return { leadId: null, error: error.message };
    }
};

// ─── Helper: Save user to Firestore ──────────────────────────────────────────
const saveUserToFirestore = async (user: User, extraData?: Record<string, any>) => {
    const userRef = doc(db, "users", user.uid);
    const existing = await getDoc(userRef);

    // Only create the doc if it doesn't exist yet (don't overwrite on every login)
    if (!existing.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || extraData?.displayName || null,
            photoURL: user.photoURL || null,
            provider: user.providerData?.[0]?.providerId || "password",
            createdAt: serverTimestamp(),
            ...extraData,
        });
    }
};

// ─── Helper: Save user to Realtime Database ───────────────────────────────────
const saveUserToRTDB = async (user: User, extraData?: Record<string, any>) => {
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    // Only create the record if it doesn't exist yet
    if (!snapshot.exists()) {
        await set(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || extraData?.displayName || null,
            photoURL: user.photoURL || null,
            provider: user.providerData?.[0]?.providerId || "password",
            createdAt: new Date().toISOString(),
            ...extraData,
        });
    }
};

// ─── Sign Up with Email and Password ─────────────────────────────────────────
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save to Firestore and RTDB in parallel
        await Promise.all([
            saveUserToFirestore(user, { displayName }),
            saveUserToRTDB(user, { displayName }),
        ]);

        return { user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
};

// ─── Log In with Email and Password ──────────────────────────────────────────
export const logInWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
};

// ─── Continue with Google ─────────────────────────────────────────────────────
export const continueWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        // Save to Firestore and RTDB in parallel (no-op if already exists)
        await Promise.all([
            saveUserToFirestore(user),
            saveUserToRTDB(user),
        ]);

        return { user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
};

// ─── Log Out ──────────────────────────────────────────────────────────────────
export const logOut = async () => {
    try {
        await signOut(auth);
        return { success: true, error: null };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// ─── Update User Password ────────────────────────────────────────────────────
export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    try {
        const user = auth.currentUser;
        if (!user || !user.email) return { success: false, error: "No user logged in" };

        // Re-authenticate user before updating password (security requirement)
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);
        return { success: true, error: null };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// ─── Update Account Recovery Info ───────────────────────────────────────────
export const updateAccountRecovery = async (uid: string, data: { recoveryEmail?: string; backupPhone?: string }) => {
    try {
        // 1. Update Firestore
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });

        // 2. Update RTDB
        const userRTDBRef = ref(database, `users/${uid}`);
        // For RTDB we use 'update' and pass a partial object
        const { update } = await import('firebase/database');
        await update(userRTDBRef, {
            ...data,
            updatedAt: new Date().toISOString(),
        });

        return { success: true, error: null };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// ─── Delete Account (Hard Delete) ─────────────────────────────────────────────
export const deleteAccount = async (password: string) => {
    try {
        const user = auth.currentUser;
        if (!user || !user.email) return { success: false, error: "No user logged in" };

        // 1. Re-authenticate for security
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        const uid = user.uid;

        // 2. Delete from Realtime Database
        const { remove } = await import('firebase/database');
        await remove(ref(database, `users/${uid}`));

        // 3. Delete from Firestore
        const { deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, "users", uid));

        // 4. Delete From Firebase Auth (Permanent)
        await user.delete();

        return { success: true, error: null };
    } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
            return { success: false, error: "Security timeout. Please log in again to delete your account." };
        }
        return { success: false, error: error.message };
    }
};

// ─── Reset Password Email ────────────────────────────────────────────────────
export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, error: null };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
