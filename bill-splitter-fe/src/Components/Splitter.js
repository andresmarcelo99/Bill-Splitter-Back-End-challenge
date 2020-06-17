import React from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-spa";

function Splitter(props) {
  const { isAuthenticated } = useAuth0();
  const handleDelete = (e) => {
    const curr_id = props.card.id_key;
    const newCards = [...props.cards.filter((card) => card.id_key !== curr_id)];
    props.setCards([...newCards]);
  };

  return (
    <div className="splits-div-card">
      <Form onSubmit={(e) => e.preventDefault()} className="splitter-form">
        <span>
          <Button
            // type="submit"
            size="sm"
            variant="danger"
            className="delete-btn"
            onClick={handleDelete}
            disabled={!isAuthenticated}
          >
            x
          </Button>
        </span>

        <Form.Group controlId="formBasicCost">
          <Form.Label className="splitter-labels">Name</Form.Label>
          <Form.Control
            onChange={(e) => (props.card.name = e.target.value)}
            type="text"
            placeholder="Enter name"
            name="name"
          />
        </Form.Group>

        {!props.typeAmount && (
          <div>
            <Form.Group controlId="formBasicCost">
              <Form.Label className="splitter-labels">Item</Form.Label>
              <Form.Control
                onChange={(e) => (props.card.item = e.target.value)}
                type="text"
                placeholder="Enter name"
                name="name"
              />
            </Form.Group>
            <Form.Group
              className="splitter-form-group"
              controlId="formBasicTip"
            >
              <Form.Label className="splitter-labels">Amount</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const isNum = /^\d+$/.test(e.target.value);
                  if (isNum)
                    return (props.card.amount = parseInt(e.target.value));
                }}
                type="text"
                placeholder="Enter amount"
                name="amount"
              />
            </Form.Group>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Splitter;
