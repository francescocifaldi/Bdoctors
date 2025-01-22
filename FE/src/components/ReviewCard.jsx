import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'


export default function ReviewCard({ reviews }) {

    const { first_name, last_name, vote, email, review } = reviews

    const stars = []

    for (let i = 0; i < 5; i++) {
        if (i < vote) {
            stars.push(faStarSolid)
        } else {
            stars.push(faStarRegular)
        }

    }

    return (
        <div>
            <p>Nome: {first_name}</p>
            <p>Cognome: {last_name}</p>
            <p>Email: {email}</p>
            <p>Recensione: {review}</p>
            <p>Voto:
                <span>
                    {stars.map((star, i) => (
                        <FontAwesomeIcon key={i} icon={star} />
                    ))}
                </span>
            </p>

        </div>
    )
}