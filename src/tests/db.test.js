import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// ✅ Partial mock firebase/firestore but keep getFirestore usable
vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    collection: vi.fn(),
    doc: vi.fn(),
    addDoc: vi.fn(),
    getDocs: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
  };
});

describe('🧪 Firestore DB tests', () => {
  const collectionName = 'testCollection';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('📥 adds a document to Firestore', async () => {
    addDoc.mockResolvedValue({ id: 'mockId123' });

    const data = { title: 'Test', body: 'Mock content' };
    const colRef = collection(db, collectionName);
    const result = await addDoc(colRef, data);

    expect(addDoc).toHaveBeenCalledWith(colRef, data);
    expect(result.id).toBe('mockId123');
  });

  it('📤 reads documents from Firestore', async () => {
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

  it('🛠 updates a document in Firestore', async () => {
    updateDoc.mockResolvedValue();

    const docRef = doc(db, collectionName, 'doc123');
    const updateData = { title: 'Updated Title' };

    await updateDoc(docRef, updateData);

    expect(updateDoc).toHaveBeenCalledWith(docRef, updateData);
  });

  it('🗑 deletes a document from Firestore', async () => {
    deleteDoc.mockResolvedValue();

    const docRef = doc(db, collectionName, 'doc123');
    await deleteDoc(docRef);

    expect(deleteDoc).toHaveBeenCalledWith(docRef);
  });
});
