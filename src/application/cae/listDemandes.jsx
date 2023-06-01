import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Header from "../Header";
import SideBar from './SideBar';


const ListeDemandes = () => {
    const [demandes, setDemandes] = useState([]);
    const [showOnlyYes, setShowOnlyYes] = useState(false);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        //get list of data (demandes de logement) from the database in a pagination of 10 form
        axios.get(`http://localhost:8000/api/listeDemandes?page=${currentPage}`).then(response => {
            setDemandes(response.data.data);
            setTotalPages(response.data.last_page);
        })
            .catch(error => {
                console.error(error);
            });
    }, [currentPage, demandes]);
    //controle the pagination pages
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    // Filter the table data and show only applicants with special needs 
    let filteredData = demandes.filter((row) =>
        row.nom.toLowerCase().includes(filter.toLowerCase()) &&
        (!showOnlyYes || row.handicapé.toLowerCase() === "oui")
    );
    // Sort the filtered data based on the annual income of their parents
    const sortedData = filteredData.sort((a, b) => {
        if (sort === "asc") {
            return a.revenueAnuelle - b.revenueAnuelle;
        } else {
            return b.revenueAnuelle - a.revenueAnuelle;
        }
    });
    //shift row from list_demandes db table to list_principale db table
    const addToListP = ($id) => {
        axios.get(`http://localhost:8000/api/addToListP/${$id}`)
    }
    //shift row from list_demandes db table to list_attente db table
    const addToListA = ($id) => {
        axios.get(`http://localhost:8000/api/addToListA/${$id}`)
    }
    //delete demande from the database
    const deleteDemande = ($id) => {
        axios.delete(`http://localhost:8000/api/listeDemandes/${$id}`)
    }
    //delete non elligible applicants (such as those living nearby for exmaple)
    const deleteDemandes = () => {
        axios.get(`http://localhost:8000/api/listeDemandes/deleteFD/${1}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message
                })
            }).catch(({ response }) => {
                if (response.status === 422) {
                    //setValidationError(response.data.errors)
                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    })
                }
            })
    }
    //automaticlly adding application either to liste_principale or list_attente tables and delete them from demandes table
    const gestionAuto = () => {
        axios.get(`http://localhost:8000/api/listeDemandes/gestionAuto/${1}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message
                })
            }).catch(({ response }) => {
                if (response.status === 422) {
                    //setValidationError(response.data.errors)
                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    })
                }
            })
    }


    return (
        <>
        <SideBar />
        <div class="main-content">
            <Header />
    
            <main>
    
                <div class="page-header">
                    <h1>Dashboard</h1>
                    <small>Espace Chef D'affaires Etudiantes / Liste des demandes</small>
                </div>
    
                <div class="page-content">
            <div className="container">
                <div className="row my-3 justify-content-between">
                    <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Chercher un Nom" className="col-4 form-control d-inline w-25 col-3" />
                    <div class="nav-item dropdown col-2 btn btn-dark text-light">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Opérations </a>
                        <div class="dropdown-menu bg-light border-0 m-0">
                            <button onClick={deleteDemandes} className="btn btn-outline-dark w-100"  >
                                Supprimer les demandes éligible
                            </button>
                            <button onClick={gestionAuto} className="btn btn-outline-dark w-100"  >
                                Gestion automatique des demandes
                            </button>
                        </div>
                    </div>
                    <div class="nav-item dropdown col-2 btn btn-dark text-light">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Filter Par </a>
                        <div class="dropdown-menu bg-light border-0 m-0">
                            <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")} className="btn btn-outline-dark d-block w-100"  >
                                Revenue Anuelle des Parents : {sort === "asc" ? <FontAwesomeIcon icon={solid('arrow-up-9-1')} /> : <FontAwesomeIcon icon={solid('arrow-up-1-9')} />}
                            </button>
                            <button onClick={() => setShowOnlyYes(!showOnlyYes)} className="btn btn-outline-dark w-100"  >
                                {showOnlyYes ? "Voir tous les demandes" : "Les étudiants à besoins spécifiques"}
                            </button>
                        </div>
                    </div>
                </div>

                <div >
                    {demandes === null && <>Liste des demande est vide Exporter les demandes via le fichier Excel</>}
                    {demandes !== null && (
                        <div className='table-responsive'>
                            <table className='table table-light table-striped table-bordered table-hover text-center' style={{ fontSize: "1.1rem" }}>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nom Complet</th>
                                        <th scope='col'>CIN</th>
                                        <th scope='col'>Revenue Anuelle</th>
                                        <th scope='col'>Nouvelle Résident</th>
                                        <th scope='col'>Handicapé</th>
                                        <th scope='col'>Province des Parents</th>
                                        <th scope='col'>Date Naissance</th>
                                        <th scope='col'>OPTIONS</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {sortedData.map((demande, index) => {
                                        return (
                                                <tr key={index}>
                                                    <td>{demande.nom} {demande.prenom}</td>
                                                    <td>{demande.cin}</td>
                                                    <td>{demande.revenueAnuelle}</td>
                                                    <td>{demande.nouvelResident}</td>
                                                    <td>{demande.handicapé}</td>
                                                    <td>{demande.provinceParents}</td>
                                                    <td>{demande.dateNaissance}</td>
                                                    <td style={{ "display": "flex", "flexDirection": "row" }}>
                                                        <button className="btn btn-success mx-2" onClick={() => { addToListP(demande.id) }}
                                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ajouter au liste principale">
                                                            <FontAwesomeIcon icon={solid('check-circle')} />
                                                        </button>
                                                        <button className="btn bg-secondary mx-2" onClick={() => { addToListA(demande.id) }}
                                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ajouter au liste d'attente">
                                                            <FontAwesomeIcon icon={solid('stop-circle')} />
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => { deleteDemande(demande.id) }}
                                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Supprimer la demande">

                                                            <FontAwesomeIcon icon={solid('trash-alt')} />
                                                        </button>
                                                    </td>
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
                    )}
                </div>

            </div>
            </div>
            </main>
        </div>
        </>
    )
}

export default ListeDemandes;
