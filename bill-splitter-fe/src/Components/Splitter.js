import React from "react";
import { Form, Button } from "react-bootstrap";

function Splitter(props) {
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
          <Form.Group className="splitter-form-group" controlId="formBasicTip">
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
        )}
      </Form>
    </div>
  );
}

export default Splitter;
