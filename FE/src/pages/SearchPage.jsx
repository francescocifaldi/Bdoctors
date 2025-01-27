import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const query = searchParams.get('spec');

    useEffect(() => {
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
    }, [query, searchQuery]);

    return (
        doctors.length?
        <>
            <Row>
                <Col md={4}>
                    <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Cerca Dottore"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
        <h1 className="text-center text-bg-danger">Non ci sono dottori</h1>
    );
}
