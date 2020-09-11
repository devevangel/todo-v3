import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className='jumbotron'>
    <h1 className='display-4'>Hello, User!</h1>
    <p className='lead'>
      This is a simple Todo app, with a simple jumbotron-style component for
      calling extra attention to featured content or information.
    </p>
    <hr className='my-4' />
    <p>Hello once again i didn't know what to write so i wrote this stuff.</p>
    <Link to='/signup' className='btn btn-primary btn-lg'>
      Signup
    </Link>
    <Link to='/login' className='btn btn-primary btn-lg ml-4'>
      Login
    </Link>
  </div>
);

export default Home;
