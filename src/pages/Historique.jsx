import NavBar from './NavBar'
import Footer from './Footer';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import TypeWriter from 'typewriter-effect'
function Historique() {
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
          strings: ["Historique"]
        }} />
      </div>
      <section id="history" className="py-5">
        <div className="container">

          <div className="row">
            <div className="col-lg-6" >
              <img src="images/cura.png" alt="History" className="img-fluid" />
            </div>
            <div className="col-lg-6" >
              <p className='historyText'>
                La cité universitaire de Rabat Agdal est un lieu emblématique où résident de nombreux étudiants marocains et étrangers. Elle a une histoire riche et joue un rôle important dans la vie étudiante de la ville de Rabat. Voici un bref aperçu de son historique
              </p>

            </div>
          </div>
          <div data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="3000">
            <ul className="grid-list mt-5" >
              <li className='hiddenLis' >
                La construction de la cité universitaire de Rabat Agdal a commencé dans les années 1960. Elle a été conçue pour répondre aux besoins croissants de logement des étudiants de l'Université Mohammed V de Rabat.
              </li><li className='hiddenLis' >
                La cité universitaire a été officiellement inaugurée en 1963. Elle a été conçue pour offrir un hébergement abordable et des installations de vie étudiante aux étudiants qui venaient de différentes régions du Maroc.
              </li><li className='hiddenLis' >
                Au fil des ans, la cité universitaire de Rabat Agdal a été agrandie pour accueillir un plus grand nombre d'étudiants. De nouveaux bâtiments et résidences ont été construits pour répondre à la demande croissante.
              </li><li className='hiddenLis' >
                La cité universitaire offre des chambres individuelles et des chambres partagées, ainsi que des espaces communs tels que des salles de détente, des terrains de sport, des cafétérias et des espaces d'étude.
              </li><li className='hiddenLis' >
                Elle abrite également des installations telles que des bibliothèques, des centres informatiques et des salles de conférence, qui sont mises à la disposition des étudiants pour faciliter leurs études et leur développement académique.
              </li><li className='hiddenLis' >
                En plus de l'hébergement, la cité universitaire de Rabat Agdal organise également diverses activités sociales, culturelles et sportives pour favoriser l'échange et la convivialité entre les étudiants.
              </li><li className='hiddenLis last'>
                La cité universitaire continue d'être un lieu prisé des étudiants à Rabat, offrant un environnement propice à l'apprentissage, à la vie communautaire et à l'épanouissement personnel.
              </li>
            </ul>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Historique