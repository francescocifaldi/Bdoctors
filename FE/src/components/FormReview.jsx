import { useState } from "react";
import axios from "axios";

const initialFormData = {
    vote: 1,
    first_name: "",
    last_name: "",
    email: "",
    review: "",
};

export default function FormReview({ slug, fetchDoctor, onClose }) {
    const [formData, setFormData] = useState(initialFormData);
    const [isFormValid, setIsFormValid] = useState(true);

    function onFormChange(e) {
        const { value, name } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function storeReview(e) {
        e.preventDefault();
        setIsFormValid(true);

        if (
            !formData.first_name.trim() ||
            !formData.last_name.trim() ||
            !formData.email.trim() ||
            !formData.review.trim() ||
            formData.vote < 1 ||
            formData.vote > 5
        ) {
            setIsFormValid(false);
            return;
        }

        axios
            .post(`${import.meta.env.VITE_ENV_URI}/api/doctors/${slug}/review`, formData)
            .then(res => {
                console.log(res);
                setFormData(initialFormData);
                fetchDoctor(); // Aggiorna il dottore dopo la recensione
                onClose(); // Chiude il modale
            })
            .catch(err => {
                console.error(err);
                setIsFormValid(false);
            });
    }

    return (
        <div className='p-4'>
            <form className='form-review' onSubmit={storeReview}>
                <p>
                    <label htmlFor="first_name">Nome</label>
                    <input
                        minLength={3}
                        required
                        type="text"
                        placeholder='Scrivi il tuo nome...'
                        name='first_name'
                        id='first_name'
                        value={formData.first_name}
                        onChange={onFormChange}
                    />
                </p>
                <p>
                    <label htmlFor="last_name">Cognome</label>
                    <input
                        minLength={3}
                        required
                        type="text"
                        placeholder='Scrivi il tuo cognome...'
                        name='last_name'
                        id='last_name'
                        value={formData.last_name}
                        onChange={onFormChange}
                    />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        type="email"
                        placeholder='Scrivi la tua email...'
                        name='email'
                        id='email'
                        value={formData.email}
                        onChange={onFormChange}
                    />
                </p>
                <p>
                    <label htmlFor="review">Recensione</label>
                    <textarea
                        required
                        name="review"
                        id="review"
                        placeholder='Scrivi la tua recensione'
                        value={formData.review}
                        onChange={onFormChange}
                    ></textarea>
                </p>
                <p>
                    <label htmlFor="vote">Voto</label>
                    <select
                        required
                        name="vote"
                        id="vote"
                        value={formData.vote}
                        onChange={onFormChange}
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </p>
                <div>
                    {!isFormValid && <strong className="text-danger">I dati non sono validi</strong>}
                    <button type="submit">Invia</button>
                </div>
            </form>
        </div>
    );
}
