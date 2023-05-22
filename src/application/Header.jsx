import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/dashbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ImageComponent from './ImageComponent';

function Header() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');

  const typeUser = localStorage.getItem('typeUser');
  let fonction = "";
  if(typeUser === "cae") fonction = 'Chef D\'affaires étudiantes';
  else if(typeUser === "aa") fonction = 'Assistant Administratif(e)';
  else fonction = 'Directeur';

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
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`/api/photos/${localStorage.getItem('photo')}`);
        if (response.ok) {
          const url = URL.createObjectURL(await response.blob());
          setImageUrl(url);
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImageUrl();
  }, []);


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
              { fonction }
            </span>
          </label>

          <div>
            <span class="las la-bell">{localStorage.getItem('name')}</span>
          </div>

          <div class="user">
            
          {imageUrl && <img src={'http://localhost:8000/api/photos/notset.jpg'} className="profile-img" alt="Image" />}

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