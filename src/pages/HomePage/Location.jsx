import React from 'react'

const Location = () => {
  return (
    <div className='container mt-5 locationSection bg-light'>
      <div className="row justify-content-between">
        <div className="col-lg-3">
          <div className="h3 my-5">Nous Joindre</div>
          <div className="h6 adress">Cité Universitare Rabat Agdal Avenue Omar ibnou khatab ; BP : 719</div>
          <div className="tel"><span>Telephone : </span> 05 37 77 36 16	</div>
          <div className="tel"><span>Fax : </span> 05 37 77 75 72	</div>
        </div>
        <div className="col-lg-3 btns py-4">
          <button className="btn btn-light btn-outline-primary">Nos Cordonnées</button>
          <button className="btn btn-light btn-outline-primary">Bottin</button>
          <button className="btn btn-light btn-outline-primary">Heures d'ouverture</button>
        </div>
        <div className="col-lg-5">
          <img src="images/1.jpg" className='mapsLocationImage' alt="maps" />
        </div>
      </div>
    </div>
  )
}

export default Location