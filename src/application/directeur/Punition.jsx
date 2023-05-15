import React , {useState} from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';

function Punition() {
    const [nomP, setNomP] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/listPu", {
                nomP : nomP
            })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                });
                setNomP('');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="typeViolation">
                    <Form.Label>Punition</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Saisie le type of violation"
                        value={nomP}
                        onChange={(e) => setNomP(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-5 mx-auto d-block'>
                    Enregistrer
                </Button>
            </Form>
        </div>
    )
}

export default Punition