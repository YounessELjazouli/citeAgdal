import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "./Header";
import SideBar from "./SideBar";

const ValiderLog = () => {
  const [cin, setCin] = useState("");
  const [listP, setListP] = useState([]);
  const [etudiantData, setEtudiantData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [chosenRoom, setChosenRoom] = useState(null);
  const [chosenEtud, setChosenEtud] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listPall`).then(response => {
      setListP(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [cin]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/chambres`).then(response => {
      setRooms(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  });
  useEffect(() => {
    axios.get(`http://localhost:8000/api/findIdEtud/${cin}`).then(response => {
      setChosenEtud(parseInt(response.data));
    })
      .catch(error => {
        console.error(error);
      });
  }, [cin]);
  const searchFor = () => {
    axios.get(`http://localhost:8000/api/validerResident/${cin}`).then(response => {
      setEtudiantData(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }

  const lastOperation = () => {
    axios.get(`http://localhost:8000/api/validerInscreption/${chosenRoom}/${chosenEtud}`).then(() => {
      Swal.fire({
        icon: "success",
        text: etudiantData[0].nom + " " + etudiantData[0].prenom + " est maintenant une membre de la famille CURA, BIENVENUE"
      })
      setEtudiantData(null);

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
            <small>Home / Dashboard</small>
          </div>

          <div class="page-content">
            <div className="h2 text-center my-3 text-danger">Affecter une chambre à l'étudiante : </div>
            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={(e) => setCin(e.target.value)} />
            <datalist id="datalistOptions">
              {
                listP.map(e => {
                  return (
                    <option key={e.id} value={e.cin}>{e.nom} {e.prenom} CIN : {e.cin}</option>
                  )
                })
              }
            </datalist>
            <button onClick={searchFor} className="btn btn-primary btn-outline-dark mx-auto d-block mt-3 w-25"> Rechercher</button>

            <div>
              {etudiantData === null && <>
                <div className="vide">
                  Entrez le CIN de l'étudiant pour vérifier qu'il existe dans la list principale
                </div>
              </>}
              {etudiantData !== null && (
                <div className='table-responsive'>
                  {
                    etudiantData.map((etud) => {
                      return (
                        <div className="etudWrapper container" key={etud.id}>
                          <div className="row justify-content-around">
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">Nom</span>
                              <span className="form-control etudData">{etud.nom}</span>
                            </div>
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">Prenom</span>
                              <span className="form-control etudData">{etud.prenom}</span>
                            </div>
                          </div>
                          <div className="row justify-content-around">
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">CIN</span>
                              <span className="form-control etudData">{etud.cin}</span>
                            </div>
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">Date de Naissace</span>
                              <span className="form-control etudData">{etud.dateNaissance}</span>
                            </div>
                          </div>
                          <div className="row justify-content-around">
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">Province</span>
                              <span className="form-control etudData">{etud.provinceParents}</span>
                            </div>
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">Etablissement</span>
                              <span className="form-control etudData">{etud.etablissement}</span>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setChosenRoom(e.target.value)}>
                              <option selected>Choisir une salle disponible</option>
                              {
                                rooms.map(room => {
                                  return (
                                    <option key={room.id} value={room.id}>
                                      code de la salle :{room.codeChambre} ||
                                      Capacité totale : {room.totalCapacity}  ||
                                      Place Disponible : {room.placesLeft}
                                    </option>
                                  )
                                })
                              }
                            </select>


                          </div>
                          <div className="row justify-content-center">
                            <button className="btn btn-primary col-3" onClick={lastOperation}> Confirmer l'inscreption</button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )}
            </div>
          </div>
        </main>
      </div >
    </>
  )
}

export default ValiderLog;

