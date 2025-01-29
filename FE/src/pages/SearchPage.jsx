import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';

export default function SearchPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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

    function resetSearch(){
        setSearchQuery('')
        navigate(`/doctor/search`)
    }

    useEffect(() => {
        fetchDoctors();
    }, [query]);

    return (
        <>
            <Row>
                <Col md={4}>
                    <Form
                        className="d-flex align-items-center mb-3"
                        onSubmit={fetchDoctors}
                    >
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
                    <Button
                            className="w-25"
                            type="submit"
                            variant="primary"
                            onClick={() => resetSearch()}
                        >
                            Azzera filtri
                        </Button>
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
    );
}
