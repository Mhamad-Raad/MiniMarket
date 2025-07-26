import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDoncNAwJgjEIJ3iKQt5ULsX1RAGbtShDw',
  authDomain: 'mini-market-ccd1b.firebaseapp.com',
  projectId: 'mini-market-ccd1b',
  messagingSenderId: '974362851117',
  appId: '1:974362851117:web:d6af5def2b8088463285a4',
  measurementId: 'G-41JTPLPZKG',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
