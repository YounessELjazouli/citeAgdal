import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "./Header";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ChangeRoom = () => {
  const [listR, setListR] = useState([]);
  const [cin, setCin] = useState("");
  const [etudiantData, setEtudiantData] = useState(null);
  const [chosenEtud, setChosenEtud] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [chosenRoom, setChosenRoom] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listRall1`).then(response => {
      setListR(response.data);
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

  const searchFor = () => {
    axios.get(`http://localhost:8000/api/getResidentData/${cin}`).then(response => {
      setEtudiantData(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/findIdREtud/${cin}`).then(response => {
      setChosenEtud(parseInt(response.data));
    })
      .catch(error => {
        console.error(error);
      });
  }, [cin]);

  function changeRoom() {
    axios.get(`http://localhost:8000/api/changerChambre/${chosenRoom}/${chosenEtud}`).then(() => {
      Swal.fire({
        icon: "success",
        text: etudiantData[0].nom + " " + etudiantData[0].prenom + " a changer la chambre"
      })
      setEtudiantData(null);

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
            <small>Home / Dashboard</small>
          </div>

          <div class="page-content">
            <div className="h2 text-center my-3 text-danger">Changer la  chambre de l'étudiante : </div>

            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={(e) => setCin(e.target.value)} />
            <datalist id="datalistOptions">
              {
                listR.map(e => {
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
                  Entrez le CIN de l'étudiant vous souhaitez supprimer
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
                            <div className="sousEtudWrapper col-3 input-group mb-3">
                              <span className="input-group-text etudLabel">Chambre Actuelle</span>
                              <span className="form-control etudData">{etud.codeChambre}</span>
                            </div>

                            <div className="sousEtudWrapper col-8 input-group mb-3">
                              <span className="input-group-text etudLabel" >nouvelle Chambre</span>
                              <select className="form-control etudData" style={{ width: "100% !important" }} onChange={(e) => setChosenRoom(e.target.value)}>
                                <option selected>Choisir une  nouvelle chambre disponible</option>
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
                          </div>


                          <div className="row justify-content-center">
                            <button className="btn btn-primary col-3" onClick={changeRoom}> Confirmer le changement de chambre</button>
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
      </div>
    </>
  )

}

export default ChangeRoom