import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { addClothes, getClothes } from "../../utils/clothesApi";
//import { deleteClothes } from "../../utils/clothesApi";

function AddItemModal({ closeActiveModal, activeModal, setClothingItems }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [weatherType, setWeatherType] = useState("hot");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  const handleWeatherTypeChange = (evt) => {
    setWeatherType(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    addClothes({ name: name, weather: weatherType, imageUrl: url })
      .then((data) => {
        setName("");
        setUrl("");
        setWeatherType("hot");

        getClothes()
          .then((data) => {
            console.log(data);
            setClothingItems(data);
          })
          .catch(console.error);

        closeActiveModal();
      })
      .catch(console.error);
  };

  // const handleDeleteGarmentSubmit = (evt) => {
  //   evt.preventDefault();

  //   deleteClothes({ id: 17 })
  //     .then((data) => {
  //       console.log(data);
  //       closeActiveModal();
  //     })
  //     .catch(console.error);
  // };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={activeModal === "add-garment"}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={url}
          onChange={handleUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherTypeChange}
            defaultChecked
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherTypeChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherTypeChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
