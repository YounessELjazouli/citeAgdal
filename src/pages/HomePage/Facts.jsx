import React from 'react'

export default function Facts() {
    // $('[data-toggle="counter-up"]').counterUp({
    //     delay: 10,
    //     time: 2000
    // });

    return (

        <div className="container mb-5">
            <div className="row g-4">
                <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="fact-item bg-light rounded text-center h-100 p-5">
                        <i className="fa fa-certificate fa-4x text-primary mb-4"></i>
                        <p className="mb-2">Années d'éxpereince</p>
                        <h1 className="display-5 mb-0" data-toggle="counter-up">31</h1>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.3s">
                    <div className="fact-item bg-light rounded text-center h-100 p-5">
                        <i className="fa fa-users fa-4x text-primary mb-4"></i>
                        <p className="mb-2">Nombre de chambres</p>
                        <h1 className="display-5 mb-0" data-toggle="counter-up">350</h1>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.5s">
                    <div className="fact-item bg-light rounded text-center h-100 p-5">
                        <i className="fa fa-bread-slice fa-4x text-primary mb-4"></i>
                        <p className="mb-2">Nombre des étudiants</p>
                        <h1 className="display-5 mb-0" data-toggle="counter-up">840</h1>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeIn" data-wow-delay="0.7s">
                    <div className="fact-item bg-light rounded text-center h-100 p-5">
                        <i className="fa fa-cart-plus fa-4x text-primary mb-4"></i>
                        <p className="mb-2">Nombre des facultés </p>
                        <h1 className="display-5 mb-0" data-toggle="counter-up">23</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
