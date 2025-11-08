import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAnimals } from '../services/animalService';

const AnimalsGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultAnimals = [
    {
      animalId: 'default-1',
      name: 'Lemur',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd838WJyUZgnQci5ZCr5IrEO_4p0Sc2btMIUhuqfwUbijZLbjoWzwqxayhoAwlm2uMTQtBsmj8&s=10',
      description: 'Lemurs are small primates native to Madagascar, known for their large, reflective eyes and long, bushy tails. They are social animals that live in groups and are primarily arboreal.',
      origin: 'Madagascar',
      dangerLevel: 'Low'
    },
    {
      animalId: 'default-2', 
      name: 'Axolotl',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAb_YxLytFoQF4oD4aL7FVB-unmhHOHEyvgMXYtghq9gclj_7LmuJsc71u0zByRFm_Cz8ItCvH&s=10',
      description: 'Axolotls are aquatic salamanders native to Mexico, famous for their ability to regenerate limbs. They have external gills and remain in their larval stage throughout their lives.',
      origin: 'Mexico',
      dangerLevel: 'Low'
    },
    {
      animalId: 'default-3',
      name: 'Jaguar',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVO2AJcbY151kO8cogDtqBJKwOsMCIw5-fKEHmRXQo4d7bvd6iTDFrtTJv7oqRIQZ0g6CFoyJW&s=10',
      description: 'Jaguars are large, powerful cats native to the Americas. They are known for their distinctive spotted coats and are excellent swimmers and hunters.',
      origin: 'South America',
      dangerLevel: 'High'
    },
    {
      animalId: 'default-4',
      name: 'Golden Eagle',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDMjfz3arvGXIzaoHHd7IwsaVc3XOa0s3JzEyEwUWaOJS7yhTldLU675dcfv51qBU2K-kiosi&s=10',
      description: 'Golden Eagles are large birds of prey found in the Northern Hemisphere. They are known for their keen eyesight, powerful talons, and impressive hunting skills.',
      origin: 'Northern Hemisphere', 
      dangerLevel: 'Medium'
    },
    {
      animalId: 'default-5',
      name: 'Pit Viper',
      image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSwmzt-2WCZhmtyvP4o-5e1m4_TDIsNGZX6MFKcowVRkKuTqKHxNNKfQJf81FGaP9mTIi8L-C20',
      description: 'Pit Vipers are venomous snakes found in the Americas and Asia. They are known for their heat-sensing pits, which help them detect warm-blooded prey.',
      origin: 'Americas and Asia',
      dangerLevel: 'Extreme'
    }
  ];

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const databaseAnimals = await getAllAnimals();
        
        const allAnimals = [...defaultAnimals, ...databaseAnimals];
        setAnimals(allAnimals);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setAnimals(defaultAnimals);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const refreshAnimals = async () => {
    try {
      const databaseAnimals = await getAllAnimals();
      const allAnimals = [...defaultAnimals, ...databaseAnimals];
      setAnimals(allAnimals);
    } catch (error) {
      console.error('Error fetching animals:', error);
      setAnimals(defaultAnimals);
    }
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div style={{
        margin: 0,
        minHeight: 'calc(100vh - 56px)',
        overflowY: 'auto',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #fbc2eb, #82b3e7, #bc8cf3)',
        backgroundSize: '400% 400%',
        animation: 'lavaLamp 10s ease infinite',
        paddingTop: '20px',
        paddingBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <style>
          {`
            @keyframes lavaLamp {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
        <div className="text-center">
          <div className="spinner-border text-light" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-white fs-5">Loading animals...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      margin: 0,
      minHeight: 'calc(100vh - 56px)',
      overflowY: 'auto',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #fbc2eb, #82b3e7, #bc8cf3)',
      backgroundSize: '400% 400%',
      animation: 'lavaLamp 10s ease infinite',
      paddingTop: '20px',
      paddingBottom: '20px'
    }}>
      <style>
        {`
          @keyframes lavaLamp {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="container mt-5">
        <h1 className="text-center mb-4">Animals</h1>
        
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for an animal..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="row" id="gallery">
          {filteredAnimals.length === 0 ? (
            <div className="col-12 text-center">
              <p className="fs-5 text-white">No animals match your search.</p>
            </div>
          ) : (
            filteredAnimals.map(animal => (
              <div key={animal.animalId} className="col-md-4 mb-4 animal-card">
                <div className="card h-100">
                  {animal.image && (
                    <img src={animal.image} className="card-img-top" alt={animal.name} />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{animal.name}</h5>
                    <p className="card-text flex-grow-1">{animal.description}</p>
                    <div className="mt-2 mb-3">
                      <span className="badge bg-secondary me-2">{animal.origin}</span>
                      <span className={`badge ${
                        animal.dangerLevel === 'Low' ? 'bg-success' :
                        animal.dangerLevel === 'Medium' ? 'bg-warning' :
                        animal.dangerLevel === 'High' ? 'bg-danger' :
                        'bg-dark'
                      }`}>
                        {animal.dangerLevel}
                      </span>
                    </div>
                    {!animal.animalId.toString().startsWith('default-') ? (
                      <Link to={`/animal/${animal.animalId}`} className="btn btn-outline-primary mt-auto">
                        View Details
                      </Link>
                    ) : (
                      <div className="btn btn-outline-secondary mt-auto disabled">
                        Sample Animal
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalsGallery;