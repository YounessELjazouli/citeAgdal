import React from 'react'
import "../css/home.css";
import ServicesSummary from './HomePage/ServicesSummary';
import News from './HomePage/News';
import Location from './HomePage/Location';
import Facts from './HomePage/Facts';
import NavBar from './NavBar'
import Footer from './Footer';

const Home = () => {
  return (
    <div className='homeBody'>
      <NavBar />
      <div>
        <ServicesSummary />
        <Facts />
        <News />
        <Location />
      </div>
      <Footer />
    </div>
  )
}

export default Home;