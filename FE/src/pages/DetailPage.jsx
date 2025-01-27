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

export default function DetailPage() {
    const { setIsLoading, isLoading } = useContext(GlobalContext);
    const [doctor, setDoctor] = useState(null);
    const { id } = useParams();

    function fetchDoctor() {
        setIsLoading(true);
        axios
            .get(`${import.meta.env.VITE_ENV_URI}/api/doctors/${id}`)

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
    }, [id]);

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

    return (
        doctor && (
            <section className="container">
                <div>
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

                    {doctor.reviews.length ? (
                        <>
                            <p>
                                <strong>voto:</strong>
                                <span>
                                    {stars.map((star, i) => (
                                        <FontAwesomeIcon key={i} icon={star} />
                                    ))}
                                </span>
                            </p>

                            <div>
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
                    <FormReview id={id} fetchDoctor={fetchDoctor} />
                </div>
            </section>
        )
    );
}
