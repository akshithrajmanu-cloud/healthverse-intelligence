import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import firebaseConfig from "../../firebase-applet-config.json" with { type: "json" };

const firebaseApp = getApps().length === 0 
  ? initializeApp({ projectId: firebaseConfig.projectId })
  : getApp();

export const adminAuth = getAuth(firebaseApp);
export default firebaseApp;
