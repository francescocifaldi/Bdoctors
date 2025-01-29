import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function SearchPage() {
    const location = useLocation();
    const [doctors, setDoctors] = useState([]);
    const [searchSpec, setSearchSpec] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchLastName, setSearchLastName] = useState('');
    const [vote, setVote] = useState('');

    const fetchDoctors = (params = {}) => {
        axios
            .get(`${import.meta.env.VITE_ENV_URI}/api/doctors/search`, {
                params,
            })
            .then((response) => {
                console.log(response.data.doctors);

                setDoctors(response.data.doctors);
            })
            .catch((err) => {
                console.error('Errore nel recupero dei dottori:', err);
            });
    };

    useEffect(() => {
        const initialSpec = location.state?.initialSpec || '';
        setSearchSpec(initialSpec);

        if (initialSpec) {
            fetchDoctors({ searchSpec: initialSpec });
        } else fetchDoctors()

    }, []);

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }

        const params = {
            searchSpec,
            searchName,
            searchLastName,
            vote
        };

        fetchDoctors(params);
    };

    const resetSearch = () => {
        setSearchSpec('');
        setSearchName('');
        setSearchLastName('');
        setVote('');
        fetchDoctors();
    };

    const navigate = useNavigate();

    return (
        <>
            <Row>
                <Col md={4}>
                    <Form
                        className="d-flex flex-column gap-2 mb-3"
                        onSubmit={handleSubmit}
                    >
                        <Form.Control
                            as="select"
                            value={searchSpec}
                            onChange={(e) => setSearchSpec(e.target.value)}
                        >
                            <option value="">Seleziona Specializzazione</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.spec}>
                                    {doctor.spec}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            value={vote}
                            onChange={(e) => setVote(e.target.value)} // Settiamo il voto medio selezionato
                        >
                            <option value="">Filtra per Voto Medio</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </Form.Control>
                        <Form.Control
                            type="text"
                            placeholder="Cerca Nome"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Cerca Cognome"
                            value={searchLastName}
                            onChange={(e) => setSearchLastName(e.target.value)}
                        />
                        <div className="d-flex gap-2">
                            <Button
                                className="w-50"
                                type="submit"
                                variant="primary"
                            >
                                Invia
                            </Button>
                            <Button
                                className="w-50"
                                variant="secondary"
                                onClick={resetSearch}
                                type="button"
                            >
                                Azzera filtri
                            </Button>
                        </div>

                    </Form>

                </Col>
            </Row>

            <Row className="row-gap-3 mb-5">
                {doctors.map((doctor) => (
                    <Col lg={3} md={6} key={doctor.id}>
                        <Link to={`/doctor/${doctor.id}`}>
                            <DoctorCard doctor={doctor} />
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}