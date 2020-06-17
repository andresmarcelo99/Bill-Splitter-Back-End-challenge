import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useAuth0 } from "../react-auth0-spa";
import NavBar from "./NavBar";
import Splitter from "./Splitter";
import BillSetter from "./BillSetter";

function MainPage() {
  const { isAuthenticated, user, getTokenSilently } = useAuth0();
  const [cards, setCards] = useState([
    { id_key: uuidv4(), name: "", amount: 0, item: "" },
  ]);
  const [equalAmount, setTypeAmount] = useState(true);
  const [bill, setBill] = useState(0);
  const [persons, setPersons] = useState([]);
  const [billEach, setBillEach] = useState(0);
  const [pendingVal, setPendingVal] = useState();
  const [r_isValid, setR_isvalid] = useState(true);
  const [split, setSplit] = useState(false);
  const [isValid, setValidation] = useState(true);

  const submitReq = (payload) => {
    getTokenSilently().then((res) => {
      axios
        .post("http://localhost:5000/users", payload, {
          headers: { Authorization: `Bearer ${res}` },
        })
        .then((res) => {
          return console.log(res.data);
        })
        .catch((err) => console.log(err));
    });
  };

  const submitSplit = async () => {
    const payload = {
      name: user.nickname,
      email: user.name,
      token: await getTokenSilently(),
      split: [],
    };

    if (!equalAmount) {
      if (pendingVal > -1 && pendingVal < 1) {
        let receipt = [...cards].map((card) => ({
          amount: card.amount,
          item: card.item,
          name: card.name,
        }));
        payload.split = [...receipt];
        console.log(payload);
        setR_isvalid(true);
        return submitReq(payload);
      }
      console.log("Remaining must be 0");
      return setR_isvalid(false);
    } else {
      if (split && isValid) {
        let receipt = [...cards].map((card) => ({
          amount: (bill * 0.15 + bill) / cards.length,
          name: card.name,
        }));
        payload.split = [...receipt];
        console.log(payload);
        return submitReq(payload);
      }
      return console.log("failure");
    }
  };

  return (
    <div>
      <NavBar typeOption={{ label: "Splits", href: "/splits" }} main={true} />
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
        submitSplit={submitSplit}
        split={split}
        setSplit={setSplit}
        r_isValid={r_isValid}
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
              { id_key: newKey, name: "", amount: 0, item: "" },
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
