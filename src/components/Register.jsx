import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '', password: '', matricNo: '', department: '', budgetMin: '', budgetMax: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax)
      });
      setMessage(`Success: ${response.data.message}. Trust Score: ${response.data.user.trustScore}`);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="glass-card animate-fade-in">
        <header className="card-header">
            <h1 className="gradient-brand">FUW HousingMatch</h1>
            <h2 className="card-title">Registration & Algorithm Hub</h2>
            {message && <p className="text-blue-400 mt-2 text-sm text-center">{message}</p>}
        </header>

        <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <input type="email" name="email" placeholder="Institutional Email (@fuwukari.edu.ng)" onChange={handleChange} required />
            </div>
            
            <div className="input-wrapper">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            
            <div className="input-wrapper">
                <input type="text" name="matricNo" placeholder="Matriculation No" onChange={handleChange} required />
            </div>
            
            <div className="input-wrapper">
                <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
            </div>

            <div className="input-row">
                <div className="input-wrapper">
                    <input type="number" name="budgetMin" placeholder="Min Budget" onChange={handleChange} required />
                </div>
                <div className="input-wrapper">
                    <input type="number" name="budgetMax" placeholder="Max Budget" onChange={handleChange} required />
                </div>
            </div>

            <div className="button-group">
                <button type="button" className="btn btn-outline">Verify Identity</button>
                <button type="submit" className="btn btn-glow">Run Engine</button>
            </div>
        </form>
      </div>
    </div>
  );
}