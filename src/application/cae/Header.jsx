import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/dashbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();

  const logOut = async () => {
    const token = localStorage.getItem('access_token');
    await axios.post(`http://localhost:8000/api/logout/${localStorage.getItem('email')}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('typeUser');
    localStorage.setItem('authentificated', false);
    localStorage.setItem('access_token', "");
    navigate("/login");

  }
  return (
    <header className="dashHeader">
      <div class="header-content">

        <label htmlFor="menu-toggle">
          <span>
            <FontAwesomeIcon icon={solid('bars')} />
          </span>
        </label>

        <div class="header-menu">
          <label htmlFor="">
            <span class="las la-search">
              Chef d'affaire etudiante
            </span>
          </label>

          <div>
            <span class="las la-bell">{localStorage.getItem('name') != "" ? "Karim" : " "}</span>
          </div>

          <div class="user">
            <div class="bg-img" style={{ "background-image": "url(img/1.jpeg)" }}></div>

            <span class="las la-power-off">
            </span>
            <span onClick={logOut} className='btn btn-secondary'>
              <FontAwesomeIcon icon={solid('sign-out-alt')} />Logout
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;