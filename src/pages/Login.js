import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // We will handle navigation automatically in a later step.
    } catch (error) {
      console.error('Login Error:', error); // This is the new line for debugging
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>LifeOS Login</h1>
        <p>Sign in to your account</p>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button disabled={loading}>
            {loading ? <span>Loading...</span> : <span>Login</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
