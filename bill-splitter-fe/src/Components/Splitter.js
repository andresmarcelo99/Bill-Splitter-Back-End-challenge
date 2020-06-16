import React from "react";
import { Form, Button } from "react-bootstrap";

function Splitter(props) {
  //   const handleDelete = (e) => {
  //     console.log(e.target.value);
  //   };

  return (
    <div className="splits-div-card">
      <Form className="splitter-form">
        <span>
          <Button
            // type="submit"
            size="sm"
            variant="danger"
            className="delete-btn"
            // onClick={handleDelete.bind(this,)}
            onClick={() => console.log(props.card)}
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

        {/* <Form.Group className="splitter-form-group" controlId="formBasicQty">
          <Form.Label className="splitter-labels">How many?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add the number of people"
            name="qty"
            onChange={(e) => setQty(e.target.value)}
          />
        </Form.Group> */}

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
