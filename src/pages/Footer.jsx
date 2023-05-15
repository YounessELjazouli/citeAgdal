import React from 'react'
import '../css/footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function Footer() {
  return (
    <footer className='container-fluid'>
      <div className="row justify-content-around footer">
        <div className="col-lg-2 col-md-4 col-sm-12">
          <img src='images/logocite.png' className="footerLogo" alt="logo" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 footerLinks">
          <h3>Liens utiles</h3>
          <Link to="">ONOUSC</Link>
          <Link to="">CONSULTER BOURSE</Link>
          <Link to="">BOURSE ETRANGER</Link>
          <Link to="">UNIVERSITE MOHAMED V</Link>
          <Link to="">ONOUSC</Link>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 footerLinks">
          <h3>Liens utiles</h3>
          <Link to="">ESPACE ADMINISTRATI</Link>
          <Link to="">SERVICES</Link>
          <Link to="">PUBLICATION</Link>
          <Link to="">CONTACT</Link>
          <Link to="">ONOUSC</Link>
        </div>
      </div>


      <div className="row justify-content-center  ownership">
        <div className="col-sm-12 text-center">
          @ 2023 - <FontAwesomeIcon icon={solid('copyright')} /> Cité Universitaire Rabat Agdal
        </div>
      </div>
    </footer>

  )
}

export default Footer