import React from "react";
import { useContext, useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    spec: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  function storeDoctor(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/doctors`, formData)
      .then((res) => {
        console.log(res);
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function onFormChange(e) {
    const { value, name } = e.target;
    console.log("change:", value, name);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <form onSubmit={storeDoctor}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            placeholder="Nome"
            onChange={onFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Cognome
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            placeholder="Cognome"
            onChange={onFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Indirizzo
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            placeholder="Indirizzo"
            onChange={onFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            placeholder="email"
            onChange={onFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Telefono
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            placeholder="Telefono"
            onChange={onFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="spec" className="form-label">
            Specializzazione
          </label>
          <input
            type="text"
            className="form-control"
            id="spec"
            name="spec"
            value={formData.spec}
            placeholder="Specializzazione"
            onChange={onFormChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </>
  );
}
