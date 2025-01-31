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
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Contact from '../components/Contact';

export default function DetailPage() {
    const { setIsLoading, isLoading } = useContext(GlobalContext);
    const [doctor, setDoctor] = useState(null);
    const { slug } = useParams();

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
                        {doctor.reviews.length && (
                            <p>
                                <strong>Voto: </strong>
                                <span>
                                    {stars.map((star, i) => (
                                        <FontAwesomeIcon key={i} icon={star} />
                                    ))}
                                </span>
                            </p>
                        )}
                        <p>
                            <strong>Descrizione: </strong>
                        {doctor.description || <i>Nessuna descrizione inserita dal medico</i>}</p>
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
                    <h2>Aggiungi recensione</h2>
                    <FormReview slug={slug} fetchDoctor={fetchDoctor} />
                </div>
                <Contact slug={slug} doctor_email={doctor.email}/>
            </section>

        )
    );
}
