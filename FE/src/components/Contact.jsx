import { useState } from 'react';
import axios from 'axios';

export default function Contact({ slug, doctor_email }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Invio in corso...');

    axios.post(`http://localhost:3000/api/doctors/${slug}/contact`, {
        from: email,
      to: doctor_email,
      subject: "Hello ✔",
      text: message,
      html: `<b>${message}</b>`,
    })
    .then(response => {
      if (response.data.success) {
        setStatus('Email inviata con successo!');
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