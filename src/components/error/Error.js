import React from 'react';
import { Link } from 'react-router-dom';
import './error.css'
const Error = () => {
  return <div className='error'>
      <div className='error-content'>
          <h3>ERROR!!!</h3>
          <h1 className="text-gradient">404</h1>
          <h3>Page not found</h3>
         <Link to='/'> <button class="tiktok">Go to HomePage</button></Link>
      </div>
  </div>;
};

export default Error;
