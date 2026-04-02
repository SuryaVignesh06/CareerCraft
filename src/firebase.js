import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000'
};

let app, auth, db, functions, storage, googleProvider;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    functions = getFunctions(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
} catch (e) {
    console.warn('Firebase initialization failed (likely missing .env config). Auth features will be disabled.', e);
    // Provide stub objects so imports don't crash
    auth = { onAuthStateChanged: (cb) => { cb(null); return () => {}; } };
    db = null;
    functions = null;
    storage = null;
    googleProvider = null;
}

export { auth, db, functions, storage, googleProvider };
export const loginWithGoogle = () => Promise.reject(new Error('Firebase not configured'));
export const registerWithEmail = (email, password) => Promise.reject(new Error('Firebase not configured'));
export const loginWithEmail = (email, password) => Promise.reject(new Error('Firebase not configured'));
export const logoutUser = () => Promise.reject(new Error('Firebase not configured'));
