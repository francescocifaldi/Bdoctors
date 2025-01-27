import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import DoctorCard from '../components/DoctorCard';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchParams] = useSearchParams()

    const query = searchParams.get('spec');
    console.log(query)
    
    useEffect(() => {


            axios.get(`${import.meta.env.VITE_ENV_URI}/api/doctors/search`, {
                params: { spec: query }
            })
            .then(res => {
                setDoctors(res.data.doctors);
            })
            .catch(err => {
                console.error(err);

            });

    }, [query]);

    // function fetchDoctors() {
    //     axios
    //         .get(`${import.meta.env.VITE_ENV_URI}/api/doctors`)
    //         .then((res) => {
    //             setDoctors(res.data.doctors);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }

    // useEffect(() => {
    //     fetchDoctors();
    // }, []);

    // useEffect(() => {
    //     const uniqueSpecializations = [];
    //     doctors.forEach((doctor) => {
    //         if (!uniqueSpecializations.includes(doctor.spec)) {
    //             uniqueSpecializations.push(doctor.spec);
    //         }
    //     });
    //     setSpecialization(uniqueSpecializations);

    //     setFilteredDoctors(doctors);
    // }, [doctors]);

    // function handleChange(e) {
    //     const { value } = e.target;
    //     console.log('change:', value);

    //     if (value === 'None') {
    //         setFilteredDoctors(doctors);
    //     } else {
    //         setFilteredDoctors(
    //             doctors.filter((doctor) => doctor.spec === value)
    //         );
    //     }
    // }

    // console.log(filteredDoctors);
    // console.log(doctors);
    // console.log(specialization);

    return (
        <>
            {/* <label htmlFor="specialization">Filter by specialization</label>
            <select onChange={handleChange} id="specialization">
                <option value={'None'}>None</option>
                {specialization.map((spec, i) => (
                    <option key={i} value={spec}>
                        {spec}
                    </option>
                ))}
            </select> */}
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
