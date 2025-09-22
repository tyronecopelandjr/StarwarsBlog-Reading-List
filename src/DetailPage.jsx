import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

export default DetailPage;