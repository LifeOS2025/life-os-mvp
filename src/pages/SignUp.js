import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Input from '../components/Input';
import Button from '../components/Button';

const formContainerStyle = {
  maxWidth: '400px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const formHeaderStyle = {
  textAlign: 'center',
  marginBottom: '24px',
  color: '#333',
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Success! Please check your email for a verification link to log in.');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formHeaderStyle}>Create Account</h2>
      <form onSubmit={handleSignUp}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
