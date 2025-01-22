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
        console.err(err);
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
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Nome"
            onChange={onFormChange}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
}
