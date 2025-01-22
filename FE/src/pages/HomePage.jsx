import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { Link } from "react-router";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState([]);

  function fetchDoctors() {
    axios
      .get(`${import.meta.env.VITE_ENV_URI}/api/doctors`)
      .then((res) => {
        setDoctors(res.data.doctors);
        fillSpecializationArray();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function fillSpecializationArray() {
    let specializationArray = [];

    specializationArray = doctors.map((doctor) => {
      if (!specializationArray.includes(doctor.spec))
        specializationArray.push(doctor.spec);
      setSpecialization(specializationArray);
    });
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  // console.log(doctors);
  console.log(specialization);

  return (
    <>
      <label htmlFor="specialization">Filter by specialization</label>
      <select id="specialization">
        {specialization.map((spec, i) => (
          <option key={i} value={spec}>
            {spec}
          </option>
        ))}
      </select>
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
