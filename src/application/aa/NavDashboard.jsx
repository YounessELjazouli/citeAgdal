import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/dashbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function NavDashboard() {
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
    <Navbar className="dashbar" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/admin/aa/accueil" className='text-center fonction'>ESPACE ADMINISTRATIF<br /> ASSISTANT(E) ADMINISTRATIF(E) </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto dropdownMenu">
            <NavDropdown title={<>TABLEAU DE BORD<FontAwesomeIcon className='arrowDownIcon' icon={faArrowDown} /></>} id="basic-nav-dropdown" > 
              <NavDropdown.Item as={Link} to="/admin/aa/accueil">Accueil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/aa/valider">Affecter les chambres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/aa/deleteEtud">Départ de cité universitaire</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/aa/chambres">Changement de Chambre</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto profileSection">
            <Nav.Link href="#profile text-center">
              SABIR RACHIDA
            </Nav.Link>
            <Nav.Link onClick={logOut}>
                <FontAwesomeIcon className='logOutIcon' icon={solid('sign-out-alt')} 
                data-bs-toggle="tooltip" data-bs-placement="bottom" title="Déconnexion"/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavDashboard;