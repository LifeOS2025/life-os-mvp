import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Success! Please check your email for a confirmation link to activate your account.');
    }
    setLoading(false);
  };

  return (
    <div className="row flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">LifeOS</h1>
        <p className="description">
          Sign up for a new account
        </p>
        <form className="form-widget" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="inputField"
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
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button-block'} disabled={loading}>
              {loading ? <span>Loading...</span> : <span>Sign Up</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

