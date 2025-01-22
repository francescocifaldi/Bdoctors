import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function HomePage() {
    const [doctors, setDoctors] = useState([]);
    function fetchDoctors() {
        axios
            .get(`${import.meta.env.VITE_ENV_URI}/api/doctors`)
            .then((res) => {
                setDoctors(res.data.doctors);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    console.log(doctors);

    return (
        <Row>
            {doctors.map((doctor, i) => (
                <Col key={i}>
                    <Link to={`/doctor/${doctor.id}`}>
                        <DoctorCard doctor={doctor}></DoctorCard>
                    </Link>
                </Col>
            ))}
        </Row>
    );
}
