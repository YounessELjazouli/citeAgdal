import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
import StatsSections from "../aa/StatsSections";
import SideBar from "./SideBar";
import Header from "../Header";

const DirAccueil = () => {

    return (
        <>
            <SideBar />
            <div class="main-content">
                <Header />

                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Espace Directeur|Directrice / Accueil</small>
                    </div>

                    <div class="page-content">
                        <StatsSections />


                    </div>
                </main>
            </div>
        </>
    )
}

export default DirAccueil

