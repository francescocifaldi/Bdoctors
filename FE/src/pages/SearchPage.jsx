import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const query = searchParams.get('spec');

    function fetchDoctors(e) {


        if (e) {
            e.preventDefault();
        }

        const params = { spec: query };

        if (searchQuery) {
            params.search = searchQuery;
        }

        axios
            .get(`${import.meta.env.VITE_ENV_URI}/api/doctors/search`, {
                params,
            })
            .then((response) => {
                setDoctors(response.data.doctors);
            })
            .catch((err) => {
                console.error('Errore nel recupero dei dottori:', err);
            });
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        doctors.length?
        <>
            <Row>
                <Col md={4}>
                    <Form className='d-flex align-items-center mb-3' onSubmit={fetchDoctors}>
                        <Form.Control
                            type="text"
                            placeholder="Cerca Dottore"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            className="w-25"
                            type="submit"
                            variant="primary"
                        >
                            Invia
                        </Button>
                    </Form>
                </Col>

            </Row>

            <Row className="row-gap-3 mb-5">
                {doctors.map((doctor) => (
                    <Col lg={3} md={6} key={doctor.id}>
                        <Link to={`/doctor/${doctor.id}`}>
                            <DoctorCard doctor={doctor}></DoctorCard>
                        </Link>
                    </Col>
                ))}
            </Row>

       
        </>
        : 
        <div className="container text-light text-center">
            <h1>Pagina non trovata!</h1>
            
                <p>La ricerca non ha prodotto risultati. <br />
                   Prova a cercare un altro dottore o una specializzazione diversa.
                </p>  
              
        </div>
          
    );
}
