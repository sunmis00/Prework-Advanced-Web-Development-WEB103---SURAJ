import { Link } from 'react-router-dom';

function Card({ creator }) {
  return (
    <div className="creator-card">
      <h3>{creator.name}</h3>
      <p>{creator.description}</p>
      
      {creator.imageURL && (
        <img 
          src={creator.imageURL} 
          alt={creator.name}
          className="creator-image"
        />
      )}
      
      <div className="card-actions">
        <a 
          href={creator.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          🔗 Visit Channel
        </a>
        
        <Link to={`/creator/${creator.id}`}>
          👁️ View Details
        </Link>
      </div>
    </div>
  );
}

export default Card;