import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${creator.name}? This cannot be undone.`
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

  if (loading) {
    return (
      <div className="page-container grid-center-container flex-center-container">
        <div className="loading">Loading creator...</div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Creator not found</h2>
          <p>The creator you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container-small">
      <button 
        onClick={() => navigate('/')}
        className="back-btn"
      >
        ← Back to Home
      </button>

      <div className="detail-container">
        <h1 className="detail-title">{creator.name}</h1>
        
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name}
            className="detail-image"
          />
        )}
        
        <div className="detail-section">
          <h3>About</h3>
          <p>{creator.description}</p>
        </div>
        
        <div className="detail-section">
          <h3>Channel</h3>
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="channel-link"
          >
            🔗 Visit {creator.name}'s Channel
          </a>
        </div>
        
        <div className="detail-actions">
          <Link to={`/edit/${creator.id}`} className="btn btn-edit btn-small">
            ✏️ Edit Creator
          </Link>

          <button 
            onClick={handleDelete}
            className="btn btn-delete btn-small"
          >
            🗑️ Delete Creator
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCreator;