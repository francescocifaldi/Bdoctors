import React, { useContext, useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { Link } from "react-router";
import { Row, Col, Button, Form } from "react-bootstrap";
import GlobalContext from "../../contexts/globalContext";
import axios from "axios";
import { useNavigate } from "react-router";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [searchSpec, setSearchSpec] = useState("");
  const { setIsLoading, isLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  function fetchDoctors() {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_ENV_URI}/api/doctors`, {
        params: {
          home: true,
        },
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

  useEffect(() => {
    fetchDoctors();
  }, []);

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

  function searchDoctors(e) {
    e.preventDefault();
    console.log(searchSpec);
    navigate(`/doctor/search?spec=${searchSpec}`);
  }

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
      <Row className="mb-3">
        <Form onSubmit={searchDoctors}>
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Cerca specializzazione"
                value={searchSpec}
                onChange={(e) => setSearchSpec(e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Cerca
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
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
