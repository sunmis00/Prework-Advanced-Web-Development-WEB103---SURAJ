import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };
    
    fetchCreators();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading creators...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Creatorverse</h1>
        <p>Discover and manage your favorite content creators</p>
        <Link to="/add" className="btn btn-primary">
          Add New Creator
        </Link>
      </div>

      {creators.length === 0 ? (
        <div className="empty-state">
          <h2>No creators yet</h2>
          <p>Start building your creator collection by adding your first content creator.</p>
          <Link to="/add" className="btn btn-primary">
            Add Your First Creator
          </Link>
        </div>
      ) : (
        <div className="creators-section">
          <div className="content-section">
            <h2>All Creators ({creators.length})</h2>
          </div>
          <div className="creators-grid">
            {creators.map(creator => (
              <Card key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowCreators;