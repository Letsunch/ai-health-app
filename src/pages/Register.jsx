import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        preferences: { notifications: true, threshold: 5 }
      });
      navigate('/alerts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
