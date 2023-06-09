import React, { useState, useEffect } from 'react'
import "../css/login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import NavBar from './NavBar'
import Footer from './Footer';
import TypeWriter from 'typewriter-effect'
import AOS from 'aos';
import 'aos/dist/aos.css'

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Define the isAuthenticated state
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 7000 })
  }, []);

  var token = localStorage.getItem('access_token');;
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      });

      const { success, token, typeUser, name, email: userEmail, photo } = response.data;

      if (success) {
        // login successful, save the token to local storage and return the user data
        localStorage.setItem('access_token', token);
        localStorage.setItem('email', userEmail);
        localStorage.setItem('name', name);
        localStorage.setItem('typeUser', typeUser);
        localStorage.setItem('photo', photo);
        localStorage.setItem('authentificated', true);
        window.location.href = (`/admin/${typeUser}/accueil`)
        return { typeUser, name, email: userEmail };
      } else {
        // login failed
        setError('Email ou mot de pass incorrect');
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      throw error;
    }
  };


  return (
    <>
      <NavBar />
      <div className="text-center text-light bg-dark h1">
        <TypeWriter options={{
          autoStart: true,
          loop: true,
          delay: 300,
          strings: ["Espace Administratif ..."]
        }} />
      </div>
      <section className='container-fluid loginWrapper'>
        <div className="row align-items-center">

          <div className="col-md-8 d-sm-none d-md-block" data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="2000">
            <img src="images/teamwork.jpg" alt="teamwork" className='loginSidePhoto' />
          </div>
          <div className="col-md-4 col-sm-12" data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="2000">
            <div class="form-value">
              <form onSubmit={handleSubmit}>
                <h2 className='h2 text-center loginTitle'>Accéder à votre Espace Administratif</h2>
                <div class="inputbox">
                  <input type="email" required value={email} onChange={handleEmailChange} />
                  <label for="">Email</label>
                </div>
                <div class="inputbox">
                  <input type="password" required value={password} onChange={handlePasswordChange} />
                  <label for="">Mot de passe</label>
                </div>
                <div class="forget">
                  <label class="loginOptions">
                    <div className='mr-1'><input type="checkbox" />Resté connecter</div>
                    <Link to="/PasswordRecovery">Mot de passe oublié</Link>
                  </label>
                </div>
                <button type="submit">Se Connecter</button>
                {error && <p className='alert alert-danger text-dark mt-3'>{error}</p>}

                <div class="register">
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginSession: (authUserInfo) => {
      dispatch({ type: "LOGIN", payload: authUserInfo })
    }
  }
}


export default connect(null, mapDispatchToProps)(Login);
