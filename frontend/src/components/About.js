import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
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
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="text-center mb-4">About</h1>
                <div className="text-center">
                  <h3 className="h5 mb-3">Our Mission</h3>
                  <p>
                    Welcome to my Animals MVC application! This platform is designed to help you 
                    explore, learn about, and manage information about fascinating animals from around the world.
                  </p>
                  
                  <h3 className="h5 mb-3 mt-4">What You Can Do</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2"><strong>Browse:</strong> Explore our collection of animals</li>
                    <li className="mb-2"><strong>Search:</strong> Find specific animals by name</li>
                    <li className="mb-2"><strong>Add:</strong> Contribute new animal information</li>
                    <li className="mb-2"><strong>Edit:</strong> Update existing animal details</li>
                    <li className="mb-2"><strong>Delete:</strong> Remove outdated entries</li>
                  </ul>
                </div>
                
                <div className="text-center mt-4">
                  <Link to="/" className="btn btn-primary">Back to Gallery</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
