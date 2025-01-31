import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import DoctorCard from "../components/DoctorCard";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchSpec, setSearchSpec] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [vote, setVote] = useState("");

  // Fetch doctors based on filters in URL
  const fetchDoctors = (params = {}) => {
    axios
      .get(`${import.meta.env.VITE_ENV_URI}/api/doctors/search`, {
        params,
      })
      .then((response) => {
        setDoctors(response.data.doctors);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei dottori:", err);
      });
  };

  // Read parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let spec = params.get("spec") || "";
    const name = params.get("first_name") || "";
    const lastName = params.get("last_name") || "";
    const vote = params.get("vote") || "";

    // Sostituire i trattini con gli spazi per il parametro 'spec'
    if (spec) {
      spec = spec.replace(/-/g, " "); // sostituisce i trattini con spazi
    }

    setSearchSpec(spec);
    setSearchName(name);
    setSearchLastName(lastName);
    setVote(vote);

    // Recupera i medici in base ai parametri
    fetchDoctors({
      searchSpec: spec,
      searchName: name,
      searchLastName: lastName,
      vote: vote,
    });
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Sostituiamo gli spazi con trattini per la specializzazione
    if (searchSpec) params.set("spec", searchSpec.replace(/\s+/g, "-"));

    if (searchName) params.set("first_name", searchName);
    if (searchLastName) params.set("last_name", searchLastName);
    if (vote) params.set("vote", vote);

    // Naviga con i parametri aggiornati nella query string
    navigate(`/doctor/search?${params.toString()}`);
  };

  const resetSearch = () => {
    setSearchSpec("");
    setSearchName("");
    setSearchLastName("");
    setVote("");
    fetchDoctors();
    navigate("/doctor/search");
  };

  const specializations = [];
  doctors.forEach((doctor) => {
    if (!specializations.includes(doctor.spec)) {
      specializations.push(doctor.spec);
    }
  });

  return (
    <>
      <div className="container animate">
        <Row>
          <Col>
            <Form className="d-flex gap-5 filterBar " onSubmit={handleSubmit}>
              <Form.Control
                as="select"
                value={searchSpec}
                onChange={(e) => setSearchSpec(e.target.value)}
                className="form-select border-0 outline-0 searchSelect "
                style={{ boxShadow: "none" }}
              >
                <option value="">Seleziona Specializzazione</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                as="select"
                value={vote}
                onChange={(e) => setVote(e.target.value)}
                className="border-0 form-select outline-0 searchSelect"
                style={{ boxShadow: "none" }}
              >
                <option value="">Voto Minimo</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
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
                className="form-control"
              />
              <div className="d-flex gap-2">
                <Button
                  className="w-50 btn btn-primary SearchBtn"
                  type="submit"
                  variant="primary"
                >
                  Invia
                </Button>
                <Button
                  className="w-50 btn btn-secondary SearchBtn"
                  variant="secondary"
                  onClick={resetSearch}
                  type="button"
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <Row className="row-gap-3 mb-5">
          {doctors.map((doctor) => (
            <Col lg={3} md={6} key={doctor.id}>
              <Link to={`/doctor/${doctor.slug}`}>
                <DoctorCard doctor={doctor} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
