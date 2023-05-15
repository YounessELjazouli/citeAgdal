import '../css/navbar.css';
import { Link, useNavigate,useLocation, Navigate } from 'react-router-dom';
import logo1 from './onouscLogo.png'
import logo2 from './eduSupGov.png'
import Login from './Login';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function NavBar() {


  const isAuthenticated = localStorage.getItem('authentificated');

  const location = useLocation();
  if (location.pathname === '/admin/null/accueil') {
    return <Navigate to="/login" />;
  }


  return (
    <div className='headerNavWrapper'>
      <header className='headerNav container-fluid' >
        <div className="row justify-content-around">
          <div className="logo1 col-md-4 mt-2 ">
            <img src={logo1} alt='logo onousc' />
          </div>
          <div className="logo2 col-md-3 mt-2">
            <img src={logo2} alt='logo onousc' />
          </div>
        </div>

      </header>

      <nav class="navbar navbar-expand-md navbar-light sticky-top px-4 px-lg-5" style={{ background: 'transparent' }}>

        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav mx-auto bg-light pe-4 py-3 py-lg-0">
            <Link to="/" class="nav-item nav-link active">Accueil</Link>
            <Link to="/historique" class="nav-item nav-link">Historique</Link>
            <Link to="/services" class="nav-item nav-link">Services</Link>
            <Link to="/publications" class="nav-item nav-link">publication</Link>
            {isAuthenticated ? 
                <Link to={`/admin/${localStorage.getItem('typeUser')}/accueil`} class="nav-item nav-link">Espace Administratif</Link>

            :     
              <Link to='/login' class="nav-item nav-link">Espace Administratif</Link>
            }
            <Link to="/contact" class="nav-item nav-link">Contact</Link>

          </div>

        </div>
      </nav>
    </div>
  )
}

export default NavBar