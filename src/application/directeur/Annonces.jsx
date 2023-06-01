import "../../css/dashboard.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button } from 'react-bootstrap';
import SideBar from "./SideBar";
import Header from "../Header";

const Annonces = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [dateOfAnnouncement, setDateOfAnnouncement] = useState('');
    const [dateExpired, setDateExpired] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('attachment', attachment);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('dateOfAnnouncement', dateOfAnnouncement);
        formData.append('dateExpired', dateExpired);

        await axios.post('http://localhost:8000/api/postAnnonce', formData)
            .then(response => {
                const url = response.data.url;
                // Do something with the URL, such as displaying the uploaded file in your component

            })
            .catch(error => {
                console.error(error);
            });
    };

    return (

        <div>
            <SideBar />
            <div class="main-content">

                <Header />
                <main>

                    <div class="page-header">
                        <h1>Dashboard</h1>
                        <small>Espace Directeur|Directrice / Publier les annonces</small>
                    </div>

                    <div class="page-content">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="title" inline>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} name="titre" onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="body" inline>
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" rows={5} name="body" value={body} onChange={(e) => setBody(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="attachment" inline>
                                <Form.Label>Attachment</Form.Label>
                                <Form.Control type="file" name="attachement" onChange={(e) => setAttachment(e.target.files[0])} />
                            </Form.Group>

                            <Form.Group controlId="dateOfAnnouncement" inline>
                                <Form.Label>Date D'annoncement</Form.Label>
                                <Form.Control type="date" name="datePub" value={dateOfAnnouncement} onChange={(e) => setDateOfAnnouncement(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="dateExpired" inline>
                                <Form.Label>Date D'expiration Annonces</Form.Label>
                                <Form.Control type="date" name="dateExpire" value={dateExpired} onChange={(e) => setDateExpired(e.target.value)} />
                            </Form.Group>

                            <Button type="submit">Publier L'annonce</Button>
                        </Form>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Annonces

