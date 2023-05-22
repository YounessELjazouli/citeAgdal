import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


const StatsSections = () => {
    const [nbResidents, setNbResidents] = useState(0)
    const [nbChambres, setNbChambres] = useState(0)
    const [nbPlaces, setNbPlaces] = useState(0)
    const [nbPlacesDisponible, setNbPlacesDisponible] = useState(0)

    axios.get('http://localhost:8000/api/statsAa').then((response) => {
        setNbResidents(response.data.nbResidents);
        setNbChambres(response.data.nbChambres);
        setNbPlaces(response.data.nbPlaces);
        setNbPlacesDisponible(response.data.nbPlacesDisponible)
    })

   

    return (

        <div className="container mt-5">
        <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="3s">
                <div className="fact-item bg-light rounded text-center h-100 p-5">
                    <i className="fa fa-certificate fa-4x text-primary mb-4 text-dark"></i>
                    <p className="mb-2 textStats">Nombre des étudiantes dans le cité</p>
                    <h1 className="display-5 text-dark mb-0" data-toggle="counter-up">{nbResidents}</h1>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.3s">
                <div className="fact-item bg-light rounded text-center h-100 p-5">
                    <i className="fa fa-users text-dark fa-4x text-primary mb-4"></i>
                    <p className="mb-2 text-dark textStats">Nombre de chambres dans le cité</p>
                    <h1 className="display-5 text-dark mb-0" data-toggle="counter-up">{nbChambres}</h1>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="fact-item bg-light rounded text-center h-100 p-5">
                    <i className="fa fa-bread-slice text-dark fa-4x text-primary mb-4"></i>
                    <p className="mb-2 text-dark textStats">Nombre Totale de places dans le cité</p>
                    <h1 className="display-5 mb-0 text-dark" data-toggle="counter-up">{nbPlaces}</h1>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.7s">
                <div className="fact-item bg-light rounded text-center h-100 p-5">
                    <i className="fa fa-cart-plus text-dark fa-4x text-primary mb-4"></i>
                    <p className="mb-2 text-dark textStats">Nombre de places disponibles dans le cité </p>
                    <h1 className="display-5 text-dark mb-0" data-toggle="counter-up">{nbPlacesDisponible}</h1>
                </div>
            </div>
        </div>
    </div>
    )
}

export default StatsSections