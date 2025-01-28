import { useState } from "react";
import axios from "axios";

const initialFormData = {
    vote: 1,
    first_name: "",
    last_name: "",
    email: "",
    review: "",
};
export default function FormReview({ id, fetchDoctor }) {
    const [formData, setFormData] = useState(initialFormData);
    const [isFormVAlid, setIsFormValid] = useState(true);

    function onFormChange(e) {
        const { value, name } = e.target;
        console.log(value, name);

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function storeReview(e) {
        e.preventDefault();
        setIsFormValid(true);

        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.email ||
            !formData.review ||
            !formData.vote ||
            formData.vote < 1 ||
            formData.vote > 5
        ) {
            setIsFormValid(false);
            return;
        }

        axios.post(`${import.meta.env.VITE_ENV_URI}/api/doctors/${id}/review`, formData)
            .then(res => {
                console.log(res)
                setFormData(initialFormData)
                fetchDoctor()
            }).catch(err => {
                console.log(err)
                setIsFormValid(false)

            })
    }
    return (
        <div>

            <div className='p-4'>
                <form className='form-review' onSubmit={storeReview}>
                    <p>
                        <label htmlFor="first_name">Nome</label>
                        <input minLength={3} required type="text" placeholder='Scrivi il tuo nome...' name='first_name' id='first_name' value={formData.first_name} onChange={onFormChange} />
                    </p>
                    <p>
                        <label htmlFor="last_name">Cognome</label>
                        <input minLength={3} required type="text" placeholder='Scrivi il tuo cognome...' name='last_name' id='last_name' value={formData.last_name} onChange={onFormChange} />
                    </p>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input required type="email" placeholder='Scrivi la tua email...' name='email' id='email' value={formData.email} onChange={onFormChange} />
                    </p>
                    <p>
                        <label htmlFor="review">Recensione</label>
                        <textarea name="review" id="review" placeholder='Scrivi la tua recensione' value={formData.review} onChange={onFormChange}></textarea>
                    </p>
                    <p>
                        <label htmlFor="vote">Voto</label>
                        <select required name="vote" id="vote" value={formData.vote} onChange={onFormChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                    <div>
                        {isFormVAlid === false && <strong>I dati non sono validi</strong>}
                        <button>Invia</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
