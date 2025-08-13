import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        alert('Creator not found!');
        navigate('/');
      } else {
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || ''
        });
      }
      setFetchingData(false);
    };

    fetchCreator();
  }, [id, navigate]);

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
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
      alert('Error updating creator: ' + error.message);
    } else {
      alert('Creator updated successfully!');
      navigate(`/creator/${id}`);
    }
    
    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${formData.name}? This cannot be undone.`
    );

    if (confirmed) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting creator:', error);
        alert('Error deleting creator: ' + error.message);
      } else {
        alert('Creator deleted successfully!');
        navigate('/');
      }
    }
  };

  if (fetchingData) {
    return (
      <div className="page-container-small">
        <div className="loading">Loading creator data...</div>
      </div>
    );
  }

  return (
    <div className="page-container-small">
      <button 
        onClick={() => navigate(`/creator/${id}`)}
        className="back-btn"
      >
        ← Back to Details
      </button>

      <div className="form-container">
        <h1 className="form-title">Edit Creator</h1>
        
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
              rows="4"
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

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Updating...' : 'Update Creator'}
            </button>

            <button 
              type="button"
              onClick={handleDelete}
              className="btn btn-delete"
            >
              Delete Creator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCreator;