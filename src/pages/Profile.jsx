import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

const Profile = () => {
  const [form, setForm] = useState({ name: '', email: '', threshold: 5, notifications: true });

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, 'users', auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          name: data.name || '',
          email: data.email || '',
          threshold: data.preferences?.threshold || 5,
          notifications: data.preferences?.notifications || false
        });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ref = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(ref, {
      name: form.name,
      email: form.email,
      preferences: {
        threshold: Number(form.threshold),
        notifications: form.notifications
      }
    });
    alert('Profile updated.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="threshold" type="number" value={form.threshold} onChange={handleChange} />
      <label>
        <input name="notifications" type="checkbox" checked={form.notifications} onChange={handleChange} />
        Enable Notifications
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};
