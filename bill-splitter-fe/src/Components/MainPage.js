import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import NavBar from "./NavBar";
import Splitter from "./Splitter";
import BillSetter from "./BillSetter";

function MainPage() {
  const [cards, setCards] = useState([
    { id_key: uuidv4(), name: "", amount: 0 },
  ]);

  const [equalAmount, setTypeAmount] = useState(true);
  const [bill, setBill] = useState(0);
  const [persons, setPersons] = useState([]);

  // const onSubmit = (e) => {
  //   props.setPersons([...persons, currName]);
  //   console.log(props.persons);
  //   e.preventDefault();
  // };

  return (
    <div>
      <NavBar />
      <BillSetter cards={cards} setTypeAmount={setTypeAmount} />
      <hr />
      <div className="splitter-cards">
        {cards.map((key) => (
          <Splitter
            persons={persons}
            setPersons={setPersons}
            currBill={bill}
            setBill={setBill}
            typeAmount={equalAmount}
            key={key.id_key}
            id={key.id_key}
            card={key}
          />
        ))}
      </div>
      <div className="add-btn-div">
        <Button
          style={{ marginLeft: "1em" }}
          onClick={() => {
            const newKey = uuidv4();
            console.log(cards);
            return setCards([
              ...cards,
              { id_key: newKey, name: "", amount: 0 },
            ]);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default MainPage;
