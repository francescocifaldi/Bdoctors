import { useState } from 'react';
import axios from 'axios';

export default function Contact({ slug, doctor_email }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const defaultText = "Grazie per aver contattato il medico tramite il nostro servizio, ti risponderà al più presto";

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Invio in corso...');

    axios.post(`http://localhost:3000/api/doctors/${slug}/contact`, {
        from: email,
      to: doctor_email,
      subject: "Hello ✔",
      text: message,
      html: `<p>${message}</p>`,
    })
    .then(response => {
      if (response.data.success) {
        setStatus('Email inviata con successo!');
        axios.post(`http://localhost:3000/api/doctors/${slug}/contact`, {
            from: "bdoctors@customers.it",
          to: email,
          subject: "Benvenut*! ✔",
          text: defaultText,
          html: `<p>${defaultText}</p>`,
        })
      } else {
        setStatus(`Errore: ${response.data.error}`);
      }
    })
    .catch(error => {
      setStatus(`Errore: ${error.message}`);
    });
  };

  return (
    <div>
      <h1>Contattaci</h1>
      <form onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="Tua Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Il tuo messaggio"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Invia Email</button>
      </form>
      <p>{status}</p>
    </div>
  );
}