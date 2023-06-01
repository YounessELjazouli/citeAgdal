import React, { useState, useEffect } from 'react';
import "../css/contact.css";
import NavBar from './NavBar'
import Footer from './Footer';
import TypeWriter from 'typewriter-effect'
import Swal from 'sweetalert2';
import axios from 'axios';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (event) => {
        try {
            await axios.post('http://localhost:8000/api/contacts', {
                name: name,
                email: email,
                message: message,
            }).then((response) => {
                setResponse(response.data.message);
            }).then(() => {
                Swal.fire({
                    text: response,
                    timer: 2000,
                })
            })



        } catch (error) {
            Swal.fire({
                text: error,
                timer: 2000
            })
        }
    }
    return (
        <>
            <NavBar />
            <div className="text-center text-light bg-dark h1">
                <TypeWriter options={{
                    autoStart: true,
                    loop: true,
                    delay: 300,
                    strings: ["Contactez Nous"]
                }} />
            </div>
            <div class="contact contact-container">
                <form>
                    <div class="form">
                        <div class="form-txt">
                            <h1>Contact Us</h1>
                            <span>As you might expect of a company that began as a high-end interiors contractor, we pay strict
                                attention.</span>
                            <h3>USA</h3>
                            <p>195 E Parker Square Dr, Parker, CO 801<br />+43 982-314-0958</p>
                            <h3>India</h3>
                            <p>HW95+C9C, Mhada Colony, Viman Nagar, Pune, Maharashtra<br />411014</p>
                        </div>
                        <div class="form-details">
                                <input type="text" onChange={(e) => { setName(e.target.value) }} name="name" id="name" placeholder="Name" required />
                                <input type="email" onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" placeholder="Email" required />
                                <textarea name="message" onChange={(e) => { setMessage(e.target.value) }} id="message" cols="59" rows="7" placeholder="Message" required></textarea>
                                <button onClick={handleSubmit}>SEND MESSAGE</button>
                            
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>

    )
}

export default Contact