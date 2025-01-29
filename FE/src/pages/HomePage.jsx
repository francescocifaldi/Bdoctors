import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col, Button, Form } from 'react-bootstrap';
import GlobalContext from '../../contexts/globalContext';
import axios from 'axios';

export default function HomePage() {
    const [doctors, setDoctors] = useState([]);
    const [searchSpec, setSearchSpec] = useState('');
    const { setIsLoading } = useContext(GlobalContext);
    const navigate = useNavigate();

    function fetchDoctors() {
        setIsLoading(true);
        axios
            .get(`${import.meta.env.VITE_ENV_URI}/api/doctors`, {

            })
            .then((res) => {
                setDoctors(res.data.doctors);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const limitDoctors = doctors.slice(0, 5);

    useEffect(() => {
        fetchDoctors();
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        navigate('/doctor/search', { state: { initialSpec: searchSpec } });
    }

    return (
        <section className="container">
            <Row className="mb-3">
                <Form onSubmit={handleSearch}>
                    <Row lg={4}>
                        <Col>
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
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                Cerca
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row className="row-gap-3" xl={5} lg={4} md={3} xs={1} sm={2}>
                {limitDoctors.map((doctor) => (
                    <Col key={doctor.id}>
                        <Link to={`/doctor/${doctor.id}`}>
                            <DoctorCard doctor={doctor} />
                        </Link>
                    </Col>
                ))}
            </Row>
        </section>
    );
}