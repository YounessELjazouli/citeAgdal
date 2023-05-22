import React, { useEffect } from 'react'
import "../css/home.css";
import ServicesSummary from './HomePage/ServicesSummary';
import News from './HomePage/News';
import Location from './HomePage/Location';
import Facts from './HomePage/Facts';
import NavBar from './NavBar'
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 7000 })
  }, [])

  return (
    <div className='homeBody'>
      <NavBar />
      <div>
        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
          <ServicesSummary />
        </div>
        <div data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
          <Facts />
        </div>
        <div data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="2000">
          <News />
        </div>


        <Location />
      </div>
      <Footer />
    </div>
  )
}

export default Home;