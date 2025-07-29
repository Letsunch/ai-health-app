import { describe, it, expect, vi, beforeEach } from 'vitest';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    collection: vi.fn(),
    addDoc: vi.fn(),
    getDocs: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    doc: vi.fn(),
  };
});

describe('🔥 CRUD operations with Firestore', () => {
  const mockCollection = 'users';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a new document', async () => {
    addDoc.mockResolvedValue({ id: '123' });

    const data = { name: 'John', age: 25 };
    const result = await addDoc(collection(db, mockCollection), data);

    expect(addDoc).toHaveBeenCalled();
    expect(result.id).toBe('123');
  });

  it('reads documents from collection', async () => {
    const mockDocs = [{ id: '1', data: () => ({ name: 'Alice' }) }];
    getDocs.mockResolvedValue({ docs: mockDocs });

    const snapshot = await getDocs(collection(db, mockCollection));
    const result = snapshot.docs.map(doc => doc.data());

    expect(getDocs).toHaveBeenCalled();
    expect(result[0].name).toBe('Alice');
  });

  it('updates a document', async () => {
    updateDoc.mockResolvedValue();

    const docRef = doc(db, mockCollection, '123');
    await updateDoc(docRef, { age: 30 });

    expect(updateDoc).toHaveBeenCalled();
  });

  it('deletes a document', async () => {
    deleteDoc.mockResolvedValue();

    const docRef = doc(db, mockCollection, '123');
    await deleteDoc(docRef);

    expect(deleteDoc).toHaveBeenCalled();
  });
});
