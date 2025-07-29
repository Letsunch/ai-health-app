
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
  return {
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
  };
});

describe('🔥 CRUD operations with Firestore', () => {
  const mockCollection = 'users';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('🟢 creates a new document', async () => {
    addDoc.mockResolvedValue({ id: '123' });

    const data = { name: 'John', age: 25 };
    const result = await addDoc(collection(db, mockCollection), data);

    expect(addDoc).toHaveBeenCalled();
    expect(result.id).toBe('123');
  });

  test('🔵 reads documents from collection', async () => {
    const mockDocs = [{ id: '1', data: () => ({ name: 'Alice' }) }];
    getDocs.mockResolvedValue({ docs: mockDocs });

    const snapshot = await getDocs(collection(db, mockCollection));
    const result = snapshot.docs.map(doc => doc.data());

    expect(getDocs).toHaveBeenCalled();
    expect(result[0].name).toBe('Alice');
  });

  test('🟡 updates a document', async () => {
    updateDoc.mockResolvedValue();

    const docRef = doc(db, mockCollection, '123');
    await updateDoc(docRef, { age: 30 });

    expect(updateDoc).toHaveBeenCalled();
  });

  test('🔴 deletes a document', async () => {
    deleteDoc.mockResolvedValue();

    const docRef = doc(db, mockCollection, '123');
    await deleteDoc(docRef);

    expect(deleteDoc).toHaveBeenCalled();
  });
});
