import React from 'react'
import { useState } from 'react';
import Violation from './Violation';
import Punition from './Punition';
import axios from 'axios';
import SideBar from './SideBar';
import Header from './Header';

function Discipline() {
    const [selectedButton, setSelectedButton] = useState(null);
    const [listPu, setlistPu] = useState([])
    const [listV, setlistV] = useState([])

    axios.get("http://localhost:8000/api/listPu").then(response => {
        setlistPu(response.data)
    })

    axios.get("http://localhost:8000/api/listV").then(response => {
        setlistV(response.data)
    })

    const adjustDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).replace(/-/g, ' à ');
        return formattedDate;
    }
    return (
        <div>
            <SideBar />
            <div class="main-content">

                <Header />
                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Home / Dashboard</small>
                    </div>

                    <div class="page-content">
                        {selectedButton !== null ? (
                            <div>
                                <button className='mt-5 mx-auto d-block btn btn-danger btn-outline-dark' onClick={() => setSelectedButton(null)}>Retourne à la page précédante</button>
                                <div>
                                    {selectedButton === "button1" ? (
                                        <Violation />
                                    ) : selectedButton === "button2" ? (
                                        <Punition />
                                    ) : selectedButton === "button3" ? (
                                        <div className='table-responsive mt-5'>
                                            <table className='table table-bordered table-hover'>
                                                <thead className='thead-primary'>
                                                    <tr>
                                                        <th className='text-center py-3'>Violation</th>
                                                        <th className='text-center py-3'>Crée le</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listV.map(elem => (
                                                        <tr key={elem.id}>
                                                            <td className='py-3'>{elem.typeViolation}</td>
                                                            <td className='py-3'>{adjustDate(elem.created_at)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    ) : (
                                        <div className='table-responsive mt-5'>
                                            <table className='table table-bordered table-hover'>
                                                <thead className='thead-primary'>
                                                    <tr>
                                                        <th className='text-center py-3'>Punition</th>
                                                        <th className='text-center py-3'>Crée le</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listPu.map(elem => (
                                                        <tr key={elem.id}>
                                                            <td className='py-3'>{elem.nomP}</td>
                                                            <td className='py-3'>{adjustDate(elem.created_at)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='row justify-content-around mt-5'>
                                    <button className='col-lg-5 p-5  btn btn-primary btn-outline-dark' onClick={() => setSelectedButton("button1")}>Ajouter une Violation</button>
                                    <button className='col-lg-5 p-5  btn btn-primary btn-outline-dark' onClick={() => setSelectedButton("button2")}>Ajouter une Punition</button>
                                </div>
                                <div className='row justify-content-around mt-5'>
                                    <button className='col-lg-5 p-5  btn btn-primary btn-outline-dark' onClick={() => setSelectedButton("button3")}>Voir les Violations</button>
                                    <button className='col-lg-5 p-5  btn btn-primary btn-outline-dark' onClick={() => setSelectedButton("button4")}>Voir les punition</button>
                                </div>
                            </>

                        )}
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Discipline