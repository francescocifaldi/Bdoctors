import Card from "react-bootstrap/Card";

export default function DoctorCard({ doctor }) {
  const { last_name, first_name, spec } = doctor;

  return (
    <div className="">
      <Card className="h-100 cardD">
        <Card.Header className="p-0">
          <Card.Img variant="top" src="../doctor.jpg" className="img-fluid" />
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center">{`${first_name} ${last_name}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            {spec}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}
