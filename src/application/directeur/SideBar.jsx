import React, {useState} from 'react'
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
                                <Link to="/admin/dir/accueil" className={activeLink === '/admin/dir/accueil' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/dir/accueil')}>
                                    <span>
                                        <FontAwesomeIcon icon={solid('home-alt')} />
                                    </span>
                                    <small>Accueil</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/dir/annonces" className={activeLink === '/admin/dir/annonces' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/dir/annonces')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('bullhorn')} />
                                    </span>
                                    <small>Publier un nouveau <br /> Annonce</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/dir/stats"  className={activeLink === '/admin/dir/stats' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/dir/stats')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('chart-bar')} />
                                    </span>
                                    <small>Statistiques</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/dir/discipline" className={activeLink === '/admin/dir/discipline' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/dir/discipline')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('balance-scale')} />
                                    </span>
                                    <small>Les sanctions disciplinaires</small>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/dir/comptes" className={activeLink === '/admin/dir/comptes' ? 'active' : ''}
          onClick={() => handleLinkClick('/admin/dir/comptes')}>
                                    <span>
                                    <FontAwesomeIcon icon={solid('user-alt')} />
                                    </span>
                                    <small>Gérer les comptes <br/>des employés</small>
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