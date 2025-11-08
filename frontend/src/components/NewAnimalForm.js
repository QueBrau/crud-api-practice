import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAnimal } from '../services/animalService';

const NewAnimalForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [dangerLevel, setDangerLevel] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with:', { name, description, origin, dangerLevel, image });
    
    if (!name.trim() || !description.trim() || !origin.trim() || !dangerLevel.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const newAnimal = { name, description, origin, dangerLevel, image };
      console.log('Sending animal to API:', newAnimal);
      const result = await addAnimal(newAnimal);
      console.log('Animal added successfully:', result);
      alert('Animal added successfully!');
      setName('');
      setDescription('');
      setOrigin('');
      setDangerLevel('');
      setImage('');
      navigate('/');
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      alert(`Failed to add animal: ${error.response?.data?.message || error.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add New Animal</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Animal Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter animal name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the animal"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/animal-image.jpg"
                  />
                  <div className="form-text">
                    Optional: Enter a URL for an image of the animal
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="origin" className="form-label">
                    Origin <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g., Madagascar, Amazon Rainforest"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dangerLevel" className="form-label">
                    Danger Level <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="dangerLevel"
                    value={dangerLevel}
                    onChange={(e) => setDangerLevel(e.target.value)}
                    required
                  >
                    <option value="">Select danger level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => navigate('/')}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add Animal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAnimalForm;
