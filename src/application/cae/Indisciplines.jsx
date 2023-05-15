import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Header from './Header';
import SideBar from './SideBar';

function Indisciplines() {
  const [listR, setListR] = useState([]);
  const [listV, setListV] = useState([]);
  const [listP, setListP] = useState([]);
  const [idListR, setIdListR] = useState([]);
  const [listD, setListD] = useState([]);
  const [idListV, setIdListV] = useState([]);
  const [idListP, setIdListP] = useState([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listV`).then(response => {
      setListV(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [showList]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listRall`).then(response => {
      setListR(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [showList]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listPu`).then(response => {
      setListP(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [showList]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listD`).then(response => {
      setListD(response.data);
    })
      .catch(error => {
        console.error(error);
      });
  }, [showList]);

  const saveViolation = async () => {
    const response = await axios.post('http://localhost:8000/api/listD', {
      idR: idListR,
      idV: idListV,
      idP: idListP
    }).then(({ data }) => {
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          text: data.success
        })
      } else if (response.data.failed) {
        Swal.fire({
          icon: "success",
          text: data.failed
        })
      }
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
            <div className="container my-5">
              <div className="row g-4 justify-content-between my-5">
                <div className="col-lg-5 col-md-6 wow fadeIn styleBox" data-wow-delay="3s">
                  <div className="fact-item bg-light rounded text-center h-100 p-5" onClick={() => setShowList(true)}>
                    <i className="fa fa-certificate fa-4x text-primary mb-4 text-light"></i>
                    <p className="mb-2 h1 text-center text-danger">Afficher l'historique disciplinaire des résendents : </p>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 wow fadeIn styleBox" data-wow-delay="0.3s">
                  <div className="fact-item bg-light rounded text-center h-100 p-5 " onClick={() => setShowList(false)}>
                    <i className="fa fa-users text-light fa-4x text-primary mb-4"></i>
                    <p className="mb-2 h1 text-center text-danger">Déclarer une nouvelle situation d'indiscipline : </p>
                  </div>
                </div>
              </div>
              <div className="row" style={{ display: showList ? "block" : "none" }}>
                {
                  listD.length < 1 ?
                    <>
                      Section Vide
                    </> :
                    <>
                      <div className='table-responsive'>
                        <table className='table table-light table-striped table-bordered table-hover text-center' style={{ fontSize: "1.1rem" }}>
                          <thead>
                            <tr>
                              <th scope='col'>Nom Complet</th>
                              <th scope='col'>CIN</th>
                              <th scope='col'>Chambre</th>
                              <th scope='col'>Date de violation</th>
                              <th scope='col'>Type de violation</th>
                              <th scope='col'>Punition</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listD.map((des) => {
                              return (
                                <tr key={des.id}>
                                  <td>{des.nom} {des.prenom}</td>
                                  <td>{des.cin}</td>
                                  <td>{des.codeChambre}</td>
                                  <td>{des.dateV}</td>
                                  <td>{des.typeViolation}</td>
                                  <td>{des.nomP}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                }
              </div>

              <div className="row" style={{ display: showList ? "none" : "block" }}>

                <p className="h5 w-50 mx-auto d-block my-3 rapport">
                  L'étudiante <select name="resident" id="resident" onClick={(e) => { setIdListR(e.target.value) }}>{listR.map((r) => { return (<option key={r.id} value={r.id}>{r.nom} {r.prenom}</option>) })} </select> a enfreint les régles de la résidence universitaire en <select name="violation" id="violation" onClick={(e) => { setIdListV(e.target.value) }}>{listV.map((v) => { return (<option key={v.id} value={v.id}>{v.typeViolation}</option>) })}</select>, et  par conséquent, l'administration a décider de <select name="punition" id="punition" onClick={(e) => { setIdListP(e.target.value) }}>{listP.map((p) => { return (<option key={p.id} value={p.id}>{p.nomP}</option>) })}</select>

                  <button className="btn btn-primary d-block w-50 mx-auto mt-5" onClick={saveViolation}>Enregistrer le rapport</button>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>

  )
}

export default Indisciplines