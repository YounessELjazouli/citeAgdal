import React, { useState } from 'react'
import '../../css/dashbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
function SideBar() {
    const [activeLink, setActiveLink] = useState(window.location.pathname);
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <>
            <input type="checkbox" id="menu-toggle" />
            <div className="sidebar">
                <div className="side-header">
                    <h3>C <span>ité</span></h3>
                    Agdal
                </div>

                <div className="side-content">
                    <div className="side-menu">
                        <ul>
                            <li>
                                <Link to="/admin/aa/accueil" className={activeLink === '/admin/aa/accueil' ? 'active' : ''}
                                    onClick={() => handleLinkClick('/admin/aa/accueil')}>
                                    <span>
                                        <FontAwesomeIcon icon={solid('home-alt')} />
                                    </span>
                                    <small>Accueil</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/aa/valider" className={activeLink === '/admin/aa/valider' ? 'active' : ''}
                                    onClick={() => handleLinkClick('/admin/aa/valider')}>
                                    <span>
                                        <FontAwesomeIcon icon={solid('bullhorn')} />
                                    </span>
                                    <small>Affecter les chambres</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/aa/deleteEtud" className={activeLink === '/admin/aa/deleteEtud' ? 'active' : ''}
                                    onClick={() => handleLinkClick('/admin/aa/deleteEtud')}>
                                    <span>
                                        <FontAwesomeIcon icon={solid('chart-bar')} />
                                    </span>
                                    <small>Départ de cité universitaire</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/aa/chambres" className={activeLink === '/admin/aa/chambres' ? 'active' : ''}
                                    onClick={() => handleLinkClick('/admin/aa/chambres')}>
                                    <span>
                                        <FontAwesomeIcon icon={solid('balance-scale')} />
                                    </span>
                                    <small>Changement de Chambre</small>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>


        </>


    )
}

export default SideBar