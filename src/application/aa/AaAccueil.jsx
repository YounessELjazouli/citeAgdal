import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
import StatsSections from "./StatsSections";
import Header from "../Header";
import SideBar from "./SideBar";

const AaAccueil = () => {
    const [listResidents, setListResidents] = useState([]);
    const [listChambresDisponibles, setListChambresDisponibles] = useState([]);
    const [conditionalRendring, setConditionalRendring] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPages1, setTotalPages1] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/listR?page=${currentPage}`).then((response) => {
            setListResidents(response.data.data);
            setTotalPages(response.data.last_page);
        }).catch(error => {
            Swal.fire({
                text: error,
                icon: "error"
            });
        });
    }, [currentPage])
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/listC?page=${currentPage1}`).then((response) => {
            setListChambresDisponibles(response.data.data);
            setTotalPages1(response.data.last_page);
        }).catch(error => {
            Swal.fire({
                text: error,
                icon: "error"
            });
        });
    }, [currentPage1])
    function handlePageChange1(pageNumber) {
        setCurrentPage1(pageNumber);
    }

    return (
        <>
            <SideBar />
            <div class="main-content">
                <Header />

                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Espace Assistant(e) Administratif(e) / Accueil</small>
                    </div>

                    <div class="page-content">
                        <StatsSections />
                        <button onClick={() => setConditionalRendring(conditionalRendring === true ? false : true)}
                            className="btn my-5 btn-primary d-block w-25 mx-end">
                            {conditionalRendring ? <>Voir la liste des chambres disponibles</> : <>Voir la liste des étudiantes résidents</>}
                        </button>
                        {
                            conditionalRendring ? <>
                                <div className='my-5 table-responsive'>
                                    <table className='table table-light table-striped table-bordered table-hover text-center' style={{ fontSize: "1.1rem" }}>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Nom Complet</th>
                                                <th scope='col'>CIN</th>
                                                <th scope='col'>Etablissement</th>
                                                <th scope='col'>Diplome Préparé</th>
                                                <th scope='col'>Cycle d'étude</th>
                                                <th scope='col'>Province des Parents</th>
                                                <th scope='col'>Date Naissance</th>
                                                <th scope='col'>Chambre</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listResidents.map((demande, index) => {
                                                    return (
                                                        <tr key={index}>

                                                            <td>{demande.nom} {demande.prenom}</td>
                                                            <td>{demande.cin}</td>
                                                            <td>{demande.etablissement}</td>
                                                            <td>{demande.diplomePrepare}</td>
                                                            <td>{demande.cycleEtudes}</td>
                                                            <td>{demande.provinceParents}</td>
                                                            <td>{demande.dateNaissance}</td>
                                                            <td>{demande.codeChambre} </td>


                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        changeCurrentPage={handlePageChange}
                                        theme="square-fill"
                                    />
                                </div>
                            </> : <>
                                <div className='table-responsive'>
                                    <table className='table table-light table-striped table-bordered table-hover text-center' style={{ fontSize: "1.1rem" }}>
                                        <thead>
                                            <tr>
                                                <th scope='col'>codeChambres</th>
                                                <th scope='col'>Etage</th>
                                                <th scope='col'>Capacité</th>
                                                <th scope='col'>Places disponibles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listChambresDisponibles.map((demande, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{demande.codeChambre}</td>
                                                            <td>{
                                                                demande.codeChambre.startsWith('RC') ? <>Rez-de-chaussé</> :
                                                                    demande.codeChambre.startsWith('ET1') ? <>Etage 1</> :
                                                                        demande.codeChambre.startsWith('ET2') ? <>Etage 2</> :
                                                                            demande.codeChambre.startsWith('ET3') ? <>Etage 3</> : <>Undifined</>
                                                            }
                                                            </td>
                                                            <td>{demande.totalCapacity}</td>
                                                            <td>{demande.placesLeft}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        currentPage={currentPage1}
                                        totalPages={totalPages1}
                                        changeCurrentPage={handlePageChange1}
                                        theme="square-fill"
                                    />
                                </div>
                            </>
                        }

                    </div>
                </main>
            </div>
        </>
            )
}

export default AaAccueil

