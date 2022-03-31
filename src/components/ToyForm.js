import React, { useState } from "react";

function ToyForm({ onSubmit }) {

  const [newToy, setNewToy] = useState({
    name: "",
    image: ""
  });

  function handleChange(e) {
    setNewToy(newToy => newToy = {...newToy, [e.target.name]:e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(newToy)
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={newToy.name}
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          value={newToy.image}
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
}

export default ToyForm;
