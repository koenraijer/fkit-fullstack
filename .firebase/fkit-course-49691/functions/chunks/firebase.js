import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { d as derived, w as writable } from "./index2.js";
const firebaseConfig = {
  apiKey: "AIzaSyDV-BeFRXF9WQQyGxKBF8-P8lD46hi4FeQ",
  authDomain: "fkit-course-49691.firebaseapp.com",
  projectId: "fkit-course-49691",
  storageBucket: "fkit-course-49691.appspot.com",
  messagingSenderId: "30551221986",
  appId: "1:30551221986:web:0013135ff3a594e51460bb",
  measurementId: "G-HJJ3G45DEE"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
getStorage();
function userStore() {
  let unsubscribe;
  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe: subscribe2 } = writable(null);
    return {
      subscribe: subscribe2
    };
  }
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user2) => {
      set(user2);
    });
    return () => unsubscribe();
  });
  return {
    subscribe
  };
}
const user = userStore();
function docStore(path) {
  let unsubscribe;
  const docRef = doc(db, path);
  const { subscribe } = writable(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set(snapshot.data() ?? null);
    });
    return () => unsubscribe();
  });
  return {
    subscribe,
    ref: docRef,
    id: docRef.id
  };
}
const userData = derived(user, ($user, set) => {
  if ($user) {
    return docStore(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
});
export {
  user as a,
  db as d,
  userData as u
};
