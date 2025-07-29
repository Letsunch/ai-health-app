import { db } from '../firebase/config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const testsCollection = collection(db, 'diagnosticTests');

export const getTests = async () => {
  const snapshot = await getDocs(testsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTest = async (test) => await addDoc(testsCollection, test);

export const updateTest = async (id, data) => await updateDoc(doc(db, 'diagnosticTests', id), data);

export const deleteTest = async (id) => await deleteDoc(doc(db, 'diagnosticTests', id));
