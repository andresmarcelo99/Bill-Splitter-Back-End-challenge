import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { useAuth0 } from "../react-auth0-spa";
import NavBar from "./NavBar";
import Splitter from "./Splitter";
import BillSetter from "./BillSetter";

function MainPage() {
  const [cards, setCards] = useState([
    { id_key: uuidv4(), name: "", amount: 0 },
  ]);
  const { isAuthenticated } = useAuth0();
  const [equalAmount, setTypeAmount] = useState(true);
  const [bill, setBill] = useState(0);
  const [persons, setPersons] = useState([]);
  const [billEach, setBillEach] = useState(0);
  const [pendingVal, setPendingVal] = useState(0);

  return (
    <div>
      <NavBar />
      <BillSetter
        cards={cards}
        setCards={setCards}
        equalAmount={equalAmount}
        setTypeAmount={setTypeAmount}
        setBill={setBill}
        bill={bill}
        billEach={billEach}
        setBillEach={setBillEach}
        pendingVal={pendingVal}
        setPendingVal={setPendingVal}
      />
      <hr />
      <div className="splitter-cards">
        {cards.map((key) => (
          <Splitter
            persons={persons}
            setPersons={setPersons}
            typeAmount={equalAmount}
            key={key.id_key}
            id={key.id_key}
            card={key}
            cards={cards}
            setCards={setCards}
          />
        ))}
      </div>
      <div className="add-btn-div">
        <Button
          disabled={!isAuthenticated}
          style={{ marginLeft: "1em" }}
          className="split-btn"
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
