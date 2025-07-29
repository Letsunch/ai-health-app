import React, { useEffect, useState } from 'react';
import { getTests, addTest, updateTest, deleteTest } from '../services/testsService';
import DiagnosticTestForm from '../components/DiagnosticTestForm';

const DiagnosticTests = () => {
  const [tests, setTests] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadTests = async () => {
    const data = await getTests();
    setTests(data);
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleAdd = async (test) => {
    await addTest(test);
    loadTests();
  };

  const handleUpdate = async (test) => {
    await updateTest(test.id, test);
    setEditing(null);
    loadTests();
  };

  const handleDelete = async (id) => {
    await deleteTest(id);
    loadTests();
  };

  return (
    <div>
      <h2>Diagnostic Tests</h2>
      <DiagnosticTestForm onSubmit={editing ? handleUpdate : handleAdd} initialData={editing} />
      <ul>
        {tests.map(test => (
          <li key={test.id}>
            {test.name} – {test.result} – {test.date}
            <button onClick={() => setEditing(test)}>Edit</button>
            <button onClick={() => handleDelete(test.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosticTests;
