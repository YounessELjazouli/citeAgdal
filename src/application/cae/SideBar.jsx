import React, {useState} from 'react'
import '../../css/dashbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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
                                <Link to="/admin/cae/accueil" className={activeLink === '/admin/cae/accueil' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/cae/accueil')}>
                                    <span>
                                        <FontAwesomeIcon icon={solid('home-alt')} />
                                    </span>
                                    <small>Importation des demandes</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/cae/demandes" className={activeLink === '/admin/cae/demandes' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/cae/demandes')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('bullhorn')} />
                                    </span>
                                    <small>Gérer la liste des demandes <br /> de logement</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/cae/listP"  className={activeLink === '/admin/cae/listP' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/cae/listP')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('chart-bar')} />
                                    </span>
                                    <small>Gérer la liste principale</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/cae/listA" className={activeLink === '/admin/cae/listA' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/cae/listA')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('balance-scale')} />
                                    </span>
                                    <small>Gérer la liste d'attente</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/cae/indiscipline" className={activeLink === '/admin/cae/indiscipline' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/cae/indiscipline')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('user-alt')} />
                                    </span>
                                    <small>Gérer les indisciplines</small>
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