import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      setError('User already exists.');
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Registration successful. Redirecting to login...');
    setError(null);

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
