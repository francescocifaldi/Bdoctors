import React from 'react';
import Card from 'react-bootstrap/Card';

export default function DoctorCard({ doctor }) {
    const { last_name, first_name, spec } = doctor;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{`${first_name} ${last_name}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {spec}
                </Card.Subtitle>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officiis eligendi doloremque, autem adipisci tenetur aut
                    esse maxime ducimus consequatur consectetur.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
