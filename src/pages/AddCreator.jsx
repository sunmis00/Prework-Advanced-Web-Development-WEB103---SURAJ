import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function AddCreator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('creators')
      .insert([formData]);

    if (error) {
      console.error('Error adding creator:', error);
      alert('Error adding creator: ' + error.message);
    } else {
      alert('Creator added successfully!');
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="page-container-small">
      <button 
        onClick={() => navigate('/')}
        className="back-btn"
      >
        ← Back to Home
      </button>

      <div className="form-container">
        <h1 className="form-title">Add New Creator</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter creator name"
            />
          </div>

          <div className="form-group">
            <label>Channel URL *</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="https://youtube.com/@creator"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe what makes this creator special..."
            />
          </div>

          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Adding Creator...' : 'Add Creator'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCreator;