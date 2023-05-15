import React, { useState } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';

const ServicesSummary = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex);
    }

    const services = [
        { titre: "BIBLIOTHEQUE", image: "cours.jpg", description: "Une bibliothèque où nos étudiants peuvent étudier, faire leurs recherches ou même lire leurs boooks préférés" },
        { titre: "SPORT", image: "dispoSalle.jpg", description: "Vous pouvez pratiquer vos favoris sprot à l'intérieur de notre campus, y compris le basket-ball, handball, football et beaucoup plus" },
        { titre: "CENTRE MEDICAL", image: "filieres.png", description: "le campus est équipé d'un centre médical au cas où vous vous sentez malade" },
    ]

    return (
        <div className="container-fluid p-0 mb-5">
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="images/biblio.jpg" alt="Image" />
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 pt-5">
                                    <h1 className="display-4 text-white mb-4 animated slideInDown">Bibliothéque du campus universitaire</h1>
                                    <p className="fs-5 text-secondary mb-4 pb-2 mx-sm-5 animated slideInDown">
                                        La bibliothèque du cité universitaire Rabat Agdal offre une variété de services pour soutenir les étudiants...
                                    </p>
                                    <a href="" className="btn btn-primary py-3 px-5 animated slideInDown">Lire la suite</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="images/centre-medical.jpg" alt="Image" />
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 pt-5">
                                    <h1 className="display-4 text-white mb-4 animated slideInDown">Centre Médical du Campus Universitaire Rabat Agdal</h1>
                                    <p className="fs-5 text-secondary mb-4 pb-2 mx-sm-5 animated slideInDown">
                                        Le centre médical de cité Rabat Agdal propose une gamme de services de santé pour soutenir les étudiants et les membres du personnel ....
                                    </p>
                                    <a href="" className="btn btn-primary py-3 px-5 animated slideInDown">Lire la suite</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img className="w-100" src="images/sport.jpg" alt="Image" />
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 pt-5">
                                    <h1 className="display-4 text-white mb-4 animated slideInDown">Terrains de sport polyvalent</h1>
                                    <p className="fs-5 text-secondary mb-4 pb-2 mx-sm-5 animated slideInDown">
                                        Les terrains de sport dans le campus offrent une variété de possibilités pour les étudiants afin de pratiquer des activité sportives en plein air.....
                                    </p>
                                    <a href="" className="btn btn-primary py-3 px-5 animated slideInDown">Lire la suite</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    )
}

export default ServicesSummary