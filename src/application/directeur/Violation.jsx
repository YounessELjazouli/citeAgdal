import React , {useState} from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';

function Violation() {
    const [typeViolation, setTypeViolation] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const newViolation = { typeViolation };
        axios
            .post("http://localhost:8000/api/listV", newViolation)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    text: response.data.message
                });
                setTypeViolation('');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="typeViolation">
                    <Form.Label>Type de Violation</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Saisie le type of violation"
                        value={typeViolation}
                        onChange={(e) => setTypeViolation(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-5 mx-auto d-block'>
                    Enregistrer
                </Button>
            </Form>
        </div>
    )
}

export default Violation