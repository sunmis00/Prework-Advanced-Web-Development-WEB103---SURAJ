import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './styles.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <div className="app-container" style={{ textAlign: 'center'}}>
      <Router>
        <nav className="navbar">
          <div className="navbar-content">
            <a href="/">🏠 Home</a>
            <button 
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/add" element={<AddCreator />} />
          <Route path="/creator/:id" element={<ViewCreator />} />
          <Route path="/edit/:id" element={<EditCreator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;