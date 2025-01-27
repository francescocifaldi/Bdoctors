import React from 'react';
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterPage() {
    const [isFormVAlid, setIsFormValid] = useState(true);

    const initialFormData = {
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        phone: '',
        spec: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    function storeDoctor(e) {
        e.preventDefault();
        setIsFormValid(true);
        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.email ||
            !formData.phone ||
            !formData.spec
        ) {
            setIsFormValid(false);
            return;
        }
        axios
            .post(`${import.meta.env.VITE_ENV_URI}/api/doctors`, formData)
            .then((res) => {
                console.log(res);
                setFormData(initialFormData);
            })
            .catch((err) => {
                console.error(err);
                setIsFormValid(false);
            });
    }
    function onFormChange(e) {
        const { value, name } = e.target;
        console.log('change:', value, name);
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <section className="container d-flex justify-content-center">
            <Row>
                <h2 className="mb-4">Registrati ora!</h2>
                <Form
                    as={Col}
                    className="border rounded p-3"
                    onSubmit={storeDoctor}
                >
                    <Row className="mb-2">
                        <Form.Group className="mb-2" sm={6} as={Col}>
                            <Form.Label htmlFor="first_name">Nome</Form.Label>
                            <Form.Control
                                minLength={3}
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
                                minLength={3}
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
                                type="text"
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
                                type="email"
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
                                type="tel"
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
                            <Form.Label htmlFor="spec">
                                Specializzazione
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="spec"
                                name="spec"
                                value={formData.spec}
                                placeholder="Specializzazione"
                                onChange={onFormChange}
                            />
                        </Form.Group>
                        {isFormVAlid === false && (
                            <strong>I dati non sono validi</strong>
                        )}
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                className="w-25"
                                type="submit"
                                variant="primary"
                            >
                                Invia
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </section>
    );
}
