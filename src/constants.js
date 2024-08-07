export const FIREBASE_DB_URL =
  'https://vue-http-demo-7e623-default-rtdb.europe-west1.firebasedatabase.app/';
const API_KEY = 'AIzaSyAPU15ErPl-ocOAILAkCseey3DWoEueRvA';
const FIREBASE_AUTH_BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts`;
export const FIREBASE_AUTH_SIGNUP_URL = `${FIREBASE_AUTH_BASE_URL}:signUp?key=${API_KEY}`;
export const FIREBASE_AUTH_LOGIN_URL = `${FIREBASE_AUTH_BASE_URL}:signInWithPassword?key=${API_KEY}`;
