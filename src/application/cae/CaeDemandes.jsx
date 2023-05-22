import "../../css/dashboard.css";
import React, { useEffect, useState } from "react";
import { Data } from "./Data";
import * as XLSX from "xlsx";
import axios from "axios";
import Swal from "sweetalert2";
import StatsSections from "../aa/StatsSections";
import Header from "../Header";
import SideBar from './SideBar';

const CaeDemandes = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);
  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = ["application/vnd.ms-excel"];
  //checks if the uploaded file is a valid type or not
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // load the data from exel file into an array of objects (excelData)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };
  //save excel data into our database (table demandes)
  const saveItems = async () => {
    setLoading(true);
    await axios
      .post(`http://localhost:8000/api/data`, { data: excelData })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call is completed
      });
  };

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
            <StatsSections />
            {/* upload file section */}
            <div className="form">
              <form
                className="form-group"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <label>
                  <h5>Importer votre fichier</h5>
                </label>
                <br></br>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFile}
                  required
                ></input>
                {excelFileError && (
                  <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                    {excelFileError}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-outline-dark mx-5"
                  style={{ marginTop: 15 + "px", backgroundColor: "#fa9715" }}
                >
                  Voir les données
                </button>
              </form>
            </div>

            <hr></hr>

            {/* view file section */}
            <h5>View Excel file </h5>
            <div className="viewer">
              {excelData === null && <>No file selected</>}
              {excelData !== null && (
                <div className="table-responsive">
                  <button
                    onClick={saveItems}
                    style={{ backgroundColor: "#fa9715" }}
                    className="btn btn-outline-dark mx-5"
                  >
                    Enregistrer les demandes exporter à la base de données
                  </button>
                  <table className="table table-light table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">CIN</th>
                        <th scope="col">Revenue Anuelle</th>
                        <th scope="col">Nouvelle Résident</th>
                        <th scope="col">Handicapé</th>
                        <th scope="col">Nombre Année</th>
                        <th scope="col">Province des Parents</th>
                        <th scope="col">Date Naissance</th>
                        <th scope="col">Gendre</th>
                        <th scope="col">Nationalité</th>
                        <th scope="col">Etablissment Fréquenté</th>
                        <th scope="col">Diplome préparé</th>
                        <th scope="col">Cycle d'études</th>
                        <th scope="col">Niveau d'études</th>
                        <th scope="col">code Massar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Data excelData={excelData} />
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default CaeDemandes;
