import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from './Header';
import SideBar from './SideBar';

const ListePrincipale = () => {
    const [demandes, setDemandes] = useState([]);
    const [showOnlyYes, setShowOnlyYes] = useState(false);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/listP`).then((response) => {
    //         setDemandes(response.data)
    //     })
    // }, [demandes])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/listP?page=${currentPage}`).then(response => {
            setDemandes(response.data.data);
            setTotalPages(response.data.last_page);
        })
            .catch(error => {
                console.error(error);
            });
    }, [currentPage, demandes]);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }
    // Filter the table data based on the filter value and the "inStock" column
    let filteredData = demandes.filter((row) =>
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
        axios.get(`http://localhost:8000/api/returnTodemandes/${$id}`)

    }

    const transferAuListeAttente = ($id) => {
        axios.get(`http://localhost:8000/api/transferAuListeAttente/${$id}`)

    }
    const listPdf = (data) => {
        const newData = data.map(d=>{
            const {created_at,cycleEtudes,dateNaissance,diplomePrepare,etablissement,gender,
                handicapé,id,nationalite,niveauEtudes,nombreAnnee,nouvelResident,provinceParents,
                revenueAnuelle,updated_at, ...rest} = d;
            return rest;
        })
        const doc = new jsPDF()
        const columns = Object.keys(newData[0]);
        const rows = newData.map(obj=>Object.values(obj))
        doc.autoTable({head:[columns],body:rows})
        doc.save('listP.pdf');

    }
    



    return (
        <>
        <SideBar />
        <div class="main-content">
            <Header />
    
            <main>
    
                <div class="page-header">
                    <h1>Dashboard</h1>
                    <small>Home / Dashboard</small>
                </div>
    
                <div class="page-content">
            <div className="container">
                <div className="row my-3 justify-content-between">
                    <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Chercher un Nom" className="form-control d-inline w-25 col-md-3 col-sm-12" />

                    <div class="nav-item dropdown col-md-3 col-sm-12 btn btn-dark text-light">
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
                    <div className="col-md-3 col-sm-12">
                        <button onClick={() => listPdf(demandes)} className="btn btn-light btn-outline-success w-100">
                            <FontAwesomeIcon icon={solid('print')} /> Publier la liste principale
                        </button>
                    </div>
                </div>
                <div>
                    {demandes === null && <>Liste des demande est vide Exporter les demandes via le fichier Excel</>}
                    {demandes !== null && (
                        <div className='table-responsive'>
                            <table className='table table-light table-striped table-bordered table-hover text-center' style={{fontSize:"1.1rem"}}>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nom Complet</th>
                                        <th scope='col'>Prenom</th>
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

                                                    <td>{demande.nom}</td>
                                                    <td>{demande.prenom}</td>
                                                    <td>{demande.cin}</td>
                                                    <td>{demande.revenueAnuelle}</td>
                                                    <td>{demande.nouvelResident}</td>
                                                    <td>{demande.nombreAnnee}</td>
                                                    <td>{demande.provinceParents}</td>
                                                    <td>{demande.dateNaissance}</td>
                                                    <td style={{ "display": "flex", "flexDirection": "row" }}>
                                                        <button className="btn btn-warning mx-2" onClick={() => { transferAuListeAttente(demande.id) }}
                                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Transférer vers la liste d'attentes">
                                                            <FontAwesomeIcon icon={solid('list-alt')} />
                                                        </button>
                                                        <button className="btn btn-danger mx-2" onClick={() => { returnTodemandes(demande.id) }}
                                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title="Retirer de la liste principale">
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

export default ListePrincipale;
