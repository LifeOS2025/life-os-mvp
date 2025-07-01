import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');

  // Function to fetch goals
  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
    } else {
      setGoals(data);
    }
  };

  // Fetch goals on initial component render
  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('goals')
        .insert({ title, description, target_date: targetDate || null });

      if (error) throw error;
      
      // Refresh list and reset form
      await fetchGoals();
      setTitle('');
      setDescription('');
      setTargetDate('');
      alert('Goal created successfully!');
    } catch (error) {
      console.error('Error creating goal:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>My Goals</h1>

      {/* Display Existing Goals */}
      <div style={{ marginTop: '2rem' }}>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', background: '#f9f9f9' }}>
              <h3 style={{ marginTop: 0 }}>{goal.title}</h3>
              <p>{goal.description}</p>
              {goal.target_date && <p><strong>Target Date:</strong> {new Date(goal.target_date).toLocaleDateString()}</p>}
              <p style={{ fontStyle: 'italic', color: '#555' }}>Status: {goal.status}</p>
            </div>
          ))
        ) : (
          <p>You haven't set any goals yet. Create one below!</p>
        )}
      </div>

      <hr style={{ margin: '2rem 0' }} />

      {/* Form to create a new goal */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Create a New Goal</h2>
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '0.5rem', minHeight: '80px' }}
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.75rem', cursor: 'pointer' }}>
          {loading ? 'Adding...' : 'Add Goal'}
        </button>
      </form>
    </div>
  );
};

export default Goals;
