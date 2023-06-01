import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer';
import axios from 'axios';
import TypeWriter from 'typewriter-effect'

function Publications() {
  const [annonces, setAnnonces] = useState([]);
  const [details, setDetails] = useState([])
  const [showDetail, setShowDetail] = useState(false);
  const [photoDetail, setphotoDetail] = useState('')
  useEffect(() => {
    axios.get('http://localhost:8000/api/annonces').then((response) => {
      setAnnonces(response.data.annonces);
    })
  }, [])

  const detail = async (id, image) => {
    axios.get(`http://localhost:8000/api/annonces/${id}`).then((response) => {
      setDetails(response.data.details);
      setphotoDetail(image);

      setTimeout(() => {
        setShowDetail(true);
        console.log(details);
      }
        , 1000)
    })


  }

  const retour = () => {
    setShowDetail(false);
  }

  return (
    <div>
      <NavBar />
      <div className="text-center text-light bg-dark h1">
        <TypeWriter options={{
          autoStart: true,
          loop: true,
          delay: 300,
          strings: ["Publications"]
        }} />
      </div>
      {
        !showDetail &&
        <div className="container">
          <div className="row justify-content-between my-3">

            {
              annonces.map((an) => {
                return (
                  <div class="card col-md-5" >
                    <img src={an.media} class="card-img-top" alt="..." width={80} height={90} />
                    <div class="card-body">
                      <h5 class="card-title">{an.title}</h5>
                      <p class="card-text">{an.body}</p>
                      <button onClick={() => { detail(an.id, an.media) }} class="btn btn-primary">Lire la suite ...</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      {
        showDetail &&
        <div className="container">
          <div className="row justify-content-center my-3">

            {
              details.map((d) => {
                return (
                  <div class="card col-md-8" >
                    <img src={photoDetail} class="card-img-top" alt="..." width={80} height={390} />
                    <div class="card-body">
                      <h5 class="card-title">{d.title}</h5>
                      <p class="card-text">{d.body}</p>
                    </div>
                    <button onClick={() => { retour() }} class="w-50 d-block mx-auto btn btn-primary">Retour vers les annonces</button>

                  </div>
                )
              })
            }

          </div>
        </div>
      }


      <Footer />
    </div>
  )
}

export default Publications