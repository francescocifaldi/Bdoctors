import { useState } from 'react';
import axios from 'axios';

export default function ContactForm({ slug, doctor_email, onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const defaultText = "Grazie per aver contattato il medico tramite il nostro servizio, ti risponderà al più presto";

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('Invio in corso...');

    try {
      // Invio email al dottore
      const response = await axios.post(`${import.meta.env.VITE_ENV_URI}/api/doctors/${slug}/contact`, {
        from: email,
        to: doctor_email,
        subject: "Richiesta di contatto",
        text: message,
        html: `<p>${message}</p>`,
      });

      if (response.data.success) {
        setStatus('Email inviata con successo!');

        // Invia email di conferma all'utente
        await axios.post(`${import.meta.env.VITE_ENV_URI}/api/doctors/${slug}/contact`, {
          from: "bdoctors@customers.it",
          to: email,
          subject: "Conferma contatto",
          text: defaultText,
          html: `<p>${defaultText}</p>`,
        });

        // Chiude il modale dopo l'invio
        onClose();
      } else {
        setStatus(`Errore: ${response.data.error}`);
      }
    } catch (error) {
      setStatus(`Errore: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Contatta il medico</h2>
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
      {status && <p>{status}</p>}
    </div>
  );
}
