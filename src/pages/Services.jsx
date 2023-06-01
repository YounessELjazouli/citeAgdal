import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer';
import TypeWriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ServiceRow = ({ image, title, description, isImageLeft }) => (
  <div className="row my-3">
    <div className={`col-md-6 ${isImageLeft ? 'order-md-1' : 'order-md-2'}`}>
      <img src={image} alt={title} style={{ width: '100%', height: '60vh' }} />
    </div>
    <div className={`col-md-6 ${isImageLeft ? 'order-md-2' : 'order-md-1'}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);


function Services() {
  useEffect(() => {
    AOS.init({ duration: 7000 })
  }, [])
  return (
    <div>
      <NavBar />
      <div className="text-center text-light bg-dark h1">
        <TypeWriter options={{
          autoStart: true,
          loop: true,
          delay: 300,
          strings: ["Services"]
        }} />
      </div>
      <div className="container">
        <div data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
          <ServiceRow
            image="images/restauration.jpg"
            title="Restauration"
            description="Description for Restauration."
            isImageLeft={true}
          />
        </div>

        <div data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000" >
          <ServiceRow
            image="images/Terrain-basketball-ecole.jpg"
            title="Terrain de Sport"
            description="Description for Terrain de Sport."
            isImageLeft={false}
          />
        </div>
        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
          <ServiceRow
            image="images/cabinet.jpg"
            title="Centre médical"
            description="Description for Restauration."
            isImageLeft={true}
          />
        </div>
        <div data-aos="fade-zoom-out" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
          <ServiceRow
            image="images/maxresdefault.jpg"
            title="salle d'etude"
            description="Description for Terrain de Sport."
            isImageLeft={false}
          />
        </div>
        <div data-aos="fade-flip-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
          <ServiceRow
            image="images/fa24a9c5-8e2e-4ca1-94e9-6b57e21cb4e1.jpeg"
            title="Bureau Amoe"
            description="Description for Restauration."
            isImageLeft={true}
          />
        </div>
        <div  data-aos="fade-up" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
          <ServiceRow
            image="images/corporate-cafeteria1-1024x427.jpg"
            title="Caféteria"
            description="Description for Terrain de Sport."
            isImageLeft={false}
          />
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Services