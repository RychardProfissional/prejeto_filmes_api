const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyATNs671hSivWsNoYBze72RpZyMo_kjNps",
  authDomain: "filmes-online-f625e.firebaseapp.com",
  projectId: "filmes-online-f625e",
  storageBucket: "filmes-online-f625e.appspot.com",
  messagingSenderId: "123130795835",
  appId: "1:123130795835:web:ad5001aad6870c91c3891e"
};

export const app = initializeApp(firebaseConfig);