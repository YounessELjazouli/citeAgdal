import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from "./SideBar";
import Header from "../Header";
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Accounts = () => {
    const [toggleAddUser, setToggleAddUser] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [listU, setListU] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setphoto] = useState(null)
    const handleToggleAddUser = () => {
        setToggleAddUser(prevToggleAddUser => !prevToggleAddUser)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const user = {
            name: name,
            email: email,
            userType: userType,
            password: password,
            photo: photo
        };

        try {
            const response = await axios.post('http://localhost:8000/api/addUser', user);
            Swal.fire({ title: 'User added successfully!', icon: "success" });
            setName('');
            setEmail('');
            setUserType('');
            setPassword('');
            setConfirmPassword('');
            handleToggleAddUser();
        } catch (error) {
            alert('Failed to add user.');
        }

    };
    useEffect(() => {
        axios.get('http://localhost:8000/api/listUsers').then(response => {
            setListU(response.data.listUsers);
        })
    }, [])

    const updateUser = (id) => {
        alert(id)
    }
    const deleteUser = (id) => {
        alert(id)
    }

    return (
        <div>
            <SideBar />
            <div class="main-content">

                <Header />
                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Espace Directeur|Directrice / Gérer les comptes</small>
                    </div>

                    <div class="page-content">
                        {toggleAddUser ? (
                            <>
                                <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                                    <div className="w-50">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="userType" className="form-label">
                                                User Type
                                            </label>
                                            <select
                                                id="userType"
                                                name="userType"
                                                onChange={(e) => setUserType(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="cae">Chef d'affaire Etudiantes</option>
                                                <option value="aa">Assisstant(e) Administratif(e)</option>
                                                <option value="dir">Directeur/Directrice</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <Form.Group controlId="attachment" inline>
                                            <Form.Label>Photo de Profile</Form.Label>
                                            <Form.Control type="file" name="photo" onChange={(e) => setphoto(e.target.files[0])} />
                                        </Form.Group>

                                        <div className="d-flex justify-content-center mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-primary mx-2"
                                            >
                                                Ajouter l'utiisateur
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleToggleAddUser}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </>
                        ) : (
                            <>
                                <button className="btn btn-warning btn-outline-dark d-block mx-auto mt-5" onClick={handleToggleAddUser}>Clicker pour ajouter</button>
                            </>
                        )
                        }
                        <div className="responsive-table mt-5">
                            <table className="table table-bordered table-hover table-secondary text-center">
                                <thead className='thead-primary'>

                                    <tr>
                                        <th colSpan={5}>La liste des utilisateurs</th>
                                    </tr>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Fonction</th>
                                        <th>Modifier</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listU.map((user) => {
                                            return (
                                                <tr>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.typeUser === "cae" ? "Chef D'affaire Etudiantes" : user.typeUser === "aa" ? "Assisstant administrative" : "Directeur"}</td>
                                                    <td>
                                                        <button onClick={() => {updateUser(user.id)}} 
                                                            className="btn btn-warning"
                                                        >
                                                            <FontAwesomeIcon icon={solid('refresh')} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                    <button onClick={() => {deleteUser(user.id)}} 
                                                            className="btn btn-danger"
                                                        >
                                                            <FontAwesomeIcon icon={solid('trash')} />

                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}


export default Accounts

