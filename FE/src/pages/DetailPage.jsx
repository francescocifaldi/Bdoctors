import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewCard from "../components/ReviewCard";



export default function DetailPage() {
    const [doctor, setDoctor] = useState(null)
    const { id } = useParams()

    function fetchDoctor() {


        axios.get(`${import.meta.env.VITE_ENV_URI}/api/doctors/${id}`)

            .then(res => {
                console.log(res.data);
                setDoctor(res.data)
            })
            .catch(err => {
                console.error(err);

            })

    }

    useEffect(() => {
        fetchDoctor()
    }, [id])









    return (
        doctor && (
            <section>
                <div>
                    <h1>{doctor.first_name} {doctor.last_name}</h1>
                    <p><strong>Indirizzo:</strong> {doctor.address}</p>
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Telefono:</strong> {doctor.phone}</p>
                    <p><strong>Specializzazione:</strong> {doctor.spec}</p>



                </div>
                <div>
                    <h2>Reviews</h2>
                    {doctor.reviews.length ?
                        <>
                            <p>voto: {parseInt(doctor.avg_vote)}</p>

                            <ul>
                                {doctor.reviews.map(review => (
                                    <ReviewCard reviews={review} key={review.id} />
                                ))}
                            </ul>
                        </> :
                        <div>Nessuna recensione</div>
                    }
                </div>
            </section>
        )
    );

}