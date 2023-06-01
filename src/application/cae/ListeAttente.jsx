import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Header from "../Header";
import SideBar from './SideBar';

const ListeAttente = () => {
    const [listA, setListA] = useState([]);
    const [showOnlyYes, setShowOnlyYes] = useState(false);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("desc");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/listA?page=${currentPage}`).then(response => {
            setListA(response.data.data);
            setTotalPages(response.data.last_page);
        })
            .catch(error => {
                console.error(error);
            });
    }, [currentPage, listA]);
    //controle the pagination pages
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    // Filter the table data and show only applicants with special needs 
    let filteredData = listA.filter((row) =>
        row.nom.toLowerCase().includes(filter.toLowerCase()) &&
        (!showOnlyYes || row.handicapé.toLowerCase() === "oui")
    );


    // Sort the filtered data based on the sort order
    const sortedData = filteredData.sort((a, b) => {
        if (sort === "asc") {
            return a.revenueAnuelle - b.revenueAnuelle;
        } else {
            return b.revenueAnuelle - a.revenueAnuelle;
        }
    });



    const returnTodemandes = ($id) => {
        axios.get(`http://localhost:8000/api/returnTodemandes1/${$id}`)

    }

    const transferAuListePrincipale = ($id) => {
        axios.get(`http://localhost:8000/api/transferAuListePrincipale/${$id}`)

    }



    return (
        <>
            <SideBar />
            <div class="main-content">
                <Header />

                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Espace Chef D'affaires Etudiantes / Liste d'attente</small>
                    </div>

                    <div class="page-content">
                        <div className="container-fluid">

                            <div className="row my-3 justify-content-between">
                                <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Chercher un Nom" className="form-control d-inline w-25 col-3" />

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
                                <div className='viewer'>
                                    {listA === null && <>Liste des demande est vide Exporter les demandes via le fichier Excel</>}
                                    {listA !== null && (
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
                                                    {
                                                        sortedData.map((demande, index) => {
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
                                                                        <button className="btn btn-warning mx-2" onClick={() => { transferAuListePrincipale(demande.id) }}
                                                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Transférer vers la liste principale">
                                                                            <FontAwesomeIcon icon={solid('list-alt')} />
                                                                        </button>
                                                                        <button className="btn btn-danger mx-2" onClick={() => { returnTodemandes(demande.id) }}
                                                                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Supprimer de la liste d'attente">
                                                                            <FontAwesomeIcon icon={solid('cancel')} />
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
                    </div>
                </main>
            </div>
        </>
    )
}

export default ListeAttente;