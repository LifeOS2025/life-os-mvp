import React, { useState } from 'react';
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

  const handleSignUp = () => {
    // In the future, this will handle the actual sign-up logic.
    console.log('Attempting to sign up with:', { email, password });
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formHeaderStyle}>Create Account</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
