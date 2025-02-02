import Card from "react-bootstrap/Card";

export default function DoctorCard({ doctor }) {
  const { last_name, first_name, spec, image } = doctor;

  return (
    <div className="">
      <Card className="h-100 cardD">
        <Card.Header className="p-0 d-flex justify-content-center align-items-center">
          <Card.Img
            variant="top"
            src={
              image
                ? `${import.meta.env.VITE_ENV_URI}/uploads/img/${doctor.image}`
                : `${import.meta.env.VITE_ENV_URI}/img/doctorplaceholder.png`
            }
            alt={`${doctor.first_name} ${doctor.last_name} profile`}
            className="img-fluid object-fit-contain"
            style={{ height: "250px" }}
          />
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
