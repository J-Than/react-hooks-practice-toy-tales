import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {

  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(r => r.json())
    .then(data => setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": `${newToy.name}`,
        "image": `${newToy.image}`,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then(data => setToys([...toys, data]))
  }

  function handleLike(toy) {
    toy.likes+=1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    })
    .then(r => r.json())
    .then(data => setToys(toys.map(t => toy.id===t.id ? data : t)))
  }

  function handleDelete(toyID) {
    fetch(`http://localhost:3001/toys/${toyID}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => setToys(toys.filter(toy => toy.id !== toyID)))
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onSubmit={handleNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>{showForm ? "Close Toy Form" : "Add a Toy"}</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDelete} onLike={handleLike} />
    </>
  );
}

export default App;
