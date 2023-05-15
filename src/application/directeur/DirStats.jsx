import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import SideBar from "./SideBar";

const DirStats = () => {
    const [data, setData] = useState([]);
    const [cycleEtudedata, setCycleEtudedata] = useState([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF0000'];

    useEffect(() => {
        axios.get("http://localhost:8000/api/cityRes").then((response) => {
            setData(response.data.data);
            console.log(response.data.data);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/cycleEtudes").then((response) => {
            setCycleEtudedata(response.data.data);
            console.log(response.data.data);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <SideBar />
            <div class="main-content">

                <Header />
                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Home / Dashboard</small>
                    </div>

                    <div class="page-content">
                        <div className="graph-container row">
                            <div className="h1 text-center mt-3 text-danger">Régions : </div>
                            {data.map((item, index) => (
                                <div key={index} className="graph col-sm-6">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={item}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="provinceParents" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="number_of_res" fill="#8884d8" />
                                    </BarChart>
                                </div>
                            ))}
                            <div className="h1 text-center mt-3 text-danger">Cycle d'etudes : </div>
                            <div className="row">
                                {Object.entries(cycleEtudedata).map(([key, childData], index) => (
                                    <div key={index} className="graph col-sm-3">
                                        <PieChart width={280} height={300}>
                                            <Pie data={childData} dataKey="number_of_resd" nameKey="cycleEtudes" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                                                {childData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                        <h3 className="text-center">{key}</h3>

                                    </div>
                                ))}
                            </div>

                        </div>


                    </div>
                </main>
            </div>
        </div>
    )
}

export default DirStats