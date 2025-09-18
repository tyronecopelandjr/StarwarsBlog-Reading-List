import React, { useState, useEffect } from 'react';

function App() {
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

export default App;