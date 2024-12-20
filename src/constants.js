export const FIREBASE_DB_URL = process.env.VUE_APP_FIREBASE_DB_URL;
const API_KEY = process.env.VUE_APP_FIREBASE_API_KEY;
const FIREBASE_AUTH_BASE_URL = process.env.VUE_APP_FIREBASE_AUTH_BASE_URL;
export const FIREBASE_AUTH_SIGNUP_URL = `${FIREBASE_AUTH_BASE_URL}:signUp?key=${API_KEY}`;
export const FIREBASE_AUTH_LOGIN_URL = `${FIREBASE_AUTH_BASE_URL}:signInWithPassword?key=${API_KEY}`;
