import React, { useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AddressAutocomplete = ({ onAddressSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.MAPS_API_KEY}`,
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isValidSelection, setIsValidSelection] = useState(true);
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
    latitude: "",
    longitude: "",
  });

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsValidSelection(false);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry) {
      setIsValidSelection(false);
      return;
    }

    let address = "";
    let streetNumber = "";
    let city = "";
    let state = "";
    let country = "";
    let postcode = "";

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    place.address_components.forEach((component) => {
      const type = component.types[0];
      switch (type) {
        case "route":
          address = component.long_name;
          break;
        case "street_number":
          streetNumber = component.long_name; // Aggiungi il numero civico dopo il nome della via
          break;
        case "locality":
          city = component.long_name;
          break;
        case "administrative_area_level_1":
          state = component.short_name;
          break;
        case "country":
          country = component.long_name;
          break;
        case "postal_code":
          postcode = component.long_name;
          break;
        default:
          break;
      }
    });

    address = `${address}, ${streetNumber}`;

    const newAddressData = {
      address,
      city,
      state,
      country,
      postcode,
      latitude: lat /*.toFixed(6)*/,
      longitude: lng /*.toFixed(6)*/,
    };

    setAddressData(newAddressData);
    setInputValue(place.formatted_address);
    setIsValidSelection(true);

    if (onAddressSelect) {
      onAddressSelect(newAddressData);
    }
  };

  if (loadError) {
    return <div>Errore nel caricamento delle mappe</div>;
  }

  if (!isLoaded) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="p-4">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700"
      >
        Indirizzo *
      </label>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: "it" },
          fields: ["address_components", "formatted_address", "geometry"],
          types: ["address"],
        }}
      >
        <input
          id="address"
          name="address"
          value={inputValue}
          required
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            !isValidSelection && inputValue
              ? "border-red-500"
              : "border-gray-300"
          }`}
          type="text"
          placeholder="Seleziona un indirizzo dai suggerimenti..."
        />
      </Autocomplete>
      {!isValidSelection && inputValue && (
        <p className="mt-1 text-sm text-red-600">
          Seleziona un indirizzo valido dai suggerimenti
        </p>
      )}

      {/*
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Città
          </label>
          <input
            value={addressData.city}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="text"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provincia
          </label>
          <input
            value={addressData.state}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="text"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CAP</label>
          <input
            value={addressData.postcode}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="text"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nazione
          </label>
          <input
            value={addressData.country}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="text"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Latitudine
          </label>
          <input
            value={addressData.latitude}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="text"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Longitudine
          </label>
          <input
            value={addressData.longitude}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="text"
            readOnly
          />
        </div>
      </div> */}
    </div>
  );
};

export default AddressAutocomplete;
