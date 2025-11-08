import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimalById, updateAnimal, deleteAnimal } from '../services/animalService';

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    origin: '',
    dangerLevel: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const animalData = await getAnimalById(id);
        setAnimal(animalData);
        setEditForm({
          name: animalData.name,
          description: animalData.description,
          origin: animalData.origin,
          dangerLevel: animalData.dangerLevel,
          image: animalData.image || ''
        });
      } catch (error) {
        console.error('Error fetching animal:', error);
        alert('Failed to load animal details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: animal.name,
      description: animal.description,
      origin: animal.origin,
      dangerLevel: animal.dangerLevel,
      image: animal.image || ''
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedAnimal = await updateAnimal(id, editForm);
      setAnimal(updatedAnimal);
      setIsEditing(false);
      alert('Animal updated successfully!');
    } catch (error) {
      console.error('Error updating animal:', error);
      alert('Failed to update animal');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        await deleteAnimal(id);
        alert('Animal deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting animal:', error);
        alert('Failed to delete animal');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading animal details...</p>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Animal Not Found</h4>
          <p>The animal you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Gallery
          </button>
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
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              {!isEditing ? (
                <div>
                  <h1 className="card-title display-5 mb-4 text-center">{animal.name}</h1>
                  
                  {animal.image && (
                    <div className="text-center mb-4">
                      <img 
                        src={animal.image} 
                        alt={animal.name} 
                        className="img-fluid rounded" 
                        style={{maxHeight: '300px', objectFit: 'cover'}}
                      />
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h5 className="text-muted">Description</h5>
                    <p className="fs-6">{animal.description}</p>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <h5 className="text-muted">Origin</h5>
                        <p className="fs-5">{animal.origin}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <h5 className="text-muted">Danger Level</h5>
                        <span className={`badge ${
                          animal.dangerLevel === 'Low' ? 'bg-success' :
                          animal.dangerLevel === 'Medium' ? 'bg-warning' :
                          animal.dangerLevel === 'High' ? 'bg-danger' :
                          'bg-dark'
                        } fs-6`}>
                          {animal.dangerLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2 justify-content-center mt-4">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => navigate('/')}
                    >
                      Back to Gallery
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-center mb-4">Edit Animal</h2>
                  
                  <div className="mb-3">
                    <label className="form-label">Animal Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Origin</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.origin}
                      onChange={(e) => setEditForm({...editForm, origin: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Danger Level</label>
                    <select
                      className="form-control"
                      value={editForm.dangerLevel}
                      onChange={(e) => setEditForm({...editForm, dangerLevel: e.target.value})}
                    >
                      <option value="">Select danger level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={editForm.image}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      placeholder="https://example.com/animal-image.jpg"
                    />
                    <div className="form-text">
                      Optional: Enter a URL for an image of the animal
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2 justify-content-center">
                    <button 
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-success"
                      onClick={handleSaveEdit}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AnimalDetails;