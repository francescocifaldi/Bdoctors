import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function RegisterPage() {
  const [isFormVAlid, setIsFormValid] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [file, setFile] = useState(null);

  const initialFormData = {
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    spec: "",
    description: "",
  };

  useEffect(() => {
    if (isRegistered || isFormVAlid === true) {
      const timer = setTimeout(() => {
        setIsRegistered(false);
        setIsFormValid(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRegistered, isFormVAlid]);

  const [formData, setFormData] = useState(initialFormData);

  function storeDoctor(e) {
    e.preventDefault();
    setIsFormValid(true);
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone ||
      !formData.spec ||
      formData.first_name < 3 ||
      formData.last_name < 3
    ) {
      setIsFormValid(true);
      return;
    } else {
      setIsRegistered(true);
    }
    console.log("form valid:", isFormVAlid, "isRegistered:", isRegistered);
    const formDataFull = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataFull.append(key, formData[key]);
    });
    formDataFull.append("file", file);

    axios
      .post(
        `${import.meta.env.VITE_ENV_URI}/api/doctors/register`,
        formDataFull,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.error(err);
        setIsFormValid(true);
        setIsRegistered(false);
      });
  }
  function onFormChange(e) {
    const { value, name } = e.target;
    console.log("change:", value, name);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <section className="container d-flex justify-content-center animate">
      <Row>
        <Form as={Col} className="text-light" onSubmit={storeDoctor}>
          <Row className="mb-2">
            <Form.Group className="mb-2" sm={6} as={Col}>
              <Form.Label htmlFor="first_name">Nome</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                minLength={3}
                required
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                placeholder="Nome"
                onChange={onFormChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label htmlFor="last_name">Cognome</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                minLength={3}
                required
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                placeholder="Cognome"
                onChange={onFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col}>
              <Form.Label htmlFor="address">Indirizzo</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                type="text"
                required
                id="address"
                name="address"
                value={formData.address}
                placeholder="Indirizzo"
                onChange={onFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group className="mb-2" sm={6} as={Col}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                type="email"
                required
                id="email"
                name="email"
                value={formData.email}
                placeholder="email"
                onChange={onFormChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="phone">Telefono</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                type="tel"
                required
                pattern="^\+?\d{9,14}$"
                id="phone"
                name="phone"
                value={formData.phone}
                placeholder="Telefono"
                onChange={onFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="spec">Specializzazione</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                type="text"
                required
                id="spec"
                name="spec"
                value={formData.spec}
                placeholder="Specializzazione"
                onChange={onFormChange}
              />

              <Form.Label htmlFor="description">Descrizione</Form.Label>
              <Form.Control
                className="form-control custom-form-control"
                type="textarea"
                id="description"
                name="description"
                value={formData.description}
                placeholder="Descrizione"
                onChange={onFormChange}
              />
              <div>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    className="btn btn-primary mt-3"
                    variant="primary"
                    onClick={(e) => storeDoctor(e)}
                  >
                    Registrati
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <div className="mt-5 animate">
              {isRegistered === true && (
                <div className="alert alert-success ">
                  Registrazione avvenuta con successo!
                </div>
              )}
              {!isRegistered && isFormVAlid === true && (
                <div className="alert alert-danger">I dati non sono validi</div>
              )}
            </div>
          </Row>
        </Form>
      </Row>
    </section>
  );
}
