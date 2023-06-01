import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "../Header";
import SideBar from "./SideBar";

const DeleteEtud = () => {
  const [listR, setListR] = useState([]);
  const [cin, setCin] = useState("");
  const [etudiantData, setEtudiantData] = useState(null);
  const [chosenEtud, setChosenEtud] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listRall1`).then(response => {
      setListR(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [cin]);

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
  const removeStudent = () => {
    axios.get(`http://localhost:8000/api/deleteResident/${chosenEtud}`).then(() => {
      Swal.fire({
        icon: "success",
        text: etudiantData[0].nom + " " + etudiantData[0].prenom + " N'est pas encore avec nous, Bonne chance à lui"
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
            <small>Espace Assistant(e) Administratif(e) / Départ de cité</small>
          </div>

          <div class="page-content">
            <div className="h2 text-center my-3 text-danger">Supprimer les données de l'étudiante : </div>
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
                            <div className="sousEtudWrapper col-4 input-group mb-3">
                              <span className="input-group-text etudLabel">Chambre</span>
                              <span className="form-control etudData">{etud.codeChambre}</span>
                            </div>
                          </div>


                          <div className="row justify-content-center">
                            <button className="btn btn-primary col-3" onClick={removeStudent}> Confirmer la suppression</button>
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

export default DeleteEtud;
