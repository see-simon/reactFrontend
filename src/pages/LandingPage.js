import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to MyApp</h1>
          <p className="lead">Build amazing apps with ease.</p>
          <Link to="/loginPage" className="btn btn-light btn-lg mt-3">Get Started</Link>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
