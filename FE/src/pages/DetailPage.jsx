import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReviewCard from '../components/ReviewCard';
import FormReview from '../components/FormReview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import GlobalContext from '../../contexts/globalContext';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Contact from '../components/Contact';

export default function DetailPage() {
    const { setIsLoading, isLoading } = useContext(GlobalContext);
    const [doctor, setDoctor] = useState(null);
    const { slug } = useParams();
    const [showReview, setShowReview] = useState(false);
    const [showContact, setShowContact] = useState(false);

    function fetchDoctor() {
        setIsLoading(true);
        axios
            .get(`${import.meta.env.VITE_ENV_URI}/api/doctors/${slug}`)
            .then((res) => {
                console.log(res.data);
                setDoctor(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchDoctor();
    }, [slug]);

    const stars = [];

    if (doctor) {
        for (let i = 0; i < 5; i++) {
            if (i < doctor.avg_vote) {
                stars.push(faStarSolid);
            } else {
                stars.push(faStarRegular);
            }
        }
    }

    const navigate = useNavigate();

    return (
        doctor && (
            <section className="container">
                <div className="doctor-info">
                    <Button
                        className="w-50"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        type="button"
                    >
                        Torna indietro
                    </Button>
                    <div className="doctor-card">
                        <figure>
                            <img
                                src="https://picsum.photos/id/237/200/300"
                                alt=""
                            />
                        </figure>
                        <h1>
                            {doctor.first_name} {doctor.last_name}
                        </h1>
                        <p>
                            <strong>Indirizzo:</strong> {doctor.address}
                        </p>
                        <p>
                            <strong>Email:</strong> {doctor.email}
                        </p>
                        <p>
                            <strong>Telefono:</strong> {doctor.phone}
                        </p>
                        <p>
                            <strong>Specializzazione:</strong> {doctor.spec}
                        </p>
                        <p>
                            <strong>Descrizione: </strong>
                            {doctor.description || <i>Nessuna descrizione inserita dal medico</i>}
                        </p>
                        <p>
                            <strong>Valutazione: </strong>
                            {
                            doctor.reviews.length ? (
                                <>
                                    <span>{doctor.avg_vote}</span>
                                    <span>
                                        {stars.map((star, i) => (
                                            <FontAwesomeIcon key={i} icon={star} />
                                        ))}
                                    </span>
                                </>
                            ) : (
                                <i>Ancora nessuna valutazione</i>
                            )
                        }
                        </p>
                        
                    </div>

                    {doctor.reviews.length ? (
                        <>
                            <div className="reviews-list">
                                <h2>Recensioni</h2>
                                <ul>
                                    {doctor.reviews.map((review) => (
                                        <ReviewCard
                                            reviews={review}
                                            key={review.id}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div>Nessuna recensione</div>
                    )}
                </div>
                <div>
            {/* Bottone per aprire il Modale di Recensione */}
            <Button variant="primary" onClick={() => setShowReview(true)}>
                Aggiungi recensione
            </Button>

            {/* Modale per la Recensione */}
            <Modal show={showReview} onHide={() => setShowReview(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi recensione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormReview slug={slug} fetchDoctor={fetchDoctor} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReview(false)}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Bottone per aprire il Modale di Contatto */}
            <Button variant="success" onClick={() => setShowContact(true)} className="ms-2">
                Contatta il medico
            </Button>

            {/* Modale per il Contatto */}
            <Modal show={showContact} onHide={() => setShowContact(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Contatta il medico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Contact slug={slug} doctor_email={doctor.email} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowContact(false)}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

            </section>

        )
    );
}
