import React, { useState, useEffect } from 'react';

const DiagnosticTestForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    result: '',
    date: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Test Name" required />
      <input name="result" value={form.result} onChange={handleChange} placeholder="Result" required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default DiagnosticTestForm;