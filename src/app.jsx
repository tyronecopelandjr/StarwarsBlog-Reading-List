import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

// Detail Page Component
function DetailPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific item details
    fetch(`https://swapi.dev/api/${type}/${id}/`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
        setLoading(false);
      });
  }, [type, id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-5 text-center">
        <h2>Item not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-4">
        <div className="container">
          <span className="navbar-brand">Star Wars Blog Reading List</span>
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate('/')}
          >
            ← Back to List
          </button>
        </div>
      </nav>

      {/* Detail Content */}
      <div className="row">
        <div className="col-md-4">
          {/* Large placeholder image */}
          <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{height: '400px'}}>
            <div className="text-center">
              <div className="bg-secondary rounded" style={{width: '300px', height: '300px', margin: '0 auto'}}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="text-white fs-4">800 x 600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <h1 className="display-4 mb-4">{item.name}</h1>
          
          {/* Character Details */}
          {type === 'people' && (
            <div className="row">
              <div className="col-md-6">
                <h5>Personal Information</h5>
                <p><strong>Birth Year:</strong> {item.birth_year}</p>
                <p><strong>Gender:</strong> {item.gender}</p>
                <p><strong>Height:</strong> {item.height} cm</p>
                <p><strong>Mass:</strong> {item.mass} kg</p>
              </div>
              <div className="col-md-6">
                <h5>Physical Appearance</h5>
                <p><strong>Hair Color:</strong> {item.hair_color}</p>
                <p><strong>Eye Color:</strong> {item.eye_color}</p>
                <p><strong>Skin Color:</strong> {item.skin_color}</p>
              </div>
            </div>
          )}

          {/* Vehicle Details */}
          {type === 'vehicles' && (
            <div className="row">
              <div className="col-md-6">
                <h5>Technical Specifications</h5>
                <p><strong>Model:</strong> {item.model}</p>
                <p><strong>Class:</strong> {item.vehicle_class}</p>
                <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
                <p><strong>Length:</strong> {item.length} m</p>
              </div>
              <div className="col-md-6">
                <h5>Performance & Capacity</h5>
                <p><strong>Max Speed:</strong> {item.max_atmosphering_speed}</p>
                <p><strong>Crew:</strong> {item.crew}</p>
                <p><strong>Passengers:</strong> {item.passengers}</p>
                <p><strong>Cost:</strong> {item.cost_in_credits} credits</p>
              </div>
            </div>
          )}

          {/* Planet Details */}
          {type === 'planets' && (
            <div className="row">
              <div className="col-md-6">
                <h5>Environmental Data</h5>
                <p><strong>Climate:</strong> {item.climate}</p>
                <p><strong>Terrain:</strong> {item.terrain}</p>
                <p><strong>Surface Water:</strong> {item.surface_water}%</p>
                <p><strong>Gravity:</strong> {item.gravity}</p>
              </div>
              <div className="col-md-6">
                <h5>Orbital Information</h5>
                <p><strong>Population:</strong> {item.population}</p>
                <p><strong>Diameter:</strong> {item.diameter} km</p>
                <p><strong>Rotation Period:</strong> {item.rotation_period} hours</p>
                <p><strong>Orbital Period:</strong> {item.orbital_period} days</p>
              </div>
            </div>
          )}

          {/* Description placeholder */}
          <div className="mt-4">
            <h5>Description</h5>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Your existing HomePage component (exactly as you had it)
function HomePage() {
  // Create state to store our Star Wars data
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('all');
  
  // Fetch data when the app starts
  useEffect(() => {
    // Get characters
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
      })
      .catch(error => console.log('Error fetching characters:', error));

    // Get vehicles  
    fetch('https://swapi.dev/api/vehicles/')
      .then(response => response.json())
      .then(data => {
        setVehicles(data.results);
      })
      .catch(error => console.log('Error fetching vehicles:', error));

    // Get planets
    fetch('https://swapi.dev/api/planets/')
      .then(response => response.json())
      .then(data => {
        setPlanets(data.results);
        setLoading(false); // Done loading
      })
      .catch(error => console.log('Error fetching planets:', error));
  }, []); 

  // Load favorites from localStorage when app starts
  useEffect(() => {
    const savedFavorites = localStorage.getItem('starwars-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Check if an item is already favorited
  const isFavorite = (item) => {
    return favorites.some(fav => fav.url === item.url);
  };

  // Add or remove from favorites
  const toggleFavorite = (item) => {
    if (isFavorite(item)) {
      // Remove from favorites
      const newFavorites = favorites.filter(fav => fav.url !== item.url);
      setFavorites(newFavorites);
      localStorage.setItem('starwars-favorites', JSON.stringify(newFavorites));
    } else {
      // Add to favorites
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      localStorage.setItem('starwars-favorites', JSON.stringify(newFavorites));
    }
  };

  // Card component for displaying items
  const ItemCard = ({ item, type }) => {
    const itemWithType = { ...item, type };
    // Extract ID from URL for routing
    const itemId = item.url.split('/').slice(-2, -1)[0];
    
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body text-center">
            {/* Placeholder image like in the demo */}
            <div className="bg-light rounded mb-3 d-flex align-items-center justify-content-center" style={{height: '200px'}}>
              <div className="text-center">
                <div className="bg-secondary rounded" style={{width: '150px', height: '150px', margin: '0 auto'}}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="text-white fs-6">500 x 500</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Item Name */}
            <h5 className="card-title">{item.name}</h5>
            
            {/* Item Details */}
            <div className="card-text mb-3">
              {type === 'people' && (
                <small className="text-muted">
                  Gender: {item.gender} | Birth Year: {item.birth_year}
                </small>
              )}
              {type === 'vehicles' && (
                <small className="text-muted">
                  Model: {item.model}
                </small>
              )}
              {type === 'planets' && (
                <small className="text-muted">
                  Population: {item.population}
                </small>
              )}
            </div>

            {/* Button Group - Learn More and Favorite */}
            <div className="d-grid gap-2">
              {/* Learn More Button - Now navigates to detail page */}
              <a 
                href={`/detail/${type}/${itemId}`}
                className="btn btn-outline-primary"
              >
                Learn More!
              </a>
              
              {/* Favorite Button */}
              <button 
                className={`btn ${isFavorite(itemWithType) ? 'btn-warning' : 'btn-outline-secondary'}`}
                onClick={() => toggleFavorite(itemWithType)}
              >
                {isFavorite(itemWithType) ? (
                  <>
                    <i className="fas fa-heart text-danger me-2"></i>
                    Remove from favorites
                  </>
                ) : (
                  <>
                    <i className="far fa-heart me-2"></i>
                    Add to favorites
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <span className="navbar-brand">Star Wars Blog Reading List</span>
          <div className="navbar-nav ms-auto">
            <button 
              className={`nav-link btn btn-link ${currentView === 'all' ? 'text-primary fw-bold' : 'text-dark'}`}
              onClick={() => setCurrentView('all')}
            >
              All
            </button>
            <button 
              className={`nav-link btn btn-link ${currentView === 'favorites' ? 'text-primary fw-bold' : 'text-dark'}`}
              onClick={() => setCurrentView('favorites')}
            >
              Favorites ({favorites.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading Star Wars data...</p>
          </div>
        ) : (
          <div>
            {currentView === 'all' && (
              <div className="row">
                {/* Show all items */}
                {characters.map(character => (
                  <ItemCard key={character.url} item={character} type="people" />
                ))}
                {vehicles.map(vehicle => (
                  <ItemCard key={vehicle.url} item={vehicle} type="vehicles" />
                ))}
                {planets.map(planet => (
                  <ItemCard key={planet.url} item={planet} type="planets" />
                ))}
              </div>
            )}
            
            {currentView === 'favorites' && (
              <div>
                {favorites.length === 0 ? (
                  <div className="text-center">
                    <h3>No favorites selected</h3>
                    <p>Go back to "All" and click the heart buttons to add favorites!</p>
                  </div>
                ) : (
                  <div className="row">
                    {favorites.map(item => (
                      <ItemCard key={item.url} item={item} type={item.type} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component with Routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:type/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;