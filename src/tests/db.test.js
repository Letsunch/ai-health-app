
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('🧪 Firestore DB tests', () => {
  const collectionName = 'testCollection';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('📥 adds a document to Firestore', async () => {
    addDoc.mockResolvedValue({ id: 'mockId123' });

    const data = { title: 'Test', body: 'Mock content' };
    const colRef = collection(db, collectionName);
    const result = await addDoc(colRef, data);

    expect(addDoc).toHaveBeenCalledWith(colRef, data);
    expect(result.id).toBe('mockId123');
  });

  test('📤 reads documents from Firestore', async () => {
    const mockDocs = [
      { id: '1', data: () => ({ name: 'Alice' }) },
      { id: '2', data: () => ({ name: 'Bob' }) },
    ];
    getDocs.mockResolvedValue({ docs: mockDocs });

    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    expect(getDocs).toHaveBeenCalledWith(colRef);
    expect(results.length).toBe(2);
    expect(results[0].name).toBe('Alice');
  });

  test('🛠 updates a document in Firestore', async () => {
    updateDoc.mockResolvedValue();

    const docRef = doc(db, collectionName, 'doc123');
    const updateData = { title: 'Updated Title' };

    await updateDoc(docRef, updateData);

    expect(updateDoc).toHaveBeenCalledWith(docRef, updateData);
  });

  test('🗑 deletes a document from Firestore', async () => {
    deleteDoc.mockResolvedValue();

    const docRef = doc(db, collectionName, 'doc123');
    await deleteDoc(docRef);

    expect(deleteDoc).toHaveBeenCalledWith(docRef);
  });
});
