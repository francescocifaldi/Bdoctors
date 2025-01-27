import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col } from 'react-bootstrap';
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


        axios.get(`${import.meta.env.VITE_ENV_URI}/api/doctors/search`, { params })
            .then((response) => {
                setDoctors(response.data.doctors);
            })
            .catch((err) => {
                console.error("Errore nel recupero dei dottori:", err);
            })


    }, [query, searchQuery]);





    return (
        <>

            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Row>
                {doctors.map((doctor) => (
                    <Col key={doctor.id}>
                        <Link to={`/doctor/${doctor.id}`}>
                            <DoctorCard doctor={doctor}></DoctorCard>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}
