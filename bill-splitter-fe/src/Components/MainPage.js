import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import NavBar from "./NavBar";
import Splitter from "./Splitter";
import BillSetter from "./BillSetter";

function MainPage() {
  const [cards, setCards] = useState([uuidv4()]);

  return (
    <div>
      <NavBar />
      <BillSetter />
      <hr />
      <div className="splitter-cards">
        {cards.map((key) => (
          <Splitter key={key} id={key} />
        ))}
      </div>
      <div className="add-btn-div">
        <Button
          style={{ marginLeft: "1em" }}
          onClick={() => {
            const newKey = uuidv4();
            console.log(cards);
            return setCards([...cards, newKey]);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default MainPage;
